import type { EnergyConfig, HomeAssistant } from "../../types";
import { editorPanelStyles } from "../../shared/editor-styles";
import { ENERGY_DEFAULTS, ENERGY_ENTITIES, SERIES, SHIFT_FIELDS, EnergyFieldError, hasEnergySource, isCompatibleEnergyUnit, resolveEnergyConfig } from "./config";
import type { EnergyEntityField } from "./config";

const NUMBER_FIELDS = [
  ["hours_to_show", "Time span (hours)", "Includes history and future hours.", "0", "168", "#time"],
  ["future_hours", "Future hours", "Must be less than the total time span. Use 0 for history only.", "0", "", "#time"],
  ["refresh_interval", "Refresh interval (seconds)", "Minimum 5 seconds. Recorder requests are cached for 60 seconds.", "5", "", "#time"],
  ["dataset_spacing", "Dataset spacing", "Choose 0–10. Use 0 to overlay datasets on one plane. The default is 5.", "0", "10", "#time"],
  ["point_light_intensity", "Point light intensity", "Brightness of the reflection on energy bars. 0 turns it off; 48 is the default.", "0", "200", "#time"],
  ...SHIFT_FIELDS.map(([key, name]) => [key, `${name} (min)`, "", "-30", "30", "#shifts"] as const),
  ["readout_value_size", "Shared size (%)", "", "50", "200", "#sizes"],
  ["current_hour_value_size", "Current hour (%)", "", "50", "200", "#sizes"],
  ["price_value_size", "Price (%)", "", "50", "200", "#sizes"],
] as const;
type Field = keyof typeof ENERGY_DEFAULTS;
const SWITCHES = [
  ["use_server_time", "Use Home Assistant server time"],
  ["separate_readout_sizes", "Use separate sizes"],
  ["show_current_hour_readout", "Show current-hour readout"], ["show_current_hour_label", "Show current-hour label with unit"],
  ["show_price_readout", "Show price readout"], ["show_price_label", "Show price label with unit"],
  ["show_dataset_buttons", "Show dataset buttons"], ["show_camera_buttons", "Show camera preset buttons"],
  ["lock_navigation", "Lock drag and zoom"],
  ...SERIES.map(name => [`start_${name}`, name[0].toUpperCase() + name.slice(1)] as const),
] as const;
const SHIFT_SOURCES: Record<typeof SHIFT_FIELDS[number][0], readonly EnergyEntityField[]> = {
  energy_shift_minutes: ["energy_entity", "current_hour_entity"],
  price_shift_minutes: ["price_entity"],
  power_shift_minutes: ["power_entity"],
  voltage_shift_minutes: ["voltage_entity"],
};

export class GleamEnergyGraphEditor extends HTMLElement {
  private config: EnergyConfig = {};
  private assistant?: HomeAssistant;
  private inputs = new Map<Field, HTMLInputElement>();
  private suggestions = new Map<EnergyEntityField, { list: HTMLDataListElement; key: string }>();
  private error?: HTMLParagraphElement;
  private missing?: HTMLParagraphElement;
  private view!: HTMLSelectElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  setConfig(config: EnergyConfig) {
    this.config = { ...config };
    this.render();
    const values = { ...ENERGY_DEFAULTS, ...config };
    for (const [key, input] of this.inputs) {
      if (input.type === "checkbox") input.checked = values[key] === true;
      else input.value = String(values[key]);
    }
    this.view.value = values.starting_view;
    this.validate(config, false);
    this.updateTimeSummary();
    this.updateMissing();
  }

  set hass(hass: HomeAssistant) {
    this.assistant = hass;
    this.updateEntities();
  }

  connectedCallback() { this.render(); }

