import { foundationStyles } from "../../shared/theme";
import type { EntityState, HomeAssistant, LightConfig } from "../../types";
import { elapsed } from "../cover/model";
import { DEFAULT_KELVIN, readLight, sendBrightness, sendKelvin, sendPower, settings, type LightSettings } from "./model";
import { mountScene, sceneMarkup } from "./scene";
import { css, kelvinRgb, layoutSpots, lightScene, nearestZone, type LightScene, type Spot } from "./spots";

const CONFIRM_MS = 5000;
const scale = [2000, 2700, 3500, 4500, 5500, 6500].map(k => css(kelvinRgb(k))).join(",");

const template = `<style>${foundationStyles}
:host{container-type:inline-size;min-width:0}
ha-card{padding:12px 16px;display:grid;gap:4px;align-items:center}
h2{margin:0;font-size:18px;font-weight:550;line-height:1.3;overflow-wrap:anywhere}
.room{display:block;width:100%;height:clamp(100px,40cqi,180px);cursor:pointer;touch-action:manipulation}
.detail{min-width:0}
.zones{display:grid;grid-template-columns:repeat(var(--zones,1),minmax(0,1fr));gap:8px 14px}
.zone{min-width:0}
.row{display:flex;flex-wrap:wrap;gap:6px 8px;align-items:center;justify-content:space-between;min-height:40px}
.readout{min-width:0}
.name{display:block;font-size:13px;font-weight:550;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.state{font-size:16px;font-weight:600;color:#86ecf2}
.zone[data-state=on] .state{color:#ffc27c}.zone[data-state=unavailable] .state{color:var(--gleam-muted,#8ba8c6)}
.age{color:var(--gleam-muted,#8ba8c6);font-size:12px;margin-left:4px}
.action{flex:none;width:76px;height:36px;padding:0 1px;line-height:1.15}
.action:disabled{cursor:default;opacity:.45}
.level{display:grid;grid-template-columns:1fr auto;align-items:baseline;margin-top:4px;font-size:12px;color:var(--gleam-muted,#8ba8c6);min-width:0}
.level input{grid-column:1/-1;width:100%;margin:6px 0 0}
.brightness input{accent-color:#9cc4f5}
.temperatures .level{margin-top:0}
.label{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.value{font-variant-numeric:tabular-nums}
.scale{grid-column:1/-1;height:3px;margin:2px 2px 0;border-radius:2px;opacity:.75;background:linear-gradient(90deg,${scale})}
details{margin-top:10px;border-top:1px solid var(--gleam-border,#1d3b60);padding-top:4px}
summary{min-height:36px;display:flex;align-items:center;gap:8px;padding:4px 2px;font-size:13px;color:#9fb4cb;cursor:pointer;list-style:none}
summary::-webkit-details-marker{display:none}
summary::before{content:"";border-left:6px solid #9fb4cb;border-block:4px solid transparent}
details[open] summary::before{transform:rotate(90deg)}
.hint{margin:4px 0 0;color:var(--gleam-muted,#8ba8c6);font-size:12px}.hint:empty{display:none}
@container(min-width:590px){
  ha-card{grid-template-columns:1.15fr 1fr;column-gap:20px;align-items:start}
  header{grid-column:2;grid-row:1}.room{grid-column:1;grid-row:1/3;align-self:center}.detail{grid-column:2;grid-row:2}
  .zones{grid-template-columns:minmax(0,1fr);gap:10px}
}
:host([compact]) ha-card{padding:8px}
:host([compact]) h2{font-size:14px}
:host([compact]) .room{height:clamp(64px,44cqi,104px)}
:host([compact]) .zones{grid-template-columns:minmax(0,1fr);gap:4px}
:host([compact]) .state{font-size:15px}
:host([compact]) .action{height:32px}
:host([compact]) :is(.brightness,details){display:none}
</style>
<ha-card><header><h2></h2></header>${sceneMarkup}
<div class="detail"><div class="zones controls"></div>
<details><summary>Colour temperature</summary><div class="zones temperatures"></div></details>
<p class="hint" role="status"></p></div></ha-card>`;

