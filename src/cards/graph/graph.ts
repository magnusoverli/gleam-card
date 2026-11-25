import type { EntityState, GraphConfig, HomeAssistant } from "../../types";
import { graphFrame } from "../../shared/graph/frame";
import { timestamp } from "../../shared/graph/readings";
import { resolveGraph, type GraphSettings, type Series } from "./config";
import { HOUR, MINUTE, makePlot, numberState } from "./data";
import { GraphHistory } from "./history";
import { GraphViewport, type Lane } from "./viewport";

const template = graphFrame("", "", "Interactive 3D sensor history graph.");
const label = (s: Series, state?: EntityState) => s.name || String(state?.attributes.friendly_name || s.entity);
export class GleamGraph extends HTMLElement {
  static getConfigElement() { return document.createElement("gleam-graph-editor"); }
  static getStubConfig(hass?: HomeAssistant) {
    const entity = Object.entries(hass?.states ?? {}).find(([id,s]) => id.startsWith("sensor.") && numberState(s.state) !== null)?.[0];
    return { type: "custom:gleam-graph", series: [{entity: entity ?? "sensor.temperature"}] };
  }
  getCardSize() { return 13; }
  getGridOptions() { return {columns: "full", rows: "auto"}; }

  private root = this.attachShadow({mode:"open"});
  private el<T extends HTMLElement = HTMLElement>(selector: string) { return this.root.querySelector<T>(selector)!; }
  private config?: GraphSettings;
  private client?: HomeAssistant;
  private history = new GraphHistory();
  private enabled = new Set<string>();
  private view?: GraphViewport;
  private observer?: IntersectionObserver;
  private visible = false;
  private dirty = true;
  private frame = 0;
  private drawing = false;
  private timer = 0;
  private fetching?: GraphHistory;
  private pending = false;
  private graphicsError = "";
  private formatter = new Intl.NumberFormat(undefined,{maximumSignificantDigits:6});
  private clock = new Intl.DateTimeFormat(undefined,{hour:"2-digit",minute:"2-digit"});
  private formatKey = "";
  constructor() {
    super();
    this.root.innerHTML = template + `<style>.kpis{flex-wrap:wrap;gap:10px 18px}.kpi{min-width:0;overflow-wrap:anywhere}.series-controls button{white-space:normal;overflow-wrap:anywhere}.series-controls .dot{flex:none}</style>`;
    this.root.addEventListener("click", e => {
      const btn = (e.target as Element).closest<HTMLButtonElement>("button");
      if (btn?.dataset.entity) {
        const id = btn.dataset.entity;
        if (this.enabled.has(id)) this.enabled.delete(id); else this.enabled.add(id);
        this.labels(); this.update(); void this.refresh();
      } else if (btn?.dataset.camera) {
        const v = btn.dataset.camera as GraphSettings["starting_view"];
        this.view?.view(v); this.cameraButtons(v); this.schedule();
      }
    });
  }
  setConfig(raw: GraphConfig) {
    const next = resolveGraph(raw), prev = this.config;
    const ids = next.series.map(s => s.entity);
    const structure = !prev || ids.join() !== prev.series.map(s => s.entity).join();
    if (next.hours_to_show !== prev?.hours_to_show) this.history = new GraphHistory();
    this.history.retain(ids);
    for (const id of this.enabled) if (!ids.includes(id)) this.enabled.delete(id);
    for (const s of next.series) {
      if (prev?.series.find(p => p.entity === s.entity)?.visible !== s.visible) {
        if (s.visible) this.enabled.add(s.entity); else this.enabled.delete(s.entity);
      }
    }
    this.config = next;
    if (structure) {
      const buttons = this.el(".series-controls"), kpis = this.el(".kpis");
      buttons.replaceChildren(); kpis.replaceChildren();
      for (const id of ids) {
        const btn = document.createElement("button"), dot = document.createElement("i");
        btn.dataset.entity = id; dot.className = "dot";
        btn.append(dot,document.createElement("span")); buttons.append(btn);
        const el = document.createElement("div"); el.className = "kpi";
        el.append(document.createElement("span"),document.createElement("strong")); kpis.append(el);
      }
    }
    if (prev?.starting_view !== next.starting_view) {
      this.view?.view(next.starting_view); this.cameraButtons(next.starting_view);
    }
    this.labels(); this.update();
    if (this.isConnected && prev?.refresh_interval !== next.refresh_interval) this.startTimer();
    if (structure || prev?.hours_to_show !== next.hours_to_show ||
      next.series.some(s => prev?.series.find(p => p.entity === s.entity)?.visible !== s.visible)) void this.refresh();
  }
  set hass(client: HomeAssistant) {
    const prev = this.client; this.client = client;
    if (!this.config || (prev && prev.locale?.language === client.locale?.language && prev.config?.time_zone === client.config?.time_zone &&
      this.config.series.every(s => prev.states[s.entity] === client.states[s.entity]))) return;
    this.labels(); this.update();
    if (!prev) void this.refresh();
  }
  private labels() {
    const c = this.config;
    if (!c) return;
    const lang = this.client?.locale?.language, tz = c.use_server_time ? this.client?.config?.time_zone : undefined;
    const key = JSON.stringify([lang,tz,c.hours_to_show >= 24]);
    if (key !== this.formatKey) {
      this.formatKey = key;
      this.formatter = new Intl.NumberFormat(lang,{maximumSignificantDigits:6});
      this.clock = new Intl.DateTimeFormat(lang,{hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZone:tz,
        ...(c.hours_to_show >= 24 ? {month:"short",day:"numeric"} : {})});
    }
    const title = this.el(".card-title"); title.textContent = c.title; title.hidden = !c.title;
    const buttons = this.el(".series-controls"), kpis = this.el(".kpis");
    c.series.forEach((s,i) => {
      const state = this.client?.states[s.entity], name = label(s,state), value = numberState(state?.state);
      const b = buttons.children[i] as HTMLButtonElement;
      b.lastElementChild!.textContent = name; b.style.setProperty("--color",s.color);
      b.setAttribute("aria-pressed",String(this.enabled.has(s.entity)));
      const k = kpis.children[i] as HTMLElement; k.hidden = !s.show_readout;
      k.firstElementChild!.textContent = [name,state?.attributes.unit_of_measurement].filter(Boolean).join(" · ");
      const v = k.lastElementChild as HTMLElement;
      v.textContent = value === null ? "—" : this.formatter.format(value);
      v.style.color = s.color;
    });
    kpis.style.setProperty("--value-scale", String(c.readout_value_size / 100));
    kpis.hidden = !c.series.some(s => s.show_readout);
    buttons.hidden = !c.show_dataset_buttons || c.series.length < 2;
    this.el(".camera-controls").hidden = !c.show_camera_buttons;
    this.el(".controls").hidden = buttons.hidden && !c.show_camera_buttons;
    this.el(".readouts").hidden = kpis.hidden && title.hidden;
    this.el("header").hidden = this.el(".controls").hidden && this.el(".readouts").hidden;
  }
  private cameraButtons(view?: string) {
    this.root.querySelectorAll<HTMLButtonElement>("[data-camera]").forEach(b => b.setAttribute("aria-pressed",String(b.dataset.camera === view)));
  }
  connectedCallback() {
    this.observer = new IntersectionObserver(entries => { this.visible = entries.at(-1)!.isIntersecting; this.resume(); });
    this.observer.observe(this); document.addEventListener("visibilitychange",this.resume);
    this.startTimer();
  }
  disconnectedCallback() {
    this.observer?.disconnect(); document.removeEventListener("visibilitychange",this.resume);
    clearInterval(this.timer); cancelAnimationFrame(this.frame); this.frame = 0;
    this.visible = false; this.view?.dispose(); this.view = undefined; this.graphicsError = "";
    this.history = new GraphHistory(); this.history.retain(this.config?.series.map(s=>s.entity) ?? []);
    this.pending = false; this.fetching = undefined;
  }
  private get active() { return this.visible && this.isConnected && !document.hidden; }
  private resume = () => { if (this.active) { this.update(); void this.refresh(); } };
  private startTimer() {
    clearInterval(this.timer);
    if (this.config) this.timer = window.setInterval(this.resume,this.config.refresh_interval*1000);
  }
  private async refresh() {
    const history = this.history, c = this.config;
    if (!this.active || !c || !this.client || !this.enabled.size) return;
    if (this.fetching === history) { this.pending = true; return; }
    const now = Date.now();
    this.fetching = history;
    try { await history.refresh(this.client,[...this.enabled],now-c.hours_to_show*HOUR-30*MINUTE,now); }
    finally {
      if (this.fetching === history) {
        this.fetching = undefined; this.update();
        if (this.pending) { this.pending = false; void this.refresh(); }
      }
    }
  }
  private update() { this.dirty = true; this.schedule(); }
  private schedule = () => {
    if (!this.active || !this.config || this.frame || this.drawing) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      if (!this.active) return;
      this.drawing = true;
      try { this.draw(); } finally { this.drawing = false; }
    });
  };
  private draw() {
    const c = this.config!;
    if (!this.view && !this.graphicsError) {
      try {
        this.view = new GraphViewport(this.el(".stage"),c.starting_view,this.schedule,v=>this.cameraButtons(v),() => {
          this.graphicsError = "WebGL context lost. Reload this view to restore the graph."; this.update();
        });
        this.cameraButtons(c.starting_view);
      } catch { this.graphicsError = "3D rendering needs WebGL 2."; }
    }
    if (this.dirty) {
      this.dirty = false;
      const now = Date.now(), notices: string[] = [], lanes: Lane[] = [];
      for (const s of c.series) {
        if (!this.enabled.has(s.entity)) continue;
        const entry = this.history.get(s.entity), state = this.client?.states[s.entity];
        let rows = entry?.rows ?? [];
        const time = timestamp(state?.last_updated ?? state?.last_changed);
        if (state && time <= now && time > (rows.at(-1)?.time ?? -Infinity))
          rows = [...rows,{time,value:numberState(state.state)}];
        const shift = s.shift_minutes*MINUTE;
        const plot = makePlot(rows,s,now-c.hours_to_show*HOUR-shift,Math.min(now,now-shift));
        const name = label(s,state);
        if (entry?.error) notices.push(entry.error);
        else if (!state) notices.push(`Entity not found: ${s.entity}.`);
        else if (entry && Number.isFinite(entry.last) && !plot.points.length && !plot.bars.length) notices.push(`${name}: no numeric history in this window.`);
        lanes.push({ series:s, name, unit:String(state?.attributes.unit_of_measurement ?? ""), ...plot });
      }
      if (!lanes.length) notices.push("No visible series.");
      this.el(".notice").textContent = [this.graphicsError,...notices].filter(Boolean).join("\n");
      if (!this.graphicsError) this.view?.plot(lanes,c,now,this.clock.format,this.formatter.format);
    }
    if (!this.graphicsError) this.view?.render();
  }
}
