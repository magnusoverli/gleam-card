import type { CoverConfig, HomeAssistant } from "../../types";
import { editorPanelStyles } from "../../shared/editor-styles";
import { settings, sharedTemperature, MIN_KELVIN, MAX_KELVIN } from "./model";

export class GleamCoverEditor extends HTMLElement {
  private root = this.attachShadow({mode:"open"});
  private config?: CoverConfig;
  private choices = "";
  constructor() {
    super();
    this.root.innerHTML = `<style>${editorPanelStyles}
      form{container-type:inline-size}input,select{font:inherit;color:inherit;background:var(--card-background-color,transparent);
        border:1px solid var(--divider-color,#888);border-radius:8px;padding:9px;width:100%;min-width:0;box-sizing:border-box}
      .toggle{display:flex;align-items:center;gap:8px}input[type=checkbox]{width:auto}input[type=range]{padding:0}
      :focus-visible{outline:2px solid var(--primary-color,#03a9f4);outline-offset:2px}
      small{font-size:12px;color:var(--secondary-text-color,#666)}
       @container(min-width:440px){.pair:has([data-double]:not([hidden])),.pair[data-double]{grid-template-columns:repeat(2,minmax(0,1fr))}}
      p{margin:0;color:var(--error-color,#c62828)}p:empty{display:none}</style>
      <form><fieldset><legend>Garage setup</legend><div class="fields">
      <label>Layout<select id="layout"><option value="normal">Normal</option><option value="compact">Compact</option><option value="double">Double</option></select></label>
      <datalist id="covers"></datalist><div class="fields pair"><label><span id="entity-label"></span><input id="entity" list="covers" required pattern="cover\\.[a-z0-9_]+"></label>
      <label data-double>Right door entity<input id="right-entity" list="covers" required aria-describedby="duplicate" pattern="cover\\.[a-z0-9_]+"></label></div>
      <p id="duplicate" role="alert"></p></div></fieldset>
      <details><summary>Door movement<small id="travel-summary"></small></summary><div class="fields">
      <small>Set the time a door takes to travel in either direction (1–300 seconds).</small>
      <div class="fields pair"><label><span id="time-label"></span><input id="seconds" required type="number" min="1" max="300" step="any"></label>
      <label data-double>Right door travel time (seconds)<input id="right-seconds" type="number" min="1" max="300" step="any"></label></div></div></details>
      <details><summary>Card appearance<small>Roof style, display name and door labels</small></summary><div class="fields">
      <label>Display name<input id="name" placeholder="Entity name"></label>
      <label>Roof type<select id="roof"><option value="pitched">Pitched (default)</option><option value="flat">Flat</option></select></label>
      <div class="fields pair" data-double>
      <label>Left door label<input id="left-label" placeholder="Hidden when blank"></label>
      <label>Right door label<input id="right-label" placeholder="Hidden when blank"></label></div></div></details>
      <details><summary>Garage lighting<small>Optional light entities and illustrated color temperature</small></summary><div class="fields">
      <datalist id="lights"></datalist><div class="fields pair">
      <label><span id="light-label"></span><input id="light" list="lights" pattern="light\\.[a-z0-9_]+"></label>
      <label data-double>Right door light · optional<input id="right-light" list="lights" pattern="light\\.[a-z0-9_]+"></label></div>
      <label class="toggle"><input id="custom" type="checkbox"> Customize garage light temperature</label>
      <label for="kelvin">Garage light temperature · <span id="reading"></span></label>
      <input id="kelvin" type="range" min="${MIN_KELVIN}" max="${MAX_KELVIN}" step="1"></div></details>
      <p id="invalid" role="status"></p></form>`;
    this.root.querySelector("form")!.addEventListener("submit", e => e.preventDefault());
    this.root.addEventListener("input", event => {
      if (event.target instanceof HTMLInputElement && ["entity","right-entity"].includes(event.target.id)) this.layout();
      if (event.target instanceof HTMLInputElement && event.target.type === "range") this.showTemperature();
    });
    this.root.addEventListener("change", () => {
      const variant = this.layout();
      if (!this.config) return;
      const invalid = this.invalidField();
      if (invalid) {
        const group = invalid.closest("details");
        if (group) group.open = true;
        invalid.reportValidity();
        return;
      }
      const config = { ...this.config, entity:this.input("entity").value.trim(), travel_seconds:this.input("seconds").valueAsNumber };
      if (this.input("name").value.trim()) config.name = this.input("name").value.trim(); else delete config.name;
      if (variant === "normal") delete config.variant; else config.variant = variant;
      if (this.root.querySelector<HTMLSelectElement>("#roof")!.value === "flat") config.roof_type = "flat"; else delete config.roof_type;
      if (variant === "double") {
        config.right_entity = this.input("right-entity").value;
        if (this.input("right-seconds").value) config.right_travel_seconds = this.input("right-seconds").valueAsNumber;
        else delete config.right_travel_seconds;
      } else { delete config.right_entity; delete config.right_travel_seconds; }
      for (const side of ["left","right"] as const) {
        const label = this.input(`${side}-label`).value.trim();
        if (variant === "double" && label) config[`${side}_label`] = label;
        else delete config[`${side}_label`];
      }
      for (const side of ["","right"] as const) {
        const prefix = side ? "right-" : "", active = !side || variant === "double";
        const idKey = side ? "right_light_entity" : "light_entity";
        if (active && this.input(prefix+"light").value) config[idKey] = this.input(prefix+"light").value; else delete config[idKey];
      }
      delete config.right_light_temperature_kelvin;
      if (this.input("custom").checked) config.light_temperature_kelvin = this.input("kelvin").valueAsNumber;
      else delete config.light_temperature_kelvin;
      this.config = settings(config);
      this.dispatchEvent(new CustomEvent("config-changed",{detail:{config}, bubbles:true, composed:true}));
    });
  }
  private input(id:string) { return this.root.querySelector<HTMLInputElement>(`#${id}`)!; }
  private invalidField() {
    return [...this.root.querySelectorAll<HTMLInputElement>("input:not(:disabled)")].find(field => !field.validity.valid);
  }
  private showTemperature() {
    const slider = this.input("kelvin"), custom = this.input("custom");
    slider.disabled = custom.disabled || !custom.checked;
    const text = custom.checked ? `${slider.value} K` : "Default warm amber";
    this.root.querySelector("#reading")!.textContent = text;
    slider.setAttribute("aria-valuetext",text);
  }
  private layout() {
    const variant = this.root.querySelector<HTMLSelectElement>("#layout")!.value as NonNullable<CoverConfig["variant"]>;
    const double = variant === "double";
    for (const group of this.root.querySelectorAll<HTMLElement>("[data-double]")) group.hidden = !double;
    this.input("right-entity").disabled = this.input("right-seconds").disabled = !double;
    this.input("right-light").disabled = !double;
    this.showTemperature();
    const right = this.input("right-entity"), left = this.input("entity").value.trim();
    const message = double && left && right.value.trim() === left
      ? "Both doors use the same cover entity. Choose a different entity for one door." : "";
    right.setCustomValidity(message);
    right.setAttribute("aria-invalid", String(!!message));
    const warning = this.root.querySelector("#duplicate")!;
    if (warning.textContent !== message) warning.textContent = message;
    this.root.querySelector("#entity-label")!.textContent = double ? "Left door entity" : "Garage cover entity";
    this.root.querySelector("#light-label")!.textContent = double ? "Left door light · optional" : "Garage light · optional";
    this.root.querySelector("#time-label")!.textContent = double ? "Left door travel time (seconds)" : "Travel time (seconds)";
    const seconds = this.input("seconds").value || "—";
    this.root.querySelector("#travel-summary")!.textContent = double ? `Left: ${seconds} s · Right: ${this.input("right-seconds").value || seconds} s` : `${seconds} seconds to open or close`;
    const invalid = this.invalidField();
    this.root.querySelector("#invalid")!.textContent = invalid?.closest("details")
      ? `${invalid.labels?.[0]?.textContent?.trim()}: ${invalid.validationMessage}` : "";
    return variant;
  }
  setConfig(config: CoverConfig) {
    this.config = config;
    this.input("entity").value = config.entity ?? "";
    this.input("name").value = config.name ?? "";
    this.input("seconds").value = String(config.travel_seconds ?? 10);
    this.root.querySelector<HTMLSelectElement>("#layout")!.value = config.variant ?? "normal";
    this.root.querySelector<HTMLSelectElement>("#roof")!.value = config.roof_type ?? "pitched";
    this.input("right-entity").value = config.right_entity ?? "";
    this.input("left-label").value = config.left_label ?? "";
    this.input("right-label").value = config.right_label ?? "";
    this.input("right-seconds").value = String(config.right_travel_seconds ?? config.travel_seconds ?? 10);
    this.input("light").value = config.light_entity ?? "";
    const kelvin = sharedTemperature(config);
    this.input("custom").checked = kelvin !== undefined;
    this.input("kelvin").value = String(kelvin ?? 2700);
    this.input("right-light").value = config.right_light_entity ?? "";
    this.layout();
  }
  set hass(value: HomeAssistant) {
    const ids = Object.keys(value.states).filter(id => /^(cover|light)\./.test(id)).sort();
    const key = ids.join("|");
    if (key === this.choices) return;
    this.choices = key;
    for (const domain of ["cover","light"])
      this.root.querySelector(`#${domain}s`)!.replaceChildren(...ids.filter(id=>id.startsWith(domain+".")).map(id=>new Option(id,id)));
  }
}