const zoneMarkup = `<div class="row"><div class="readout"><span class="name"></span><strong class="state" role="status"></strong><span class="age"></span></div>
<button type="button" class="action"></button></div>
<label class="level brightness"><span>Brightness</span><span class="value"></span><input type="range" min="1" max="100" step="1"></label>`;
const temperatureMarkup = `<span class="label"></span><span class="value"></span><input type="range" step="50"><span class="scale" aria-hidden="true"></span>`;

interface Request { on?: boolean; brightness?: number; kelvin?: number; deadline: number }
interface Zone {
  id: string; name: string; entity?: EntityState;
  request?: Request; draftBrightness?: number; draftKelvin?: number; error: string;
  /** Last brightness and temperature reported while on; an off light reports neither. */
  remembered: { brightness?: number; kelvin?: number };
  el: HTMLElement; temperature: HTMLLabelElement;
}

function put(node: Element, text: string) { if (node.textContent !== text) node.textContent = text; }
function attribute(node: Element, name: string, value: string) { if (node.getAttribute(name) !== value) node.setAttribute(name, value); }

export class GleamLight extends HTMLElement {
  private root = this.attachShadow({ mode: "open" });
  private config?: LightSettings;
  private client?: HomeAssistant;
  private zones: Zone[] = [];
  private spots: Spot[] = [];
  private layoutDirty = true;
  private scene?: LightScene;
  private highlight?: number;
  private renderer: ReturnType<typeof mountScene>;
  private svg: SVGSVGElement;
  private observer?: IntersectionObserver;
  /** Set by Home Assistant before mounting the replacement editor preview. */
  preview = false;
  private firstPreviewPaint = false;
  private visible = false;
  private frame = 0;
  private timer = 0;

  static getConfigElement() { return document.createElement("gleam-light-editor"); }
  static getStubConfig(hass?: HomeAssistant): LightConfig {
    const ids = Object.keys(hass?.states ?? {}).filter(id => id.startsWith("light.")).slice(0, 2);
    return { light_type: "in_roof_spots", zones: (ids.length ? ids : ["light.ceiling_spots"]).map(entity => ({ entity })) };
  }
  getCardSize() { return this.config?.variant === "compact" ? 3 : 5; }
  getGridOptions() { return { columns: this.config?.variant === "compact" ? 6 : 12, rows: "auto", min_columns: 6 }; }

  constructor() {
    super();
    this.root.innerHTML = template;
    this.svg = this.root.querySelector<SVGSVGElement>("svg.room")!;
    this.renderer = mountScene(this.svg);
    // Tapping the picture toggles the zone of the nearest spot; hovering previews which one.
    this.svg.addEventListener("click", event => {
      const zone = this.zoneAt(event);
      if (zone >= 0) this.toggle(this.zones[zone]);
    });
    this.svg.addEventListener("pointermove", event => { if (event.pointerType === "mouse") this.setHighlight(this.zoneAt(event)); });
    this.svg.addEventListener("pointerleave", () => this.setHighlight(undefined));
    const detail = this.root.querySelector(".detail")!;
    const zoneOf = (event: Event) => {
      const el = (event.target as Element).closest?.("[data-zone]");
      return el ? Number(el.getAttribute("data-zone")) : undefined;
    };
    detail.addEventListener("pointerover", event => this.setHighlight(zoneOf(event)));
    detail.addEventListener("pointerleave", () => this.setHighlight(undefined));
    detail.addEventListener("focusin", event => this.setHighlight(zoneOf(event)));
    detail.addEventListener("focusout", event => { if (!this.root.activeElement || !detail.contains((event as FocusEvent).relatedTarget as Node)) this.setHighlight(undefined); });
  }

