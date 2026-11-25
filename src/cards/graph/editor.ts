import type { GraphConfig, GraphSeries, HomeAssistant } from "../../types";
import { EditorPreview } from "../../shared/editor-preview";
import { editorPanelStyles } from "../../shared/editor-styles";
import { graphDefaults, palette, resolveGraph, seriesDefaults } from "./config";
import { numberState } from "./data";

type Field = readonly [keyof GraphConfig | keyof GraphSeries, string, "text" | "entity" | "number" | "color" | "checkbox" | readonly string[]];
const common: Field[] = [
  ["title","Title","text"], ["hours_to_show","History window (hours)","number"], ["refresh_interval","Refresh interval (seconds)","number"],
  ["dataset_spacing","Dataset spacing (0–10)","number"], ["starting_view","Starting view",["isometric","front","top"]],
  ["use_server_time","Use Home Assistant time zone","checkbox"], ["lock_navigation","Lock drag and zoom","checkbox"],
  ["show_camera_buttons","Show camera buttons","checkbox"], ["show_dataset_buttons","Show series buttons","checkbox"],
  ["readout_value_size","Readout size (%)","number"], ["now_marker_color","Now marker colour","color"],
  ["point_light_intensity","Point light intensity","number"],
];
const fields: Field[] = [
  ["entity","Sensor","entity"], ["name","Display name","text"], ["plot","Plot",["line","step","bar"]],
  ["visible","Visible on startup","checkbox"], ["show_readout","Show current value","checkbox"], ["color","Colour","color"],
  ["opacity","Opacity (%)","number"], ["line_width","Line width (%)","number"], ["shift_minutes","Time shift (minutes)","number"],
  ["min","Axis minimum (auto if blank)","number"], ["max","Axis maximum (auto if blank)","number"],
  ["interval_minutes","Bar interval (minutes)","number"], ["aggregate","Bar aggregation",["mean","min","max","last"]],
];
type Input = HTMLInputElement | HTMLSelectElement;
export class GraphEditor extends HTMLElement {
  private root = this.attachShadow({mode:"open"});
  private preview = new EditorPreview<GraphConfig>(this);
  private config: GraphConfig = {series:[]};
  private client?: HomeAssistant;
  private ids = "";
  constructor() {
    super();
    this.root.innerHTML = `<style>${editorPanelStyles}
      [hidden]{display:none!important}
      input:not([type=checkbox]),select{box-sizing:border-box;width:100%;font:inherit;color:inherit;background:var(--card-background-color,#fff);border:1px solid var(--divider-color,#888);border-radius:8px;padding:8px}
      input[type=color]{height:38px}label:has(input[type=checkbox]){display:flex;align-items:center;gap:8px}
      .actions{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}button{font:inherit;padding:5px 10px}
      p{color:var(--error-color,#b44);margin:0}p:empty{display:none}</style>
      <form><section></section><button type="button" data-action="add">Add series</button>
      <details><summary>Graph settings</summary><div class="fields" id="common"></div></details>
      <datalist id="graph-sensors"></datalist><p role="status"></p></form>`;
    this.root.querySelector("form")!.addEventListener("submit",e=>e.preventDefault());
    this.root.addEventListener("click",e=>{
      const b = (e.target as Element).closest<HTMLButtonElement>("[data-action]");
      if (!b) return;
      const list = [...this.config.series], i = Number(b.closest("fieldset")?.dataset.index);
      switch (b.dataset.action) {
        case "add": if (list.length >= 4) return; list.push({entity:""}); break;
        case "remove": if (list.length <= 1) return; list.splice(i,1); break;
        case "up": if (i <= 0) return; [list[i],list[i-1]] = [list[i-1],list[i]]; break;
        case "down": if (i >= list.length-1) return; [list[i],list[i+1]] = [list[i+1],list[i]]; break;
        default: return;
      }
      this.config = {...this.config,series:list}; this.render();
      if (b.dataset.action === "add") this.root.querySelector<HTMLInputElement>(`fieldset[data-index="${list.length-1}"] [data-key=entity]`)?.focus();
      else this.publish(true);
    });
    this.root.addEventListener("change",e=>this.edit(e.target,true));
    this.root.addEventListener("input",e=>this.edit(e.target,false));
  }
  setConfig(config: GraphConfig) {
    if (this.preview.isEcho(config)) return;
    this.config = {...config, series:Array.isArray(config.series) ? [...config.series] : []};
    this.render(); this.valid();
  }
  set hass(hass: HomeAssistant) {
    this.client = hass;
    const entries = Object.entries(hass.states).filter(([id,s]) => id.startsWith("sensor.") && numberState(s.state) !== null)
      .map(([id,s]) => [id,String(s.attributes.friendly_name ?? "")]);
    const key = JSON.stringify(entries);
    if (key === this.ids) return;
    this.ids = key;
    this.root.querySelector("datalist")!.replaceChildren(...entries.map(([id,name])=>new Option(name,id)));
  }
  disconnectedCallback() { this.preview.cancel(); }
  private control([key,text,kind]: Field, value: unknown) {
    const label = document.createElement("label"); label.textContent = text;
    let input: Input;
    if (typeof kind !== "string") {
      input = document.createElement("select");
      for (const choice of kind) input.add(new Option(choice[0].toUpperCase()+choice.slice(1),choice));
    } else {
      input = document.createElement("input"); input.type = kind === "entity" ? "text" : kind;
      if (kind === "entity") input.setAttribute("list","graph-sensors");
      if (kind === "number") input.step = "any";
    }
    if (input instanceof HTMLInputElement && input.type === "checkbox") input.checked = value === true;
    else input.value = value == null ? "" : String(value);
    input.dataset.key = key; label.append(input); return label;
  }
  private render() {
    const c = this.config;
    const options: Record<string,unknown> = {...graphDefaults,...c};
    this.root.querySelector("#common")!.replaceChildren(...common.map(f=>this.control(f,options[f[0]])));
    this.root.querySelector("section")!.replaceChildren(...c.series.map((s,i)=>{
      const el = document.createElement("fieldset"); el.dataset.index = String(i);
      el.innerHTML = `<legend>Series ${i+1}</legend><div class="fields"></div><div class="actions"></div>`;
      const opts: Record<string,unknown> = {...seriesDefaults,color:palette[i],...s};
      el.querySelector(".fields")!.append(...fields.map(f=>this.control(f,opts[f[0]])));
      for (const [action,title,disabled] of [["up","Move up",i===0],["down","Move down",i===c.series.length-1],["remove","Remove",c.series.length===1]] as const) {
        const b = document.createElement("button"); b.type = "button"; b.dataset.action = action; b.textContent = title;
        b.disabled = disabled; el.querySelector(".actions")!.append(b);
      }
      this.barFields(el,s.plot); return el;
    }));
    this.root.querySelector<HTMLButtonElement>("[data-action=add]")!.disabled = c.series.length>=4;
  }
  private barFields(el: HTMLElement, plot?: string) {
    for (const key of ["interval_minutes","aggregate","line_width"])
      el.querySelector(`[data-key=${key}]`)!.closest("label")!.hidden = key === "line_width" ? plot === "bar" : plot !== "bar";
  }
  private valid() {
    const status = this.root.querySelector("p")!;
    try { resolveGraph(this.config); }
    catch (e) { status.textContent = e instanceof Error ? e.message : "Invalid graph settings."; return false; }
    const missing = this.config.series.filter(s=>this.client && !this.client.states[s.entity]);
    status.textContent = missing.length ? `Not found: ${missing.map(s=>s.entity).join(", ")}` : "";
    return true;
  }
  private publish(commit: boolean) {
    if (!this.valid()) return;
    if (commit) this.preview.emit(this.config); else this.preview.queue(this.config);
  }
  private edit(target: EventTarget | null, commit: boolean) {
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;
    const key = target.dataset.key;
    if (!key || (!commit && ["entity","hours_to_show","refresh_interval"].includes(key))) return;
    if (!commit && target instanceof HTMLInputElement && target.type === "number" && (!target.value || target.validity.badInput)) return;
    const el = target.closest("fieldset");
    const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked :
      target instanceof HTMLInputElement && target.type === "number" ? target.value === "" && !target.validity.badInput ? undefined : target.valueAsNumber : target.value;
    const change = <T extends object>(old: T): T => {
      const next = {...old,[key]:value};
      if (value === undefined) Reflect.deleteProperty(next,key);
      return next;
    };
    if (el) {
      const series = [...this.config.series], i = Number(el.dataset.index);
      series[i] = change(series[i]);
      this.config = {...this.config,series}; if (key === "plot") this.barFields(el,target.value);
    } else {
      this.config = change(this.config);
    }
    this.config = {...this.config,type:"custom:gleam-graph"};
    this.publish(commit);
  }
}
