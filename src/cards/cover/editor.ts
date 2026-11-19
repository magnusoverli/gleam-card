import type { CoverConfig, HomeAssistant } from "../../types";
import { settings } from "./model";

export class GleamCoverEditor extends HTMLElement {
  private root = this.attachShadow({mode:"open"});
  private config?: CoverConfig;
  private choices = "";
  constructor() {
    super();
    this.root.innerHTML = `<style>label{display:grid;gap:4px;margin:12px 0}input,select{font:inherit;padding:8px}
      #duplicate{color:var(--error-color,#c62828)}#duplicate:empty{display:none}</style>
      <label>Layout<select><option value="normal">Normal</option><option value="compact">Compact</option><option value="double">Double</option></select></label>
      <label><span id="entity-label"></span><input id="entity" list="covers" required pattern="cover\\.[a-z0-9_]+"></label><datalist id="covers"></datalist>
      <label>Display name<input id="name" placeholder="Entity name"></label>
      <label>Travel time in seconds (both directions)<input id="seconds" required type="number" min="1" max="300" step="any"></label>
      <div id="right"><label>Right door entity<input id="right-entity" list="covers" required aria-describedby="duplicate" pattern="cover\\.[a-z0-9_]+"></label>
      <p id="duplicate" role="alert"></p>
      <label>Right door travel time (defaults to left)<input id="right-seconds" type="number" min="1" max="300" step="any"></label></div>`;
    this.root.addEventListener("input", event => {
      if (event.target instanceof HTMLInputElement && ["entity","right-entity"].includes(event.target.id)) this.layout();
    });
    this.root.addEventListener("change", () => {
      const variant = this.layout();
      if (!this.config || [...this.root.querySelectorAll<HTMLInputElement>("input:not(:disabled)")].some(input => !input.reportValidity())) return;
      const config = { ...this.config, entity:this.input("entity").value.trim(), travel_seconds:this.input("seconds").valueAsNumber };
      if (this.input("name").value.trim()) config.name = this.input("name").value.trim(); else delete config.name;
      if (variant === "normal") delete config.variant; else config.variant = variant;
      if (variant === "double") {
        config.right_entity = this.input("right-entity").value;
        if (this.input("right-seconds").value) config.right_travel_seconds = this.input("right-seconds").valueAsNumber;
        else delete config.right_travel_seconds;
      } else { delete config.right_entity; delete config.right_travel_seconds; }
      this.config = settings(config);
      this.dispatchEvent(new CustomEvent("config-changed",{detail:{config}, bubbles:true, composed:true}));
    });
  }
  private input(id:string) { return this.root.querySelector<HTMLInputElement>(`#${id}`)!; }
  private layout() {
    const variant = this.root.querySelector("select")!.value as NonNullable<CoverConfig["variant"]>;
    const double = variant === "double";
    this.root.querySelector<HTMLElement>("#right")!.hidden = !double;
    this.input("right-entity").disabled = this.input("right-seconds").disabled = !double;
    const right = this.input("right-entity"), left = this.input("entity").value.trim();
    const message = double && left && right.value.trim() === left
      ? "Both doors use the same cover entity. Choose a different entity for one door." : "";
    right.setCustomValidity(message);
    right.setAttribute("aria-invalid", String(!!message));
    const warning = this.root.querySelector("#duplicate")!;
    if (warning.textContent !== message) warning.textContent = message;
    this.root.querySelector("#entity-label")!.textContent = double ? "Left door entity" : "Garage cover entity";
    return variant;
  }
  setConfig(config: CoverConfig) {
    this.config = config;
    this.input("entity").value = config.entity ?? "";
    this.input("name").value = config.name ?? "";
    this.input("seconds").value = String(config.travel_seconds ?? 10);
    this.root.querySelector("select")!.value = config.variant ?? "normal";
    this.input("right-entity").value = config.right_entity ?? "";
    this.input("right-seconds").value = String(config.right_travel_seconds ?? "");
    this.layout();
  }
  set hass(value: HomeAssistant) {
    const ids = Object.keys(value.states).filter(id => id.startsWith("cover.")).sort();
    const key = ids.join("|");
    if (key === this.choices) return;
    this.choices = key;
    this.root.querySelector("datalist")!.replaceChildren(...ids.map(id => new Option(id,id)));
  }
}