  setConfig(value: LightConfig) {
    const config = settings(value), previous = this.config;
    const countChanged = config.zones.length !== this.zones.length;
    const zonesChanged = countChanged || config.zones.some((z, i) => z.entity !== this.zones[i].id);
    const layoutChanged = !previous || countChanged || config.rows !== previous.rows || config.columns !== previous.columns ||
      config.walls_only !== previous.walls_only || config.zone_map.length !== previous.zone_map.length ||
      config.zone_map.some((row, i) => row !== previous.zone_map[i]);
    this.config = { ...config, zone_map: layoutChanged ? [...config.zone_map] : previous.zone_map };
    const couchChanged = config.couch_wall !== previous?.couch_wall;
    if (!previous || config.tv_wall !== previous.tv_wall || couchChanged ||
        config.windows.length !== previous.windows.length || config.windows.some((wall, i) => wall !== previous.windows[i]))
      this.renderer.room(config.windows, config.tv_wall, config.couch_wall);
    this.layoutDirty ||= layoutChanged;
    put(this.root.querySelector("h2")!, config.name ?? "Spots");
    this.toggleAttribute("compact", config.variant === "compact");
    if (zonesChanged) this.reconcileZones();
    this.zones.forEach((zone, i) => this.updateName(zone, i));
    if (zonesChanged) this.sync(true);
    else if (layoutChanged || couchChanged || config.beam_angle !== previous?.beam_angle) this.schedule();
  }
  set hass(value: HomeAssistant) { this.client = value; this.sync(false); }

  connectedCallback() {
    this.firstPreviewPaint = !this.scene;
    this.observer = new IntersectionObserver(([entry]) => {
      this.firstPreviewPaint = false;
      if (this.visible === entry.isIntersecting) return;
      this.visible = entry.isIntersecting; this.schedule();
    });
    this.observer.observe(this);
    document.addEventListener("visibilitychange", this.schedule);
    this.refresh();
  }
  disconnectedCallback() {
    this.observer?.disconnect(); this.observer = undefined; this.visible = false;
    document.removeEventListener("visibilitychange", this.schedule);
    cancelAnimationFrame(this.frame); clearTimeout(this.timer); this.frame = this.timer = 0;
  }

  private updateName(zone: Zone, i: number) {
    const name = this.config!.zones[i].name?.trim() || String(zone.entity?.attributes.friendly_name ?? `Zone ${i + 1}`);
    if (zone.name === name) return;
    zone.name = name;
    put(zone.el.querySelector(".name")!, name);
    put(zone.temperature.querySelector(".label")!, name);
    attribute(zone.el.querySelector("input")!, "aria-label", `${name} brightness`);
    attribute(zone.temperature.querySelector("input")!, "aria-label", `${name} colour temperature`);
    const action = zone.el.querySelector("button")!;
    attribute(action, "aria-label", `${action.textContent} ${name}`);
  }
  private createZone(id: string): Zone {
    const el = document.createElement("div"), temperature = document.createElement("label");
    el.className = "zone"; el.innerHTML = zoneMarkup;
    temperature.className = "level kelvin"; temperature.innerHTML = temperatureMarkup;
    const zone: Zone = { id, name: "", error: "", remembered: {}, el, temperature };
    el.querySelector("button")!.addEventListener("click", () => this.toggle(zone));
    const brightness = el.querySelector("input")!, kelvin = temperature.querySelector("input")!;
    brightness.addEventListener("input", () => { zone.draftBrightness = brightness.valueAsNumber; this.refresh(); });
    brightness.addEventListener("change", () => this.setLevel(zone, "brightness", brightness.valueAsNumber));
    kelvin.addEventListener("input", () => { zone.draftKelvin = kelvin.valueAsNumber; this.refresh(); });
    kelvin.addEventListener("change", () => this.setLevel(zone, "kelvin", kelvin.valueAsNumber));
    return zone;
  }
  private reconcileZones() {
    const existing = new Map(this.zones.map(zone => [zone.id, zone]));
    const highlighted = this.highlight === undefined ? undefined : this.zones[this.highlight];
    this.zones = this.config!.zones.map(({ entity }) => {
      const zone = existing.get(entity) ?? this.createZone(entity);
      existing.delete(entity);
      return zone;
    });
    for (const zone of existing.values()) { zone.el.remove(); zone.temperature.remove(); }
    const controls = this.root.querySelector(".controls")!, temperatures = this.root.querySelector(".temperatures")!;
    this.zones.forEach(({ el, temperature }, i) => {
      for (const [parent, node] of [[controls, el], [temperatures, temperature]] as const) {
        attribute(node, "data-zone", String(i));
        const before = parent.children.item(i);
        if (node === before) continue;
        if (node.parentElement === parent && parent.moveBefore) parent.moveBefore(node, before);
        else parent.insertBefore(node, before);
      }
    });
    this.highlight = highlighted && !existing.has(highlighted.id) ? this.zones.indexOf(highlighted) : undefined;
    this.style.setProperty("--zones", String(this.zones.length));
  }

