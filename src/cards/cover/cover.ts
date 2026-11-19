import { foundationStyles } from "../../shared/theme";
import type { CoverConfig, EntityState, HomeAssistant } from "../../types";
import { action, canSetPosition, elapsed, fraction, position, send, sendPosition, settings, type Travel } from "./model";
import { labelCenter, type Side } from "./garage";
import { sharedTemperature } from "./garage-settings";
import { kinds, suggestedKind, isWindowCover, type CoverKind } from "./kinds";
import { tiltControls, tiltMarkup, tiltPosition } from "./tilt";

const template = (kind: CoverKind, side?: Side) => `<style>${foundationStyles}
:host{container-type:inline-size;min-width:0}ha-card{padding:12px 16px;display:grid;gap:4px;align-items:center}
h2{margin:0;font-size:18px;font-weight:550;overflow-wrap:anywhere}
.scene{border:0;background:none;border-radius:12px;padding:0;width:100%;display:block}
:host([shade]) .scene{position:relative;isolation:isolate}
.shade-layer{position:absolute;inset:0;pointer-events:none;transform:translateZ(0)}
svg{display:block;width:100%;height:clamp(100px,40cqi,180px)}
.detail{min-width:0}.row{display:flex;gap:8px;align-items:center;justify-content:space-between;min-height:40px}
.state{font-size:16px;color:#86ecf2}.age,.hint{color:var(--gleam-muted,#8ba8c6);font-size:12px}
ha-card[data-state=open] .state{color:#ffc27c}
ha-card[data-unknown] svg{opacity:.35}ha-card[data-unknown] :is(.door-skin,.panel,.interior,.spill,.air,.shade-cloth,.slats,.shade-rail){visibility:hidden}
.tilt{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.tilt label,.tilt input,.lift-slider,.lift-slider input{display:block;width:100%}
.action:disabled{cursor:default}.hint{margin:0}.hint:empty{display:none}
@container(min-width:590px){ha-card{grid-template-columns:1.15fr 1fr;column-gap:20px}.scene{grid-column:1;grid-row:1/3}header{align-self:end}.detail{align-self:start}}
:host([compact]) ha-card{display:block;padding:8px}.row{flex-wrap:wrap}
:host([compact]) svg{height:clamp(64px,44cqi,104px)}
:host([compact]) h2,:host([bay]) h2{font-size:14px}
:host([compact]) .age,:host([bay]) .age{display:block}
:host([bay]) ha-card{display:flex;flex-direction:column;align-items:stretch;border:0;background:none;border-radius:0;box-shadow:none;padding:0}
:host([bay]) ha-card,:host([bay]) svg{overflow:visible}
:host([bay]) svg{width:100%;height:auto;pointer-events:none}
:host([bay]) .detail,:host([bay]) h2{padding-inline:6px}
/* A moving shade changes both its status and its action caption on arrival.
   Keep those changes out of the window's layout (and scroll anchoring). */
:host([shade]) .row{display:grid;grid-template-columns:minmax(0,1fr) 9em;gap:6px}
:host([shade]) .action{width:100%}
@container(max-width:420px){
  :host([shade]) .row{grid-template-columns:1fr}
  :host([shade]) .row>div{min-height:3lh}
  :host([shade]) .age{display:block}
}
</style><ha-card>${side ? "" : '<span class="experimental">Experimental</span><header class="badge-clearance"><h2></h2></header>'}<div class="scene">${kinds[kind].markup(side)}</div>
<div class="detail"><div class="row"><div><strong class="state" role="status"></strong><span class="age"></span></div>
<button id="action" class="action" hidden></button></div><label class="lift-slider" hidden>Lift position · <span></span>
<input type="range" aria-label="${side ? `${side} door lift position` : 'Lift position'}" min="0" max="100" step="1"></label>${kind==="blind"?tiltMarkup:""}<p class="hint"></p></div></ha-card>`;

