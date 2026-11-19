// The fabric rolls into the headrail. Keep the window frame and glazing fixed.
export const shade = () => `<svg viewBox="0 0 320 174" aria-hidden="true">
  <defs><linearGradient id="sky" x2=".7" y2="1"><stop stop-color="#285779"/><stop offset="1" stop-color="#9ac8df"/></linearGradient></defs>
  <rect x="56" y="16" width="208" height="140" rx="3" fill="#14293a" stroke="#79afbb"/>
  <rect x="63" y="23" width="194" height="125" fill="url(#sky)"/>
  <foreignObject x="63" y="23" width="194" height="125" overflow="hidden">
    <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;overflow:hidden">
      <img class="window-view" alt="" hidden style="width:100%;height:100%;object-fit:cover;object-position:var(--photo-x,50%) var(--photo-y,50%);transform-origin:var(--photo-x,50%) var(--photo-y,50%);transform:scale(var(--photo-scale,1))">
    </div>
  </foreignObject>
  <path class="glazing-bars" d="M160 23v125M63 88h194" stroke="var(--glazing-color,#30566a)" stroke-width="var(--glazing-width,3)"/>
  <path d="M51 157h218l-5 4H48Z" fill="#253e50" stroke="#628697"/>
</svg>
<div class="shade-layer"><svg viewBox="0 0 320 174" aria-hidden="true">
  <defs><linearGradient id="fabric" x2="0" y2="1"><stop stop-color="#607978"/><stop offset=".12" stop-color="#b2c3b6"/><stop offset="1" stop-color="#839d94"/></linearGradient>
  <linearGradient id="bottom-rail" x2="0" y2="1"><stop stop-color="#637679"/><stop offset=".3" stop-color="#dbe4df"/><stop offset=".62" stop-color="#a5b7b4"/><stop offset="1" stop-color="#53666a"/></linearGradient></defs>
  <g class="shade-cloth" opacity="var(--shade-opacity,1)"><rect x="62" y="22" width="196" height="126" fill="url(#fabric)"/></g>
  <rect class="shade-rail" x="61" y="146" width="198" height="5" rx="2.5" fill="url(#bottom-rail)" stroke="#43585d" stroke-width=".7"/>
  <rect x="54" y="13" width="212" height="13" rx="5" fill="#274656" stroke="#a8d8df"/>
</svg></div>`;

export function renderShade(background: SVGSVGElement) {
  const svg = background.parentElement!.querySelector(".shade-layer svg")!;
  const cloth = svg.querySelector(".shade-cloth")!;
  const rail = svg.querySelector(".shade-rail")!;
  let previous = -1;
  return (openness: number) => {
    if (openness === previous) return;
    previous = openness;
    cloth.setAttribute("transform", `translate(0 22) scale(1 ${1-openness}) translate(0 -22)`);
    rail.setAttribute("transform", `translate(0 ${-126*openness})`);
  };
}
