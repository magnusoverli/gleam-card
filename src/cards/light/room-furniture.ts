import type { RoomWall } from "../../types";
import type { LightScene } from "./spots";

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

// The couch is modelled in metres and seen from the scene's camera, so it reads correctly
// on every wall: faces turned away from the camera are culled and parts are painted back
// to front. Room: X 0–4.8 m (left to right), Y 0–2.5 m (up), Z 0–4 m (back wall to front).
type V3 = readonly [number, number, number];
const ROOM_W = 4.8, ROOM_H = 2.5, ROOM_D = 4, CAMERA: V3 = [2.93, 1, 10.36];
const LENGTH = 2.3, DEPTH = 0.95, GAP = 0.06, SIDE_START = 0.3;
function project([x, y, z]: V3): readonly [number, number] {
  const d = z / ROOM_D, across = x / ROOM_W, up = y / ROOM_H;
  return [mix(mix(86, 20, d), mix(258, 300, d), across), mix(mix(124, 144.1, d), mix(44, 14, d), up)];
}
/** Couch space: u along its length, v from the wall into the room, y up. */
function world(wall: RoomWall, u: number, v: number, y: number): V3 {
  if (wall === "back") return [ROOM_W / 2 - LENGTH / 2 + u, y, GAP + v];
  return [wall === "left" ? GAP + v : ROOM_W - GAP - v, y, SIDE_START + u];
}
/** Projected quad with softly rounded corners. */
function rounded(points: (readonly [number, number])[], radius: number) {
  const n = points.length, f = (v: number) => v.toFixed(2);
  let d = "";
  points.forEach((p, i) => {
    const prev = points[(i + n - 1) % n], next = points[(i + 1) % n];
    const toward = (q: readonly [number, number]) => {
      const dx = q[0] - p[0], dy = q[1] - p[1], len = Math.hypot(dx, dy) || 1, r = Math.min(radius, len * 0.45);
      return [p[0] + dx / len * r, p[1] + dy / len * r];
    };
    const a = toward(prev), b = toward(next);
    d += `${i ? "L" : "M"}${f(a[0])} ${f(a[1])}Q${f(p[0])} ${f(p[1])} ${f(b[0])} ${f(b[1])}`;
  });
  return d + "Z";
}

// Unlit upholstery reads as cool slate in the dark room; light adds the zone's warm mix on top.
const FABRIC = { top: "#4f6c7c", seat: "#56737f", end: "#30475a", front: "url(#couch-front)", wood: "#0a121b" };
const LIT = { top: 0.6, front: 0.34, end: 0.22 };
type Part = { box: readonly [u0: number, u1: number, v0: number, v1: number, y0: number, y1: number]; top: string; radius: number; lit: boolean };
const cushion = (u0: number, u1: number, v0: number, v1: number, y0: number, y1: number, top = FABRIC.top): Part =>
  ({ box: [u0, u1, v0, v1, y0, y1], top, radius: 1.1, lit: true });
const ARM = 0.22, SEAT = 0.42, BASE = 0.24, BACK = 0.72, ARM_TOP = 0.56, SPLIT = LENGTH / 2;
const PARTS: Part[] = [
  ...[[0.04, 0.09], [LENGTH - 0.09, LENGTH - 0.04]].flatMap(([u0, u1]) => [[0.06, 0.11], [DEPTH - 0.11, DEPTH - 0.06]]
    .map(([v0, v1]) => ({ box: [u0, u1, v0, v1, 0, 0.1] as const, top: FABRIC.wood, radius: 0.3, lit: false }))),
  cushion(ARM, LENGTH - ARM, 0.02, DEPTH - 0.02, 0.1, BASE, FABRIC.end),
  cushion(ARM + 0.01, SPLIT - 0.01, 0.02, 0.4, BASE, BACK), cushion(SPLIT + 0.01, LENGTH - ARM - 0.01, 0.02, 0.4, BASE, BACK),
  cushion(ARM + 0.01, SPLIT - 0.01, 0.4, DEPTH - 0.02, BASE, SEAT, FABRIC.seat), cushion(SPLIT + 0.01, LENGTH - ARM - 0.01, 0.4, DEPTH - 0.02, BASE, SEAT, FABRIC.seat),
  // Each arm in two parts, so the back half sorts behind the back cushions and the front half in front.
  ...[[0, ARM], [LENGTH - ARM, LENGTH]].flatMap(([u0, u1]) => [cushion(u0, u1, 0, 0.4, 0.1, ARM_TOP), cushion(u0, u1, 0.4, DEPTH, 0.1, ARM_TOP)]),
];

