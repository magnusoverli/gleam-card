import type { RoomWall } from "../../types";

// Each jamb runs from ceiling to floor. Interpolate between jambs so a frame's
// top, glazing bars and sill follow the wall even as it recedes into the room.
type Jamb = readonly [x: number, ceiling: number, floor: number];
const planes = {
  left: [[20, 14, 144.1], [86, 44, 124]],
  back: [[86, 44, 124], [258, 44, 124]],
  right: [[258, 44, 124], [300, 14, 144.1]],
} as const satisfies Record<RoomWall, readonly [Jamb, Jamb]>;
const walls = Object.keys(planes) as RoomWall[];
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

function furnishings(wall: RoomWall) {
  const [left, right] = planes[wall];
  function point(u: number, v: number) {
    const x = mix(left[0], right[0], u);
    const y = mix(mix(left[1], left[2], v), mix(right[1], right[2], v), u);
    return `${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  const quad = (l: number, t: number, r: number, b: number) =>
    `M${point(l,t)}L${point(r,t)}L${point(r,b)}L${point(l,b)}Z`;
  const inset = wall === "back" ? .3 : .2, end = 1 - inset;
  return `<g class="wall-window" data-wall="${wall}" display="${wall === "right" ? "inline" : "none"}">
    <path d="${quad(inset,.23,end,.76)}" fill="#14293a" stroke="#79afbb" stroke-width=".8" stroke-linejoin="round"/>
    <path d="${quad(inset+.018,.253,end-.018,.737)}" fill="url(#night)"/>
    <path d="M${point(.5,.253)}L${point(.5,.737)}M${point(inset+.018,.495)}L${point(end-.018,.495)}" fill="none" stroke="#406577" stroke-width="1"/>
    <path d="${quad(inset-.018,.76,end+.018,.785)}" fill="#253e50" stroke="#628697" stroke-width=".7" stroke-linejoin="round"/>
  </g>
  <g class="wall-tv" data-wall="${wall}" display="none">
    <path d="${quad(inset-.025,.30,end+.025,.71)}" fill="#0a1119" stroke="#485967" stroke-width=".9" stroke-linejoin="round"/>
    <path d="${quad(inset-.012,.315,end+.012,.685)}" fill="url(#tv-glass)"/>
  </g>`;
}

export const roomFurniture = walls.map(furnishings).join("");

// The sofa has depth: project its corners onto the trapezoidal floor, then
// measure upholstery height against the wall height at that floor depth.
function sofa(wall: RoomWall) {
  type Corner = readonly [along: number, depth: number, height: number];
  function point([along, depth, height]: Corner) {
    const z = wall === "back" ? depth : wall === "left" ? 1-along : along;
    const across = wall === "back" ? along : wall === "left" ? depth : 1-depth;
    const x = mix(mix(86,20,z), mix(258,300,z), across);
    const y = mix(mix(124,144.1,z), mix(44,14,z), height);
    return `${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  const face = (color: string, ...corners: Corner[]) =>
    `<path d="M${corners.map(point).join("L")}Z" fill="${color}"/>`;
  const depth = wall === "back" ? .42 : .105;
  function cushion(l: number, r: number, near: number, far: number, bottom: number, top: number, fabric: string) {
    const end = wall === "left" ? l : wall === "right" ? r : (l+r)/2 < .5 ? r : l;
    return face("#293f50",[end,far,bottom],[end,near,bottom],[end,near,top],[end,far,top]) +
      face("#314b5d",[l,near,bottom],[r,near,bottom],[r,near,top],[l,near,top]) +
      face(fabric,[l,far,top],[r,far,top],[r,near,top],[l,near,top]);
  }
  const arm = (l: number, r: number) => cushion(l,r,depth,depth*.15,.028,.124,"#476374");
  const leftArm = arm(.15,.216), rightArm = arm(.784,.85);
  return `<g class="wall-couch" data-wall="${wall}" display="none">
    ${face("#070e16",[.135,.012,0],[.865,.012,0],[.865,depth*1.11,0],[.135,depth*1.11,0])}
    <g stroke="#213746" stroke-width=".55" stroke-linejoin="round">
      ${cushion(.16,.84,depth*.96,.016,.014,.071,"#3c5767")}
      ${cushion(.16,.84,depth*.30,.016,.065,.172,"#496575")}
      ${wall === "left" ? rightArm : leftArm}
      ${cushion(.214,.5,depth*.97,depth*.3,.066,.092,"#4c6979")}
      ${cushion(.5,.786,depth*.97,depth*.3,.066,.092,"#4c6979")}
      ${wall === "left" ? leftArm : rightArm}
    </g>
  </g>`;
}

export const couches = walls.map(sofa).join("");

export function mountFurniture(svg: SVGSVGElement) {
  const frames = walls.map(wall => ({
    wall,
    window: svg.querySelector(`.wall-window[data-wall="${wall}"]`)!,
    tv: svg.querySelector(`.wall-tv[data-wall="${wall}"]`)!,
    couch: svg.querySelector(`.wall-couch[data-wall="${wall}"]`)!,
  }));
  function show(node: Element, visible: boolean) {
    const display = visible ? "inline" : "none";
    if (node.getAttribute("display") !== display) node.setAttribute("display", display);
  }
  return (walls: readonly RoomWall[], tv?: RoomWall, couch?: RoomWall) => {
    for (const frame of frames) {
      show(frame.window, walls.includes(frame.wall));
      show(frame.tv, tv === frame.wall);
      show(frame.couch, couch === frame.wall);
    }
  };
}
