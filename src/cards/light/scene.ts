import type { CouchPlacement, RoomWall } from "../../types";
import type { LightScene } from "./spots";
import { couches, mountCouchLight, mountFurniture, roomFurniture } from "./room-furniture";
import {
  BACK_CEILING, BACK_FLOOR, BACK_LEFT, BACK_RIGHT, FRONT_CEILING, FRONT_LEFT, FRONT_RIGHT,
  VANISH_X, VANISH_Y, VIEW_H, VIEW_W,
} from "./room-projection";

// Retained SVG for the room. Resize the spot layers and paint their geometry in the same frame.
const coord = (value: number) => Math.round(value * 100) / 100;
const left = coord(BACK_LEFT), right = coord(BACK_RIGHT), top = coord(BACK_CEILING), floor = coord(BACK_FLOOR);
// Extend the floor edges out to the cutaway mask, along the same vanishing rays.
const outerFloor = coord(VANISH_Y + (BACK_FLOOR - VANISH_Y) * VANISH_X / (VANISH_X - BACK_LEFT));
const CEILING = `M${FRONT_LEFT} ${FRONT_CEILING}H${FRONT_RIGHT}L${right} ${top}H${left}Z`;
const ROOM_FLOOR = `M${left} ${floor}H${right}L${VIEW_W} ${outerFloor}V${VIEW_H}H0V${outerFloor}Z`;
const WALLS = `M0 ${FRONT_CEILING}H${FRONT_LEFT}L${left} ${top}H${right}L${FRONT_RIGHT} ${FRONT_CEILING}H${VIEW_W}V${outerFloor}L${right} ${floor}H${left}L0 ${outerFloor}Z`;
const BACK_SEAM = `M${left} ${top}H${right}`;
const PLANKS = Array.from({ length: 7 }, (_, i) => {
  const x = BACK_LEFT + (i + 1) * (BACK_RIGHT - BACK_LEFT) / 8;
  const end = VANISH_X + (x - VANISH_X) * (VIEW_H - VANISH_Y) / (BACK_FLOOR - VANISH_Y);
  return `M${coord(x)} ${floor}L${coord(end)} ${VIEW_H}`;
}).join(" ");
const HATCH = Array.from({ length: 12 }, (_, i) => `M${18 + i * 26} 6l-8 8`).join(" ");

// Gradient colours come from per-zone custom properties on the <svg>.
const zoneDefs = (z: number) => `
  <linearGradient id="beam-${z}" x1="0" y1="0" x2="0" y2="1"><stop style="stop-color:var(--lamp-${z})" stop-opacity=".34"/><stop class="beam-mid" offset=".5" style="stop-color:var(--lamp-${z})"/><stop class="beam-end" offset="1" style="stop-color:var(--lamp-${z})"/></linearGradient>
  <radialGradient id="pool-${z}"><stop style="stop-color:var(--lamp-${z})" stop-opacity=".3"/><stop offset=".35" style="stop-color:var(--lamp-${z})" stop-opacity=".2"/><stop offset=".7" style="stop-color:var(--lamp-${z})" stop-opacity=".07"/><stop offset="1" style="stop-color:var(--lamp-${z})" stop-opacity="0"/></radialGradient>
  <radialGradient id="halo-${z}"><stop style="stop-color:var(--lamp-${z})" stop-opacity=".75"/><stop offset="1" style="stop-color:var(--lamp-${z})" stop-opacity="0"/></radialGradient>
  <radialGradient id="wash-${z}" cx=".5" cy=".5" r=".5"><stop style="stop-color:var(--mix-a-${z})"/><stop offset=".45" style="stop-color:var(--mix-b-${z})" stop-opacity=".7"/><stop offset="1" style="stop-color:var(--mix-c-${z})" stop-opacity="0"/></radialGradient>
  <linearGradient id="floortint-${z}" x1="0" y1="0" x2="0" y2="1"><stop style="stop-color:var(--mix-b-${z})"/><stop offset="1" style="stop-color:var(--mix-c-${z})" stop-opacity="0"/></linearGradient>
  <radialGradient id="side-${z}"><stop style="stop-color:var(--mix-b-${z})"/><stop offset=".55" style="stop-color:var(--mix-b-${z})" stop-opacity=".8"/><stop offset="1" style="stop-color:var(--mix-c-${z})" stop-opacity="0"/></radialGradient>`;

