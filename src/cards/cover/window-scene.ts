// Geometry in SVG units, shared by the frame and all moving coverings.
export const windowTop = 22, windowTravel = 126, windowLeft = 62, windowWidth = 196;
const paneWidth = 194, paneHeight = 125, centerX = 160;
const glazingPath = (width: number) => `M${centerX} 23v${paneHeight}M${centerX-width/2} 88h${width}`;
export const windowScene = (cover: string) => `<svg viewBox="0 0 320 174" aria-hidden="true">
  <defs><linearGradient id="sky" x2=".7" y2="1"><stop stop-color="#285779"/><stop offset="1" stop-color="#9ac8df"/></linearGradient></defs>
  <g class="window-geometry"><rect x="56" y="16" width="208" height="140" rx="3" fill="#14293a" stroke="#79afbb"/>
  <rect x="63" y="23" width="${paneWidth}" height="${paneHeight}" fill="url(#sky)"/>
  </g><foreignObject x="63" y="23" width="${paneWidth}" height="${paneHeight}" overflow="hidden">
    <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;overflow:hidden">
      <img class="window-view" alt="" hidden style="width:100%;height:100%;object-fit:cover;object-position:var(--photo-x,50%) var(--photo-y,50%);transform-origin:var(--photo-x,50%) var(--photo-y,50%);transform:scale(var(--photo-scale,1))">
    </div>
  </foreignObject>
  <path class="glazing-bars" d="${glazingPath(paneWidth)}" stroke="var(--glazing-color,#30566a)" stroke-width="var(--glazing-width,3)"/>
  <g class="window-geometry"><path d="M51 157h218l-5 4H48Z" fill="#253e50" stroke="#628697"/>
</g></svg>
<div class="shade-layer"><svg viewBox="0 0 320 174" aria-hidden="true">
  <defs><linearGradient id="fabric" x2="0" y2="1"><stop stop-color="#607978"/><stop offset=".12" stop-color="#b2c3b6"/><stop offset="1" stop-color="#839d94"/></linearGradient>
  <linearGradient id="bottom-rail" x2="0" y2="1"><stop stop-color="#637679"/><stop offset=".3" stop-color="#dbe4df"/><stop offset=".62" stop-color="#a5b7b4"/><stop offset="1" stop-color="#53666a"/></linearGradient></defs>
  <g class="window-geometry">${cover}
  <rect class="shade-rail" x="${windowLeft-1}" y="${windowTop+windowTravel-2}" width="${windowWidth+2}" height="5" rx="2.5" fill="url(#bottom-rail)" stroke="#43585d" stroke-width=".7"/>
  <rect x="54" y="13" width="212" height="13" rx="5" fill="#274656" stroke="#a8d8df"/>
</g></svg></div>`;

// Resize the pane itself so object-fit crops photos at the new ratio rather
// than squeezing them with the frame. Vertical travel coordinates stay fixed.
export function sizeWindow(root: ShadowRoot, ratio: "portrait" | "square" | "landscape") {
  const width = ratio === "square" ? paneHeight : ratio === "portrait" ? paneHeight*2/3 : paneWidth;
  for (const group of root.querySelectorAll(".window-geometry"))
    group.setAttribute("transform",`translate(${centerX} 0) scale(${width/paneWidth} 1) translate(${-centerX} 0)`);
  const pane = root.querySelector("foreignObject")!;
  pane.setAttribute("x",String(centerX-width/2));
  pane.setAttribute("width",String(width));
  // Change the span, not the stroke: horizontally scaling the path would
  // make the vertical mullion thinner than the horizontal one.
  root.querySelector(".glazing-bars")!.setAttribute("d",glazingPath(width));
}