  private render() {
    if (this.inputs.size) return;
    this.shadowRoot!.innerHTML = `<style>
      ${editorPanelStyles}
      details>fieldset{margin:0 14px 14px}fieldset>p{margin-bottom:10px}
      .style-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      input[type=color]{height:40px;padding:4px}
      label:has(input[type=checkbox]){display:flex;align-items:center;justify-content:space-between}
      input[type=checkbox]{width:auto}
      select{font:inherit;color:inherit;background:var(--card-background-color,#fff);padding:8px}
      input{box-sizing:border-box;width:100%;min-width:0;padding:10px;border-radius:8px;
        border:1px solid var(--divider-color,#888);font:inherit;color:inherit;background:var(--card-background-color,#fff)}
      input:focus-visible{outline:2px solid var(--primary-color,#03a9f4);outline-offset:2px}
      p,small{margin:0;font-size:12px;line-height:1.5;color:var(--secondary-text-color,#666)}
      .error{color:var(--error-color,#db4437)}p:empty{display:none}
    </style><form>
      <fieldset><legend>Main energy</legend><div class="fields" id="sensors"></div></fieldset>
      <details><summary>Optional sensors<small id="optional-summary">Current-hour energy, price, power and voltage</small></summary>
        <div class="fields" id="optional"></div></details>
      <details><summary>Graph settings<small id="time-summary"></small></summary>
        <div class="fields" id="time"></div>
        <fieldset><legend>Time shifts</legend><p>Negative moves earlier; positive moves later. Range: −30 to +30 minutes.</p>
        <div class="fields" id="shifts"></div></fieldset></details>
      <details id="appearance"><summary>Dataset appearance</summary><div class="fields" id="styles"></div></details>
      <details><summary>Card appearance</summary><div class="fields" id="layout"></div>
        <fieldset id="size-group"><legend>Readout value size</legend><div class="fields" id="sizes"></div></fieldset>
        <fieldset><legend>Visible on startup</legend><div class="fields" id="startup"></div></fieldset></details>
      <p class="error" role="alert"></p><p class="missing" role="status"></p>
    </form>`;
    const root = this.shadowRoot!;
    const addField = (key: Field, title: string, help: string, section: string) => {
      const label = document.createElement("label");
      const heading = document.createElement("span");
      heading.id = `${key}-label`;
      heading.textContent = title;
      label.append(heading);
      const input = document.createElement("input");
      input.dataset.key = key;
      input.setAttribute("aria-labelledby", heading.id);
      input.required = true;
      input.value = String(this.config[key] ?? ENERGY_DEFAULTS[key]);
      const note = document.createElement("small");
      note.id = `${key}-help`;
      note.textContent = help;
      label.append(input);
      if (help) { input.setAttribute("aria-describedby", note.id); label.append(note); }
      root.querySelector(section)!.append(label);
      this.inputs.set(key, input);
      return input;
    };
    for (const [key, title, help] of ENERGY_ENTITIES) {
      const main = key === "energy_entity";
      const input = addField(key, main ? "Sensor" : title, help, main ? "#sensors" : "#optional");
      if (key !== "energy_entity") {
        input.required = false;
        input.placeholder = "No sensor selected";
      }
      const list = document.createElement("datalist");
      list.id = `${key}-list`;
      root.append(list);
      this.suggestions.set(key, { list, key: "" });
      input.setAttribute("list", list.id);
      input.autocomplete = "off";
      input.spellcheck = false;
      input.pattern = "sensor\\.[a-z0-9_]+";
    }
    for (const [key, title, help, min, max, section] of NUMBER_FIELDS) {
      const input = addField(key, title, help, section);
      input.type = "number";
      input.min = min;
      if (max) input.max = max;
      input.step = key === "dataset_spacing" || section === "#shifts" || section === "#sizes" ? "1" : "any";
    }
    this.error = root.querySelector<HTMLParagraphElement>(".error")!;
    addField("title", "Card title", "", "#layout").required = false;
    addField("now_marker_color", "Now marker colour", "", "#layout").type = "color";
    for (const [key, title] of SWITCHES) {
      const input = addField(key, title, "", key === "use_server_time" ? "#time" : key === "separate_readout_sizes" ? "#sizes" : key.startsWith("start_") ? "#startup" : "#layout");
      if (key === "separate_readout_sizes") root.querySelector("#sizes")!.prepend(input.closest("label")!);
      input.type = "checkbox"; input.required = false;
      input.checked = this.config[key] ?? ENERGY_DEFAULTS[key];
      if (key === "show_current_hour_label" || key === "show_price_label") {
        const price = key === "show_price_label";
        addField(price ? "price_label" : "current_hour_label", price ? "Price label text" : "Current-hour label text", "", "#layout").required = false;
      }
    }
    const viewLabel = document.createElement("label");
    viewLabel.textContent = "Starting view";
    this.view = document.createElement("select");
    for (const name of ["isometric", "front", "top"]) this.view.add(new Option(name[0].toUpperCase() + name.slice(1), name));
    viewLabel.append(this.view); root.querySelector("#layout")!.append(viewLabel);
    for (const name of SERIES) {
      const row = document.createElement("div");
      row.className = "style-row"; row.id = `${name}-style`;
      root.querySelector("#styles")!.append(row);
      const title = name[0].toUpperCase() + name.slice(1);
      addField(`${name}_color`, `${title} base colour`, "", `#${row.id}`).type = "color";
      const opacity = addField(`${name}_opacity`, `${title} opacity (%)`, "", `#${row.id}`);
      opacity.type = "number"; opacity.min = "0"; opacity.max = "100"; opacity.step = "1";
      if (name !== "energy") {
        const width = addField(`${name}_line_width`, `${title} line width (%)`, "", `#${row.id}`);
        width.type = "number"; width.min = "25"; width.max = "300"; width.step = "1";
      }
    }
    this.missing = root.querySelector<HTMLParagraphElement>(".missing")!;
    const form = root.querySelector("form")!;
    form.addEventListener("submit", event => event.preventDefault());
    form.addEventListener("change", () => this.change());
    form.addEventListener("input", event => {
      if (event.target instanceof HTMLInputElement && event.target.dataset.key?.endsWith("_entity")) this.updateMissing();
    });
    this.updateTimeSummary();
    this.updateEntities();
  }