export const sceneMarkup = `<svg class="room" viewBox="0 0 ${VIEW_W} ${VIEW_H}" aria-hidden="true">
  <defs>
    <linearGradient id="fade-h" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#fff" stop-opacity="0"/><stop offset=".11" stop-color="#fff"/><stop offset=".89" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="fade-v" x1="0" y1="0" x2="0" y2="1"><stop offset=".8" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <mask id="mask-h" maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="174"><rect width="320" height="174" fill="url(#fade-h)"/></mask>
    <mask id="mask-v" maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="174"><rect width="320" height="174" fill="url(#fade-v)"/></mask>
    <clipPath id="wall-clip"><path d="${WALLS}"/></clipPath>
    <linearGradient id="wall-ground"><stop stop-color="#0f1e31"/><stop offset="${left / VIEW_W}" stop-color="#0c192b"/><stop offset="${right / VIEW_W}" stop-color="#0c192b"/><stop offset="1" stop-color="#0f1e31"/></linearGradient>
    <filter id="soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.6"/></filter>
    <filter id="cone-blur" filterUnits="userSpaceOnUse" x="0" y="0" width="320" height="174"><feGaussianBlur stdDeviation="1.8"/></filter>
    <linearGradient id="night" x1=".5" x2=".5" y2="1"><stop stop-color="#132e48"/><stop offset="1" stop-color="#365e78"/></linearGradient>
    <linearGradient id="tv-glass" x1=".5" x2=".5" y2="1"><stop stop-color="#223241"/><stop offset=".55" stop-color="#101c29"/><stop offset="1" stop-color="#0c151f"/></linearGradient>
    ${[0, 1, 2].map(zoneDefs).join("")}
  </defs>
  <g mask="url(#mask-h)"><g mask="url(#mask-v)">
    <path class="room-ceiling" d="${CEILING}" fill="#0a1524"/>
    <path d="${WALLS}" fill="url(#wall-ground)"/>
    <path class="room-floor" d="${ROOM_FLOOR}" fill="#0b1727"/>
    ${[0, 1, 2].map(z => `<g class="wash"><path d="${ROOM_FLOOR}" fill="url(#floortint-${z})"/></g>`).join("")}
    <g fill="none" stroke="#02060d" stroke-width="2.4" filter="url(#soft)">
      <path class="crease-left" d="M${left} ${top}V${floor}"/><path class="crease-right" d="M${right} ${top}V${floor}"/>
      <path d="${BACK_SEAM}" opacity=".4"/>
    </g>
    <g clip-path="url(#wall-clip)">
      <ellipse class="side-left" cx="0" cy="${outerFloor}" rx="120" ry="150"/>
      <ellipse class="side-right" cx="${VIEW_W}" cy="${outerFloor}" rx="120" ry="150"/>
      <g class="glows"></g>
    </g>
    <g clip-path="url(#wall-clip)" pointer-events="none">${roomFurniture}</g>
    <path d="${PLANKS}" stroke="#2c4c68" stroke-width=".6" opacity=".45"/>
    <path d="${BACK_SEAM}" stroke="#2f5670" stroke-width=".6" opacity=".7"/>
    <g class="pools"></g>
    <g class="cones" filter="url(#cone-blur)"></g>
    <g pointer-events="none">${couches}</g>
    <g class="fixtures"></g>
    <path d="M0 6H320V14H0Z" fill="#142c40"/>
    <path d="M0 6.5H320M0 14H320" stroke="#6dabbc" stroke-width=".9"/>
    <path d="${HATCH}" stroke="#3d6c84" stroke-width=".6" opacity=".6"/>
  </g></g>
</svg>`;

const NS = "http://www.w3.org/2000/svg";
function set(el: Element, name: string, value: string | number) {
  const text = typeof value === "number" ? String(Math.round(value * 1000) / 1000) : value;
  if (el.getAttribute(name) !== text) el.setAttribute(name, text);
}
function element(parent: Element, tag: string, attrs: Record<string, string | number>) {
  const el = document.createElementNS(NS, tag);
  for (const [name, value] of Object.entries(attrs)) set(el, name, value);
  parent.append(el);
  return el;
}

interface SpotNodes { glow: Element; pool: Element; cone: Element; fixture: Element; halo: Element; trim: Element; lens: Element }

