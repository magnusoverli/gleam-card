import { foundationStyles } from "../../shared/theme";
import type { CoverConfig, EntityState, HomeAssistant } from "../../types";
import { action, elapsed, fraction, position, send, settings, type Travel } from "./model";
import { garage, renderer, type Side } from "./garage";

const template = (side?: Side) => `<style>${foundationStyles}
:host{container-type:inline-size;min-width:0}ha-card{padding:12px 16px;display:grid;gap:4px;align-items:center}
h2{margin:0;font-size:18px;font-weight:550;overflow-wrap:anywhere}
.scene{border:0;background:none;border-radius:12px;padding:0;width:100%;display:block}
svg{display:block;width:100%;height:clamp(100px,40cqi,180px)}
.detail{min-width:0}.row{display:flex;gap:8px;align-items:center;justify-content:space-between;min-height:40px}
.state{font-size:16px;color:#86ecf2}.age,.hint{color:var(--gleam-muted,#8ba8c6);font-size:12px}
ha-card[data-state=open] .state{color:#ffc27c}
ha-card[data-unknown] svg{opacity:.35}ha-card[data-unknown] :is(.door-skin,.panel,.interior,.spill,.air){visibility:hidden}
.action:disabled{cursor:default}.hint{margin:0;min-height:1.4em}
@container(min-width:590px){ha-card{grid-template-columns:1.15fr 1fr;column-gap:20px}.scene{grid-column:1;grid-row:1/3}header{align-self:end}.detail{align-self:start}}
:host([compact]) ha-card{display:block;padding:8px}.row{flex-wrap:wrap}
:host([compact]) svg{height:clamp(64px,44cqi,104px)}
:host([compact]) h2,:host([bay]) h2{font-size:14px}
:host([compact]) .age,:host([bay]) .age{display:block}
:host([bay]) ha-card{display:flex;flex-direction:column;align-items:stretch;border:0;background:none;border-radius:0;box-shadow:none;padding:0}
:host([bay]) ha-card,:host([bay]) svg{overflow:visible}
:host([bay]) svg{width:100%;height:auto;pointer-events:none}
:host([bay]) .detail,:host([bay]) h2{padding-inline:6px}
</style><ha-card><header><h2></h2>${side ? "" : '<span class="experimental">Experimental</span>'}</header><button class="scene" aria-label="${side ? `${side} door controls` : 'Garage controls'}" aria-expanded="false" aria-controls="action">${garage(side)}</button>
<div class="detail"><div class="row"><div><strong class="state" role="status"></strong><span class="age"></span></div>
<button id="action" class="action" hidden></button></div><p class="hint"></p></div></ha-card>`;

export class GleamCover extends HTMLElement {
  private root = this.attachShadow({mode:"open"});
  private variant?: CoverConfig["variant"];
  private bays: CoverBay[] = [];
  private client?: HomeAssistant;
  static getConfigElement() { return document.createElement("gleam-cover-editor"); }
  static getStubConfig(hass?: HomeAssistant) {
    const ids = Object.keys(hass?.states ?? {}).filter(id => id.startsWith("cover."));
    return { entity: ids.find(id => hass?.states[id].attributes.device_class === "garage") ?? ids[0] ?? "cover.garage_door" };
  }
  getCardSize() { return this.variant === "compact" ? 2 : 4; }
  getGridOptions() { return { columns: this.variant === "compact" ? 6 : 12, rows: "auto", min_columns: this.variant === "double" ? 12 : 6 }; }
  setConfig(value: CoverConfig) {
    const config = settings(value), variant = config.variant ?? "normal";
    if (variant !== this.variant) {
      this.variant = variant;
      if (variant === "double") {
        this.root.innerHTML = `<style>${foundationStyles}:host{min-width:0}ha-card{padding:12px}
          h2{font-size:18px;margin:0 0 8px;overflow-wrap:anywhere}.bays{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));max-width:560px;margin-inline:auto}</style>
          <ha-card><header><h2></h2><span class="experimental">Experimental</span></header><div class="bays"></div></ha-card>`;
        this.bays = [new CoverBay("left"), new CoverBay("right")];
        this.bays.forEach(b => b.toggleAttribute("bay",true));
        this.root.querySelector(".bays")!.append(...this.bays);
      } else {
        const bay = new CoverBay();
        bay.toggleAttribute("compact",variant === "compact");
        const style = document.createElement("style");
        style.textContent = ":host{display:block;min-width:0}";
        this.bays = [bay]; this.root.replaceChildren(style,bay);
      }
    }
    if (variant === "double") {
      this.root.querySelector("h2")!.textContent = config.name ?? "Garage";
      this.bays[0].setConfig({entity:config.entity,name:"Left door",travel_seconds:config.travel_seconds});
      this.bays[1].setConfig({entity:config.right_entity!,name:"Right door",travel_seconds:config.right_travel_seconds ?? config.travel_seconds});
    } else this.bays[0].setConfig(config);
    if (this.client) this.hass = this.client;
  }
  set hass(value: HomeAssistant) { this.client = value; this.bays.forEach(b => b.hass = value); }
}