export class GleamCover extends HTMLElement {
  private root = this.attachShadow({mode:"open"});
  private variant?: CoverConfig["variant"];
  private kind?: CoverKind;
  private bays: CoverBay[] = [];
  private client?: HomeAssistant;
  static getConfigElement() { return document.createElement("gleam-cover-editor"); }
  static getStubConfig(hass?: HomeAssistant) {
    const ids = Object.keys(hass?.states ?? {}).filter(id => id.startsWith("cover."));
    const entity = ids.find(id => suggestedKind(hass?.states[id].attributes.device_class)) ?? ids[0] ?? "cover.garage_door";
    return { entity, cover_type:suggestedKind(hass?.states[entity]?.attributes.device_class) ?? "garage" };
  }
  getCardSize() { return this.variant === "compact" ? 2 : 4; }
  getGridOptions() { return { columns: this.variant === "compact" ? 6 : 12, rows: "auto", min_columns: this.variant === "double" ? 12 : 6 }; }
  setConfig(value: CoverConfig) {
    const config = settings(value), variant = config.variant ?? "normal";
    const kind = config.cover_type ?? "garage";
    if (variant !== this.variant || kind !== this.kind) {
      this.kind = kind;
      this.variant = variant;
      if (variant === "double") {
        this.root.innerHTML = `<style>${foundationStyles}:host{min-width:0}ha-card{padding:12px}
          h2{font-size:18px;margin:0 0 8px;overflow-wrap:anywhere}.bays{position:relative;container-type:inline-size;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));max-width:560px;margin-inline:auto}
          .labels{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));position:absolute;inset-inline:0;top:1cqi;transform:translateY(-100%);z-index:1;pointer-events:none}
          .labels.flat{top:5cqi}
          .labels h3{position:relative;transform:translateX(-50%);width:62%;text-align:center;font-size:14px;line-height:1.15;margin:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
          </style>
          <ha-card><span class="experimental">Experimental</span><header class="badge-clearance"><h2></h2></header><div class="bays"></div></ha-card>`;
        this.bays = [new CoverBay(kind,"left"), new CoverBay(kind,"right")];
        this.bays.forEach(b => b.toggleAttribute("bay",true));
        const labels = document.createElement("div");
        labels.className = "labels";
        for (const side of ["left","right"] as const) {
          const heading = document.createElement("h3");
          heading.style.left = labelCenter(side);
          heading.style.gridColumn = side === "left" ? "1" : "2";
          labels.append(heading);
        }
        this.root.querySelector(".bays")!.append(labels,...this.bays);
      } else {
        const bay = new CoverBay(kind);
        bay.toggleAttribute("shade",isWindowCover(kind));
        bay.toggleAttribute("compact",variant === "compact");
        const style = document.createElement("style");
        style.textContent = ":host{display:block;min-width:0}";
        this.bays = [bay]; this.root.replaceChildren(style,bay);
      }
    }
    if (variant === "double") {
      this.root.querySelector("h2")!.textContent = config.name ?? "Garage";
      const labels = this.root.querySelector<HTMLElement>(".labels")!;
      const names = [config.left_label?.trim(),config.right_label?.trim()];
      labels.hidden = !names.some(Boolean);
      labels.classList.toggle("flat",config.roof_type === "flat");
      labels.querySelectorAll("h3").forEach((heading,i) => {
        heading.textContent = names[i] ?? "";
        heading.hidden = !names[i];
      });
      this.bays[0].setConfig({entity:config.entity,name:config.left_label?.trim(),travel_seconds:config.travel_seconds,
        light_entity:config.light_entity,light_temperature_kelvin:sharedTemperature(config)});
      this.bays[1].setConfig({entity:config.right_entity!,name:config.right_label?.trim(),travel_seconds:config.right_travel_seconds ?? config.travel_seconds,
        light_entity:config.right_light_entity,light_temperature_kelvin:sharedTemperature(config)});
    } else this.bays[0].setConfig(config);
    for (const bay of this.bays) bay.toggleAttribute("flat-roof", config.roof_type === "flat");
    if (this.client) this.hass = this.client;
  }
  set hass(value: HomeAssistant) { this.client = value; this.bays.forEach(b => b.hass = value); }
}

