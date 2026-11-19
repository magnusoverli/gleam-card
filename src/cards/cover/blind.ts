import { windowScene, windowLeft, windowTop, windowWidth, windowTravel } from "./window-scene";

const count = 14, pitch = windowTravel / count;
export const blind = () => windowScene(`<g class="slats">${Array.from({length:count},(_,i)=>
  `<rect x="${windowLeft}" y="${windowTop+i*pitch}" width="${windowWidth}" height="${pitch}" rx="1" fill="url(#fabric)" stroke="var(--cover-shadow,#687f80)" stroke-width=".5"/>`
).join("")}</g>`);

export function renderBlind(background: SVGSVGElement) {
  const scene = background.parentElement!;
  const slats = [...scene.querySelectorAll(".slats rect")], rail = scene.querySelector(".shade-rail")!;
  let lastLift = -1, lastTilt = -1;
  return (lift:number, tilt = .35) => {
    if (lift === lastLift && tilt === lastTilt) return;
    // On its ladder the slat hangs at a fixed height. Once the rising bottom
    // rail reaches it, it rides the stack (one unit of thickness per slat).
    const bottom = windowTravel - lift*(windowTravel-count);
    const level = (i:number) => Math.min(i*pitch,bottom-(count-i));
    const projected = 1 + (pitch-1)*Math.cos(tilt*Math.PI/2);
    slats.forEach((slat,i) => {
      const y = level(i);
      if (lift !== lastLift) slat.setAttribute("y",String(windowTop+y));
      slat.setAttribute("height",String(Math.min(projected,level(i+1)-y)));
    });
    if (lift !== lastLift) rail.setAttribute("transform",`translate(0 ${bottom-windowTravel})`);
    lastLift=lift; lastTilt=tilt;
  };
}