class CoverBay extends HTMLElement {
  private root = this.attachShadow({mode:"open"});
  private config?: ReturnType<typeof settings>;
  private client?: HomeAssistant;
  private entity?: EntityState;
  private renderDoor: (p:number) => void;
  private scene: HTMLButtonElement;
  private button: HTMLButtonElement;
  private observer?: IntersectionObserver;
  private visible = false;
  private frame = 0;
  private timer = 0;
  private p = 0;
  private travel?: Travel;
  private target?: "open" | "closed";
  private confirmed = false;
  private confirmBy = 0;
  private command = false;
  private acknowledged = false;
  private reportedState?: string;
  private reportedPosition?: number;
  private revealed = false;
  private error = "";
  private generation = 0;

  constructor(private side?: Side) {
    super();
    this.root.innerHTML = template(side);
    this.scene = this.root.querySelector(".scene")!;
    this.button = this.root.querySelector(".action")!;
    this.renderDoor = renderer(this.root.querySelector("svg")!);
    this.scene.onclick = () => { this.revealed = !this.revealed; this.refresh(); };
    this.button.onclick = () => void this.act();
  }
  connectedCallback() {
    this.observer = new IntersectionObserver(([entry]) => { this.visible = entry.isIntersecting; this.refresh(); });
    this.observer.observe(this);
    document.addEventListener("visibilitychange", this.refresh);
    this.sync(true);
  }
  disconnectedCallback() {
    this.observer?.disconnect(); this.visible = false;
    document.removeEventListener("visibilitychange", this.refresh);
    this.reset(); this.entity = undefined;
  }
  private reset() {
    cancelAnimationFrame(this.frame); clearTimeout(this.timer); this.frame = this.timer = 0;
    this.generation++; this.travel = undefined; this.target = undefined; this.confirmed = false;
    this.command = false;
    this.revealed = false; this.error = "";
  }
  setConfig(value: CoverConfig) {
    const config = settings(value);
    if (config.entity !== this.config?.entity) { this.reset(); this.entity = undefined; }
    this.config = config; this.sync(true);
  }
  set hass(value: HomeAssistant) { this.client = value; this.sync(false); }
  private begin(target: "open" | "closed") {
    const now = performance.now();
    if (this.travel) this.p = fraction(this.travel, now);
    const to = target === "open" ? 1 : 0;
    this.travel = { from:this.p, to, start:now, duration:Math.max(1, Math.abs(to-this.p)*this.config!.travel_seconds*1000) };
    this.target = target; this.confirmed = false; this.error = "";
    this.confirmBy = now + this.travel.duration + 5000;
  }
  private sync(force: boolean) {
    if (!this.config || !this.isConnected) return;
    const next = this.client?.states[this.config.entity], prev = this.entity;
    const state = next?.state, pos = position(next);
    if (!force && next === prev && state === this.reportedState && pos === this.reportedPosition) return;
    if (state !== this.reportedState) this.error = "";
    const previousState = this.reportedState;
    this.reportedState = state; this.reportedPosition = pos;
    this.entity = next;
    if (this.command && (state === this.target || state === (this.target === "open" ? "opening" : "closing"))) this.acknowledged = true;
    // Some openers expose only 0/100, even during physical travel. Neither
    // the old endpoint nor an early final endpoint is a movement sample.
    const measured = pos !== undefined && (!this.travel || (pos > 0 && pos < 1));
    if (state === "opening" || state === "closing") {
      const target = state === "opening" ? "open" : "closed";
      if (!prev && pos === undefined) this.p = target === "open" ? 0 : 1;
      if (!this.command && this.target !== target && (!prev || state !== previousState)) this.begin(target);
      if (measured) { this.travel = undefined; this.p = pos; }
    } else if (state === "open" || state === "closed") {
      if (measured) { this.travel = undefined; this.p = pos; }
      if (state === this.target) this.confirmed = true;
      else if (!this.command && (!this.target || previousState !== state)) {
        this.travel = undefined; this.target = undefined;
        this.p = pos ?? (state === "closed" ? 0 : 1);
      }
    } else if (!this.command) { this.reset(); this.p = 0; }
    this.refresh();
  }
  private async act() {
    const direction = action(this.entity);
    if (!this.client || !this.config || !direction || this.target || !this.revealed) return;
    const seq = ++this.generation;
    this.begin(direction === "open" ? "open" : "closed");
    this.command = true;
    this.acknowledged = false;
    this.confirmBy = performance.now() + this.config.travel_seconds * 1000 + 5000;
    this.refresh();
    try { await send(this.client, this.config.entity, direction); }
    catch {
      if (seq !== this.generation || !this.command || this.acknowledged) return;
      this.command = false; this.target = undefined; this.travel = undefined; this.error = "Command failed. Check the door and try again.";
      this.sync(true);
    }
  }
  private paint = () => {
    this.frame = 0;
    if (this.travel) {
      this.p = fraction(this.travel, performance.now());
      if (this.p === this.travel.to) this.travel = undefined;
    }
    this.renderDoor(this.p);
    if (this.travel) this.frame = requestAnimationFrame(this.paint);
    else this.refresh();
  };
  private refresh = () => {
    clearTimeout(this.timer); this.timer = 0;
    const active = this.isConnected && this.visible && !document.hidden;
    if (!active) { cancelAnimationFrame(this.frame); this.frame = 0; }
    if (this.travel && performance.now() >= this.travel.start + this.travel.duration) {
      this.p = this.travel.to; this.travel = undefined;
    }
    const now = performance.now(), state = this.entity?.state ?? "unavailable";
    const travelEnd = this.confirmBy - 5000;
    if (this.command) this.confirmed = state === this.target;
    if (!this.travel && this.confirmed && (!this.command || now >= travelEnd)) {
      this.command = false;
      this.target = undefined; this.confirmed = false; this.revealed = false;
    }
    const waiting = this.target && (this.command ? now >= travelEnd : !this.travel && (state === "open" || state === "closed"));
    if (waiting && performance.now() >= this.confirmBy) {
      this.command = false; this.target = undefined; this.travel = undefined; this.revealed = false;
      this.p = position(this.entity) ?? (state === "open" ? 1 : state === "closed" ? 0 : this.p);
      this.error = `Movement not confirmed. Home Assistant still reports ${state}.`;
    }
    const known = ["closed","open","opening","closing"].includes(state);
    const label = known || state === "unknown" ? state : "unavailable";
    const pending = this.target ? !waiting
      ? this.target === "open" ? "Opening…" : "Closing…" : "Awaiting confirmation" : "";
    const put = (selector:string, text:string) => {
      const node = this.root.querySelector(selector)!;
      if (node.textContent !== text) node.textContent = text;
    };
    put("h2", this.config?.name ?? String(this.entity?.attributes.friendly_name ?? "Garage"));
    put(".state", label[0].toUpperCase()+label.slice(1));
    const age = state === "closed" || state === "open" ? elapsed(this.entity?.last_changed) : "";
    put(".age", age ? ` · ${age}` : "");
    const surface = this.root.querySelector("ha-card")!;
    surface.setAttribute("data-state",state); surface.toggleAttribute("data-unknown",!known);
    const direction = action(this.entity);
    this.scene.setAttribute("aria-expanded",String(this.revealed));
    this.button.hidden = !this.revealed || (!pending && !direction);
    this.button.disabled = !!pending || !direction;
    put(".action", pending || (direction === "open" ? "Open" : "Close") + (this.side ? ` ${this.side} door` : ""));
    put(".hint", this.error || (!this.revealed && (direction || pending) ? "Tap garage for controls" : ""));
    if (!active) return;
    if (this.travel && !this.frame) this.frame = requestAnimationFrame(this.paint);
    else if (!this.travel) this.renderDoor(this.p);
    const ageDelay = age ? 60000 - (Date.now()-Date.parse(this.entity!.last_changed!)) % 60000 : Infinity;
    const deadline = this.command && now < travelEnd ? travelEnd : waiting && this.target ? this.confirmBy : Infinity;
    const delay = Math.min(ageDelay, Math.max(1,deadline-now));
    if (Number.isFinite(delay)) this.timer = window.setTimeout(this.refresh,delay);
  };
}
if (!customElements.get("gleam-cover-bay")) customElements.define("gleam-cover-bay", CoverBay);
