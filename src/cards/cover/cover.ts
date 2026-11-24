import { foundationStyles } from "../../shared/theme";
import type { CoverConfig, EntityState, HomeAssistant } from "../../types";
import { available, canSetPosition, canStop, elapsed, fraction, position, send, sendPosition, settings, type Direction, type Travel } from "./model";
import { labelCenter, type Side } from "./garage";
import { sharedTemperature } from "./garage-settings";
import { kinds, suggestedKind, isWindowCover, type CoverKind } from "./kinds";
import { tiltControls, tiltMarkup, tiltPosition } from "./tilt";
import { setMountingSide, sizeWindow } from "./window-scene";

function put(node: Element | null, text: string) {
  if (node && node.textContent !== text) node.textContent = text;
}
function attribute(node: Element, name: string, value: string) {
  if (node.getAttribute(name) !== value) node.setAttribute(name,value);
}

const template = (kind: CoverKind, side?: Side) => `<style>${foundationStyles}
:host{container-type:inline-size;min-width:0}ha-card{padding:12px 16px;display:grid;gap:4px;align-items:center}
h2{margin:0;font-size:18px;font-weight:550;overflow-wrap:anywhere}
.scene{border:0;background:none;border-radius:12px;padding:0;width:100%;display:block}
:host([window-cover]) .scene{position:relative;isolation:isolate}
.shade-layer{position:absolute;inset:0;pointer-events:none;transform:translateZ(0);
  --cover-highlight:color-mix(in srgb,var(--cover-base),white 36%);
  --cover-light:color-mix(in srgb,var(--cover-base),white 15%);
  --cover-shadow:color-mix(in srgb,var(--cover-base),black 35%)}
:host([curtain-opening="left_to_right"]) .gather-left,:host([curtain-opening="right_to_left"]) .gather-right{display:none}
:host([curtain-opening="left_to_right"]) .gather-right,:host([curtain-opening="right_to_left"]) .gather-left{transform:scaleX(2)}
svg{display:block;width:100%;height:clamp(100px,40cqi,180px)}
.detail{min-width:0}.row{display:flex;gap:8px;align-items:center;justify-content:space-between;min-height:40px}
.state{font-size:16px;color:#86ecf2}.age,.hint{color:var(--gleam-muted,#8ba8c6);font-size:12px}
ha-card[data-state=open] .state{color:#ffc27c}
ha-card[data-unknown] svg{opacity:.35}ha-card[data-unknown] :is(.door-skin,.panel,.interior,.spill,.air,.shade-cloth,.slats,.shutter-curtain,.curtain-panels,.shade-rail){visibility:hidden}
.tilt{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.tilt label,.tilt input,.lift-slider,.lift-slider input{display:block;width:100%}
:host{--action-width:76px;--action-height:36px}
:host([compact]),:host([bay]){--action-width:64px;--action-height:32px}
.action:disabled{cursor:default}.actions{display:flex;align-items:center;flex-wrap:wrap;gap:4px}
.actions button{flex:none;width:var(--action-width);height:var(--action-height);padding:0 1px;line-height:1.15}
.hint{margin:0}.hint:empty{display:none}
@container(min-width:590px){ha-card{grid-template-columns:1.15fr 1fr;column-gap:20px}.scene{grid-column:1;grid-row:1/3}header{align-self:end}.detail{align-self:start}}
:host([compact]) ha-card{display:block;padding:8px}.row{flex-wrap:wrap}
:host([compact]) svg{height:clamp(64px,44cqi,104px)}
:host([window-cover]) svg{height:clamp(125px,50cqi,225px)}
:host([window-cover][compact]) svg{height:clamp(72px,49cqi,116px)}
:host([window-cover]) .lift-slider{display:grid;grid-template-columns:1fr auto;align-items:baseline;font-size:12px;color:var(--gleam-muted,#8ba8c6)}
:host([window-cover]) .lift-slider input{grid-column:1/-1;margin-inline:0}
:host([window-cover]) .lift-slider .lift-value{font-variant-numeric:tabular-nums}
:host([compact]) h2,:host([bay]) h2{font-size:14px}
:host([compact]) .age,:host([bay]) .age{display:block}
:host([bay]) ha-card{display:flex;flex-direction:column;align-items:stretch;border:0;background:none;border-radius:0;box-shadow:none;padding:0}
:host([bay]) ha-card,:host([bay]) svg{overflow:visible}
:host([bay]) svg{width:100%;height:auto;pointer-events:none}
:host([bay]) .detail,:host([bay]) h2{padding-inline:6px}
/* A moving shade changes both its status and its action caption on arrival.
   Keep those changes out of the window's layout (and scroll anchoring). */
:host([window-cover]) .row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px}
:host([window-cover]) .actions{justify-self:end}
@container(max-width:290px){
  :host([window-cover]) .row{grid-template-columns:1fr}
  :host([window-cover]) .readout{min-height:3lh}
  :host([window-cover]) .actions{justify-self:start}
}
</style><ha-card>${side ? "" : '<header><h2></h2></header>'}<div class="scene">${kinds[kind].markup(side)}</div>
<div class="detail"><div class="row"><div class="readout"><strong class="state" role="status"></strong><span class="age"></span></div>
<div class="actions"><button class="extra-open" hidden>Open</button><button id="action" class="action" hidden></button><button class="stop" hidden>Stop</button></div></div><label class="lift-slider" hidden>${kind === "curtain" ? "Opening position" : "Lift position"}${isWindowCover(kind) ? "" : " · "} <span class="lift-value"></span>
<input type="range" aria-label="${side ? `${side} door lift position` : kind === "curtain" ? "Opening position" : "Lift position"}" min="0" max="100" step="1"></label>${kind==="blind"?tiltMarkup:""}<p class="hint"></p></div></ha-card>`;

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
    if (kind !== this.kind || (variant === "double") !== (this.variant === "double")) {
      this.kind = kind;
      if (variant === "double") {
        this.root.innerHTML = `<style>${foundationStyles}:host{min-width:0}ha-card{padding:12px}
          h2{font-size:18px;margin:0 0 8px;overflow-wrap:anywhere}.bays{position:relative;container-type:inline-size;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));max-width:560px;margin-inline:auto}
          .labels{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));position:absolute;inset-inline:0;top:1cqi;transform:translateY(-100%);z-index:1;pointer-events:none}
          .labels.flat{top:5cqi}
          .labels h3{position:relative;transform:translateX(-50%);width:62%;text-align:center;font-size:14px;line-height:1.15;margin:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
          </style>
          <ha-card><header><h2></h2></header><div class="bays"></div></ha-card>`;
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
        bay.toggleAttribute("window-cover",isWindowCover(kind));
        const style = document.createElement("style");
        style.textContent = ":host{display:block;min-width:0}";
        this.bays = [bay]; this.root.replaceChildren(style,bay);
      }
      if (this.client) for (const bay of this.bays) bay.hass = this.client;
    }
    this.variant = variant;
    if (variant === "double") {
      put(this.root.querySelector("h2"),config.name ?? "Garage");
      const labels = this.root.querySelector<HTMLElement>(".labels")!;
      const names = [config.left_label?.trim(),config.right_label?.trim()];
      labels.hidden = !names.some(Boolean);
      labels.classList.toggle("flat",config.roof_type === "flat");
      labels.querySelectorAll("h3").forEach((heading,i) => {
        put(heading,names[i] ?? "");
        heading.hidden = !names[i];
      });
      this.bays[0].setConfig({entity:config.entity,name:config.left_label?.trim(),travel_seconds:config.travel_seconds,
        light_entity:config.light_entity,light_temperature_kelvin:sharedTemperature(config)});
      this.bays[1].setConfig({entity:config.right_entity!,name:config.right_label?.trim(),travel_seconds:config.right_travel_seconds ?? config.travel_seconds,
        light_entity:config.right_light_entity,light_temperature_kelvin:sharedTemperature(config)});
    } else {
      this.bays[0].toggleAttribute("compact",variant === "compact");
      this.bays[0].setConfig(config);
    }
    for (const bay of this.bays) bay.toggleAttribute("flat-roof", config.roof_type === "flat");
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
  private extraOpen: HTMLButtonElement;
  private stopButton: HTMLButtonElement;
  private stopRequest?: {deadline:number};
  private holdStoppedPosition = false;
  private slider: HTMLInputElement;
  private positionTarget?: number;
  private nodes: {title: Element|null; state: Element; age: Element; hint: Element; lift: Element; surface: Element};
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
    this.nodes={title:this.root.querySelector("h2"),state:this.root.querySelector(".state")!,
      age:this.root.querySelector(".age")!,hint:this.root.querySelector(".hint")!,
      lift:this.root.querySelector(".lift-value")!,surface:this.root.querySelector("ha-card")!};
    this.button = this.root.querySelector(".action")!;
    this.slider = this.root.querySelector(".lift-slider input")!;
    this.slider.oninput = () => { this.draft=this.slider.valueAsNumber; this.refresh(); };
    this.slider.onchange = () => void this.setPosition();
    this.renderDoor = kinds[kind].mount(this.root.querySelector("svg")!);
    if (kind==="blind") this.updateTilt=tiltControls(this.root.querySelector(".tilt")!);
    this.extraOpen = this.root.querySelector(".extra-open")!;
    this.extraOpen.onclick = () => void this.act("open");
    this.stopButton = this.root.querySelector(".stop")!;
    this.stopButton.onclick = () => void this.stop();
    this.button.onclick = () => void this.act(available(this.entity,"close") ? "close" : "open");
  }
  connectedCallback() {
    this.observer = new IntersectionObserver(([entry]) => { this.visible = entry.isIntersecting; this.refresh(); });
    this.observer.observe(this);
    document.addEventListener("visibilitychange", this.refresh);
    this.sync("reset");
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
    this.stopRequest = undefined; this.holdStoppedPosition = false;
    this.positionTarget = this.draft = undefined;
    this.tiltTarget = undefined; this.tiltTravel = undefined;
    this.error = "";
  }
  setConfig(value: CoverConfig) {
    const config = settings(value);
    if (this.kind === "curtain") attribute(this,"curtain-opening",config.curtain_opening ?? "center");
    if (this.kind === "shade" && config.shade_opacity !== this.config?.shade_opacity)
      this.style.setProperty("--shade-opacity", String((config.shade_opacity ?? 100)/100));
    if (isWindowCover(this.kind) && config.window_image !== this.config?.window_image) {
      const image = this.root.querySelector<HTMLImageElement>(".window-view")!;
      image.hidden = !config.window_image?.trim();
      if (!image.hidden) image.src = config.window_image!.trim();
      else image.removeAttribute("src");
    }
    if (isWindowCover(this.kind)) {
      if ((config.mounting_side === "outside") !== (this.config?.mounting_side === "outside"))
        setMountingSide(this.root,config.mounting_side === "outside");
      if (config.cover_color !== this.config?.cover_color) {
        if (config.cover_color) this.style.setProperty("--cover-base",config.cover_color);
        else this.style.removeProperty("--cover-base");
      }
      if (config.window_aspect_ratio !== this.config?.window_aspect_ratio)
        sizeWindow(this.root,config.window_aspect_ratio ?? "landscape");
      if (config.glazing_bar_width !== this.config?.glazing_bar_width) this.style.setProperty("--glazing-width",String(config.glazing_bar_width ?? 3));
      if (config.glazing_bar_color !== this.config?.glazing_bar_color) this.style.setProperty("--glazing-color",config.glazing_bar_color ?? "#30566a");
      if (config.window_image_zoom !== this.config?.window_image_zoom) this.style.setProperty("--photo-scale",String((config.window_image_zoom ?? 100)/100));
      if (config.window_image_x !== this.config?.window_image_x) this.style.setProperty("--photo-x",`${config.window_image_x ?? 50}%`);
      if (config.window_image_y !== this.config?.window_image_y) this.style.setProperty("--photo-y",`${config.window_image_y ?? 50}%`);
    }
    const entityChanged = config.entity !== this.config?.entity;
    if (entityChanged) { this.reset(); this.entity = undefined; }
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
    this.config = config; this.sync(entityChanged ? "reset" : "config");
  }
  set hass(value: HomeAssistant) { this.client = value; this.sync("state"); }
  private begin(target: "open" | "closed") {
    const now = performance.now();
    if (this.travel) this.p = fraction(this.travel, now);
    const to = target === "open" ? 1 : 0;
    this.travel = { from:this.p, to, start:now, duration:Math.max(1, Math.abs(to-this.p)*this.config!.travel_seconds*1000) };
    this.target = target; this.confirmed = false; this.error = "";
    this.confirmBy = now + this.travel.duration + 5000;
  }
  private sync(reason: "state" | "config" | "reset") {
    if (!this.config || !this.isConnected) return;
    const id = this.kind === "garage" && this.config.light_entity, lamp = id ? this.client?.states[id] : undefined;
    this.toggleAttribute("lamp-off", !!id && lamp?.state !== "on");
    const next = this.client?.states[this.config.entity], prev = this.entity;
    this.updateTilt?.(this.client,this.config.entity,next);
    const state = next?.state, pos = position(next);
    const tilt = this.updateTilt ? tiltPosition(next) : undefined;
    const tiltChanged = tilt !== this.tiltTarget;
    if (reason !== "reset" && next === prev && state === this.reportedState && pos === this.reportedPosition && !tiltChanged) {
      // A preview can change labels and controls without supplying a new motion sample.
      if (reason === "config") this.refresh();
      return;
    }
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
    if (!canStop(next)) this.stopRequest = undefined;
    if (this.stopRequest && (state === "open" || state === "closed") &&
        (state !== previousState || pos !== previousPosition || next?.last_changed !== prev?.last_changed)) {
      this.p = pos ?? (state === "closed" ? 0 : this.travel ? fraction(this.travel,performance.now()) : this.p);
      this.holdStoppedPosition = state === "open" && pos === undefined;
      this.stopRequest = undefined; this.command = this.confirmed = false;
      this.positionTarget = this.travel = this.target = undefined;
      this.generation++;
    }
    if (state !== "open" || pos !== undefined) this.holdStoppedPosition = false;
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
    const interpolate = kinds[this.kind].motionPolicy === "interpolate";
    const intermediate = pos !== undefined && pos > 0 && pos < 1 &&
      (!interpolate || pos !== previousPosition || (!this.command && state === this.target));
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
        this.travel = interpolate && this.target === target && pos !== to
          ? {from:pos,to,start:performance.now(),duration:Math.max(1,Math.abs(to-pos)*this.config.travel_seconds*1000)}
          : undefined;
      }
    } else if (state === "open" || state === "closed") {
      if (pos !== undefined && (!this.travel || intermediate)) {
        this.travel = undefined; this.p = pos;
      }
      if (state === this.target) {
        this.confirmed = true;
        if (!this.travel && interpolate && pos === undefined) this.p = state === "open" ? 1 : 0;
      }
      else if (!this.command && (!this.target || previousState !== state)) {
        this.travel = undefined; this.target = undefined;
        this.p = pos ?? (state === "closed" ? 0 : this.holdStoppedPosition ? this.p : 1);
      }
    } else if (!this.command) { this.reset(); this.p = 0; }
    this.refresh();
  }
  private async act(direction: Direction) {
    if (!this.client || !this.config || this.stopRequest || !available(this.entity,direction) || this.target || this.positionTarget !== undefined) return;
    this.holdStoppedPosition = false;
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
      this.sync("reset");
    }
  }
  private startPositionTravel(to:number) {
    this.travel={from:this.p,to,start:performance.now(),duration:Math.max(1,Math.abs(to-this.p)*this.config!.travel_seconds*1000)};
  }
  private get stopAvailable() {
    return canStop(this.entity) && (!!this.target || this.positionTarget !== undefined ||
      this.entity?.state === "opening" || this.entity?.state === "closing");
  }
  private async stop() {
    if (!this.client || !this.config || !this.stopAvailable || this.stopRequest) return;
    const request = this.stopRequest = {deadline:performance.now()+5000};
    this.error = "";
    this.refresh();
    try { await send(this.client,this.config.entity,"stop"); }
    catch {
      if (this.stopRequest !== request) return;
      this.stopRequest = undefined; this.error = "Stop command failed. Try again.";
      this.refresh();
    }
  }
  private async setPosition() {
    const percent=this.slider.valueAsNumber;
    this.draft=undefined;
    if (!this.client || !this.config || this.stopRequest || !canSetPosition(this.entity) || this.target || this.positionTarget !== undefined ||
        !Number.isInteger(percent) || percent<0 || percent>100) { this.refresh(); return; }
    const seq=++this.generation;
    this.holdStoppedPosition = false;
    this.positionTarget=percent/100;
    this.error="";
    this.startPositionTravel(this.positionTarget);
    this.confirmBy=performance.now()+this.config.travel_seconds*1000+5000;
    this.refresh();
    try { await sendPosition(this.client,this.config.entity,percent); }
    catch {
      if (seq!==this.generation || this.positionTarget===undefined) return;
      this.positionTarget=undefined; this.travel=undefined; this.error="Position command failed.";
      this.sync("reset");
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
    if (this.stopRequest && now >= this.stopRequest.deadline) {
      this.stopRequest = undefined; this.error = "Stop not confirmed by Home Assistant.";
    }
    if (this.positionTarget !== undefined) {
      const actual = position(this.entity) ?? (state === "closed" ? 0 : undefined);
      if (!this.travel && actual === this.positionTarget && (state==="open" || state==="closed")) this.positionTarget=undefined;
      else if (now>=this.confirmBy) {
        this.travel=undefined; this.positionTarget=undefined; this.p=actual ?? (state==="open"?1:0);
        this.error="Target position not confirmed.";
      }
    }
    const travelEnd = this.confirmBy - 5000;
    if (this.command) {
      const reported = position(this.entity);
      this.confirmed = state === this.target && (reported === undefined || reported === (this.target==="open"?1:0));
    }
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
    if (!this.side) put(this.nodes.title, this.config?.name ?? String(this.entity?.attributes.friendly_name ?? kinds[this.kind].label));
    const windowCover = isWindowCover(this.kind), hasSlider = canSetPosition(this.entity);
    const measured = windowCover && known && !hasSlider ? position(this.entity) : undefined;
    put(this.nodes.state, label[0].toUpperCase()+label.slice(1)+(measured === undefined ? "" : ` · ${Math.round(measured*100)}% open`));
    const age = state === "closed" || state === "open" ? elapsed(this.entity?.last_changed) : "";
    put(this.nodes.age, age ? ` · ${age}` : "");
    const surface = this.nodes.surface;
    attribute(surface,"data-state",state); surface.toggleAttribute("data-unknown",!known);
    const open = available(this.entity,"open"), close = available(this.entity,"close");
    const direction = close ? "close" : open ? "open" : undefined;
    const showStop = !!this.stopRequest || this.stopAvailable;
    this.stopButton.toggleAttribute("hidden", !showStop);
    this.stopButton.toggleAttribute("disabled", !!this.stopRequest);
    const stopCaption = this.stopRequest ? "Stopping…" : "Stop";
    put(this.stopButton,stopCaption);
    attribute(this.stopButton,"aria-label",this.side ? `${stopCaption} ${this.config?.name || `${this.side} door`}` : stopCaption);
    this.extraOpen.toggleAttribute("hidden", showStop || !(open && close) || !!this.target);
    this.extraOpen.toggleAttribute("disabled", this.positionTarget!==undefined);
    attribute(this.extraOpen,"aria-label",this.side ? `Open ${this.config?.name || `${this.side} door`}` : "Open");
    this.button.toggleAttribute("hidden", showStop || (!pending && !direction));
    this.button.toggleAttribute("disabled", !!pending || !direction || this.positionTarget!==undefined);
    this.slider.parentElement!.toggleAttribute("hidden", !hasSlider);
    this.slider.toggleAttribute("disabled", !hasSlider || !!this.stopRequest || !!this.target || this.positionTarget!==undefined);
    const actual = position(this.entity), wanted = this.draft ?? (this.positionTarget===undefined ? undefined : Math.round(this.positionTarget*100));
    const value=wanted ?? (actual===undefined ? (state==="closed"?0:50) : Math.round(actual*100));
    if (this.slider.valueAsNumber!==value) this.slider.value=String(value);
    const liftText=wanted!==undefined ? `Target ${wanted}%` : actual===undefined ? "Not reported" : `${value}%${windowCover ? "" : " open"}`;
    put(this.nodes.lift,liftText);
    attribute(this.slider,"aria-valuetext",liftText);
    const caption = pending || (direction === "open" ? "Open" : "Close");
    put(this.button, caption);
    attribute(this.button,"aria-label", this.side ? `${caption} ${this.config?.name || `${this.side} door`}` : caption);
    put(this.nodes.hint, this.error);
    if (!active) return;
    if ((this.travel || this.tiltTravel || this.p !== this.lastPainted || this.lastTilt !== this.tiltTarget) && !this.frame) this.frame = requestAnimationFrame(this.paint);
    const ageDelay = age ? 60000 - (Date.now()-Date.parse(this.entity!.last_changed!)) % 60000 : Infinity;
    const deadline = this.positionTarget!==undefined ? this.confirmBy : this.command && now < travelEnd ? travelEnd : waiting && this.target ? this.confirmBy : Infinity;
    const delay = Math.min(ageDelay, Math.max(1,Math.min(deadline,this.stopRequest?.deadline ?? Infinity)-now));
    if (Number.isFinite(delay)) this.timer = window.setTimeout(this.refresh,delay);
  };
}
if (!customElements.get("gleam-cover-bay")) customElements.define("gleam-cover-bay", CoverBay);