  private change() {
    const next: EnergyConfig = { ...this.config, type: "custom:gleam-energy-graph" };
    next.title = this.inputs.get("title")!.value;
    next.now_marker_color = this.inputs.get("now_marker_color")!.value;
    for (const key of ["current_hour_label", "price_label"] as const) next[key] = this.inputs.get(key)!.value;
    next.starting_view = this.view.value as EnergyConfig["starting_view"];
    for (const [key] of SWITCHES) next[key] = this.inputs.get(key)!.checked;
    for (const [key] of ENERGY_ENTITIES) next[key] = this.inputs.get(key)!.value.trim();
    for (const [key] of NUMBER_FIELDS) next[key] = this.inputs.get(key)!.valueAsNumber;
    for (const name of SERIES) {
      next[`${name}_color`] = this.inputs.get(`${name}_color`)!.value;
      next[`${name}_opacity`] = this.inputs.get(`${name}_opacity`)!.valueAsNumber;
      if (name !== "energy") next[`${name}_line_width`] = this.inputs.get(`${name}_line_width`)!.valueAsNumber;
    }
    if (!this.validate(next)) return;
    const previous = { ...ENERGY_DEFAULTS, ...this.config };
    if (next.starting_view === previous.starting_view && [...this.inputs.keys()].every(key => next[key] === previous[key])) return;
    this.config = next;
    this.updateTimeSummary();
    this.updateMissing();
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: { ...next } }, bubbles: true, composed: true,
    }));
  }

  private validate(config: EnergyConfig, reveal = true) {
    this.view.removeAttribute("aria-invalid");
    for (const input of this.inputs.values()) input.removeAttribute("aria-invalid");
    try {
      resolveEnergyConfig(config);
      this.error!.textContent = "";
      return true;
    } catch (error) {
      if (error instanceof EnergyFieldError) {
        const input = error.field === "starting_view" ? this.view : this.inputs.get(error.field)!;
        input.setAttribute("aria-invalid", "true");
        const section = input.closest("details");
        if (section && reveal) section.open = true;
      }
      this.error!.textContent = error instanceof Error ? error.message : "Invalid configuration.";
      return false;
    }
  }

  private updateTimeSummary() {
    const { hours_to_show, refresh_interval } = { ...ENERGY_DEFAULTS, ...this.config };
    this.shadowRoot!.querySelector("#time-summary")!.textContent =
      `${hours_to_show} hours · refresh every ${refresh_interval} seconds`;
  }

  private updateEntities() {
    if (!this.suggestions.size || !this.assistant) return;
    const entries = Object.entries(this.assistant.states)
      .filter(([id]) => id.startsWith("sensor."))
      .sort(([a], [b]) => a.localeCompare(b));
    for (const [field, suggestions] of this.suggestions) {
      const compatible = entries
        .filter(([, state]) => isCompatibleEnergyUnit(field, state.attributes.unit_of_measurement))
        .map(([id, state]) => [id, String(state.attributes.friendly_name ?? id)]);
      const key = JSON.stringify(compatible);
      if (key === suggestions.key) continue;
      suggestions.key = key;
      suggestions.list.replaceChildren(...compatible.map(([id, name]) => {
        const option = document.createElement("option");
        option.value = id;
        option.label = name;
        return option;
      }));
    }
    this.updateMissing();
  }

  private updateMissing() {
    if (!this.missing) return;
    let anyShift = false;
    let anyStyle = false;
    let configured = 0;
    const selected = (field: EnergyEntityField) => {
      const id = this.inputs.get(field)!.value.trim();
      return hasEnergySource(field, id, this.assistant?.states);
    };
    const separate = this.inputs.get("separate_readout_sizes")!;
    let readoutCount = 0;
    for (const name of ["current_hour", "price"] as const) {
      const readout = this.inputs.get(`show_${name}_readout`)!;
      const showLabel = this.inputs.get(`show_${name}_label`)!;
      const available = selected(`${name}_entity`);
      const visible = available && readout.checked;
      if (visible) readoutCount++;
      this.inputs.get(`${name}_value_size`)!.closest("label")!.hidden = !visible || !separate.checked;
      readout.closest("label")!.hidden = !available;
      showLabel.closest("label")!.hidden = !available || !readout.checked;
      this.inputs.get(`${name}_label`)!.closest("label")!.hidden = !available || !readout.checked || !showLabel.checked;
    }
    this.shadowRoot!.querySelector<HTMLElement>("#size-group")!.hidden = !readoutCount;
    separate.closest("label")!.hidden = readoutCount < 2 && !separate.checked;
    this.inputs.get("readout_value_size")!.closest("label")!.hidden = separate.checked;
    for (const name of SERIES) {
      const key = `${name}_shift_minutes` as const;
      const input = this.inputs.get(key)!;
      const relevant = SHIFT_SOURCES[key].some(selected);
      if (relevant) configured++;
      this.inputs.get(`start_${name}`)!.closest("label")!.hidden = !relevant;
      const showShift = relevant || input.hasAttribute("aria-invalid");
      const row = this.shadowRoot!.querySelector<HTMLElement>(`#${name}-style`)!;
      row.hidden = !relevant && !row.querySelector("[aria-invalid=true]");
      anyStyle ||= !row.hidden;
      input.closest("label")!.hidden = !showShift;
      anyShift ||= showShift;
    }
    this.shadowRoot!.querySelector("#shifts")!.closest("fieldset")!.hidden = !anyShift;
    this.inputs.get("show_dataset_buttons")!.closest("label")!.hidden = configured < 2;
    this.shadowRoot!.querySelector("#startup")!.closest("fieldset")!.hidden = configured === 0;
    this.shadowRoot!.querySelector<HTMLDetailsElement>("#appearance")!.hidden = !anyStyle;
    if (!this.assistant) return;
    const values = { ...ENERGY_DEFAULTS, ...this.config };
    const count = ENERGY_ENTITIES.filter(([key]) => key !== "energy_entity" && !!this.assistant!.states[values[key]]).length;
    this.shadowRoot!.querySelector("#optional-summary")!.textContent = count
      ? `${count} optional sensor${count === 1 ? "" : "s"} available` : "No optional sensors found";
    const missing = ENERGY_ENTITIES.map(([key]) => values[key]).filter(id => id && !this.assistant!.states[id]);
    this.missing.textContent = missing.length ? `Not currently found in Home Assistant: ${missing.join(", ")}.` : "";
  }
}
