import type { HomeAssistant, LightConfig } from "../../types";
import { editorPanelStyles } from "../../shared/editor-styles";
import { settings } from "./model";
import { MAX_GRID, MAX_ZONES, defaultZone, onRing, planPosition } from "./spots";

const ZONE_COLORS = ["#4fc3f7", "#ffb74d", "#ce93d8"];

export class GleamLightEditor extends HTMLElement {
  private root = this.attachShadow({ mode: "open" });
  private config?: LightConfig;
  private choices = "";

  constructor() {
    super();
    this.root.innerHTML = `<style>${editorPanelStyles}
      form{container-type:inline-size}
      input,select{font:inherit;color:inherit;background:var(--card-background-color,transparent);border:1px solid var(--divider-color,#888);
        border-radius:8px;padding:9px;width:100%;min-width:0;box-sizing:border-box}
      input[type=checkbox]{width:auto}input[type=range]{padding:0}
      button{font:inherit;color:var(--primary-color,#03a9f4);background:none;border:1px solid var(--divider-color,#8888);border-radius:18px;min-height:36px;padding:0 14px;cursor:pointer}
      button:disabled{color:var(--disabled-text-color,#888);cursor:default}
      :focus-visible{outline:2px solid var(--primary-color,#03a9f4);outline-offset:2px}
      small{font-size:12px;color:var(--secondary-text-color,#666)}
      .toggle{display:flex;align-items:center;gap:8px}
      .zone{display:grid;grid-template-columns:auto minmax(0,1.3fr) minmax(0,1fr) auto;gap:8px;align-items:end}
      .badge{display:grid;place-items:center;width:26px;height:26px;margin-bottom:8px;border-radius:50%;font-size:13px;font-weight:600;color:#10202e}
      .remove{width:40px;height:40px;min-height:0;padding:0;border:0;border-radius:50%;color:var(--secondary-text-color,#666)}
      .steppers{display:flex;flex-wrap:wrap;gap:12px 28px}
      .stepper{display:flex;align-items:center;gap:10px}.stepper span{min-width:64px}
      .stepper button{width:36px;height:36px;min-height:0;padding:0;border-radius:50%;color:inherit;font-size:18px;line-height:1}
      .stepper output{min-width:20px;text-align:center;font-variant-numeric:tabular-nums}
      .presets{display:flex;flex-wrap:wrap;gap:8px}
      .plan-wrap{display:grid;justify-items:center;gap:8px}
      .plan-wrap>span{font-size:12px;letter-spacing:.04em;color:var(--secondary-text-color,#666)}
      .plan{position:relative;width:min(100%,480px);aspect-ratio:4.8/4;box-sizing:border-box;border:1px solid var(--divider-color,#888);border-top-width:3px;border-radius:2px}
      .plan button{position:absolute;transform:translate(-50%,-50%);padding:0;min-height:0;border-radius:50%;font-weight:600;color:#10202e}
      .plan button.none{border:1.5px dashed var(--secondary-text-color,#888);background:none;color:inherit}
      .plan .unused{position:absolute;transform:translate(-50%,-50%);width:5px;height:5px;border-radius:50%;background:var(--divider-color,#888)}
      .legend{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:13px}
      .legend span{display:inline-flex;align-items:center;gap:6px}
      .legend i{width:12px;height:12px;border-radius:50%;box-sizing:border-box}
      p{margin:0;color:var(--error-color,#c62828)}p:empty{display:none}</style>
      <form><fieldset><legend>Light setup</legend><div class="fields">
        <label>Light type<select id="light-type"><option value="in_roof_spots">In-roof spots</option></select></label>
        <label>Layout<select id="layout"><option value="normal">Normal</option><option value="compact">Compact</option></select></label>
        <label>Display name<input id="name" placeholder="Spots"></label>
      </div></fieldset>
      <fieldset><legend>Zones</legend><div class="fields">
        <small>Each zone is one light entity, or a light group, that switches its spots together.</small>
        <datalist id="lights"></datalist><div id="zones" class="fields"></div>
        <div><button type="button" id="add-zone">+ Add zone</button></div>
      </div></fieldset>
      <details open><summary>Spot layout<small id="layout-summary"></small></summary><div class="fields">
        <div class="steppers">
          <div class="stepper" role="group" aria-label="Rows"><span>Rows</span><button type="button" data-step="rows:-1" aria-label="Fewer rows">−</button><output id="rows"></output><button type="button" data-step="rows:1" aria-label="More rows">+</button></div>
          <div class="stepper" role="group" aria-label="Columns"><span>Columns</span><button type="button" data-step="columns:-1" aria-label="Fewer columns">−</button><output id="columns"></output><button type="button" data-step="columns:1" aria-label="More columns">+</button></div>
        </div>
        <label class="toggle"><input id="walls" type="checkbox">Only along the walls</label>
        <small>Keeps the outer ring of the grid and moves it 45 cm from the walls.</small>
        <label><span>Beam angle · <span id="beam-reading"></span></span><input id="beam" type="range" min="10" max="120" step="5"></label>
        <small>From the spot’s datasheet. Typical downlights are 36–60°; narrow beams give smaller, brighter pools.</small>
      </div></details>
      <details open><summary>Assign spots to zones<small>Seen from above. Tap a spot to move it to the next zone; after the last zone it becomes “no spot”.</small></summary><div class="fields">
        <div class="presets" role="group" aria-label="Quick split">
          <button type="button" data-split="columns">Left | right</button>
          <button type="button" data-split="rows">Back | front</button>
          <button type="button" data-split="ring" id="ring-split">Walls | centre</button>
        </div>
        <div class="plan-wrap"><span>BACK WALL</span><div class="plan" role="group" aria-label="Spot plan"></div><span>FRONT · VIEWER SIDE</span></div>
        <div class="legend"></div>
      </div></details>
      <p id="invalid" role="status"></p></form>`;
    this.root.querySelector("form")!.addEventListener("submit", e => e.preventDefault());
    this.root.addEventListener("change", event => {
      const target = event.target as HTMLInputElement;
      if (!this.config) return;
      if (target.dataset.field) {
        const i = Number(target.dataset.index), zones = this.config.zones.map(z => ({ ...z }));
        const value = target.value.trim();
        if (target.dataset.field === "name") { if (value) zones[i].name = value; else delete zones[i].name; }
        else zones[i].entity = value;
        this.update({ zones });
      } else if (target.id === "name") this.update({ name: target.value.trim() || undefined });
      else if (target.id === "layout") this.update({ variant: target.value === "compact" ? "compact" : undefined });
      else if (target.id === "walls") this.update({ walls_only: target.checked || undefined });
      else if (target.id === "beam") this.update({ beam_angle: target.valueAsNumber === 40 ? undefined : target.valueAsNumber });
    });
    this.root.addEventListener("input", event => {
      if ((event.target as Element).id === "beam") this.showBeam();
    });
    this.root.addEventListener("click", event => {
      const button = (event.target as Element).closest("button");
      if (!button || !this.config) return;
      if (button.id === "add-zone") this.addZone();
      else if (button.dataset.remove) this.removeZone(Number(button.dataset.remove));
      else if (button.dataset.step) {
        const [key, delta] = button.dataset.step.split(":") as ["rows" | "columns", string];
        this.resize(key, this.grid[key] + Number(delta));
      } else if (button.dataset.split) this.split(button.dataset.split);
      else if (button.dataset.cell) {
        const [row, column] = button.dataset.cell.split(",").map(Number);
        this.cycle(row, column);
      }
    });
  }

