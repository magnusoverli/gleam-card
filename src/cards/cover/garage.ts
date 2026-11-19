// Orthographic front with a shallow projected roof. Six hinged sections curl
// into the lintel; clipping removes them before they emerge above the opening.
const airDepths = Array.from({length:16}, (_, i) => (i + .5) * 30 / 16);
// Forward is down and slightly left in this view. Both the ground footprint
// and each airborne section fan out from the same two jambs.
const beamLeft = (depth: number) => 78 - depth * 1.4;
const beamRight = (depth: number) => 238 + depth * .6;
const farLeft = beamLeft(30), farRight = beamRight(30);
export type Side = "left" | "right";
export function garage(side?: Side) {
  // Two abutting viewports show halves of one continuous building. Each bay
  // keeps its own shadow root so gradient and door-clip IDs remain local.
  const extension = side ? 188 : 0, half = extension/2;
  // Keep both openings at their original scale. Split at the middle of the
  // shared pier and put the freed space outside the building.
  const seam = 158 + half;
  const viewX = side === "left" ? seam-260 : seam-extension;
  const view = side ? `${viewX} 0 260` : "0 0 320";
  return `<svg viewBox="${view} 174" aria-hidden="true">
  <defs>
    <radialGradient id="interior" cx=".5" cy="0" r=".95"><stop stop-color="#be905d"/><stop offset=".35" stop-color="#785434"/><stop offset="1" stop-color="#292321"/></radialGradient>
    <linearGradient id="spill" gradientUnits="userSpaceOnUse" x1="0" y1="142" x2="0" y2="172"><stop stop-color="#ffc27c" stop-opacity=".58"/><stop offset=".72" stop-color="#efa155" stop-opacity=".16"/><stop offset="1" stop-color="#efa155" stop-opacity="0"/></linearGradient>
    ${side ? `<clipPath id="bay-shell"><rect x="${viewX}" width="260" height="174"/></clipPath>` : ""}
    <linearGradient id="metal" x2="1" y2=".3"><stop stop-color="#153249"/><stop offset=".6" stop-color="#225166"/><stop offset="1" stop-color="#10293f"/></linearGradient>
    <clipPath id="opening"><path d="M78 56H238V142H78Z"/></clipPath>
    <radialGradient id="air-scatter" r=".64"><stop stop-color="#ffdaa2" stop-opacity=".027"/><stop offset=".65" stop-color="#ffc788" stop-opacity=".019"/><stop offset="1" stop-color="#ffc078" stop-opacity="0"/></radialGradient>
  </defs>
  <g ${side ? 'clip-path="url(#bay-shell)"' : ""}><g transform="translate(${side === 'right' ? -extension : 0} 0)">
    <path d="M48 142V48l${110+half} -31 ${109+half} 31v94H48Z" fill="#0c192b" stroke="#578ca3"/>
    <path d="M${267+extension} 48l15-10v94l-15 10Z" fill="#132338" stroke="#395e78"/>
    <path d="M40 49l${117+half} -35 ${117+half} 35 15-10L${172+half} 4 55 39Z" fill="#142c40" stroke="#6dabbc"/>
  </g></g>
  <path d="M74 142V52h168v90" fill="#08101d" stroke="#7caabc"/>
  <g class="interior" clip-path="url(#opening)">
    <path d="M78 56H238V142H78Z" fill="url(#interior)"/>
    <rect x="134" y="59" width="48" height="2.5" rx="1.25" fill="#ffe1aa"/>
  </g>
  <g class="spill"><clipPath id="cast"><rect class="lit-depth" x="${farLeft}" y="142" width="${farRight-farLeft}" height="0"/></clipPath><g clip-path="url(#cast)"><path d="M78 142H238L${farRight} 172H${farLeft}Z" fill="url(#spill)"/></g></g>
  <g clip-path="url(#opening)">
    <rect class="door-skin" x="78" y="56" width="160" height="86" fill="#18394d"/>
    ${Array.from({length:6}, (_,i) => `<g class="panel" transform="translate(78 ${56+i*14.4})"><rect width="160" height="14.4" fill="url(#metal)"/><path d="M0 .6h160M41 4v6m39-6v6m39-6v6" fill="none" stroke="#67a4b4" stroke-width=".7" opacity=".48"/></g>`).join("")}
  </g>
  <g class="air" fill="url(#air-scatter)">${airDepths.map(d => `<rect x="${beamLeft(d)}" width="${beamRight(d)-beamLeft(d)}" height="0"/>`).join("")}</g>
</svg>`;
}

export function renderer(svg: SVGSVGElement) {
  const panels = [...svg.querySelectorAll<SVGGElement>(".panel")];
  const skin = svg.querySelector(".door-skin")!;
  const depth = svg.querySelector(".lit-depth")!;
  const air = [...svg.querySelectorAll(".air rect")];
  let previous = -1;
  return (p: number) => {
    if (p === previous) return;
    previous = p;
    const height = 14.4;
    let bottom = 56;
    panels.forEach((panel, i) => {
      const y = (i - 6 * p) * height;
      const tilt = Math.max(0, Math.min(1, -y / height));
      const top = 56 + Math.max(-height, y), scale = 1 - .8 * tilt;
      panel.setAttribute("transform", `translate(78 ${top}) scale(1 ${scale})`);
      bottom = Math.max(bottom, top + height * scale);
    });
    // Project a fixed interior light through the lowest panel edge onto the
    // driveway. Keep the jamb shadows and gradient fixed; move only the cutoff.
    const clearance = Math.max(0, 142 - bottom);
    // Hinges articulate the face, not the silhouette. Block the fixture
    // behind every seam down to the actual trailing edge of the last panel.
    skin.setAttribute("height", String(Math.min(86, bottom - 56)));
    const reach = Math.min(30, 24 * clearance / (150 - clearance));
    depth.setAttribute("height", String(reach));
    // Vertical cross sections of one exterior volume. Positive depth places
    // each base on the driveway; the grazing ray bounds its illuminated height.
    // Overlap along the sightline accumulates scattering through the volume.
    air.forEach((slice, i) => {
      const d = airDepths[i];
      const litHeight = Math.max(0, clearance - (150-clearance)*d/24);
      slice.setAttribute("y", String(142 + d - litHeight));
      slice.setAttribute("height", String(litHeight));
    });
  };
}
