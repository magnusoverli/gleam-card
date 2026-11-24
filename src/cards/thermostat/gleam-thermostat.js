import * as THREE from "three";
import { foundationStyles } from "../../shared/theme";
import { EditorPreview } from "../../shared/editor-preview";
import { DialScene } from "./dial-scene";
import { dialFraction } from "./dial-angle";
import { CommandState } from "./command-state";
import { DEFAULT_NAME, DEFAULTS, OPTIONS, resolveThermostatConfig } from "./config";
import { temperatureBounds, roundTemperature, planClimateCommand, sendClimateCommand } from "./commands";

const LABELS = { off: "Off", heat_cool: "Heat / Cool", auto: "Auto", heat: "Heat", cool: "Cool", fan_only: "Fan", dry: "Dry" };
const CONTROL_FIELDS = ["temperature", "temperature_unit", "min_temp", "max_temp", "target_temp_step",
  "supported_features", "fan_mode", "preset_mode", "swing_mode"];
const OPTIONS_FIELDS = ["hvac_modes", "fan_modes", "preset_modes", "swing_modes"];
const sameOptions = (a, b) => a === b || (Array.isArray(a) && Array.isArray(b)
  && a.length === b.length && a.every((value, index) => value === b[index]));
const number = value => value === null || value === undefined || value === "" ? null :
  Number.isFinite(Number(value)) ? Number(value) : null;

