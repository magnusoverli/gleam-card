import type { CouchPlacement, RoomWall } from "../../types";
import { COUCH_PLACEMENTS, ROOM_WALLS } from "./model";
import { CAMERA_DISTANCE, CAMERA_HEIGHT, projectRoom, ROOM_D, ROOM_H, ROOM_W } from "./room-projection";
import type { LightScene } from "./spots";

function furnishings(wall: RoomWall) {
  // Wall-local axes run left to right and ceiling to floor as seen on screen.
  function point(u: number, v: number) {
    const [x, y] = projectRoom(
      (wall === "back" ? u - .5 : wall === "left" ? -.5 : .5) * ROOM_W,
      (1 - v) * ROOM_H,
      (wall === "back" ? 1 : wall === "left" ? u : 1 - u) * ROOM_D,
    );
    return `${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  const quad = (l: number, t: number, r: number, b: number) =>
    `M${point(l,t)}L${point(r,t)}L${point(r,b)}L${point(l,b)}Z`;
  const inset = wall === "back" ? .33 : .24, end = 1 - inset;
  const wallWidth = wall === "back" ? ROOM_W : ROOM_D;
  // Size the 16:9 screen and its bezel before projecting them onto the wall.
  const screenWidth = 1.65, screenHeight = screenWidth * 9 / 16, bezel = .025;
  const tv = (border: number) => {
    const x = (screenWidth / 2 + border) / wallWidth, y = (screenHeight / 2 + border) / ROOM_H;
    return quad(.5 - x, .505 - y, .5 + x, .505 + y);
  };
  return `<g class="wall-window" data-wall="${wall}" display="${wall === "right" ? "inline" : "none"}">
    <path d="${quad(inset,.265,end,.725)}" fill="#14293a" stroke="#79afbb" stroke-width=".8" stroke-linejoin="round"/>
    <path d="${quad(inset+.018,.288,end-.018,.702)}" fill="url(#night)"/>
    <path d="M${point(.5,.288)}L${point(.5,.702)}M${point(inset+.018,.495)}L${point(end-.018,.495)}" fill="none" stroke="#406577" stroke-width="1"/>
    <path d="${quad(inset-.018,.725,end+.018,.75)}" fill="#253e50" stroke="#628697" stroke-width=".7" stroke-linejoin="round"/>
  </g>
  <g class="wall-tv" data-wall="${wall}" display="none">
    <path d="${tv(bezel)}" fill="#0a1119" stroke="#485967" stroke-width=".9" stroke-linejoin="round"/>
    <path d="${tv(0)}" fill="url(#tv-glass)"/>
  </g>`;
}

export const roomFurniture = ROOM_WALLS.map(furnishings).join("");

// The couch is modelled in metres and seen from the scene's camera, so it reads correctly
// on every wall: faces turned away from the camera are culled and parts are painted back
// to front. Room: X 0–4.8 m (left to right), Y 0–2.5 m (up), Z 0–4 m (back wall to front).
type V3 = readonly [number, number, number];
const CAMERA: V3 = [ROOM_W / 2, CAMERA_HEIGHT, ROOM_D + CAMERA_DISTANCE];
const LENGTH = 2.3, DEPTH = 0.95, GAP = 0.06, SIDE_START = 0.3;
const project = ([x, y, z]: V3) => projectRoom(x - ROOM_W / 2, y, ROOM_D - z);
/** Couch space: u along its length, v from the wall into the room, y up. */
function world(wall: CouchPlacement, u: number, v: number, y: number): V3 {
  if (wall === "back") return [ROOM_W / 2 - LENGTH / 2 + u, y, GAP + v];
  if (wall === "front") return [ROOM_W / 2 - LENGTH / 2 + u, y, ROOM_D - GAP - v];
  return [wall === "left" ? GAP + v : ROOM_W - GAP - v, y, SIDE_START + u];
}
/** Quad rounded in room space: each corner is cut the same distance along both of its edges, so
 *  faces that share an edge meet at the same point from every viewing angle. Radii in metres. */
function roll(corners: readonly V3[], radii: readonly number[]) {
  const f = (v: number) => v.toFixed(2), n = corners.length;
  const toward = (p: V3, q: V3, r: number): V3 => {
    const t = Math.min(0.5, r / (Math.hypot(q[0] - p[0], q[1] - p[1], q[2] - p[2]) || 1));
    return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t, p[2] + (q[2] - p[2]) * t];
  };
  let d = "";
  corners.forEach((p, i) => {
    const a = project(toward(p, corners[(i + n - 1) % n], radii[i])), b = project(toward(p, corners[(i + 1) % n], radii[i])), c = project(p);
    d += `${i ? "L" : "M"}${f(a[0])} ${f(a[1])}Q${f(c[0])} ${f(c[1])} ${f(b[0])} ${f(b[1])}`;
  });
  return d + "Z";
}

/** A stuffed cushion: generous rounded corners and edges that bulge outward, most at the crown. */
function pillow(points: (readonly [number, number])[], bulge: readonly number[], corner: readonly number[]) {
  const n = points.length, f = (v: number) => v.toFixed(2);
  const cx = points.reduce((s, p) => s + p[0], 0) / n, cy = points.reduce((s, p) => s + p[1], 0) / n;
  const shortest = Math.min(...points.map((p, i) => Math.hypot(points[(i + 1) % n][0] - p[0], points[(i + 1) % n][1] - p[1])));
  // Corners run bottom-left, bottom-right, top-right, top-left: edge 2 is the crown.
  const along = (p: readonly [number, number], q: readonly [number, number], r: number) => {
    const len = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
    return [p[0] + (q[0] - p[0]) / len * r, p[1] + (q[1] - p[1]) / len * r] as const;
  };
  let d = "";
  points.forEach((p, i) => {
    const q = points[(i + 1) % n], len = Math.hypot(q[0] - p[0], q[1] - p[1]);
    const a = along(p, q, shortest * corner[i]), b = along(q, p, shortest * corner[(i + 1) % n]);
    // Push the edge's midpoint away from the centre.
    const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
    let nx = -(q[1] - p[1]) / (len || 1), ny = (q[0] - p[0]) / (len || 1);
    if (nx * (mx - cx) + ny * (my - cy) < 0) { nx = -nx; ny = -ny; }
    const k = len * bulge[i];
    if (!i) d += `M${f(a[0])} ${f(a[1])}`;
    d += `Q${f(mx + nx * k * 2)} ${f(my + ny * k * 2)} ${f(b[0])} ${f(b[1])}`;
    const next = points[(i + 2) % n], c2 = along(q, next, shortest * corner[(i + 1) % n]);
    d += `Q${f(q[0])} ${f(q[1])} ${f(c2[0])} ${f(c2[1])}`;
  });
  return d + "Z";
}

/** Back pillow front: straight sides and one smooth crown from side to side, slightly domed. */
function backPillow([bl, br, tr, tl]: (readonly [number, number])[]) {
  const f = (v: number) => v.toFixed(2), at = (p: readonly [number, number], q: readonly [number, number], t: number) =>
    [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t] as const;
  const width = Math.hypot(br[0] - bl[0], br[1] - bl[1]), height = Math.hypot(tl[0] - bl[0], tl[1] - bl[1]);
  const foot = Math.min(width, height) * 0.1;
  // Upright cushion: the top rounds over from 24% down each side, with handles just past the corners
  // for a soft-cornered, slightly crowned top. Narrow faces (seen at an angle) crown less.
  const dome = 0.06 * Math.min(1, width / height / 1.2), start = 0.24;
  const r = at(tr, br, start), l = at(tl, bl, start), h1 = at(tr, br, -dome), h2 = at(tl, bl, -dome);
  const b1 = at(bl, br, foot / width), b2 = at(br, bl, foot / width), s1 = at(br, tr, foot / height), s2 = at(bl, tl, foot / height);
  return `M${f(b1[0])} ${f(b1[1])}L${f(b2[0])} ${f(b2[1])}Q${f(br[0])} ${f(br[1])} ${f(s1[0])} ${f(s1[1])}L${f(r[0])} ${f(r[1])}` +
    `C${f(h1[0])} ${f(h1[1])} ${f(h2[0])} ${f(h2[1])} ${f(l[0])} ${f(l[1])}L${f(s2[0])} ${f(s2[1])}Q${f(bl[0])} ${f(bl[1])} ${f(b1[0])} ${f(b1[1])}Z`;
}

// Track arms roll over with a 10 cm radius at the front and at the back; feet corners get 1.5 cm.
// Only the hidden join between the two arm halves stays square.
const ROLL = 0.1;
const ARM_CORNERS = {
  front: { front: [0.015, 0.015, ROLL, ROLL], top: [0, 0, ROLL, ROLL], end: [0.015, 0.015, ROLL, 0] },
  back: { front: [0, 0, 0, 0], top: [ROLL, ROLL, 0, 0], end: [0.015, 0, 0, ROLL] },
} as const;

// Unlit upholstery reads as cool slate in the dark room; light adds the zone's warm mix on top.
const FABRIC = { armTop: "#4a6575", top: "#4f6c7c", seat: "#56737f", end: "#30475a", front: "url(#couch-front)", wood: "#0a121b" };
const LIT = { top: 0.6, front: 0.34, end: 0.22 };
/** radius: corner rounding in metres for plain blocks (plinth, feet). */
type Part = { box: readonly [u0: number, u1: number, v0: number, v1: number, y0: number, y1: number]; top: string; radius: number; lit: boolean; pillow?: boolean; seat?: boolean; arm?: "back" | "front" };
const cushion = (u0: number, u1: number, v0: number, v1: number, y0: number, y1: number, top = FABRIC.top): Part =>
  ({ box: [u0, u1, v0, v1, y0, y1], top, radius: 0.03, lit: true });
// A three-seater: low dark feet, an upholstered plinth, thick seat cushions, upright back
// cushions taller than the wide track arms.
const ARM = 0.24, FEET = 0.07, BASE = 0.26, SEAT = 0.45, BACK = 0.8, ARM_TOP = 0.62, BACK_DEPTH = 0.38;
const SEATS = 3, BAY = (LENGTH - 2 * ARM) / SEATS;
const bays = Array.from({ length: SEATS }, (_, i) => [ARM + i * BAY + 0.008, ARM + (i + 1) * BAY - 0.008] as const);
const PARTS: Part[] = [
  ...[[0.05, 0.1], [LENGTH - 0.1, LENGTH - 0.05]].flatMap(([u0, u1]) => [[0.07, 0.12], [DEPTH - 0.12, DEPTH - 0.07]]
    .map(([v0, v1]) => ({ box: [u0, u1, v0, v1, 0, FEET] as const, top: FABRIC.wood, radius: 0.01, lit: false }))),
  cushion(ARM, LENGTH - ARM, 0.02, DEPTH - 0.03, FEET, BASE, FABRIC.end),
  ...bays.map(([u0, u1]) => ({ ...cushion(u0, u1, 0.02, BACK_DEPTH, BASE, BACK), pillow: true })),
  ...bays.map(([u0, u1]) => ({ ...cushion(u0, u1, BACK_DEPTH, DEPTH - 0.02, BASE, SEAT, FABRIC.seat), seat: true })),
  // Each arm in two parts, so the back half sorts behind the back cushions and the front half in front.
  ...[[0, ARM], [LENGTH - ARM, LENGTH]].flatMap(([u0, u1]) => [
    // The back half reaches 3 cm under the front half so no seam shows where they meet.
    { ...cushion(u0, u1, 0, BACK_DEPTH + 0.03, FEET, ARM_TOP, FABRIC.armTop), radius: 0, arm: "back" as const },
    { ...cushion(u0, u1, BACK_DEPTH, DEPTH, FEET, ARM_TOP, FABRIC.armTop), arm: "front" as const }]),
];
// A low upholstered panel spans the rear, letting the three pillow crowns show above it.
const BACK_PANEL = cushion(ARM, LENGTH - ARM, 0.01, 0.14, BASE - 0.03, BACK - 0.08);

function sofa(wall: CouchPlacement) {
  const fromRear = wall === "front";
  const distance = (p: V3) => Math.hypot(p[0] - CAMERA[0], p[1] - CAMERA[1], p[2] - CAMERA[2]);
  const parts = (fromRear ? [...PARTS, BACK_PANEL] : PARTS).map(part => {
    const [u0, u1, v0, v1, y0, y1] = part.box;
    return { part, far: distance(world(wall, (u0 + u1) / 2, (v0 + v1) / 2, (y0 + y1) / 2)) };
  }).sort((a, b) => b.far - a.far);
  const glow = (k: number) => `style="fill:var(--couch-glow,#000);opacity:calc(var(--couch-lit,0) * ${k})"`;
  const shapes = parts.map(({ part }) => {
    const [u0, u1, v0, v1, y0, y1] = part.box;
    // Back pillows lean against the frame: their crown sits 9 cm nearer the wall than their base.
    const c = (u: number, v: number, y: number) => world(wall, u, part.pillow && y === y1 ? Math.min(v, v1 - 0.09) : v, y);
    // An arm's outer face never meets a cushion, so the front half draws it whole (no join to show)
    // and the back half skips it. Inner faces stay split so they layer correctly against the cushions.
    const outer = (u: number) => part.arm !== undefined && (u === 0 || u === LENGTH);
    const endFrom = (u: number) => (outer(u) && part.arm === "front" ? 0 : v0), endTo = (u: number) => (outer(u) && part.arm === "front" ? DEPTH : v1);
    // Faces with their outward direction in couch space and a point on the face.
    const end = (u: number) => [c(u, endFrom(u), y0), c(u, endTo(u), y0), c(u, endTo(u), y1), c(u, endFrom(u), y1)];
    const faces: [kind: "top" | "front" | "end" | "rear", corners: V3[], normal: V3, outerEnd?: boolean][] = [
      ["top", [c(u0, v0, y1), c(u1, v0, y1), c(u1, v1, y1), c(u0, v1, y1)], [0, 0, 1]],
      ["front", [c(u0, v1, y0), c(u1, v1, y0), c(u1, v1, y1), c(u0, v1, y1)], [0, 1, 0]],
      ["end", end(u0), [-1, 0, 0], outer(u0)],
      ["end", end(u1), [1, 0, 0], outer(u1)],
    ];
    if (fromRear && part.arm !== "front")
      faces.push(["rear", [c(u0, v0, y0), c(u1, v0, y0), c(u1, v0, y1), c(u0, v0, y1)], [0, -1, 0]]);
    return faces.map(([kind, corners, [nu, nv, ny], outerEnd]) => {
      // Outward normal in room space, from the couch axes for this wall.
      const normal: V3 = fromRear ? [nu, ny, -nv] : wall === "back" ? [nu, ny, nv]
        : wall === "left" ? [nv, ny, nu] : [-nv, ny, nu];
      const centre = corners.reduce<V3>((s, p) => [s[0] + p[0] / 4, s[1] + p[1] / 4, s[2] + p[2] / 4], [0, 0, 0]);
      if (normal[0] * (CAMERA[0] - centre[0]) + normal[1] * (CAMERA[1] - centre[1]) + normal[2] * (CAMERA[2] - centre[2]) <= 0) return "";
      const visibleUpholstery = kind === "front" || kind === "rear";
      if (part.pillow && !visibleUpholstery) return "";
      if (part.arm === "back" && outerEnd) return "";
      const screen = corners.map(project);
      // Back pillows: straight sides, deeply rounded top corners flowing into one crown.
      // Seat cushions: a gentle puff on the front edge and softened corners all round.
      const d = part.pillow ? backPillow(screen)
        : part.seat ? pillow(screen, kind === "front" ? [0.01, 0.02, 0.035, 0.02] : [0.015, 0.015, 0.015, 0.015], kind === "front" ? [0.22, 0.22, 0.38, 0.38] : [0.3, 0.3, 0.3, 0.3])
        // Corner order: end faces run back-bottom, front-bottom, front-top, back-top;
        // top faces back-left, back-right, front-right, front-left; front faces bottom-left, bottom-right, top-right, top-left.
        : part.arm ? roll(corners, outerEnd ? [0.015, 0.015, ROLL, ROLL] : ARM_CORNERS[part.arm][kind === "rear" ? "front" : kind])
        : roll(corners, [part.radius, part.radius, part.radius, part.radius]);
      // Arm faces that roll over at the top shade from the top colour down, so the roll reads as soft.
      const fill = kind === "top" ? part.top : !part.lit ? FABRIC.wood
        : part.arm && (visibleUpholstery || outerEnd) ? "url(#couch-arm)" : visibleUpholstery ? FABRIC.front : FABRIC.end;
      const seam = visibleUpholstery && part.lit
        ? `<path d="M${project(corners[3]).map(v => v.toFixed(2)).join(" ")}L${project(corners[2]).map(v => v.toFixed(2)).join(" ")}" stroke="#7896a5" stroke-width=".45" stroke-linecap="round" opacity=".35" fill="none"/>` : "";
      const sheen = part.pillow ? `<path d="${d}" fill="url(#couch-sheen)"/>` : "";
      const panel = part === BACK_PANEL && kind === "rear" ? ` class="couch-back"` : "";
      return `<path${panel} d="${d}" fill="${part.pillow ? "url(#couch-pillow)" : fill}"/>${part.lit ? `<path d="${d}" ${glow(LIT[kind === "rear" ? "front" : kind])}/>` : ""}${sheen}${part.pillow || part.seat || part.arm ? "" : seam}`;
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
  <linearGradient id="couch-arm" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#4a6575"/><stop offset=".22" stop-color="#3b5566"/><stop offset="1" stop-color="#25394b"/></linearGradient>
  <linearGradient id="couch-pillow" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#4b6676"/><stop offset=".55" stop-color="#38515f"/><stop offset="1" stop-color="#22364a"/></linearGradient>
  <radialGradient id="couch-sheen" cx=".5" cy=".18" r=".62"><stop stop-color="#a9c3cf" stop-opacity=".16"/><stop offset="1" stop-color="#a9c3cf" stop-opacity="0"/></radialGradient>
  <filter id="couch-shadow" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="1.6"/></filter>
</defs>` + COUCH_PLACEMENTS.map(sofa).join("");

/** Warm the couch with the light that reaches it: floor pools near its footprint, plus room bounce. */
export function mountCouchLight(svg: SVGSVGElement) {
  const couchesByWall = new Map(COUCH_PLACEMENTS.map(wall => [wall, {
    node: svg.querySelector<SVGGElement>(`.wall-couch[data-wall="${wall}"]`)!,
    samples: [0.2, 0.5, 0.8].map(t => project(world(wall, LENGTH * t, DEPTH + 0.15, 0))),
    lit: "", glow: "",
  }]));
  return (scene: LightScene, placement?: CouchPlacement) => {
    if (!placement) return;
    const couch = couchesByWall.get(placement)!;
    const ambient = Math.max(0, ...scene.zones.map(z => (z.tint > 0 ? z.washOpacity * 0.22 : 0)));
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
  };
}

export function mountFurniture(svg: SVGSVGElement) {
  const frames = ROOM_WALLS.map(wall => ({
    wall,
    window: svg.querySelector(`.wall-window[data-wall="${wall}"]`)!,
    tv: svg.querySelector(`.wall-tv[data-wall="${wall}"]`)!,
  }));
  const couches = COUCH_PLACEMENTS.map(placement => ({
    placement,
    node: svg.querySelector(`.wall-couch[data-wall="${placement}"]`)!,
  }));
  function show(node: Element, visible: boolean) {
    const display = visible ? "inline" : "none";
    if (node.getAttribute("display") !== display) node.setAttribute("display", display);
  }
  return (walls: readonly RoomWall[], tv?: RoomWall, couch?: CouchPlacement) => {
    for (const frame of frames) {
      show(frame.window, walls.includes(frame.wall));
      show(frame.tv, tv === frame.wall);
    }
    for (const { placement, node } of couches) show(node, couch === placement);
  };
}
