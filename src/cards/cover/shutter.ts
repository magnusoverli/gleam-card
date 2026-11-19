import { windowScene, windowLeft, windowWidth, windowTop, windowTravel } from "./window-scene";

// A rigid curtain translates behind the fixed housing. Clip at the lintel
// instead of scaling the slats or gathering them on the bottom rail.
export const shutter = () => windowScene(`<defs>
  <clipPath id="shutter-opening"><rect x="${windowLeft-2}" y="${windowTop}" width="${windowWidth+4}" height="${windowTravel}"/></clipPath>
  <pattern id="shutter-profile" x="0" y="${windowTop}" width="${windowWidth}" height="9" patternUnits="userSpaceOnUse">
    <rect width="${windowWidth}" height="9" fill="var(--cover-base,#637c8b)"/>
    <path d="M0 1h${windowWidth}" stroke="var(--cover-highlight,#abc1c7)"/><path d="M0 7.5h${windowWidth}" stroke="var(--cover-shadow,#354b5b)" stroke-width="2"/>
  </pattern></defs>
  <path d="M60 23v127m200-127v127" stroke="#445968" stroke-width="4"/>
  <g clip-path="url(#shutter-opening)"><rect class="shutter-curtain" x="${windowLeft}" y="${windowTop}" width="${windowWidth}" height="${windowTravel}" fill="url(#shutter-profile)"/></g>`);

export function renderShutter(background: SVGSVGElement) {
  const layer = background.parentElement!;
  const curtain = layer.querySelector(".shutter-curtain")!, rail = layer.querySelector(".shade-rail")!;
  let previous = -1;
  return (openness:number) => {
    if (openness === previous) return;
    previous = openness;
    const transform = `translate(0 ${-windowTravel*openness})`;
    curtain.setAttribute("transform",transform);
    rail.setAttribute("transform",transform);
  };
}
