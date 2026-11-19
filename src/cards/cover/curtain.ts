import { windowScene, windowLeft, windowWidth, windowTop, windowTravel } from "./window-scene";

const half = windowWidth/2, fold = half/7;
const hem = `q${-fold/2} 3 ${-fold} 0 `.repeat(7);

// Both anchored panels reference the same pleated fabric. The outer transforms
// choose the draw direction; openness only compresses the folds horizontally.
export const curtain = () => windowScene(`<defs>
  <linearGradient id="pleat" gradientUnits="userSpaceOnUse" x2="${fold}" spreadMethod="repeat">
    <stop stop-color="var(--cover-shadow,#445364)"/><stop offset=".24" stop-color="var(--cover-base,#778696)"/>
    <stop offset=".52" stop-color="var(--cover-highlight,#a7b2bb)"/><stop offset=".76" stop-color="var(--cover-light,#8495a2)"/><stop offset="1" stop-color="var(--cover-shadow,#445364)"/>
  </linearGradient>
  <g id="drape"><path class="curtain-fabric" fill="url(#pleat)"
    d="M0 ${windowTop-3}h${half}v${windowTravel+4}${hem}Z"/></g>
  </defs>
  <g class="curtain-panels">
    <g transform="translate(${windowLeft} 0)"><use class="gather-left" href="#drape"/></g>
    <g transform="translate(${windowLeft+windowWidth} 0) scale(-1 1)"><use class="gather-right" href="#drape"/></g>
  </g>`, `<rect x="54" y="15" width="212" height="6" rx="3" fill="#475f70" stroke="#aac2cb"/>`);

export function renderCurtain(background: SVGSVGElement) {
  const fabric = background.parentElement!.querySelector(".curtain-fabric")!;
  let previous = -1;
  return (openness: number) => {
    if (previous === openness) return;
    previous = openness;
    fabric.setAttribute("transform",`scale(${1-.88*openness} 1)`);
  };
}
