import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { graphTemplate } from "./template";
import { BAR_WORLD_DEPTH, BAR_CENTER_Z, ChartScene } from "./chart-scene";
import { CAMERA_OFFSETS, fitCamera, setCameraSpan } from "./camera";
import { readStatistics, readHistory } from "./recorder";
import { ENERGY_DEFAULTS, SERIES, hasEnergySource, resolveEnergyConfig } from "./config";
import {
  GRAPH_HEIGHT, HOUR, numeric, energyFromStatistics, withLiveEnergy, normalizeHistory,
  priceSegments, sampledHistory, scaleFor, mergeHistory, timestamp,
} from "./data.js";

const LAYER_DEPTHS = [BAR_CENTER_Z, -1.55, -3.9, -5.9];
const FLOOR_FRONT_Z = 2.8;

export class GleamEnergyGraph extends HTMLElement {
  static getStubConfig() { return { type: "custom:gleam-energy-graph", ...ENERGY_DEFAULTS }; }
  static getConfigElement() { return document.createElement("gleam-energy-graph-editor"); }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._enabled = { energy: true, price: true, power: false, voltage: false };
    this._history = {};
    this._stats = [];
    this._lastFetch = {};
    this._errors = {};
    this._epoch = 0;
    this._visible = false;
  }

  /** @param {import("../../types").EnergyConfig} config */
  setConfig(config) {
    const merged = resolveEnergyConfig(config);
    const previous = this._config;
    this._config = merged;
    if (this._chart && previous?.point_light_intensity !== merged.point_light_intensity) {
      this._chart.pointLight.intensity = merged.point_light_intensity;
      this._renderFrame();
    }
    for (const name of SERIES) this.style.setProperty(`--gleam-${name}`, merged[`${name}_color`]);
    let visibilityChanged = false;
    for (const name of SERIES) {
      const was = this._enabled[name];
      if (!previous?.[`${name}_entity`] || previous[`start_${name}`] !== merged[`start_${name}`])
        this._enabled[name] = merged[`start_${name}`];
      if (!merged[`${name}_entity`]) this._enabled[name] = false;
      visibilityChanged ||= was !== this._enabled[name];
      const button = this.shadowRoot?.querySelector(`[data-series="${name}"]`);
      if (button) {
        button.hidden = !merged[`${name}_entity`];
        button.setAttribute("aria-pressed", String(this._enabled[name]));
      }
    }
    this._applyLayout();
    const liveChanged = previous?.current_hour_entity !== merged.current_hour_entity;
    if (!previous || liveChanged || ["current_hour_label","price_label","show_current_hour_label","show_price_label"].some(key => merged[key] !== previous[key]))
      this._updateReadings();
    if (previous?.starting_view !== merged.starting_view) {
      this._cameraPreset = merged.starting_view;
      if (this._renderer) this._setCameraPreset(merged.starting_view);
    }
    // The current-hour sensor comes from hass.states, not Recorder.
    if (previous && previous.hours_to_show === merged.hours_to_show && previous.future_hours === merged.future_hours
      && SERIES.every(name => previous[`${name}_entity`] === merged[`${name}_entity`])) {
      if (this.isConnected && previous.refresh_interval !== merged.refresh_interval) this._startRefreshTimer();
      if (visibilityChanged) void this._refresh();
      if (visibilityChanged || (liveChanged && this._enabled.energy) || previous.use_server_time !== merged.use_server_time
        || previous.dataset_spacing !== merged.dataset_spacing || previous.now_marker_color !== merged.now_marker_color
        || SERIES.some(name => this._enabled[name] && ["shift_minutes", "color", "opacity", "line_width"].some(
          field => previous[`${name}_${field}`] !== merged[`${name}_${field}`]))) this._scheduleBuild();
      return;
    }
    this._epoch++;
    this._stats = [];
    this._history = {};
    this._lastFetch = {};
    this._lastFull = {};
    this._retryAfter = {};
    this._errors = this._errors.webgl ? { webgl: this._errors.webgl } : {};
    if (this.isConnected) {
      this._start();
      this._scheduleBuild();
    }
  }

  /** @param {import("../../types").HomeAssistant} hass */
  set hass(hass) {
    const previous = this._hass;
    this._hass = hass;
    if (!this._config) return;
    if (!previous || SERIES.some(name => !!previous.states[this._config[`${name}_entity`]] !== !!hass.states[this._config[`${name}_entity`]]))
      this._applyLayout();
    const priceId = this._config.price_entity, liveId = this._config.current_hour_entity;
    const price = hass.states[priceId], oldPrice = previous?.states[priceId];
    const live = hass.states[liveId], oldLive = previous?.states[liveId];
    const priceReading = price?.state !== oldPrice?.state ||
      price?.attributes.unit_of_measurement !== oldPrice?.attributes.unit_of_measurement;
    if (!previous || priceReading || live?.state !== oldLive?.state) this._updateReadings();
    if (this._scene && ((this._enabled.price && (priceReading || price?.last_updated !== oldPrice?.last_updated
      || price?.attributes.raw_today !== oldPrice?.attributes.raw_today || price?.attributes.raw_tomorrow !== oldPrice?.attributes.raw_tomorrow))
      || (this._enabled.energy && (live?.state !== oldLive?.state || live?.last_updated !== oldLive?.last_updated))
      || previous?.locale?.language !== hass.locale?.language || previous?.locale?.time_zone !== hass.locale?.time_zone
      || previous?.config?.time_zone !== hass.config?.time_zone)) {
      this._scheduleBuild();
    }
    if (!previous && this.isConnected) void this._refresh();
  }

  getCardSize() { return 13; }
  getGridOptions() { return { columns: "full", rows: "auto" }; }

  connectedCallback() {
    if (this._config) this._start();
  }

  _start() {
    if (!this._events || this._events.signal.aborted) this._mount();
    this._updateReadings();
    this._applyLayout();
    this._updateNotice();
    this._startRefreshTimer();
    if (!this._intersection) {
      this._intersection = new IntersectionObserver(entries => {
        this._visible = entries.at(-1).isIntersecting;
        if (this._visible) this._resume();
      });
      this._intersection.observe(this);
    }
    void this._refresh();
  }

  _resume() {
    if (!this._visible || document.hidden || !this.isConnected) return;
    if (!this._renderer && !this._errors.webgl) this._initGraphics();
    if (this._scene) { this._renderFrame(); void this._refresh(); }
  }

  disconnectedCallback() {
    this._epoch++;
    clearInterval(this._timer);
    cancelAnimationFrame(this._buildFrame);
    this._buildFrame = 0;
    this._intersection?.disconnect();
    this._intersection = null;
    this._visible = false;
    this._refreshPending = false;
    this._resize?.disconnect();
    this._events?.abort();
    this._controls?.dispose();
    this._disposeScene();
    this._renderer?.dispose();
    this._renderer?.forceContextLoss();
    this._renderer = null;
    this._scene = null;
    this._targets = [];
    delete this._errors.webgl;
  }

  _startRefreshTimer() {
    clearInterval(this._timer);
    this._timer = window.setInterval(() => {
      if (this._visible && !document.hidden) void this._refresh();
    }, this._config.refresh_interval * 1000);
  }

  _mount() {
    if (this._renderer) return;
    this.shadowRoot.innerHTML = graphTemplate;
    this._events?.abort();
    this._events = new AbortController();
    const signal = this._events.signal;
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) this._resume();
    }, { signal });
    this.shadowRoot.querySelectorAll("[data-series]").forEach(button => {
      const name = button.dataset.series;
      button.hidden = !this._config[`${name}_entity`];
      button.setAttribute("aria-pressed", String(this._enabled[name]));
      button.addEventListener("click", () => {
        this._enabled[name] = !this._enabled[name];
        button.setAttribute("aria-pressed", String(this._enabled[name]));
        this._scheduleBuild();
        void this._refresh();
      }, { signal });
    });
    this.shadowRoot.querySelectorAll("[data-camera]").forEach(button => {
      button.addEventListener("click", () => this._setCameraPreset(button.dataset.camera), { signal });
    });
  }

  _initGraphics() {
    const signal = this._events.signal, stage = this.shadowRoot.querySelector(".stage");
    try {
      this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      this._renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
      this._renderer.setClearColor(0x050914, 0);
      this._renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this._renderer.toneMappingExposure = 1.4;
      stage.prepend(this._renderer.domElement);
      this._scene = new THREE.Scene();
      this._needsBuild = true;
      this._chart = new ChartScene(this._scene, this._config.point_light_intensity);
      // Compress decorative depth only; time and measurement heights are unchanged.
      this._scene.scale.z = Math.max(1, this._config.dataset_spacing) / 10;
      this._camera = new THREE.OrthographicCamera(-12.5, 12.5, 5, -5, 0.1, 120);
      this._chart.sortTransparency(this._renderer, this._camera);
      this._controls = new OrbitControls(this._camera, this._renderer.domElement);
      this._applyLayout();
      this._controls.minPolarAngle = 0.01;
      this._controls.maxPolarAngle = Math.PI / 2 - 0.01;
      this._controls.minDistance = 12;
      this._controls.maxDistance = 48;
      this._controls.minZoom = 0.55;
      this._controls.maxZoom = 4;
      this._controls.addEventListener("start", () => {
        this._defaultCamera = false;
        this._cameraPreset = null;
        this._updateCameraButtons();
      });
      this._controls.addEventListener("change", () => this._renderFrame());
      this._raycaster = new THREE.Raycaster();
      this._renderer.domElement.addEventListener("pointermove", event => this._hover(event), { signal });
      this._renderer.domElement.addEventListener("pointerleave", () => this._hideTip(), { signal });
      this._renderer.domElement.addEventListener("webglcontextlost", event => {
        event.preventDefault();
        this._errors.webgl = "WebGL context lost. Reload this view to restore the chart.";
        this._updateNotice();
      }, { signal });
      this._resize = new ResizeObserver(() => this._size());
      this._resize.observe(stage);
      this._setCameraPreset(this._cameraPreset || this._config.starting_view);
      this._size();
    } catch (error) {
      this._errors.webgl = "3D rendering needs WebGL 2. " + error.message;
      this._updateNotice();
    }
  }

  _size() {
    if (!this._renderer || !this._camera) return;
    const stage = this.shadowRoot.querySelector(".stage");
    const width = stage.clientWidth, height = stage.clientHeight;
    if (!(width > 0 && height > 0)) return;
    this._renderer.setSize(width, height, false);
    this._camera.aspect = width / height;
    const span = this._framingSpan || Math.max(9.5, 25 / this._camera.aspect);
    setCameraSpan(this._camera, this._camera.aspect, span);
    if (this._defaultCamera) this._fitCamera();
    this._renderFrame();
  }

  _setCameraPreset(name) {
    if (!this._camera) return;
    const offsets = CAMERA_OFFSETS;
    if (!offsets[name]) return;
    this._cameraPreset = name;
    this._defaultCamera = true;
    this._camera.zoom = 1;
    this._camera.updateProjectionMatrix();
    this._controls.target.set(0, 1.7, -0.2);
    this._camera.position.copy(this._controls.target).add(new THREE.Vector3(...offsets[name]));
    this._controls.update();
    this._fitCamera();
    this._updateCameraButtons();
    this._renderFrame();
  }

  _updateCameraButtons() {
    this.shadowRoot.querySelectorAll("[data-camera]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.camera === this._cameraPreset));
    });
  }

  _fitCamera() {
    if (!this._scene || !this._camera || !(this._camera.aspect > 0)) return;
    const span = fitCamera(this._scene, this._camera, this._controls, this._camera.aspect, this._chart.stackUnits(this._camera, true));
    if (span !== undefined) this._framingSpan = span;
  }

  _scheduleBuild() {
    this._needsBuild = true;
    this._renderFrame();
  }

  async _refresh() {
    if (!this._scene || !this._hass || !this.isConnected || !this._visible || document.hidden) return;
    if (this._fetching) { this._refreshPending = true; return; }
    const config = this._config, client = this._hass;
    this._fetching = true;
    const epoch = this._epoch;
    try {
      const now = Date.now(), start = now - (config.hours_to_show - config.future_hours) * HOUR;
      const jobs = [];
      const due = key => now >= (this._retryAfter[key] ?? 0) && now - (this._lastFetch[key] ?? -Infinity) >= 60000;
      const full = key => !this._lastFull[key] || now - this._lastFull[key] >= HOUR;
      const query = (keys, task, apply, fullWindow) => {
        jobs.push(Promise.resolve().then(task).then(result => {
          if (epoch !== this._epoch || !this.isConnected) return;
          apply(result);
          for (const key of keys) {
            this._lastFetch[key] = now;
            if (fullWindow) this._lastFull[key] = now;
            delete this._errors[key]; delete this._retryAfter[key];
          }
        }).catch(error => {
          if (epoch === this._epoch) for (const key of keys) {
            this._retryAfter[key] = now + 15000;
            this._errors[key] = `${key}: data request failed (${error.message || error.code || "unknown error"}).`;
          }
        }));
      };
      const stats = "Energy statistics";
      if (this._enabled.energy && due(stats)) {
        const whole = full(stats), earliest = start - 2 * HOUR;
        const from = whole ? earliest : Math.max(earliest, Math.floor(this._lastFetch[stats] / HOUR) * HOUR - 2 * HOUR);
        query([stats], () => readStatistics(client, config.energy_entity, from, now), result => {
          this._stats = (whole ? [] : this._stats.filter(row => {
            const t = timestamp(row.start);
            return t >= earliest && t < from;
          })).concat(result.filter(row => timestamp(row.start) >= from));
        }, whole);
      }
      const histories = new Set(this._enabled.price ? [config.price_entity] : []);
      if (this._enabled.power) histories.add(config.power_entity);
      if (this._enabled.voltage) histories.add(config.voltage_entity);
      // Group cold and incremental reads separately so a newly enabled lane
      // doesn't force the already loaded lanes to download a week again.
      for (const whole of [true, false]) {
        const ids = [...histories].filter(id => due(id) && full(id) === whole);
        if (!ids.length) continue;
        const earliest = start - HOUR;
        const from = whole ? earliest : Math.max(earliest, Math.min(...ids.map(id => this._lastFetch[id])) - 60000);
        query(ids, () => readHistory(client, ids, from, now), result => {
          for (const id of ids) {
            const rows = normalizeHistory(result[id] ?? []);
            this._history[id] = whole ? rows : mergeHistory(this._history[id], rows, from, earliest);
          }
        }, whole);
      }
      await Promise.all(jobs);
      if (epoch === this._epoch && this.isConnected && (jobs.length || this._clockTick(now) !== this._builtTick))
        this._scheduleBuild();
    } finally {
      this._fetching = false;
      if (this._refreshPending) {
        this._refreshPending = false;
        void this._refresh();
      }
    }
  }

  _clockTick(now) {
    // Advance minute labels/hour boundaries; for tiny windows also update
    // when the timeline has moved at least one CSS pixel.
    const step = Math.min(60000, this._config.hours_to_show * HOUR / (this._renderer?.domElement.clientWidth || 1));
    return `${Math.floor(now / 60000)}:${Math.floor(now / step)}`;
  }

  _updateNotice() {
    const el = this.shadowRoot.querySelector(".notice");
    if (el) el.textContent = Object.values(this._errors).join("\n");
  }

  _priceUnit() {
    const unit = this._hass?.states[this._config.price_entity]?.attributes.unit_of_measurement;
    return typeof unit === "string" ? unit.trim() : "";
  }

  _updateReadings() {
    if (!this.isConnected || !this._events) return;
    const value = key => numeric(this._hass?.states[this._config[key]]?.state);
    this.shadowRoot.querySelector(".live").textContent = value("current_hour_entity")?.toFixed(2) ?? "—";
    this.shadowRoot.querySelector(".price").textContent = value("price_entity")?.toFixed(3) ?? "—";
    for (const [name, unit, selector] of [["current_hour", "kWh", ".live-label"], ["price", this._priceUnit(), ".price-label"]]) {
      const text = this._config[`show_${name}_label`] ? this._config[`${name}_label`].trim() : "";
      const label = this.shadowRoot.querySelector(selector);
      label.textContent = [text, unit].filter(Boolean).join(" · ");
      label.hidden = !label.textContent;
    }
  }

  _applyLayout() {
    const root = this.shadowRoot, title = root.querySelector(".card-title");
    if (!title) return;
    const c = this._config;
    root.querySelector(".live").style.setProperty("--value-scale", (c.separate_readout_sizes ? c.current_hour_value_size : c.readout_value_size) / 100);
    root.querySelector(".price").style.setProperty("--value-scale", (c.separate_readout_sizes ? c.price_value_size : c.readout_value_size) / 100);
    title.textContent = c.title;
    title.hidden = !c.title.trim();
    const live = !!c.current_hour_entity && c.show_current_hour_readout;
    const price = !!c.price_entity && c.show_price_readout;
    root.querySelector(".live").parentElement.hidden = !live;
    root.querySelector(".price").parentElement.hidden = !price;
    root.querySelector(".kpis").hidden = !live && !price;
    let count = 0;
    for (const name of SERIES) {
      const key = `${name}_entity`;
      const available = name === "energy" || hasEnergySource(key, c[key], this._hass?.states);
      root.querySelector(`[data-series="${name}"]`).hidden = !available;
      if (available) count++;
    }
    const buttons = c.show_dataset_buttons && count > 1;
    root.querySelector(".series-controls").hidden = !buttons;
    const noReadouts = title.hidden && !live && !price;
    const noControls = !buttons && !c.show_camera_buttons;
    root.querySelector(".readouts").hidden = noReadouts;
    root.querySelector(".controls").hidden = noControls;
    root.querySelector("header").hidden = noReadouts && noControls;
    root.querySelector(".camera-controls").hidden = !c.show_camera_buttons;
    if (this._renderer && this._controls) {
      this._controls.enabled = !c.lock_navigation;
      this._renderer.domElement.style.touchAction = c.lock_navigation ? "auto" : "none";
    }
  }

  _disposeScene() {
    this._chart?.dispose();
    this._chart = null;
  }

  _line(points, color, opacity = 1, radius = 0) {
    return this._chart.line(points, color, opacity, radius);
  }

  _label(text, position, color = "#87b4ce", size = 0.24) {
    this._chart.label(text, position, color, size);
  }

  _axis(scale, z, unit, color) {
    const axes = this._chart.grid(color, .45, 2, z, unit.split(" ")[0]);
    this._chart.gridSegment(axes, [-9.5, 0, z], [-9.5, GRAPH_HEIGHT, z]);
    this._chart.gridSegment(axes, [-9.5, 0, z], [9.2, 0, z]);
    const grid = this._chart.grid(color, .1, 4, z, unit.split(" ")[0]);
    for (let i = 0; i <= 4; i++) {
      const height = GRAPH_HEIGHT * i / 4, value = scale.min + (scale.max - scale.min) * i / 4;
      if (i > 0) this._chart.gridSegment(grid, [-9.5, height, z], [9.2, height, z]);
      this._label(value.toLocaleString(undefined, { maximumFractionDigits: 2 }), [-10, height, z], undefined, .24);
    }
    this._chart.label(unit, [-8.1, 5.1, z], "#" + color.toString(16).padStart(6, "0"), .32, true);
  }

  _build() {
    if (!this._scene || !this._hass) return;
    this._chart.begin(); this._targets = []; this._hideTip();
    const now = Date.now(), config = this._config;
    this._builtTick = this._clockTick(now);
    // Overlay lane centres at zero; keep mesh transforms invertible for picking.
    const overlay = config.dataset_spacing === 0;
    this._scene.scale.z = Math.max(1, config.dataset_spacing) / 10;
    const layerZ = index => overlay ? BAR_CENTER_Z : LAYER_DEPTHS[index];
    const start = now - (config.hours_to_show - config.future_hours) * HOUR;
    const end = now + config.future_hours * HOUR;
    const timeZone = config.use_server_time ? this._hass.config?.time_zone : undefined;
    const formatKey = `${this._hass.locale?.language}:${timeZone}`;
    if (formatKey !== this._formatKey) this._timeFormat = timeZone
      ? new Intl.DateTimeFormat(this._hass.locale?.language || "en-GB", {
        hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone,
      }).format
      : time => {
        const date = new Date(time);
        return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
      };
    this._formatKey = formatKey;
    const stamp = this._timeFormat;
    const x = time => (time - start) / (end - start) * 18 - 9;
    const priceSensor = this._hass.states[config.price_entity];
    const color = name => parseInt(config[`${name}_color`].slice(1), 16);
    const opacity = name => config[`${name}_opacity`] / 100;
    const priceUnit = this._priceUnit();
    const liveSensor = this._hass.states[config.current_hour_entity];
    const energyShift = config.energy_shift_minutes * 60000, priceShift = config.price_shift_minutes * 60000;
    const priceX = time => x(time + priceShift);
    const energy = this._enabled.energy ? withLiveEnergy(energyFromStatistics(this._stats, start - energyShift - .4 * HOUR, now), liveSensor, now) : [];
    const prices = this._enabled.price ? priceSegments(this._history[config.price_entity] || [], priceSensor, start - priceShift, end - priceShift, now) : [];
    const energyScale = scaleFor(energy.map(p => p.value));
    const priceScale = scaleFor(prices.map(p => p.value));
    const currentPrice = numeric(priceSensor?.state);
    const barDepth = BAR_WORLD_DEPTH / this._scene.scale.z;
    const barFrontZ = BAR_CENTER_Z + barDepth / 2;
    let rearZ = this._enabled.energy ? BAR_CENTER_Z - barDepth / 2 : barFrontZ;
    if (this._enabled.energy) {
      this._axis(energyScale, 1, "ENERGY · kWh", color("energy"));
      const width = 18 / config.hours_to_show * .8;
      for (const point of energy) {
        const center = x(point.time + energyShift);
        if (center > 9 + width / 2 || center < -9 - width / 2) continue;
        const height = Math.max(.008, energyScale.height(point.value));
        const bar = this._chart.bar(center, width, height, barDepth, color("energy"), opacity("energy"));
        bar.userData.tip = `Energy${point.live ? " · current hour so far" : ""}\n${stamp(point.time)}–${stamp(point.time + HOUR)}\n${point.value.toFixed(3)} kWh`;
        this._targets.push(bar);
      }
    }
    let nextLayer = this._enabled.energy ? 1 : 0;
    const priceZ = this._enabled.price ? layerZ(nextLayer++) : undefined;
    if (this._enabled.price) {
      rearZ = priceZ;
      const radius = .035 * config.price_line_width / 100;
      const strokes = this._chart.strokes("price", color("price"), prices.length * 2, opacity("price"), priceZ);
      const joints = this._chart.strokes("price", color("price"), prices.length * 2, opacity("price"), priceZ, true);
      this._axis(priceScale, priceZ - .3, `PRICE${priceUnit ? ` · ${priceUnit}` : ""}`, color("price"));
      for (const p of prices) {
        const a = priceX(p.from), b = priceX(p.to), y = priceScale.height(p.value), zero = priceScale.height(0);
        const face = this._chart.face(a, b, y, zero, priceZ, p.future, color("price"), opacity("price"));
        face.userData.tip = `${p.future ? "Future price" : "Recorded price"}\n${stamp(p.from)}–${stamp(p.to)}\n${p.value.toFixed(3)}${priceUnit ? ` ${priceUnit}` : ""}`;
        this._targets.push(face);
        this._chart.stroke(strokes, [a,y,priceZ], [b,y,priceZ], radius, face.userData.tip);
      }
      for (let i = 1; i < prices.length; i++) {
        const a = prices[i-1], b = prices[i];
        if (Math.abs(a.to - b.from) >= 1000 || a.value === b.value) continue;
        const from = [priceX(b.from),priceScale.height(a.value),priceZ];
        const to = [from[0],priceScale.height(b.value),priceZ];
        this._chart.stroke(strokes, from, to, radius);
        this._chart.joint(joints, from, radius);
        this._chart.joint(joints, to, radius);
      }
      if (strokes.count) this._targets.push(strokes);
    }
    for (const [name, unit, divisor] of [["power","kW",1000],["voltage","V",1]]) {
      if (!this._enabled[name]) continue;
      const z = layerZ(nextLayer++);
      rearZ = z;
      const id = config[`${name}_entity`];
      const radius = .025 * config[`${name}_line_width`] / 100;
      const shift = config[`${name}_shift_minutes`] * 60000;
      const points = sampledHistory(this._history[id] || [], start - shift, Math.min(now, end - shift), HOUR / 3, divisor);
      const scale = scaleFor(points.map(p => p.value));
      this._axis(scale,z-.3,`${name.toUpperCase()} · ${unit}`,color(name));
      const strokes = this._chart.strokes(name, color(name), points.length, opacity(name), z);
      const joints = this._chart.strokes(name, color(name), points.length, opacity(name), z, true);
      for (let i = 1; i < points.length; i++) {
        if (points[i].time - points[i-1].time > HOUR / 3) continue;
        const a = points[i-1], b = points[i];
        if (i > 1 && a.time - points[i-2].time <= HOUR / 3)
          this._chart.joint(joints, [x(a.time + shift), scale.height(a.value), z], radius);
        this._chart.stroke(strokes, [x(a.time + shift),scale.height(a.value),z], [x(b.time + shift),scale.height(b.value),z], radius,
          `${name === "power" ? "Power" : "Voltage"}\n${stamp(b.time)}\n${b.value.toFixed(2)} ${unit}`);
      }
      if (strokes.count) this._targets.push(strokes);
    }
    const grid = this._chart.grid(0x2676b8, .15, Math.ceil(config.hours_to_show));
    for (let i = Math.ceil(start / HOUR); i * HOUR < end; i++) {
      const hourX = x(i * HOUR);
      this._chart.gridSegment(grid, [hourX, -.07, FLOOR_FRONT_Z], [hourX, -.07, rearZ]);
      if (i % 3 === 0) this._label(stamp(i * HOUR), [hourX, -.45, 3], "#8daac7", .322);
    }
    if (rearZ < barFrontZ) {
      const nowX = x(now);
      const radius = .022, frontZ = barFrontZ + (this._enabled.energy ? radius : 0);
      const markerColor = color("now_marker");
      this._line([[nowX,.01,frontZ],[nowX,.01,rearZ]],markerColor,.9,radius);
      if (this._enabled.energy) this._chart.floorMarkerTip(nowX, .01, frontZ, radius, markerColor);
      const usePriceHeight = rearZ === priceZ && currentPrice !== null;
      const bottom = usePriceHeight ? priceScale.height(0) : 0;
      const top = usePriceHeight ? priceScale.height(currentPrice) : GRAPH_HEIGHT;
      this._line([[nowX,bottom,rearZ],[nowX,top,rearZ]],markerColor,.9,.022);
    }
    const firstHour = energy.filter(p=>!p.live).length;
    if (this._enabled.energy && !firstHour && !this._errors["Energy statistics"]) this._errors.emptyEnergy = "No completed hourly energy statistics in this window.";
    else delete this._errors.emptyEnergy;
    if (this._enabled.price && !(this._history[config.price_entity]?.length) && !this._errors[config.price_entity])
      this._errors.emptyPrice = "No recorded price history returned; only available snapshots and forecast can be shown.";
    else delete this._errors.emptyPrice;
    this._chart.end();
    this._scene.updateMatrixWorld(true);
    this._chart.cachePlotBounds(this._targets);
    this._updateNotice();
    if (this._defaultCamera) this._fitCamera();
    this._renderFrame();
  }

  _hover(event) {
    if (!this._renderer || !this._targets?.length) return;
    const rect = this._renderer.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2((event.clientX - rect.left)/rect.width*2-1,
      -(event.clientY-rect.top)/rect.height*2+1);
    this._scene.updateMatrixWorld(true);
    this._raycaster.setFromCamera(mouse, this._camera);
    const hits = this._raycaster.intersectObjects(this._targets, false);
    const tip = this.shadowRoot.querySelector(".tip");
    let hitTip;
    for (const { object, instanceId } of hits) {
      hitTip = instanceId === undefined ? object.userData.tip : object.userData.tips[instanceId];
      if (hitTip) break;
    }
    if (!hitTip) { this._hideTip(); return; }
    tip.textContent = hitTip;
    tip.style.display = "block";
    tip.style.left = Math.max(8, Math.min(rect.width-250,event.clientX-rect.left+14)) + "px";
    tip.style.top = Math.max(8, Math.min(rect.height-110,event.clientY-rect.top-30)) + "px";
  }

  _hideTip() {
    const tip = this.shadowRoot.querySelector(".tip");
    if (tip) tip.style.display = "none";
  }

  _renderFrame() {
    if (this._drawing || this._buildFrame || !this._renderer || !this._visible || document.hidden) return;
    this._buildFrame = requestAnimationFrame(() => {
      this._buildFrame = 0;
      if (!this.isConnected || !this._renderer || !this._visible || document.hidden) return;
      this._drawing = true;
      try {
        if (this._needsBuild) { this._needsBuild = false; this._build(); }
        this._chart.followCamera(this._camera, this._controls.target);
        this._chart.stackUnits(this._camera);
        this._renderer.render(this._scene, this._camera);
      } finally {
        this._drawing = false;
      }
    });
  }
}