export class GleamThermostat extends HTMLElement {
  static getConfigElement() { return document.createElement("gleam-thermostat-editor"); }
  static getStubConfig(hass, entities = [], fallback = []) {
    return { entity: [...entities, ...fallback, ...Object.keys(hass?.states || {})].find(id => id.startsWith("climate.")) || "climate.heat_pump", name: DEFAULT_NAME };
  }
  constructor() {
    super(); this.attachShadow({ mode: "open" }); this._command = new CommandState(); this._draft = null;
  }
  /** @param {import("../../types").ThermostatConfig} config */
  setConfig(config) {
    const resolved = resolveThermostatConfig(config);
    const previous = this._config;
    if (previous && previous.entity !== resolved.entity) {
      this._command.reset(); this._draft = null; this._drag = null;
    }
    this._config = resolved;
    if (previous && previous.advanced_open !== resolved.advanced_open) {
      const details = this.shadowRoot.querySelector("details");
      if (details) details.open = resolved.advanced_open;
    }
    if (this.isConnected) { this._mount(); this._applyConfig(); this._update(); }
  }
  /** @param {import("../../types").HomeAssistant} hass */
  set hass(hass) {
    const previous = this._hass;
    this._hass = hass;
    const state = hass.states[this._config?.entity];
    if (previous?.states[this._config?.entity] === state
      && previous?.config?.unit_system?.temperature === hass.config?.unit_system?.temperature) return;
    const confirmed = this._command.confirm(state);
    if (confirmed) this._draft = null;
    const old = previous?.states[this._config?.entity];
    if (!confirmed && old && state && old.state === state.state
      && previous.config?.unit_system?.temperature === hass.config?.unit_system?.temperature
      && CONTROL_FIELDS.every(key => old.attributes[key] === state.attributes[key])
      && OPTIONS_FIELDS.every(key => sameOptions(old.attributes[key], state.attributes[key]))) {
      if (this.isConnected && this._events && old.attributes.current_temperature !== state.attributes.current_temperature)
        this._renderAmbient();
      return;
    }
    if (this.isConnected) this._update();
  }
  connectedCallback() { if (this._config) { this._mount(); this._applyConfig(); this._update(); } }
  disconnectedCallback() {
    this._events?.abort(); this._resize?.disconnect(); this._layoutResize?.disconnect();
    this._intersection?.disconnect();
    cancelAnimationFrame(this._dialFrame); this._dialFrame = null;
    cancelAnimationFrame(this._layoutFrame); this._layoutFrame = null;
    this._command.reset(); this._draft = null; this._drag = null;
    this._dial?.dispose(); this._dial = null; this._dialRenderKey = null;
    this._renderer?.dispose(); this._renderer?.forceContextLoss();
    this._renderer = null;
  }
  getCardSize() { return this._config?.card_height ? Math.ceil(this._config.card_height / 50) : 10; }
  getGridOptions() { return { columns: 12, rows: "auto" }; }
  _state() { return this._hass?.states[this._config.entity]; }
  _available() { return this._state() && !["unknown", "unavailable"].includes(this._state().state); }
  _bounds() {
    return temperatureBounds(this._state());
  }
  _targetAllowed() {
    const { min, max } = this._bounds();
    return this._available() && Boolean((this._state().attributes.supported_features || 0) & 1)
      && min !== null && max !== null && max > min;
  }
  _round(value) {
    return roundTemperature(value, this._state());
  }
  _mount() {
    if (this._events && !this._events.signal.aborted) return;
    this._modeKey = null; this._advancedKey = null;
    this.shadowRoot.innerHTML = `
      <style>
        ${foundationStyles}
        :host{min-width:0}
        ha-card{width:100%;min-width:0;min-height:0;padding:0;margin-inline:auto;
          --gleam-radius:var(--radius,22px);--gleam-surface:var(--background,#080e24);--accent:#ffab70}
        .viewport{position:relative;width:100%;min-width:0}
        .content{display:flow-root;width:100%;padding:var(--padding,20px);transform-origin:top left}
        ha-card.fixed .viewport{height:100%;overflow:auto;overscroll-behavior:contain}
        ha-card.fixed.scale .viewport{overflow:hidden;overflow:clip}
        ha-card.fixed.scale .content{position:absolute}
        header{display:flex;align-items:center;justify-content:space-between;gap:12px}
        header>*{min-width:0;overflow-wrap:anywhere}
        h2{margin:0;font-size:19px;font-weight:500}.mode{font-size:11px;letter-spacing:.1em;color:var(--accent);text-transform:uppercase}
        .dial{height:var(--dial-height,265px);position:relative;touch-action:none;cursor:pointer;border-radius:20px}
        canvas{width:100%;height:100%;display:block}
        .reading{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;
          pointer-events:none;gap:6px}.caption{font-size:10px;text-transform:uppercase;letter-spacing:.14em;color:var(--gleam-muted,#8ba8c6)}
        .temperature{font-size:var(--temperature-size,58px);line-height:1.1;letter-spacing:-.06em;font-weight:400;color:var(--accent)}
        .unit{font-size:22px;letter-spacing:0}.ambient{font-size:11px;color:var(--gleam-muted,#8ba8c6);text-align:center}
        .adjust{display:flex;align-items:center;justify-content:center;gap:20px;margin-top:-8px}
        button{padding-inline:12px}
        .adjust button{font-size:24px;width:46px;height:42px;padding:0}
        .range-wrap{margin:14px 8px 12px}.range-wrap label{display:block;color:#8ba8c6;font-size:10px;margin-bottom:8px}
        input[type=range]{width:100%;accent-color:var(--accent);cursor:pointer}
        .modes{display:flex;justify-content:center;gap:6px;flex-wrap:wrap}
        button[aria-pressed=true]{border-color:var(--accent);color:var(--accent);background:#15243a}
        button:disabled,select:disabled,input:disabled{opacity:.35;cursor:not-allowed}
        details{margin-top:16px;border-top:1px solid #20324b;padding-top:12px}
        summary{cursor:pointer;font-size:12px;color:#9bb6cf}
        .advanced{display:grid;gap:12px;margin-top:14px}.advanced label{display:grid;gap:6px;color:#9bb6cf;font-size:11px}
        select{width:100%;padding:9px 12px;border-radius:12px}
        .message{margin-top:12px;color:#efbb85;font-size:11px;line-height:1.5;white-space:pre-line;overflow-wrap:anywhere}
        .message:empty{display:none}.unavailable .temperature{color:#718199}
      </style>
      <ha-card><span class="experimental">Experimental</span><div class="viewport"><div class="content"><header class="badge-clearance"><div><h2></h2></div><span class="mode"></span></header>
        <div class="dial" role="slider" tabindex="0" aria-label="Target temperature">
          <div class="reading"><span class="caption">Target temperature</span>
            <div class="temperature"><span class="value">—</span><span class="unit"> °C</span></div>
            <span class="ambient"></span></div></div>
        <div class="adjust"><button class="minus" aria-label="Decrease target temperature">−</button>
          <button class="plus" aria-label="Increase target temperature">+</button></div>
        <div class="range-wrap"><label for="target">Target temperature</label><input id="target" type="range"></div>
        <div class="modes" role="group" aria-label="Heat pump mode"></div>
        <details><summary>Fan, presets & swing</summary><div class="advanced"></div></details>
        <div class="message" role="status" aria-live="polite"></div></div></div></ha-card>`;
    this._events = new AbortController(); const signal = this._events.signal;
    this._visible = false;
    this._graphicsError = "";
    this._intersection = new IntersectionObserver(entries => {
      this._visible = entries.at(-1).isIntersecting;
      this._drawDial();
    });
    this._intersection.observe(this);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) this._drawDial();
    }, { signal });
    this.shadowRoot.querySelector("details").open = this._config.advanced_open;
    const on = (selector, event, handler) => this.shadowRoot.querySelector(selector).addEventListener(event, handler, { signal });
    on("details", "toggle", () => this._scheduleLayout());
    // Separate from WebGL: bounded HTML controls must also work without graphics.
    this._layoutResize = new ResizeObserver(() => this._scheduleLayout());
    this._layoutResize.observe(this.shadowRoot.querySelector(".viewport"));
    this._layoutResize.observe(this.shadowRoot.querySelector(".content"));
    on(".minus", "click", () => this._nudge(-1)); on(".plus", "click", () => this._nudge(1));
    on("#target", "input", event => {
      if (!this._command.busy && this._targetAllowed()) this._preview(this._round(Number(event.target.value)));
    });
    on("#target", "change", event => void this._send("set_temperature", { temperature: this._round(Number(event.target.value)) }));
    const dial = this.shadowRoot.querySelector(".dial");
    dial.addEventListener("keydown", event => {
      if (["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        if (!this._config.interactive_dial || !this._targetAllowed() || this._command.busy) return;
        const { min, max } = this._bounds();
        if (event.key === "Home" || event.key === "End")
          void this._send("set_temperature", { temperature: event.key === "Home" ? min : max });
        else this._nudge(["ArrowUp", "ArrowRight"].includes(event.key) ? 1 : -1);
      }
    }, { signal });
    dial.addEventListener("pointerdown", event => {
      if (event.button !== 0 || !this._config.interactive_dial || !this._targetAllowed() || this._command.busy) return;
      const r = dial.getBoundingClientRect();
      const dx = event.clientX - r.left - r.width / 2, dy = event.clientY - r.top - r.height / 2;
      if (Math.hypot(dx, dy) < Math.min(r.width, r.height) * .22) return;
      this._drag = event.pointerId; dial.setPointerCapture(event.pointerId); this._previewPointer(event);
    }, { signal });
    dial.addEventListener("pointermove", event => { if (this._drag === event.pointerId) this._previewPointer(event); }, { signal });
    dial.addEventListener("pointerup", event => {
      if (this._drag !== event.pointerId) return;
      this._drag = null; dial.releasePointerCapture(event.pointerId);
      if (this._draft !== null) void this._send("set_temperature", { temperature: this._draft });
    }, { signal });
    dial.addEventListener("pointercancel", () => { this._drag = null; this._draft = null; this._update(); }, { signal });
  }
  _initGraphics() {
    const dial = this.shadowRoot.querySelector(".dial");
    try {
      this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      this._renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
      this._renderer.setClearColor(0x050914, 0); dial.prepend(this._renderer.domElement);
      this._dial = new DialScene(); this._camera = new THREE.OrthographicCamera(-3, 3, 2.6, -2.6, .1, 30);
      this._camera.position.set(0, .35, 10); this._camera.lookAt(0, 0, 0);
      this._resize = new ResizeObserver(() => this._drawDial());
      this._resize.observe(dial);
    } catch {
      this._graphicsError = "3D graphics unavailable. Temperature buttons, slider and mode controls still work.";
      this._update();
    }
  }
  _scheduleLayout() {
    if (!this.isConnected || !this._config.card_height || this._layoutFrame != null) return;
    this._layoutFrame = requestAnimationFrame(() => {
      this._layoutFrame = null; this._layoutContent();
    });
  }
  _layoutContent() {
    const viewport = this.shadowRoot.querySelector(".viewport"), content = this.shadowRoot.querySelector(".content");
    if (!viewport || !content) return;
    const c = this._config;
    if (!c.card_height) {
      content.style.width = ""; content.style.transform = ""; content.style.left = ""; content.style.top = "";
      return;
    }
    const width = viewport.clientWidth, height = viewport.clientHeight;
    if (!(width && height)) return;
    // Use untransformed layout sizes, never the scaled bounding rect. Keep the
    // complete dial and controls on an internal canvas independent of card bounds.
    let naturalWidth = Math.max(width, Math.ceil(c.dial_height * .84 + c.card_padding * 2));
    if (content.style.width !== `${naturalWidth}px`) content.style.width = `${naturalWidth}px`;
    const neededWidth = content.scrollWidth;
    if (neededWidth > naturalWidth) {
      naturalWidth = neededWidth;
      content.style.width = `${naturalWidth}px`;
    }
    const naturalHeight = content.offsetHeight;
    const scale = c.content_overflow === "scale" ? Math.min(1, width / naturalWidth, height / naturalHeight) : 1;
    content.style.transform = c.content_overflow === "scale" ? `scale(${scale})` : "";
    content.style.left = c.content_overflow === "scale" ? `${Math.max(0, (width - naturalWidth * scale) / 2)}px` : "";
    content.style.top = c.content_overflow === "scale" ? `${Math.max(0, (height - naturalHeight * scale) / 2)}px` : "";
    this._drawDial();
  }
  _previewPointer(event) {
    const r = this.shadowRoot.querySelector(".dial").getBoundingClientRect();
    const dx = event.clientX - r.left - r.width / 2, dy = r.height / 2 - (event.clientY - r.top);
    const fraction = dialFraction(Math.atan2(dy, dx));
    const { min, max } = this._bounds();
    this._preview(this._round(min + fraction * (max - min)));
  }
  _preview(value) {
    if (value === this._draft) return;
    this._draft = value;
    this._renderReading(); this._drawDial();
  }
  _nudge(direction) {
    if (!this._targetAllowed() || this._command.busy) return;
    const target = number(this._state().attributes.temperature);
    if (target !== null) void this._send("set_temperature", { temperature: this._round(target + direction * this._bounds().step) });
  }
  async _send(service, data) {
    if (this._command.busy || !this._available()) return;
    const plan = planClimateCommand(this._state(), service, data);
    if (!plan) return;
    const { field, value } = plan;
    if (plan.unchanged) { this._draft = null; this._update(); return; }
    await this._command.send({ field, value }, this._config.confirmation_timeout * 1000,
      () => sendClimateCommand(this._hass, this._config.entity, service, data),
      () => { if (!this._command.busy) this._draft = null; this._update(); });
  }
  _renderReading() {
    const s = this._state(), a = s?.attributes || {};
    const unit = a.temperature_unit || this._hass?.config?.unit_system?.temperature || "°C";
    const value = this._draft ?? number(a.temperature);
    this.shadowRoot.querySelector(".value").textContent = value === null ? "—" : String(value);
    this.shadowRoot.querySelector(".unit").textContent = ` ${unit}`;
    const dial = this.shadowRoot.querySelector(".dial"), bounds = this._bounds();
    dial.setAttribute("aria-valuemin", bounds.min ?? "0"); dial.setAttribute("aria-valuemax", bounds.max ?? "0");
    if (value !== null) dial.setAttribute("aria-valuenow", String(value)); else dial.removeAttribute("aria-valuenow");
    dial.setAttribute("aria-valuetext", value === null ? "Target not reported" : `${value} ${unit}${this._draft !== null ? " preview" : ""}`);
    dial.setAttribute("aria-disabled", String(!this._config.interactive_dial || !this._targetAllowed() || this._command.busy));
    dial.tabIndex = this._config.interactive_dial ? 0 : -1;
  }
  _renderAmbient() {
    const a = this._state()?.attributes || {};
    this.shadowRoot.querySelector(".ambient").textContent = number(a.current_temperature) === null
      ? "Room temperature not reported" : `Room ${a.current_temperature} ${a.temperature_unit || this._hass?.config?.unit_system?.temperature || "°C"}`;
  }
  _applyConfig() {
    const card = this.shadowRoot.querySelector("ha-card");
    const c = this._config;
    card.classList.toggle("fixed", c.card_height > 0);
    card.classList.toggle("scale", c.content_overflow === "scale");
    card.style.height = c.card_height ? `${c.card_height}px` : "auto";
    card.style.maxWidth = c.card_max_width ? `${c.card_max_width}px` : "100%";
    for (const [property, value] of Object.entries({
      "--padding": `${c.card_padding}px`, "--radius": `${c.corner_radius}px`,
      "--dial-height": `${c.dial_height}px`, "--temperature-size": `${c.temperature_font_size}px`, "--background": c.background_color,
    })) card.style.setProperty(property, value);
    for (const [selector, visible] of [
      ["h2", c.show_name], [".mode", c.show_mode], [".caption", c.show_caption], [".ambient", c.show_room_temperature],
      [".adjust", c.show_temperature_buttons], [".range-wrap", c.show_temperature_slider], [".modes", c.show_hvac_modes],
    ]) this.shadowRoot.querySelector(selector).hidden = !visible;
    this.shadowRoot.querySelector("header").hidden = !c.show_name && !c.show_mode;
    this.shadowRoot.querySelector("h2").textContent = this._config.name;
    if (c.card_height) this._scheduleLayout();
    else this._layoutContent();
  }
  _update() {
    const card = this.shadowRoot.querySelector("ha-card");
    if (!this._config || !card) return;
    const c = this._config, s = this._state(), a = s?.attributes || {}, busy = this._command.busy, available = this._available();
    card.classList.toggle("unavailable", !available);
    card.style.setProperty("--accent", !available || s?.state === "off" ? c.off_color : s?.state === "cool" ? c.cool_color : c.heat_color);
    this.shadowRoot.querySelector(".mode").textContent = LABELS[s?.state] || s?.state || "Unavailable";
    this._renderReading();
    this._renderAmbient();
    const bounds = this._bounds(), target = number(a.temperature);
    const range = this.shadowRoot.querySelector("#target");
    range.min = bounds.min ?? 0; range.max = bounds.max ?? 0; range.step = bounds.step;
    range.value = this._draft ?? target ?? bounds.min ?? 0; range.disabled = !this._targetAllowed() || busy;
    this.shadowRoot.querySelector(".minus").disabled = range.disabled || target === null || target <= bounds.min;
    this.shadowRoot.querySelector(".plus").disabled = range.disabled || target === null || target >= bounds.max;
    const modes = this.shadowRoot.querySelector(".modes");
    const modeKey = JSON.stringify(a.hvac_modes || []);
    if (this._modeKey !== modeKey) {
      this._modeKey = modeKey; modes.replaceChildren();
      for (const mode of a.hvac_modes || []) {
        const button = document.createElement("button"); button.textContent = LABELS[mode] || mode; button.dataset.mode = mode;
        button.addEventListener("click", () => void this._send("set_hvac_mode", { hvac_mode: mode }), { signal: this._events.signal });
        modes.append(button);
      }
    }
    for (const b of modes.children) { b.disabled = !available || busy; b.setAttribute("aria-pressed", String(b.dataset.mode === s?.state)); }
    const fields = [["fan_mode", "Fan speed", a.fan_modes, 8], ["preset_mode", "Preset", a.preset_modes, 16],
      ["swing_mode", "Swing", a.swing_modes, 32]].filter(([field, , options, bit]) =>
        ({ fan_mode: c.show_fan, preset_mode: c.show_presets, swing_mode: c.show_swing }[field])
        && ((a.supported_features || 0) & bit) && options?.length);
    const key = JSON.stringify(fields);
    const advanced = this.shadowRoot.querySelector(".advanced");
    if (key !== this._advancedKey) {
      this._advancedKey = key; advanced.replaceChildren();
      for (const [field, title, options] of fields) {
        const label = document.createElement("label"); label.append(document.createTextNode(title));
        const select = document.createElement("select"); select.dataset.field = field;
        for (const value of options) { const option = document.createElement("option"); option.value = value; option.textContent = value; select.append(option); }
        select.addEventListener("change", () => void this._send(`set_${field}`, { [field]: select.value }), { signal: this._events.signal });
        label.append(select); advanced.append(label);
      }
    }
    this.shadowRoot.querySelector("details").hidden = !fields.length;
    for (const select of advanced.querySelectorAll("select")) { select.disabled = !available || busy; select.value = a[select.dataset.field] ?? ""; }
    this.shadowRoot.querySelector(".message").textContent = [
      !available ? "Heat pump is unavailable. Controls are disabled." : "", this._command.message, this._graphicsError || "",
    ].filter(Boolean).join("\n");
    this._drawDial();
  }
  _drawDial() {
    if (!this.isConnected || !this._visible || document.hidden || this._graphicsError || this._dialFrame != null) return;
    this._dialFrame = requestAnimationFrame(() => {
      this._dialFrame = null;
      if (this.isConnected && this._visible && !document.hidden) this._renderDial();
    });
  }
  _renderDial() {
    if (!this._renderer) this._initGraphics();
    if (!this._renderer || !this._dial) return;
    const dial = this.shadowRoot.querySelector(".dial");
    const { width: displayedWidth, height: displayedHeight } = dial.getBoundingClientRect();
    const width = Math.round(displayedWidth), height = Math.round(displayedHeight);
    if (!(width && height)) return;
    const s = this._state(), a = s?.attributes || {}, bounds = this._bounds(), c = this._config;
    const value = this._draft ?? number(a.temperature);
    const fraction = value !== null && bounds.max > bounds.min
      ? Math.max(0, Math.min(1, (value - bounds.min) / (bounds.max - bounds.min))) : 0;
    const color = !this._available() || s.state === "off" ? c.off_color : s.state === "cool" ? c.cool_color : c.heat_color;
    const appearance = JSON.stringify([color, c.glass_opacity, c.glow_intensity, c.ring_thickness, c.show_dial_ticks]);
    const renderKey = JSON.stringify([appearance, fraction, width, height, c.dial_padding]);
    if (renderKey === this._dialRenderKey) return;
    if (width !== this._bufferWidth || height !== this._bufferHeight || !this._dialRenderKey) {
      this._renderer.setSize(width, height, false);
      this._bufferWidth = width; this._bufferHeight = height;
    }
    // Keep ticks in frame, including narrow dashboard columns.
    const halfHeight = Math.max(2.08 / (1 - this._config.dial_padding / 50), 2.08 * height / width);
    this._camera.top = halfHeight; this._camera.bottom = -halfHeight;
    this._camera.left = -halfHeight * width / height; this._camera.right = halfHeight * width / height;
    this._camera.updateProjectionMatrix();
    this._dial.update(c, fraction, color);
    this._dialRenderKey = renderKey;
    this._renderer.render(this._dial.scene, this._camera);
  }
}
export class GleamThermostatEditor extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: "open" }); this._preview = new EditorPreview(this); }
  setConfig(config) {
    if (this._preview.isEcho(config)) return;
    this._config = { ...config }; this._render();
  }
  set hass(hass) { this._hass = hass; this._entities(); }
  connectedCallback() { this._render(); }
  disconnectedCallback() { this._preview.cancel(); }
  _entities() {
    const list = this.shadowRoot.querySelector("datalist");
    if (!list || !this._hass) return;
    const ids = Object.keys(this._hass.states).filter(id => id.startsWith("climate.")).sort();
    if (JSON.stringify(ids) === this._entityKey) return;
    this._entityKey = JSON.stringify(ids); list.replaceChildren();
    for (const id of ids) {
      const option = document.createElement("option"); option.value = id;
      option.label = this._hass.states[id].attributes.friendly_name || id; list.append(option);
    }
  }
  _render() {
    if (!this._config) return;
    // Build once: keep focus, cursor and expanded sections stable during live updates.
    if (!this.shadowRoot.querySelector("form")) {
      this.shadowRoot.innerHTML = `<style>
        :host{display:block;color:var(--primary-text-color);font-family:var(--ha-font-family-body,system-ui)}
        form{display:grid;gap:14px}fieldset{border:1px solid var(--divider-color,#8885);border-radius:12px;padding:14px;min-width:0}
        legend{padding:0 6px;font-weight:500}.fields{display:grid;gap:14px}
        label{display:grid;gap:6px;font-size:13px}label.toggle{display:flex;justify-content:space-between;align-items:center}
        input,select{font:inherit;color:var(--primary-text-color);background:var(--card-background-color,#fff);
          border:1px solid var(--divider-color,#888);border-radius:7px;padding:8px;width:100%;box-sizing:border-box}
        input[type=checkbox]{width:22px;height:22px;accent-color:var(--primary-color)}
        input[type=color]{height:38px;padding:3px}input:focus-visible,button:focus-visible{outline:2px solid var(--primary-color)}
        p{font-size:12px;line-height:1.6;color:var(--secondary-text-color);margin:0}
        button{font:inherit;padding:8px;border-radius:8px;border:1px solid var(--divider-color,#888);cursor:pointer;
          color:var(--primary-text-color);background:var(--secondary-background-color,#eee)}
        .error{color:var(--error-color,#c00)}
      </style><form></form>`;
      const form = this.shadowRoot.querySelector("form");
      form.addEventListener("submit", event => event.preventDefault());
      const base = document.createElement("fieldset");
      base.innerHTML = `<legend>Entity & name</legend><div class="fields">
        <label>Climate entity<input data-key="entity" list="climates" required placeholder="climate.livingroom_hvac"></label>
        <datalist id="climates"></datalist><label>Display name<input data-key="name" type="text"></label>
        <p>The selected real climate entity supplies temperature bounds, step size, units and supported modes.</p></div>`;
      form.append(base);
      for (const [group, fields] of OPTIONS) {
        const section = document.createElement("fieldset"), legend = document.createElement("legend");
        legend.textContent = group; section.append(legend);
        const container = document.createElement("div"); container.className = "fields";
        for (const [key, title, initial, min, max, step] of fields) {
          const label = document.createElement("label"); label.append(document.createTextNode(title));
          const input = document.createElement(Array.isArray(min) ? "select" : "input"); input.dataset.key = key;
          if (Array.isArray(min)) {
            for (const value of min) {
              const option = document.createElement("option"); option.value = value;
              option.textContent = value === "scale" ? "Scale content to fit" : "Scroll inside card"; input.append(option);
            }
          } else input.type = typeof initial === "boolean" ? "checkbox" : typeof initial === "number" ? "number" : "color";
          if (input.type === "checkbox") label.className = "toggle";
          if (input.type === "number") { input.min = min; input.max = max; input.step = step; }
          label.append(input); container.append(label);
        }
        if (group === "Card size") {
          const help = document.createElement("p");
          help.textContent = "0 keeps automatic height / available width. Fixed height: 120–1600 px; maximum width: 200–1600 px. Only fixed-height cards scale or scroll. Scaling shrinks every control; scrolling keeps element sizes. Width never exceeds the dashboard column.";
          container.append(help);
        }
        if (group === "Display") {
          const help = document.createElement("p");
          help.textContent = "Dial padding controls empty space inside the 3D dial area: 10% keeps the original framing; 0% fits the ring closely. Dial height and card dimensions stay unchanged. Narrow columns may limit the ring size.";
          container.append(help);
        }
        section.append(container); form.append(section);
      }
      const error = document.createElement("p"); error.className = "error"; error.setAttribute("role", "status"); form.append(error);
      const note = document.createElement("p");
      note.textContent = "Changing card settings never sends heat-pump commands. Hidden controls do not change device capabilities. Unreported room temperature is never fabricated.";
      form.append(note);
      const reset = document.createElement("button"); reset.type = "button"; reset.textContent = "Reset display & control options to defaults";
      reset.addEventListener("click", () => {
        const config = { ...this._config }; for (const key of Object.keys(DEFAULTS)) delete config[key];
        try {
          resolveThermostatConfig(config);
          this._config = config; this._render(); this._preview.emit(config);
        } catch (invalid) { error.textContent = invalid.message; }
      }); form.append(reset);
      const update = event => {
        const input = event.target, key = input.dataset.key; if (!key) return;
        const live = event.type === "input", numeric = input.type === "number";
        if (live && key !== "name" && input.type !== "color" && !(numeric && key !== "confirmation_timeout")) return;
        if (!input.checkValidity()) {
          error.textContent = "Choose a valid climate entity or a value within the displayed limits."; return;
        }
        error.textContent = "";
        if (live && numeric && input.value === "") return;
        const config = { ...this._config };
        if (numeric && input.value === "") delete config[key];
        else config[key] = numeric ? input.valueAsNumber : input.type === "checkbox" ? input.checked : input.value;
        try {
          resolveThermostatConfig(config);
          this._config = config;
          if (numeric && input.value === "") input.value = DEFAULTS[key];
          if (live && key !== "name") this._preview.queue(config);
          else if (live) this._preview.live(config);
          else this._preview.emit(config);
        } catch (invalid) { error.textContent = invalid.message; }
      };
      form.addEventListener("input", update); form.addEventListener("change", update);
    }
    this.shadowRoot.querySelector(".error").textContent = "";
    for (const input of this.shadowRoot.querySelectorAll("[data-key]")) {
      const value = this._config[input.dataset.key] ?? DEFAULTS[input.dataset.key] ?? (input.dataset.key === "name" ? DEFAULT_NAME : "");
      if (input.type === "checkbox") input.checked = value; else if (input.value !== String(value)) input.value = value;
    }
    this._entities();
  }
}