class CoverBay extends HTMLElement {
  private root = this.attachShadow({mode:"open"});
  private config?: ReturnType<typeof settings>;
  private client?: HomeAssistant;
  private entity?: EntityState;
  private renderDoor: (p:number,tilt?:number) => void;
  private updateTilt?: ReturnType<typeof tiltControls>;
  private lastTilt?: number;
  private tiltTarget?: number;
  private tiltTravel?: Travel;
  private button: HTMLButtonElement;
  private slider: HTMLInputElement;
  private positionTarget?: number;
  private draft?: number;
  private observer?: IntersectionObserver;
  private visible = false;
  private frame = 0;
  private lastPainted = -1;
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
  private error = "";
  private generation = 0;

  constructor(private kind: CoverKind = "garage", private side?: Side) {
    super();
    this.root.innerHTML = template(kind,side);
    this.button = this.root.querySelector(".action")!;
    this.slider = this.root.querySelector(".lift-slider input")!;
    this.slider.oninput = () => { this.draft=this.slider.valueAsNumber; this.refresh(); };
    this.slider.onchange = () => void this.setPosition();
    this.renderDoor = kinds[kind].mount(this.root.querySelector("svg")!);
    if (kind==="blind") this.updateTilt=tiltControls(this.root.querySelector(".tilt")!);
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
    this.positionTarget = this.draft = undefined;
    this.tiltTarget = undefined; this.tiltTravel = undefined;
    this.error = "";
  }
  setConfig(value: CoverConfig) {
    const config = settings(value);
    if (this.kind === "shade" && config.shade_opacity !== this.config?.shade_opacity)
      this.style.setProperty("--shade-opacity", String((config.shade_opacity ?? 100)/100));
    if (isWindowCover(this.kind) && config.window_image !== this.config?.window_image) {
      const image = this.root.querySelector<HTMLImageElement>(".window-view")!;
      image.hidden = !config.window_image?.trim();
      if (!image.hidden) image.src = config.window_image!.trim();
      else image.removeAttribute("src");
    }
    if (isWindowCover(this.kind)) {
      if (config.glazing_bar_width !== this.config?.glazing_bar_width) this.style.setProperty("--glazing-width",String(config.glazing_bar_width ?? 3));
      if (config.glazing_bar_color !== this.config?.glazing_bar_color) this.style.setProperty("--glazing-color",config.glazing_bar_color ?? "#30566a");
      if (config.window_image_zoom !== this.config?.window_image_zoom) this.style.setProperty("--photo-scale",String((config.window_image_zoom ?? 100)/100));
      if (config.window_image_x !== this.config?.window_image_x) this.style.setProperty("--photo-x",`${config.window_image_x ?? 50}%`);
      if (config.window_image_y !== this.config?.window_image_y) this.style.setProperty("--photo-y",`${config.window_image_y ?? 50}%`);
    }
    if (config.entity !== this.config?.entity) { this.reset(); this.entity = undefined; }
    if (config.light_temperature_kelvin !== this.config?.light_temperature_kelvin) {
      const k = config.light_temperature_kelvin;
      this.toggleAttribute("tinted", k !== undefined);
      if (k === undefined) this.style.removeProperty("--lamp-color");
      else {
        // Warm amber through neutral white to cool daylight.
        const t = (k - 2000) / 4500;
        this.style.setProperty("--lamp-color",`rgb(${Math.round(255-35*t)} ${Math.round(168+68*t)} ${Math.round(86+169*t)})`);
      }
    }
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
    const id = this.kind === "garage" && this.config.light_entity, lamp = id ? this.client?.states[id] : undefined;
    this.toggleAttribute("lamp-off", !!id && lamp?.state !== "on");
    const next = this.client?.states[this.config.entity], prev = this.entity;
    this.updateTilt?.(this.client,this.config.entity,next);
    const state = next?.state, pos = position(next);
    const tilt = this.updateTilt ? tiltPosition(next) : undefined;
    const tiltChanged = tilt !== this.tiltTarget;
    if (!force && next === prev && state === this.reportedState && pos === this.reportedPosition &&
      !tiltChanged) return;
    if (tiltChanged) {
      const now = performance.now();
      const from = this.tiltTravel ? fraction(this.tiltTravel,now) : this.tiltTarget;
      const duration = (this.config.tilt_seconds ?? 1)*1000;
      this.tiltTravel = tilt !== undefined && from !== undefined && from !== tilt && duration > 0
        ? {from,to:tilt,start:now,duration} : undefined;
      this.tiltTarget = tilt;
    }
    if (state !== this.reportedState) this.error = "";
    const previousState = this.reportedState, previousPosition = this.reportedPosition;
    this.reportedState = state; this.reportedPosition = pos;
    this.entity = next;
    if (this.positionTarget !== undefined) {
      if (!canSetPosition(next)) {
        this.positionTarget=undefined; this.travel=undefined;
      } else {
        if (pos !== undefined && pos !== this.positionTarget && pos !== previousPosition) {
          this.p=pos;
          this.startPositionTravel(this.positionTarget);
        }
        this.refresh(); return;
      }
    }
    if (this.command && (state === this.target || state === (this.target === "open" ? "opening" : "closing"))) this.acknowledged = true;
    // Some openers expose only 0/100, even during physical travel. Neither
    // the old endpoint nor an early final endpoint is a movement sample.
    const intermediate = pos !== undefined && pos > 0 && pos < 1 &&
      (!isWindowCover(this.kind) || pos !== previousPosition || state === this.target);
    if (state === "opening" || state === "closing") {
      const target = state === "opening" ? "open" : "closed";
      if (!prev && pos === undefined) this.p = target === "open" ? 0 : 1;
      if (!this.command && this.target !== target && (!prev || state !== previousState)) this.begin(target);
      if (pos !== undefined && (!this.travel || intermediate)) {
        this.p = pos;
        // Moving shades often send only a few position samples. Anchor the
        // illustration to this sample, then roll the remaining distance rather
        // than holding a translucent sheet over the photo until confirmation.
        const to = target === "open" ? 1 : 0;
        this.travel = isWindowCover(this.kind) && this.target === target && pos !== to
          ? {from:pos,to,start:performance.now(),duration:Math.max(1,Math.abs(to-pos)*this.config.travel_seconds*1000)}
          : undefined;
      }
    } else if (state === "open" || state === "closed") {
      if (pos !== undefined && (!this.travel || intermediate)) {
        this.travel = undefined; this.p = pos;
      }
      if (state === this.target) {
        this.confirmed = true;
        if (!this.travel && isWindowCover(this.kind) && pos === undefined) this.p = state === "open" ? 1 : 0;
      }
      else if (!this.command && (!this.target || previousState !== state)) {
        this.travel = undefined; this.target = undefined;
        this.p = pos ?? (state === "closed" ? 0 : 1);
      }
    } else if (!this.command) { this.reset(); this.p = 0; }
    this.refresh();
  }
  private async act() {
    const direction = action(this.entity);
    if (!this.client || !this.config || !direction || this.target || this.positionTarget !== undefined) return;
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
  private startPositionTravel(to:number) {
    this.travel={from:this.p,to,start:performance.now(),duration:Math.max(1,Math.abs(to-this.p)*this.config!.travel_seconds*1000)};
  }
  private async setPosition() {
    const percent=this.slider.valueAsNumber;
    this.draft=undefined;
    if (!this.client || !this.config || !canSetPosition(this.entity) || this.target || this.positionTarget !== undefined ||
        !Number.isInteger(percent) || percent<0 || percent>100) { this.refresh(); return; }
    const seq=++this.generation;
    this.positionTarget=percent/100;
    this.error="";
    this.startPositionTravel(this.positionTarget);
    this.confirmBy=performance.now()+this.config.travel_seconds*1000+5000;
    this.refresh();
    try { await sendPosition(this.client,this.config.entity,percent); }
    catch {
      if (seq!==this.generation || this.positionTarget===undefined) return;
      this.positionTarget=undefined; this.travel=undefined; this.error="Position command failed.";
      this.sync(true);
    }
  }
  private paint = () => {
    this.frame = 0;
    if (this.travel) {
      this.p = fraction(this.travel, performance.now());
      if (this.p === this.travel.to) this.travel = undefined;
    }
    this.lastTilt = this.tiltTravel ? fraction(this.tiltTravel,performance.now()) : this.tiltTarget;
    if (this.lastTilt === this.tiltTarget) this.tiltTravel = undefined;
    this.renderDoor(this.p,this.lastTilt);
    this.lastPainted = this.p;
    if (this.travel || this.tiltTravel) this.frame = requestAnimationFrame(this.paint);
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
    if (this.positionTarget !== undefined) {
      const actual = position(this.entity) ?? (state === "closed" ? 0 : undefined);
      if (!this.travel && actual === this.positionTarget && (state==="open" || state==="closed")) this.positionTarget=undefined;
      else if (now>=this.confirmBy) {
        this.travel=undefined; this.positionTarget=undefined; this.p=actual ?? (state==="open"?1:0);
        this.error="Target position not confirmed.";
      }
    }
    const travelEnd = this.confirmBy - 5000;
    if (this.command) this.confirmed = state === this.target;
    if (!this.travel && this.confirmed && (!this.command || now >= travelEnd)) {
      this.command = false;
      this.target = undefined; this.confirmed = false;
    }
    const waiting = this.target && (this.command ? now >= travelEnd : !this.travel && (state === "open" || state === "closed"));
    if (waiting && performance.now() >= this.confirmBy) {
      this.command = false; this.target = undefined; this.travel = undefined;
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
    if (!this.side) put("h2", this.config?.name ?? String(this.entity?.attributes.friendly_name ?? kinds[this.kind].label));
    const measured = isWindowCover(this.kind) && known ? position(this.entity) : undefined;
    put(".state", label[0].toUpperCase()+label.slice(1)+(measured === undefined ? "" : ` · ${Math.round(measured*100)}% open`));
    const age = state === "closed" || state === "open" ? elapsed(this.entity?.last_changed) : "";
    put(".age", age ? ` · ${age}` : "");
    const surface = this.root.querySelector("ha-card")!;
    surface.setAttribute("data-state",state); surface.toggleAttribute("data-unknown",!known);
    const direction = action(this.entity);
    this.button.hidden = !pending && !direction;
    this.button.disabled = !!pending || !direction || this.positionTarget!==undefined;
    this.slider.parentElement!.hidden = !canSetPosition(this.entity);
    this.slider.disabled = !canSetPosition(this.entity) || !!this.target || this.positionTarget!==undefined;
    const actual = position(this.entity), wanted = this.draft ?? (this.positionTarget===undefined ? undefined : Math.round(this.positionTarget*100));
    const value=wanted ?? (actual===undefined ? (state==="closed"?0:50) : Math.round(actual*100));
    this.slider.value=String(value);
    const liftText=wanted!==undefined ? `Target ${wanted}%` : actual===undefined ? "Not reported" : `${value}% open`;
    put(".lift-slider span",liftText);
    this.slider.setAttribute("aria-valuetext",liftText);
    const caption = pending || (direction === "open" ? "Open" : "Close");
    put(".action", caption);
    this.button.setAttribute("aria-label", this.side ? `${caption} ${this.config?.name || `${this.side} door`}` : caption);
    put(".hint", this.error);
    if (!active) return;
    if ((this.travel || this.tiltTravel || this.p !== this.lastPainted || this.lastTilt !== this.tiltTarget) && !this.frame) this.frame = requestAnimationFrame(this.paint);
    const ageDelay = age ? 60000 - (Date.now()-Date.parse(this.entity!.last_changed!)) % 60000 : Infinity;
    const deadline = this.positionTarget!==undefined ? this.confirmBy : this.command && now < travelEnd ? travelEnd : waiting && this.target ? this.confirmBy : Infinity;
    const delay = Math.min(ageDelay, Math.max(1,deadline-now));
    if (Number.isFinite(delay)) this.timer = window.setTimeout(this.refresh,delay);
  };
}
if (!customElements.get("gleam-cover-bay")) customElements.define("gleam-cover-bay", CoverBay);
