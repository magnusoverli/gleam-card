import {windowScene, windowLeft, windowWidth, windowTop, windowTravel} from "./window-scene";

export const shade = () => windowScene(`<g class="shade-cloth" opacity="var(--shade-opacity,1)"><rect x="${windowLeft}" y="${windowTop}" width="${windowWidth}" height="${windowTravel}" fill="url(#fabric)"/></g>`);

export function renderShade(background: SVGSVGElement) {
  const svg = background.parentElement!.querySelector(".shade-layer svg")!;
  const cloth = svg.querySelector(".shade-cloth")!;
  const rail = svg.querySelector(".shade-rail")!;
  let previous = -1;
  return (openness: number) => {
    if (openness === previous) return;
    previous = openness;
    cloth.setAttribute("transform", `translate(0 ${windowTop}) scale(1 ${1-openness}) translate(0 ${-windowTop})`);
    rail.setAttribute("transform", `translate(0 ${-windowTravel*openness})`);
  };
}
