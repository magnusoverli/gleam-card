import type { CoverConfig, HomeAssistant } from "../../types";
import { uploadWindowPhoto } from "./window-photo";
import { editorPanelStyles } from "../../shared/editor-styles";
import { settings } from "./model";
import { sharedTemperature, MIN_KELVIN, MAX_KELVIN } from "./garage-settings";
import { kinds, suggestedKind, isWindowCover, type CoverKind } from "./kinds";

const framing = [
  ["window_image_zoom","Photo zoom",100,300,100],
  ["window_image_x","Horizontal position (left to right)",0,100,50],
  ["window_image_y","Vertical position (top to bottom)",0,100,50],
] as const;

export class GleamCoverEditor extends HTMLElement {
  private uploadGeneration = 0;
  private root = this.attachShadow({mode:"open"});
  private config?: CoverConfig;
  private choices = "";
  private assistant?: HomeAssistant;
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
      <form><fieldset><legend>Cover setup</legend><div class="fields">
      <label>Cover type<select id="kind">${Object.entries(kinds).map(([key,d]) => `<option value="${key}">${d.label}</option>`).join("")}</select></label>
      <label>Layout<select id="layout"><option value="normal">Normal</option><option value="compact">Compact</option><option value="double">Double</option></select></label>
      <datalist id="covers"></datalist><div class="fields pair"><label><span id="entity-label"></span><input id="entity" list="covers" required pattern="cover\\.[a-z0-9_]+"></label>
      <label data-double>Right door entity<input id="right-entity" list="covers" required aria-describedby="duplicate" pattern="cover\\.[a-z0-9_]+"></label></div>
      <small id="suggestion" hidden></small><p id="duplicate" role="alert"></p></div></fieldset>
      <details><summary>Cover movement<small id="travel-summary"></small></summary><div class="fields">
      <small>Set the time the cover takes to travel in either direction (1–300 seconds).</small>
      <div class="fields pair"><label><span id="time-label"></span><input id="seconds" required type="number" min="1" max="300" step="any"></label>
      <label data-double>Right door travel time (seconds)<input id="right-seconds" type="number" min="1" max="300" step="any"></label></div>
      <label data-blind>Tilt transition (seconds)<input id="tilt-seconds" required type="number" min="0" max="300" step="any">
        <small>Time to animate a new reported slat angle. Default 1 second; 0 is immediate.</small></label></div></details>
      <details><summary>Card appearance<small>Display name<span data-garage>, roof style and door labels</span></small></summary><div class="fields">
      <label>Display name<input id="name" placeholder="Entity name"></label>
      <fieldset data-window><legend>Glazing bars</legend><div class="fields">
        <label>Width · <span id="bar-reading"></span><input id="bar-width" type="range" min="0" max="10" step="1"></label>
        <label>Bar color<input id="bar-color" type="color"></label></div></fieldset>
      <div data-window class="fields"><label>Add window photo
        <input id="window-photo" type="file" accept="image/*">
        <small>Choose a picture from this device to upload to Home Assistant.</small></label>
        <small id="photo-status" role="status"></small></div>
      <label data-window>Window view image · optional
        <input id="window-image" placeholder="/local/garden.jpg" spellcheck="false">
        <small>Enter an image URL or a /local/ path. Leave blank for the default sky.</small></label>
      <fieldset data-window><legend>Photo framing</legend><div class="fields">
      ${framing.map(([key,label,min,max])=>`<label>${label} · <span id="${key}-value"></span><input id="${key}" type="range" min="${min}" max="${max}" step="1"></label>`).join("")}
      <small>At 100% the photo fills the window. Zoom in to pan farther.</small></div></fieldset>
      <label data-shade>Fabric opacity · <span id="opacity-reading"></span>
        <input id="shade-opacity" type="range" min="0" max="100" step="1">
        <small>0% is transparent; 100% is opaque.</small></label>
      <label data-garage>Roof type<select id="roof"><option value="pitched">Pitched (default)</option><option value="flat">Flat</option></select></label>
      <div class="fields pair" data-double>
      <label>Left door label<input id="left-label" placeholder="Hidden when blank"></label>
      <label>Right door label<input id="right-label" placeholder="Hidden when blank"></label></div></div></details>
      <details data-garage><summary>Garage lighting<small>Optional light entities and illustrated color temperature</small></summary><div class="fields">
      <datalist id="lights"></datalist><div class="fields pair">
      <label><span id="light-label"></span><input id="light" list="lights" pattern="light\\.[a-z0-9_]+"></label>
      <label data-double>Right door light · optional<input id="right-light" list="lights" pattern="light\\.[a-z0-9_]+"></label></div>
      <label class="toggle"><input id="custom" type="checkbox"> Customize garage light temperature</label>
      <label for="kelvin">Garage light temperature · <span id="reading"></span></label>
      <input id="kelvin" type="range" min="${MIN_KELVIN}" max="${MAX_KELVIN}" step="1"></div></details>
      <p id="invalid" role="status"></p></form>`;
    this.root.querySelector("form")!.addEventListener("submit", e => e.preventDefault());
    this.root.addEventListener("input", event => {
      if (event.target === this.input("window-image")) this.cancelPhoto();
      if (event.target instanceof HTMLInputElement && ["entity","right-entity"].includes(event.target.id)) this.layout();
      if (event.target === this.input("kelvin")) this.showTemperature();
      if (event.target === this.input("shade-opacity")) this.showOpacity();
      if (event.target === this.input("bar-width")) this.showBarWidth();
      for (const [key] of framing) if (event.target === this.input(key)) this.showFraming(key);
    });
    this.root.addEventListener("change", event => {
      if (event.target === this.input("window-photo")) { void this.choosePhoto(); return; }
      if (event.target === this.root.querySelector("#kind") || event.target === this.input("entity")) this.cancelPhoto();
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
      if (event.target === this.root.querySelector("#kind") || this.kind !== "garage" || config.cover_type) config.cover_type = this.kind;
      if (this.input("name").value.trim()) config.name = this.input("name").value.trim(); else delete config.name;
      if (variant === "normal") delete config.variant; else config.variant = variant;
      if (this.kind === "blind" && this.input("tilt-seconds").valueAsNumber !== 1) config.tilt_seconds = this.input("tilt-seconds").valueAsNumber;
      else delete config.tilt_seconds;
      const opacity = this.input("shade-opacity").valueAsNumber;
      if (this.kind === "shade" && opacity !== 100) config.shade_opacity = opacity; else delete config.shade_opacity;
      const width = this.input("bar-width").valueAsNumber, color = this.input("bar-color").value;
      if (isWindowCover(this.kind) && width !== 3) config.glazing_bar_width = width; else delete config.glazing_bar_width;
      if (isWindowCover(this.kind) && color !== "#30566a") config.glazing_bar_color = color; else delete config.glazing_bar_color;
      const image = this.input("window-image").value.trim();
      if (isWindowCover(this.kind) && image) config.window_image = image; else delete config.window_image;
      for (const [key,,,,initial] of framing) {
        const n=this.input(key).valueAsNumber;
        if (isWindowCover(this.kind) && n !== initial) config[key]=n; else delete config[key];
      }
      if (this.kind === "garage" && this.root.querySelector<HTMLSelectElement>("#roof")!.value === "flat") config.roof_type = "flat"; else delete config.roof_type;
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
        const prefix = side ? "right-" : "", active = this.kind === "garage" && (!side || variant === "double");
        const idKey = side ? "right_light_entity" : "light_entity";
        if (active && this.input(prefix+"light").value) config[idKey] = this.input(prefix+"light").value; else delete config[idKey];
      }
      delete config.right_light_temperature_kelvin;
      if (this.kind === "garage" && this.input("custom").checked) config.light_temperature_kelvin = this.input("kelvin").valueAsNumber;
      else delete config.light_temperature_kelvin;
      this.config = settings(config);
      this.dispatchEvent(new CustomEvent("config-changed",{detail:{config}, bubbles:true, composed:true}));
    });
  }
  private input(id:string) { return this.root.querySelector<HTMLInputElement>(`#${id}`)!; }
  private cancelPhoto() {
    this.uploadGeneration++;
    this.root.querySelector("#photo-status")!.textContent = "";
  }
  disconnectedCallback() { this.cancelPhoto(); }
  private async choosePhoto() {
    const picker = this.input("window-photo"), file = picker.files?.[0];
    if (!file || !isWindowCover(this.kind)) return;
    picker.value = "";
    const generation = ++this.uploadGeneration, status = this.root.querySelector("#photo-status")!;
    status.textContent = "Uploading photo…";
    try {
      const url = await uploadWindowPhoto(this.assistant,file);
      if (generation !== this.uploadGeneration) return;
      const field = this.input("window-image");
      field.value = url;
      field.dispatchEvent(new Event("change",{bubbles:true}));
      status.textContent = "Photo uploaded to Home Assistant.";
    } catch (error) {
      if (generation === this.uploadGeneration) status.textContent = error instanceof Error ? error.message : "Photo upload failed. Try again.";
    }
  }
  private get kind() { return this.root.querySelector<HTMLSelectElement>("#kind")!.value as CoverKind; }
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
  private showOpacity() {
    const slider = this.input("shade-opacity"), text = `${slider.value}%`;
    this.root.querySelector("#opacity-reading")!.textContent = text;
    slider.setAttribute("aria-valuetext", text);
  }
  private showFraming(key: string) {
    const input=this.input(key), text=`${input.value}%`;
    this.root.querySelector(`#${key}-value`)!.textContent=text;
    input.setAttribute("aria-valuetext",text);
  }
  private showBarWidth() {
    const input = this.input("bar-width"), text = input.value === "0" ? "0 (hidden)" : input.value;
    this.root.querySelector("#bar-reading")!.textContent = text;
    input.setAttribute("aria-valuetext",text);
  }
  private layout() {
    this.updateSuggestion();
    const layout = this.root.querySelector<HTMLSelectElement>("#layout")!;
    const supported = kinds[this.kind].layouts;
    for (const option of layout.options) option.disabled = option.hidden = !supported.some(v=>v === option.value);
    if (layout.selectedOptions[0]?.disabled) layout.value = "normal";
    const variant = layout.value as NonNullable<CoverConfig["variant"]>;
    const garage = this.kind === "garage";
    this.root.querySelector<HTMLElement>("[data-blind]")!.hidden = this.input("tilt-seconds").disabled = this.kind !== "blind";
    for (const el of this.root.querySelectorAll<HTMLElement>("[data-shade]")) el.hidden = this.kind !== "shade";
    for (const el of this.root.querySelectorAll<HTMLElement>("[data-window]")) el.hidden = !isWindowCover(this.kind);
    this.input("window-image").disabled = !isWindowCover(this.kind);
    this.input("shade-opacity").disabled = this.kind !== "shade";
    for (const el of this.root.querySelectorAll<HTMLElement>("[data-garage]")) el.hidden = !garage;
    this.input("light").disabled = this.input("custom").disabled = !garage;
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
    this.root.querySelector("#entity-label")!.textContent = double ? "Left door entity" : `${kinds[this.kind].label} entity`;
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
    if (this.config?.entity !== config.entity || this.config?.cover_type !== config.cover_type || this.config?.window_image !== config.window_image) this.cancelPhoto();
    this.config = config;
    this.root.querySelector<HTMLSelectElement>("#kind")!.value = config.cover_type ?? "garage";
    this.input("entity").value = config.entity ?? "";
    this.input("name").value = config.name ?? "";
    this.input("seconds").value = String(config.travel_seconds ?? 10);
    this.input("tilt-seconds").value = String(config.tilt_seconds ?? 1);
    this.input("shade-opacity").value = String(config.shade_opacity ?? 100);
    this.input("window-image").value = config.window_image ?? "";
    this.input("bar-width").value = String(config.glazing_bar_width ?? 3);
    this.input("bar-color").value = config.glazing_bar_color ?? "#30566a";
    this.showBarWidth();
    for (const [key,,,,initial] of framing) {
      this.input(key).value=String(config[key] ?? initial);
      this.showFraming(key);
    }
    this.showOpacity();
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
    this.assistant = value;
    this.updateSuggestion();
    const ids = Object.keys(value.states).filter(id => /^(cover|light)\./.test(id)).sort();
    const key = ids.join("|");
    if (key === this.choices) return;
    this.choices = key;
    for (const domain of ["cover","light"])
      this.root.querySelector(`#${domain}s`)!.replaceChildren(...ids.filter(id=>id.startsWith(domain+".")).map(id=>new Option(id,id)));
  }
  private updateSuggestion() {
    const suggested = suggestedKind(this.assistant?.states[this.input("entity").value]?.attributes.device_class);
    const note = this.root.querySelector<HTMLElement>("#suggestion")!;
    note.hidden = !suggested || suggested === this.kind;
    if (!note.hidden && suggested) note.textContent = `This entity reports device class ${suggested}. Suggested cover type: ${kinds[suggested].label}.`;
  }
}