  private sync(force: boolean) {
    if (!this.config) return;
    let changed = force;
    this.zones.forEach((zone, i) => {
      const next = this.client?.states[zone.id];
      if (next === zone.entity) return;
      zone.entity = next; changed = true;
      const light = readLight(next);
      if (light.brightness !== undefined) zone.remembered.brightness = light.brightness;
      if (light.kelvin !== undefined) zone.remembered.kelvin = light.kelvin;
      this.updateName(zone, i);
      const r = zone.request;
      // Only a new report for this zone can confirm a request, not a UI refresh.
      if (r && light.available && (r.on === undefined || light.on === r.on) &&
        (r.brightness === undefined || (light.brightness !== undefined && Math.abs(light.brightness - r.brightness) <= 1)) &&
        (r.kelvin === undefined || (light.kelvin !== undefined && Math.abs(light.kelvin - r.kelvin) <= 60))) {
        zone.request = undefined;
      }
    });
    if (changed) this.refresh();
  }

  private view(zone: Zone) {
    const light = readLight(zone.entity), r = zone.request;
    const on = light.available && (r?.on ?? light.on);
    const brightness = zone.draftBrightness ?? r?.brightness ?? light.brightness ?? zone.remembered.brightness ?? 100;
    const requestedKelvin = zone.draftKelvin ?? r?.kelvin;
    const kelvin = requestedKelvin ?? light.kelvin ?? zone.remembered.kelvin ?? DEFAULT_KELVIN;
    const color = requestedKelvin === undefined && light.colour ? light.colour : kelvinRgb(kelvin);
    return { light, on, brightness, kelvin, color };
  }

  private async send(zone: Zone, request: Omit<Request, "deadline">, merge: boolean, action: () => Promise<unknown>) {
    const pending: Request = { ...(merge ? zone.request : undefined), ...request, deadline: performance.now() + CONFIRM_MS };
    zone.request = pending; zone.error = "";
    this.refresh();
    try { await action(); }
    catch {
      if (zone.request !== pending) return;
      zone.request = undefined; zone.error = `${zone.name}: command failed. Try again.`;
      this.refresh();
    }
  }
  private toggle(zone?: Zone) {
    const client = this.client;
    if (!zone || !client) return;
    const { light, on } = this.view(zone);
    if (!light.available) return;
    void this.send(zone, { on: !on }, false, () => sendPower(client, zone.id, !on));
  }
  private setLevel(zone: Zone, key: "brightness" | "kelvin", value: number) {
    const client = this.client;
    zone.draftBrightness = zone.draftKelvin = undefined;
    if (!client || !readLight(zone.entity).available || !Number.isFinite(value)) { this.refresh(); return; }
    void this.send(zone, { on: true, [key]: value }, true, () =>
      key === "brightness" ? sendBrightness(client, zone.id, value) : sendKelvin(client, zone.id, value));
  }

  private zoneAt(event: MouseEvent) {
    const matrix = this.svg.getScreenCTM();
    if (!matrix || !this.scene) return -1;
    const p = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
    return nearestZone(this.scene, p.x, p.y);
  }
  private setHighlight(zone: number | undefined) {
    const next = zone !== undefined && zone >= 0 ? zone : undefined;
    if (next === this.highlight) return;
    this.highlight = next;
    this.schedule();
  }

