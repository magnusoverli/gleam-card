import type { LightScene } from "./spots";

// Retained SVG for the room. Resize the spot layers and paint their geometry in the same frame.
const ROOM_FLOOR = "M86 124H258L320 153.6V174H0V150.2Z";
const LEFT_WALL = "M0 14H20L86 44V124L0 150.2Z", RIGHT_WALL = "M320 14H300L258 44V124L320 153.6Z";
const PLANKS = "M107.5 124L-23.0 174 M129.0 124L32.1 174 M150.5 124L87.2 174 M172.0 124L142.3 174 M193.5 124L197.4 174 M215.0 124L252.5 174 M236.5 124L307.6 174";
const HATCH = Array.from({ length: 12 }, (_, i) => `M${18 + i * 26} 6l-8 8`).join(" ");

// Gradient colours come from per-zone custom properties on the <svg>.
const zoneDefs = (z: number) => `
  <linearGradient id="beam-${z}" x1="0" y1="0" x2="0" y2="1"><stop style="stop-color:var(--lamp-${z})" stop-opacity=".34"/><stop class="beam-mid" offset=".5" style="stop-color:var(--lamp-${z})"/><stop class="beam-end" offset="1" style="stop-color:var(--lamp-${z})"/></linearGradient>
  <radialGradient id="pool-${z}"><stop style="stop-color:var(--lamp-${z})" stop-opacity=".3"/><stop offset=".35" style="stop-color:var(--lamp-${z})" stop-opacity=".2"/><stop offset=".7" style="stop-color:var(--lamp-${z})" stop-opacity=".07"/><stop offset="1" style="stop-color:var(--lamp-${z})" stop-opacity="0"/></radialGradient>
  <radialGradient id="halo-${z}"><stop style="stop-color:var(--lamp-${z})" stop-opacity=".75"/><stop offset="1" style="stop-color:var(--lamp-${z})" stop-opacity="0"/></radialGradient>
  <radialGradient id="wash-${z}" cx=".5" cy=".5" r=".5"><stop style="stop-color:var(--mix-a-${z})"/><stop offset=".45" style="stop-color:var(--mix-b-${z})" stop-opacity=".7"/><stop offset="1" style="stop-color:var(--mix-c-${z})" stop-opacity="0"/></radialGradient>
  <linearGradient id="floortint-${z}" x1="0" y1="0" x2="0" y2="1"><stop style="stop-color:var(--mix-b-${z})"/><stop offset="1" style="stop-color:var(--mix-c-${z})" stop-opacity="0"/></linearGradient>
  <linearGradient id="side-${z}" x1="0" y1="0" x2="0" y2="1"><stop style="stop-color:var(--mix-c-${z})" stop-opacity=".15"/><stop offset="1" style="stop-color:var(--mix-b-${z})"/></linearGradient>`;

export const sceneMarkup = `<svg class="room" viewBox="0 0 320 174" aria-hidden="true">
  <defs>
    <linearGradient id="fade-h" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#fff" stop-opacity="0"/><stop offset=".11" stop-color="#fff"/><stop offset=".89" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="fade-v" x1="0" y1="0" x2="0" y2="1"><stop offset=".8" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <mask id="mask-h" maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="174"><rect width="320" height="174" fill="url(#fade-h)"/></mask>
    <mask id="mask-v" maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="174"><rect width="320" height="174" fill="url(#fade-v)"/></mask>
    <clipPath id="back-clip"><rect x="86" y="44" width="172" height="80"/></clipPath>
    <filter id="soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.6"/></filter>
    <filter id="cone-blur" filterUnits="userSpaceOnUse" x="0" y="0" width="320" height="174"><feGaussianBlur stdDeviation="1.8"/></filter>
    <linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#0d2346"/><stop offset="1" stop-color="#16345c"/></linearGradient>
    ${[0, 1, 2].map(zoneDefs).join("")}
  </defs>
  <g mask="url(#mask-h)"><g mask="url(#mask-v)">
    <path d="M20 14H300L258 44H86Z" fill="#0a1524"/>
    <path d="M86 44H258V124H86Z" fill="#0c192b"/>
    <path d="${LEFT_WALL}" fill="#0f1e31"/><path class="side-left" d="${LEFT_WALL}"/>
    <path d="${RIGHT_WALL}" fill="#0f1e31"/><path class="side-right" d="${RIGHT_WALL}"/>
    <path d="${ROOM_FLOOR}" fill="#0b1727"/>
    ${[0, 1, 2].map(z => `<g class="wash"><path d="${ROOM_FLOOR}" fill="url(#floortint-${z})"/></g>`).join("")}
    <g class="glows"></g>
    <path d="${PLANKS}" stroke="#2c4c68" stroke-width=".6" opacity=".45"/>
    <polygon points="287.4,49.6 268.4,57.9 268.4,100.5 287.4,102.6" fill="url(#night)" stroke="#6dabbc" stroke-width=".8"/>
    <path d="M277.9 53.7L277.9 101.6" stroke="#4f8aa0" stroke-width=".8"/>
    <path d="M288.2 104.0L267.6 101.5" stroke="#6dabbc" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M86 44V124M258 44V124M86 44H258" fill="none" stroke="#02060d" stroke-width="2.4" opacity=".4" filter="url(#soft)"/>
    <path d="M86 44H258" stroke="#2f5670" stroke-width=".6" opacity=".7"/>
    <g class="pools"></g>
    <g class="cones" filter="url(#cone-blur)"></g>
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
        glow: element(glows, "ellipse", { cy: 124, ry: 60, "clip-path": "url(#back-clip)" }),
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
    for (const [path, side] of [[sides[0], scene.left], [sides[1], scene.right]] as const) {
      set(path, "fill", `url(#side-${side.zone})`);
      set(path, "opacity", side.opacity);
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
  return { draw };
}
