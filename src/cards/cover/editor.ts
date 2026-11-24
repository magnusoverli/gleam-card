import type { CoverConfig, HomeAssistant } from "../../types";
import { uploadWindowPhoto } from "./window-photo";
import { editorPanelStyles } from "../../shared/editor-styles";
import { EditorPreview } from "../../shared/editor-preview";
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
  private readonly preview = new EditorPreview<CoverConfig>(this);
  private values: Record<string,string> = {}; // Controls in the last valid snapshot.
  private pending: Record<string,string> = {}; // Coupled commits, e.g. Double + its required second entity.
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
      <label data-curtain>Panels<select id="panels"><option value="center">Center split (two panels)</option><option value="single">Single panel</option></select></label>
      <label data-single>Opening direction<select id="opening"><option value="left_to_right">Left to right · gathers on right</option><option value="right_to_left">Right to left · gathers on left</option></select></label>
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
      <div data-window class="fields">
        <label class="toggle"><input id="custom-cover-color" type="checkbox">Customize cover base color</label>
        <label>Cover base color<input id="cover-color" type="color"></label></div>
      <label data-window>Window aspect ratio<select id="window-ratio"><option value="landscape">Landscape (default)</option><option value="portrait">Portrait</option><option value="square">Square</option></select></label>
      <label data-window>Mounting side<select id="mounting-side"><option value="inside">Inside (room side)</option><option value="outside">Outside (behind the glass)</option></select></label>
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
    this.root.addEventListener("input", e => this.edit(e.target, false));
    this.root.addEventListener("change", e => this.edit(e.target, true));
  }
  private edit(target: EventTarget | null, commit: boolean) {
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement) || target.disabled || !this.config) return;
    const {id,type} = target;
    if (id === "window-photo") { if (commit) void this.choosePhoto(); return; }
    if (id === "window-image" || (commit && (id === "kind" || id === "entity"))) this.cancelPhoto();
    const continuous = type === "range" || type === "color";
    const live = continuous || type === "number" || ["name","left-label","right-label"].includes(id);
    if (id === "kelvin") this.showTemperature();
    if (id === "shade-opacity") this.showOpacity();
    if (id === "bar-width") this.showBarWidth();
    if (framing.some(([key]) => key === id)) this.showFraming(id);
    if (commit || type === "number" || id === "entity" || id === "right-entity") this.layout();
    if (!commit && !live) {
      delete this.pending[id]; // A new draft supersedes a previously blocked commit.
      return;
    }
    const edit = { [id]:this.fieldValue(target) };
    if (id === "kind") edit.layout = this.select("layout").value; // Kind can force Double back to Normal.
    const appearance = live || type === "checkbox" || (target instanceof HTMLSelectElement && id !== "kind" && id !== "layout");
    if (!appearance) {
      if (target.validity.valid || target.validity.customError) Object.assign(this.pending, edit);
      else delete this.pending[id];
    }

    // A deferred or structural commit still validates the whole form. Keep
    // failed commits separate so, for example, two door IDs can be swapped.
    if (commit && (!appearance || Object.keys(this.pending).length)) {
      const invalid = this.invalidField();
      if (!invalid && this.publish({...this.values,...this.pending,...edit}, id, false, !appearance)) {
        this.pending = {};
        return;
      }
      if (!appearance && invalid) this.reportInvalid(invalid);
    }
    if (appearance) {
      if (target.validity.valid) this.publish({...this.values,...edit}, id, continuous && !commit, false, !commit);
      else if (commit) this.reportInvalid(target);
    }
  }
  private fieldValue(field: HTMLInputElement | HTMLSelectElement) {
    return field instanceof HTMLInputElement && field.type === "checkbox" ? (field.checked ? "on" : "") : field.value;
  }
  private publish(values: Record<string,string>, id: string, queued: boolean, showError: boolean, live = false) {
    const config = this.collectConfig(this.config!, values, id);
    try {
      this.config = settings(config);
    } catch (error) {
      // The visible entities may form a valid pair before both edits commit.
      if (showError && error instanceof Error) this.root.querySelector("#invalid")!.textContent = error.message;
      return false;
    }
    this.values = values;
    if (queued) this.preview.queue(config); else if (live) this.preview.live(config); else this.preview.emit(config);
    return true;
  }
  private collectConfig(base: CoverConfig, v: Record<string,string>, id: string) {
    const kind = v.kind as CoverKind, windowCover = isWindowCover(kind);
    const variant = v.layout as NonNullable<CoverConfig["variant"]>;
    const config = { ...base, entity:v.entity.trim(), travel_seconds:Number(v.seconds) };
    if (id === "kind" || kind !== "garage" || config.cover_type) config.cover_type = kind;
    if (v.name.trim()) config.name = v.name.trim(); else delete config.name;
    if (variant === "normal") delete config.variant; else config.variant = variant;
    const opening = v.opening;
    if (kind === "curtain" && v.panels === "single" && (opening === "left_to_right" || opening === "right_to_left"))
      config.curtain_opening = opening;
    else delete config.curtain_opening;
    if (kind === "blind" && Number(v["tilt-seconds"]) !== 1) config.tilt_seconds = Number(v["tilt-seconds"]);
    else delete config.tilt_seconds;
    const opacity = Number(v["shade-opacity"]), ratio = v["window-ratio"];
    if (windowCover && v["mounting-side"] === "outside") config.mounting_side = "outside";
    else delete config.mounting_side;
    if (windowCover && v["custom-cover-color"]) config.cover_color = v["cover-color"];
    else delete config.cover_color;
    if (windowCover && (ratio === "square" || ratio === "portrait")) config.window_aspect_ratio = ratio;
    else delete config.window_aspect_ratio;
    if (kind === "shade" && opacity !== 100) config.shade_opacity = opacity; else delete config.shade_opacity;
    const width = Number(v["bar-width"]), color = v["bar-color"];
    if (windowCover && width !== 3) config.glazing_bar_width = width; else delete config.glazing_bar_width;
    if (windowCover && color !== "#30566a") config.glazing_bar_color = color; else delete config.glazing_bar_color;
    const image = v["window-image"].trim();
    if (windowCover && image) config.window_image = image; else delete config.window_image;
    for (const [key,,,,initial] of framing) {
      const n=Number(v[key]);
      if (windowCover && n !== initial) config[key]=n; else delete config[key];
    }
    if (kind === "garage" && v.roof === "flat") config.roof_type = "flat"; else delete config.roof_type;
    if (variant === "double") {
      config.right_entity = v["right-entity"];
      if (v["right-seconds"]) config.right_travel_seconds = Number(v["right-seconds"]);
      else delete config.right_travel_seconds;
    } else { delete config.right_entity; delete config.right_travel_seconds; }
    for (const side of ["left","right"] as const) {
      const label = v[`${side}-label`].trim();
      if (variant === "double" && label) config[`${side}_label`] = label;
      else delete config[`${side}_label`];
    }
    for (const side of ["","right"] as const) {
      const prefix = side ? "right-" : "", active = kind === "garage" && (!side || variant === "double");
      const idKey = side ? "right_light_entity" : "light_entity";
      if (active && v[prefix+"light"]) config[idKey] = v[prefix+"light"]; else delete config[idKey];
    }
    delete config.right_light_temperature_kelvin;
    if (kind === "garage" && v.custom) config.light_temperature_kelvin = Number(v.kelvin);
    else delete config.light_temperature_kelvin;
    return config;
  }
  private input(id:string) { return this.root.querySelector<HTMLInputElement>(`#${id}`)!; }
  private select(id:string) { return this.root.querySelector<HTMLSelectElement>(`#${id}`)!; }
  private cancelPhoto() {
    this.uploadGeneration++;
    this.root.querySelector("#photo-status")!.textContent = "";
  }
  disconnectedCallback() { this.preview.cancel(); this.cancelPhoto(); }
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
  private reportInvalid(field: HTMLInputElement | HTMLSelectElement) {
    const group = field.closest("details");
    if (group) group.open = true;
    field.reportValidity();
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
    this.root.querySelector<HTMLElement>("[data-curtain]")!.hidden = this.select("panels").disabled = this.kind !== "curtain";
    this.root.querySelector<HTMLElement>("[data-single]")!.hidden = this.select("opening").disabled =
      this.kind !== "curtain" || this.select("panels").value !== "single";
    this.root.querySelector<HTMLElement>("[data-blind]")!.hidden = this.input("tilt-seconds").disabled = this.kind !== "blind";
    for (const el of this.root.querySelectorAll<HTMLElement>("[data-shade]")) el.hidden = this.kind !== "shade";
    for (const el of this.root.querySelectorAll<HTMLElement>("[data-window]")) el.hidden = !isWindowCover(this.kind);
    this.input("window-image").disabled = !isWindowCover(this.kind);
    this.select("mounting-side").disabled = !isWindowCover(this.kind);
    this.input("custom-cover-color").disabled = !isWindowCover(this.kind);
    this.input("cover-color").disabled = !isWindowCover(this.kind) || !this.input("custom-cover-color").checked;
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
    this.input("right-seconds").placeholder = seconds;
    this.root.querySelector("#travel-summary")!.textContent = double ? `Left: ${seconds} s · Right: ${this.input("right-seconds").value || seconds} s` : `${seconds} seconds to open or close`;
    const invalid = this.invalidField();
    this.root.querySelector("#invalid")!.textContent = invalid?.closest("details")
      ? `${invalid.labels?.[0]?.textContent?.trim()}: ${invalid.validationMessage}` : "";
  }
  setConfig(config: CoverConfig) {
    if (this.preview.isEcho(config)) return;
    this.preview.cancel();
    if (this.config?.entity !== config.entity || this.config?.cover_type !== config.cover_type || this.config?.window_image !== config.window_image) this.cancelPhoto();
    this.config = config;
    this.root.querySelector<HTMLSelectElement>("#kind")!.value = config.cover_type ?? "garage";
    this.input("entity").value = config.entity ?? "";
    const single = config.curtain_opening === "right_to_left" || config.curtain_opening === "left_to_right";
    this.select("panels").value = single ? "single" : "center";
    this.select("opening").value = single ? config.curtain_opening! : "left_to_right";
    this.input("name").value = config.name ?? "";
    this.input("seconds").value = String(config.travel_seconds ?? 10);
    this.input("tilt-seconds").value = String(config.tilt_seconds ?? 1);
    this.input("shade-opacity").value = String(config.shade_opacity ?? 100);
    this.input("window-image").value = config.window_image ?? "";
    this.root.querySelector<HTMLSelectElement>("#window-ratio")!.value = config.window_aspect_ratio ?? "landscape";
    this.select("mounting-side").value = config.mounting_side ?? "inside";
    this.input("bar-width").value = String(config.glazing_bar_width ?? 3);
    this.input("bar-color").value = config.glazing_bar_color ?? "#30566a";
    this.input("custom-cover-color").checked = config.cover_color !== undefined;
    this.input("cover-color").value = config.cover_color ?? "#839d94";
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
    this.input("right-seconds").value = config.right_travel_seconds === undefined ? "" : String(config.right_travel_seconds);
    this.input("light").value = config.light_entity ?? "";
    const kelvin = sharedTemperature(config);
    this.input("custom").checked = kelvin !== undefined;
    this.input("kelvin").value = String(kelvin ?? 2700);
    this.input("right-light").value = config.right_light_entity ?? "";
    this.layout();
    this.pending = {};
    for (const field of this.root.querySelectorAll<HTMLInputElement|HTMLSelectElement>("input[id],select[id]"))
      this.values[field.id] = this.fieldValue(field);
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