  setConfig(config: LightConfig) {
    this.config = config;
    this.render();
  }
  set hass(value: HomeAssistant) {
    const ids = Object.keys(value.states).filter(id => id.startsWith("light.")).sort(), key = ids.join("|");
    if (key === this.choices) return;
    this.choices = key;
    this.root.querySelector("#lights")!.replaceChildren(...ids.map(id => new Option(id, id)));
  }

  private get grid() {
    const c = this.config!;
    return { rows: c.rows ?? 3, columns: c.columns ?? 4, walls: !!c.walls_only, zones: Math.max(1, c.zones?.length ?? 1) };
  }
  /** Current map as numbers (0 = no spot), always rows × columns. */
  private cells(rows = this.grid.rows, columns = this.grid.columns, zones = this.grid.zones) {
    const map = this.config!.zone_map;
    return Array.from({ length: rows }, (_, r) => Array.from({ length: columns }, (_, c) => {
      const cell = map?.[r]?.charAt(c);
      if (cell === ".") return 0;
      const n = Number(cell);
      return n >= 1 ? Math.min(zones, n) : defaultZone(c, columns, zones) + 1;
    }));
  }
  private mapOf(cells: number[][]) { return cells.map(row => row.map(n => (n ? String(n) : ".")).join("")); }

  private update(patch: Partial<LightConfig>) {
    const next: LightConfig = { ...this.config!, ...patch };
    for (const key of Object.keys(patch) as (keyof LightConfig)[]) if (patch[key] === undefined) delete next[key];
    this.config = next;
    this.render();
    const message = this.root.querySelector("#invalid")!;
    try { settings(next); message.textContent = ""; }
    catch (error) { message.textContent = error instanceof Error ? error.message : "Invalid configuration."; return; }
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: next }, bubbles: true, composed: true }));
  }
  private addZone() {
    const zones = this.config!.zones ?? [];
    if (zones.length >= MAX_ZONES) return;
    this.update({ zones: [...zones, { entity: "" }], zone_map: this.mapOf(this.cells()) });
  }
  private removeZone(i: number) {
    const zones = this.config!.zones;
    if (zones.length <= 1) return;
    const n = i + 1;
    const cells = this.cells().map(row => row.map(v => (v === n ? Math.max(1, n - 1) : v > n ? v - 1 : v)));
    this.update({ zones: zones.filter((_, j) => j !== i), zone_map: this.mapOf(cells) });
  }
  private resize(key: "rows" | "columns", value: number) {
    if (value < 1 || value > MAX_GRID) return;
    const { rows, columns } = this.grid;
    const next = { rows, columns, [key]: value };
    this.update({ [key]: value, zone_map: this.mapOf(this.cells(next.rows, next.columns)) });
  }
  private split(kind: string) {
    const { rows, columns, walls } = this.grid;
    if (kind === "ring" && (walls || rows < 3 || columns < 3)) return;
    const zones = this.config!.zones.length >= 2 ? this.config!.zones : [...this.config!.zones, { entity: "" }];
    const cells = Array.from({ length: rows }, (_, r) => Array.from({ length: columns }, (_, c) =>
      kind === "columns" ? (c < Math.ceil(columns / 2) ? 1 : 2) : kind === "rows" ? (r < Math.ceil(rows / 2) ? 1 : 2) : onRing(r, c, rows, columns) ? 1 : 2));
    this.update({ zones, zone_map: this.mapOf(cells) });
  }
  private cycle(row: number, column: number) {
    const cells = this.cells(), v = cells[row][column];
    cells[row][column] = v >= this.grid.zones ? 0 : v + 1;
    this.update({ zone_map: this.mapOf(cells) });
  }

  private showBeam() {
    const beam = this.root.querySelector<HTMLInputElement>("#beam")!;
    this.root.querySelector("#beam-reading")!.textContent = `${beam.value}°`;
    beam.setAttribute("aria-valuetext", `${beam.value} degrees`);
  }
  private render() {
    const c = this.config!, { rows, columns, walls, zones: zoneCount } = this.grid;
    const field = <T extends HTMLElement>(id: string) => this.root.querySelector<T>(`#${id}`)!;
    field<HTMLSelectElement>("layout").value = c.variant ?? "normal";
    const name = field<HTMLInputElement>("name");
    if (this.root.activeElement !== name) name.value = c.name ?? "";
    field("rows").textContent = String(rows);
    field("columns").textContent = String(columns);
    field<HTMLInputElement>("walls").checked = walls;
    field<HTMLInputElement>("beam").value = String(c.beam_angle ?? 40);
    this.showBeam();
    field("layout-summary").textContent = `${rows} × ${columns}${walls ? " · along the walls" : ""} · ${c.beam_angle ?? 40}° beam`;
    for (const [step, disabled] of [["rows:-1", rows <= 1], ["rows:1", rows >= MAX_GRID], ["columns:-1", columns <= 1], ["columns:1", columns >= MAX_GRID]] as const)
      this.root.querySelector<HTMLButtonElement>(`[data-step="${step}"]`)!.disabled = disabled;
    field<HTMLButtonElement>("ring-split").disabled = walls || rows < 3 || columns < 3;
    field<HTMLButtonElement>("add-zone").disabled = zoneCount >= MAX_ZONES;

    const zones = c.zones ?? [];
    const list = field("zones");
    if (list.childElementCount !== zones.length || this.root.activeElement?.closest?.(".zone") == null) {
      list.replaceChildren(...zones.map((zone, i) => {
        const row = document.createElement("div");
        row.className = "zone";
        row.innerHTML = `<span class="badge" aria-hidden="true" style="background:${ZONE_COLORS[i]}">${i + 1}</span>
          <label>Zone ${i + 1} entity<input list="lights" data-field="entity" data-index="${i}" required pattern="light\\.[a-z0-9_]+" placeholder="light.example"></label>
          <label>Zone ${i + 1} name<input data-field="name" data-index="${i}" placeholder="Entity name"></label>
          <button type="button" class="remove" data-remove="${i}" aria-label="Remove zone ${i + 1}" ${zones.length === 1 ? "disabled" : ""}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 7h12M9 7V5h6v2M8 7l1 12h6l1-12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
        row.querySelector<HTMLInputElement>('[data-field="entity"]')!.value = zone.entity ?? "";
        row.querySelector<HTMLInputElement>('[data-field="name"]')!.value = zone.name ?? "";
        return row;
      }));
    }

    const cells = this.cells(), counts = zones.map(() => 0);
    const size = Math.max(30, Math.min(40, Math.floor(Math.min(480 / columns, 400 / rows)) - 8));
    const plan = this.root.querySelector(".plan")!, nodes: Element[] = [];
    cells.forEach((row, r) => row.forEach((v, col) => {
      const p = planPosition(r, col, rows, columns, walls);
      const place = `left:${(p.x * 100).toFixed(2)}%;top:${(p.y * 100).toFixed(2)}%`;
      if (walls && !onRing(r, col, rows, columns)) {
        const dot = document.createElement("span");
        dot.className = "unused"; dot.setAttribute("style", place);
        nodes.push(dot);
        return;
      }
      if (v) counts[v - 1]++;
      const button = document.createElement("button");
      button.type = "button"; button.dataset.cell = `${r},${col}`;
      button.className = v ? "" : "none";
      button.textContent = v ? String(v) : "";
      button.setAttribute("style", `${place};width:${size}px;height:${size}px${v ? `;background:${ZONE_COLORS[v - 1]};border:2px solid var(--card-background-color,#1c1c1c);box-shadow:0 0 0 1px ${ZONE_COLORS[v - 1]}` : ""}`);
      const label = v ? `${zones[v - 1]?.name || `Zone ${v}`} (zone ${v})` : "no spot";
      button.setAttribute("aria-label", `Row ${r + 1} from the back wall, column ${col + 1}: ${label}. Activate to change.`);
      nodes.push(button);
    }));
    plan.replaceChildren(...nodes);
    this.root.querySelector(".legend")!.replaceChildren(...zones.map((zone, i) => {
      const item = document.createElement("span");
      item.innerHTML = `<i style="background:${ZONE_COLORS[i]}"></i>`;
      item.append(`${i + 1} · ${zone.name || zone.entity || `Zone ${i + 1}`} (${counts[i]})`);
      return item;
    }), Object.assign(document.createElement("span"), { innerHTML: `<i style="border:1px dashed currentColor"></i>No spot` }));
  }
}