  /** HTML feedback is immediate; the picture follows in the next frame. */
  private refresh = () => {
    clearTimeout(this.timer); this.timer = 0;
    if (!this.config) return;
    const now = performance.now();
    let tunable = false, wake = Infinity;
    this.zones.forEach(zone => {
      if (zone.request && now >= zone.request.deadline) {
        zone.request = undefined;
        zone.error = `${zone.name}: change not confirmed within five seconds.`;
      }
      const { light, on, brightness, kelvin } = this.view(zone), el = zone.el;
      const available = light.available, name = zone.name;
      attribute(el, "data-state", available ? (on ? "on" : "off") : "unavailable");
      put(el.querySelector(".state")!, available ? (on ? "On" : "Off") : "Unavailable");
      const r = zone.request;
      const pending = !r ? "" : r.on === false ? "Turning off…" :
        !light.on || (r.brightness === undefined && r.kelvin === undefined) ? "Turning on…" : "Adjusting…";
      const age = !available ? "" : pending || elapsed(zone.entity?.last_changed);
      put(el.querySelector(".age")!, age ? `· ${age}` : "");
      const action = el.querySelector("button")!, caption = on ? "Turn off" : "Turn on";
      put(action, caption); attribute(action, "aria-label", `${caption} ${name}`);
      action.disabled = !available;
      const level = el.querySelector<HTMLElement>(".brightness")!, slider = level.querySelector("input")!;
      level.hidden = available && !light.dimmable;
      slider.disabled = !available;
      if (zone.draftBrightness === undefined && slider.valueAsNumber !== brightness) slider.value = String(brightness);
      const bText = !available ? "—" : on ? `${brightness}%` : "Off";
      put(level.querySelector(".value")!, bText);
      attribute(slider, "aria-valuetext", bText);
      const t = zone.temperature, k = t.querySelector("input")!;
      t.hidden = available && !light.tunable;
      tunable ||= !t.hidden;
      k.min = String(light.minKelvin); k.max = String(light.maxKelvin); k.disabled = !available;
      if (zone.draftKelvin === undefined && k.valueAsNumber !== kelvin) k.value = String(kelvin);
      const kText = available ? `${kelvin} K` : "—";
      put(t.querySelector(".value")!, kText);
      attribute(k, "aria-valuetext", kText);
      k.style.accentColor = available ? css(kelvinRgb(kelvin)) : "#6b7d90";
      if (zone.request) wake = Math.min(wake, zone.request.deadline - now);
      else if (age && zone.entity?.last_changed) wake = Math.min(wake, 60000 - (Date.now() - Date.parse(zone.entity.last_changed)) % 60000);
    });
    this.root.querySelector<HTMLElement>("details")!.hidden = !tunable;
    put(this.root.querySelector(".hint")!, this.zones.map(z => z.error).filter(Boolean).join(" "));
    if (Number.isFinite(wake) && this.isConnected) this.timer = window.setTimeout(this.refresh, Math.max(1, wake));
    this.schedule();
  };
  private schedule = () => {
    if (this.frame || !this.config || !this.isConnected || document.hidden) return;
    // On release HA mounts a new card. Waiting for intersection *then* rAF lets
    // the empty room paint first. Seed just the visible preview once, with real state.
    if (this.firstPreviewPaint && this.preview && this.client) {
      this.firstPreviewPaint = false;
      const r = this.getBoundingClientRect();
      if (r.width && r.height && r.bottom > 0 && r.right > 0 && r.top < innerHeight && r.left < innerWidth) {
        this.visible = true;
        this.draw();
        return;
      }
    }
    if (!this.visible) return;
    this.frame = requestAnimationFrame(this.draw);
  };
  private draw = () => {
    this.frame = 0;
    if (!this.isConnected || !this.visible || document.hidden) return;
    const config = this.config!;
    if (this.layoutDirty) {
      this.spots = layoutSpots(config.rows, config.columns, config.walls_only, config.zone_map, this.zones.length);
      this.layoutDirty = false;
    }
    this.scene = lightScene(this.spots, this.zones.map(zone => {
      const { light, on, brightness, color } = this.view(zone);
      return { on, brightness: light.dimmable ? brightness : 100, color, unavailable: !light.available };
    }), { rows: config.rows, columns: config.columns, beamAngle: config.beam_angle, highlight: this.highlight });
    this.renderer.draw(this.scene);
  };
}
