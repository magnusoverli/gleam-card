import type { EntityState, HomeAssistant } from "../../types";

const switches = [
  ["open_cover_tilt",16,"Open slats"],["close_cover_tilt",32,"Close slats"],["stop_cover_tilt",64,"Stop tilt"],
] as const;
const setTilt = 128;
export function tiltPosition(entity?: EntityState) {
  const p = entity?.attributes.current_tilt_position;
  return typeof p === "number" && Number.isFinite(p) && p >= 0 && p <= 100 ? p/100 : undefined;
}
export const tiltMarkup = `<div class="tilt" hidden><label hidden>Slat tilt · <span></span>
  <input type="range" min="0" max="100" step="1"></label>${switches.map(([service,,label])=>
  `<button type="button" data-tilt="${service}" hidden>${label}</button>`).join("")}<small role="status"></small></div>`;

// Tilt commands never enter the lift animation or its confirmation timer.
export function tiltControls(root: HTMLElement) {
  const slider = root.querySelector("input")!, label = root.querySelector("label")!;
  const buttons = [...root.querySelectorAll("button")], note = root.querySelector("small")!;
  let client: HomeAssistant | undefined, id="", features=0, sequence=0, busy=false;
  let measured: number | undefined;
  async function dispatch(service:string, flag:number, data: Record<string,number> = {}) {
    if (!client || !id || busy || !(features & flag) || !root.isConnected) return;
    const seq=++sequence;
    busy=true; note.textContent=""; draw();
    try { await client.callService("cover",service,{entity_id:id,...data}); }
    catch { if (seq===sequence) note.textContent="Tilt command failed."; }
    finally { if (seq===sequence) {busy=false;draw();} }
  }
  const readout=label.querySelector("span")!;
  slider.oninput=()=>{readout.textContent=`Target ${slider.value}%`;};
  slider.onchange=()=>void dispatch("set_cover_tilt_position",setTilt,{tilt_position:slider.valueAsNumber});
  buttons.forEach((b,i)=>{const [service,flag]=switches[i]; b.onclick=()=>void dispatch(service,flag);});
  function draw() {
    root.hidden=!(features & 240);
    label.hidden=!(features & setTilt); slider.disabled=busy;
    slider.value=String(measured === undefined ? 50 : Math.round(measured*100));
    readout.textContent=measured===undefined ? "Not reported" : `${slider.value}%`;
    buttons.forEach((b,i)=>{b.hidden=!(features & switches[i][1]); b.disabled=busy;});
  }
  return (hass:HomeAssistant|undefined, entityId:string, entity?:EntityState) => {
    client=hass;
    const flags=entity && ["open","closed","opening","closing"].includes(entity.state) ? Number(entity.attributes.supported_features) | 0 : 0;
    const p=tiltPosition(entity);
    if (id===entityId && features===flags && measured===p) return;
    if (id!==entityId) {sequence++;busy=false;note.textContent="";}
    id=entityId;features=flags;measured=p;draw();
  };
}