export function mountScene(svg: SVGSVGElement) {
  const layer = (name: string) => svg.querySelector(`.${name}`)!;
  const washes = [...svg.querySelectorAll(".wash")], washPaths = washes.map(g => g.firstElementChild!);
  const sides = [layer("side-left"), layer("side-right")];
  const creases = [layer("crease-left"), layer("crease-right")];
  const beamMid = [...svg.querySelectorAll(".beam-mid")], beamEnd = [...svg.querySelectorAll(".beam-end")];
  const nodes: SpotNodes[] = [];
  const glows = layer("glows"), pools = layer("pools"), cones = layer("cones"), fixtures = layer("fixtures");
  const colours = new Map<string, string>();

  function layout(count: number) {
    while (nodes.length > count) {
      const { glow, pool, cone, fixture } = nodes.pop()!;
      glow.remove(); pool.remove(); cone.remove(); fixture.remove();
    }
    while (nodes.length < count) {
      const fixture = element(fixtures, "g", {});
      const halo = element(fixture, "ellipse", {});
      const lamp = element(fixture, "g", {});
      nodes.push({
        glow: element(glows, "ellipse", { cy: floor, ry: 60 }),
        pool: element(pools, "ellipse", {}),
        cone: element(cones, "polygon", {}),
        fixture, halo,
        trim: element(lamp, "ellipse", { fill: "#0a1422" }),
        lens: element(lamp, "ellipse", {}),
      });
    }
  }

  function draw(scene: LightScene) {
    layout(scene.spots.length);
    scene.zones.forEach((z, i) => {
      for (const [name, value] of [[`--lamp-${i}`, z.lamp], [`--mix-a-${i}`, z.mixA], [`--mix-b-${i}`, z.mixB], [`--mix-c-${i}`, z.mixC]]) {
        if (colours.get(name) !== value) { colours.set(name, value); svg.style.setProperty(name, value); }
      }
      set(washes[i], "opacity", z.washOpacity);
      set(washPaths[i], "opacity", z.tint);
    });
    for (let i = scene.zones.length; i < washes.length; i++) set(washes[i], "opacity", 0);
    for (let i = 0; i < sides.length; i++) {
      const side = i === 0 ? scene.left : scene.right;
      set(sides[i], "fill", `url(#side-${side.zone})`);
      set(sides[i], "opacity", side.opacity);
      set(creases[i], "opacity", side.creaseOpacity);
    }
    for (const stop of beamMid) set(stop, "stop-opacity", scene.beamMid);
    for (const stop of beamEnd) set(stop, "stop-opacity", scene.beamEnd);
    set(svg, "opacity", scene.sceneOpacity);
    scene.spots.forEach((s, i) => {
      const n = nodes[i];
      if (!n) return;
      set(n.glow, "cx", s.glowX); set(n.glow, "rx", s.glowRx); set(n.glow, "fill", `url(#wash-${s.zone})`); set(n.glow, "opacity", s.glowOpacity);
      set(n.pool, "cx", s.x); set(n.pool, "cy", s.floorY); set(n.pool, "rx", s.poolRx); set(n.pool, "ry", s.poolRy);
      set(n.pool, "fill", `url(#pool-${s.zone})`); set(n.pool, "opacity", s.poolOpacity);
      set(n.cone, "points", s.cone); set(n.cone, "fill", `url(#beam-${s.zone})`); set(n.cone, "opacity", s.beamOpacity);
      set(n.halo, "cx", s.x); set(n.halo, "cy", s.haloY); set(n.halo, "rx", s.haloRx); set(n.halo, "ry", s.haloRy);
      set(n.halo, "fill", `url(#halo-${s.zone})`); set(n.halo, "opacity", s.beamOpacity);
      set(n.trim, "cx", s.x); set(n.trim, "cy", s.trimY); set(n.trim, "rx", s.trimRx); set(n.trim, "ry", s.trimRy);
      set(n.trim, "stroke", s.highlighted ? "#a6dbe8" : "#6dabbc"); set(n.trim, "stroke-width", s.highlighted ? 1 : 0.7);
      set(n.lens, "cx", s.x); set(n.lens, "cy", s.lensY); set(n.lens, "rx", s.lensRx); set(n.lens, "ry", s.lensRy); set(n.lens, "fill", s.lens);
      set(n.trim.parentElement!, "opacity", s.dim);
    });
  }
  const couchLight = mountCouchLight(svg), furniture = mountFurniture(svg);
  let placement: CouchPlacement | undefined;
  return {
    draw: (scene: LightScene) => { draw(scene); couchLight(scene, placement); },
    room(windows: readonly RoomWall[], tv?: RoomWall, couch?: CouchPlacement) {
      placement = couch;
      furniture(windows, tv, couch);
    },
  };
}