function sofa(wall: RoomWall) {
  const distance = (p: V3) => Math.hypot(p[0] - CAMERA[0], p[1] - CAMERA[1], p[2] - CAMERA[2]);
  const parts = PARTS.map(part => {
    const [u0, u1, v0, v1, y0, y1] = part.box;
    return { part, far: distance(world(wall, (u0 + u1) / 2, (v0 + v1) / 2, (y0 + y1) / 2)) };
  }).sort((a, b) => b.far - a.far);
  const glow = (k: number) => `style="fill:var(--couch-glow,#000);opacity:calc(var(--couch-lit,0) * ${k})"`;
  const shapes = parts.map(({ part }) => {
    const [u0, u1, v0, v1, y0, y1] = part.box;
    const c = (u: number, v: number, y: number) => world(wall, u, v, y);
    // Faces with their outward direction in couch space and a point on the face.
    const faces: [kind: "top" | "front" | "end", corners: V3[], normal: V3][] = [
      ["top", [c(u0, v0, y1), c(u1, v0, y1), c(u1, v1, y1), c(u0, v1, y1)], [0, 0, 1]],
      ["front", [c(u0, v1, y0), c(u1, v1, y0), c(u1, v1, y1), c(u0, v1, y1)], [0, 1, 0]],
      ["end", [c(u0, v0, y0), c(u0, v1, y0), c(u0, v1, y1), c(u0, v0, y1)], [-1, 0, 0]],
      ["end", [c(u1, v0, y0), c(u1, v1, y0), c(u1, v1, y1), c(u1, v0, y1)], [1, 0, 0]],
    ];
    return faces.map(([kind, corners, [nu, nv, ny]]) => {
      // Outward normal in room space, from the couch axes for this wall.
      const normal: V3 = wall === "back" ? [nu, ny, nv] : wall === "left" ? [nv, ny, nu] : [-nv, ny, nu];
      const centre = corners.reduce<V3>((s, p) => [s[0] + p[0] / 4, s[1] + p[1] / 4, s[2] + p[2] / 4], [0, 0, 0]);
      if (normal[0] * (CAMERA[0] - centre[0]) + normal[1] * (CAMERA[1] - centre[1]) + normal[2] * (CAMERA[2] - centre[2]) <= 0) return "";
      const d = rounded(corners.map(project), part.radius);
      const fill = kind === "top" ? part.top : part.lit ? (kind === "front" ? FABRIC.front : FABRIC.end) : FABRIC.wood;
      const seam = kind === "front" && part.lit
        ? `<path d="M${project(corners[3]).map(v => v.toFixed(2)).join(" ")}L${project(corners[2]).map(v => v.toFixed(2)).join(" ")}" stroke="#7896a5" stroke-width=".45" stroke-linecap="round" opacity=".35" fill="none"/>` : "";
      return `<path d="${d}" fill="${fill}"/>${part.lit ? `<path d="${d}" ${glow(LIT[kind])}/>` : ""}${seam}`;
    }).join("");
  }).join("");
  // Soft contact shadow: downlights from above leave a dark, blurred footprint.
  const footprint = (grow: number) => [c0(-grow, -0.01), c0(LENGTH + grow, -0.01), c0(LENGTH + grow, DEPTH + grow), c0(-grow, DEPTH + grow)]
    .map(p => project(p).map(v => v.toFixed(2)).join(" ")).join("L");
  function c0(u: number, v: number) { return world(wall, u, v, 0); }
  return `<g class="wall-couch" data-wall="${wall}" display="none">
    <path d="M${footprint(0.16)}Z" fill="#01050b" opacity=".55" filter="url(#couch-shadow)"/>
    <path d="M${footprint(0.02)}Z" fill="#01050b" opacity=".6"/>
    ${shapes}
  </g>`;
}

export const couches = `<defs>
  <linearGradient id="couch-front" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#3f5a6b"/><stop offset="1" stop-color="#23374a"/></linearGradient>
  <filter id="couch-shadow" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="1.6"/></filter>
</defs>` + walls.map(sofa).join("");

/** Warm the couch with the light that reaches it: floor pools near its footprint, plus room bounce. */
export function mountCouchLight(svg: SVGSVGElement) {
  const couchesByWall = walls.map(wall => ({
    node: svg.querySelector<SVGGElement>(`.wall-couch[data-wall="${wall}"]`)!,
    samples: [0.2, 0.5, 0.8].map(t => project(world(wall, LENGTH * t, DEPTH + 0.15, 0))),
    lit: "", glow: "",
  }));
  return (scene: LightScene) => {
    const ambient = Math.max(0, ...scene.zones.map(z => (z.tint > 0 ? z.washOpacity * 0.22 : 0)));
    for (const couch of couchesByWall) {
      const weight = scene.zones.map(() => 0);
      for (const s of scene.spots) {
        if (!s.poolOpacity) continue;
        const sx = s.poolRx * 0.9 + 4, sy = s.poolRy * 2.2 + 3;
        for (const [x, y] of couch.samples)
          weight[s.zone] += s.poolOpacity * Math.exp(-(((x - s.x) / sx) ** 2 + ((y - s.floorY) / sy) ** 2) / 2) / couch.samples.length;
      }
      const total = weight.reduce((a, b) => a + b, 0), zone = weight.indexOf(Math.max(...weight));
      const ambientZone = scene.zones.reduce((best, z, i) => (z.washOpacity > scene.zones[best].washOpacity ? i : best), 0);
      const lit = Math.min(0.6, total * 0.6 + ambient).toFixed(3);
      const glow = `var(--mix-b-${total > 0.02 ? zone : ambientZone})`;
      if (lit !== couch.lit) { couch.lit = lit; couch.node.style.setProperty("--couch-lit", lit); }
      if (glow !== couch.glow) { couch.glow = glow; couch.node.style.setProperty("--couch-glow", glow); }
    }
  };
}

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
