// Pure geometry and lighting for the in-roof spots scene. No DOM access.
// Room in metres: x across (centred), z depth from the cut-away front (0) to the back wall (D).
// Screen: viewBox 320 × 174, one-point perspective with the vanishing point at (191, 92).
export const MAX_GRID = 8, MAX_ZONES = 3;
const W = 4.8, D = 4, CEILING = 2.5, ZC = 6.362, SX = 280 / W, VX = 191, VY = 92;
const WALL_OFFSET = 0.45;
const depthScale = (z: number) => 1 / (1 + z / ZC);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export interface Spot { row: number; column: number; zone: number; x: number; z: number }

const evenly = (n: number, length: number, edge: number) =>
  n === 1 ? [length / 2] : Array.from({ length: n }, (_, i) => edge + i * (length - 2 * edge) / (n - 1));
/** Installer spacing: half a spacing from each wall, or a ring 45 cm from the walls. */
function axis(n: number, length: number, wallsOnly: boolean) {
  return wallsOnly ? evenly(n, length, WALL_OFFSET) : Array.from({ length: n }, (_, i) => (i + 0.5) * length / n);
}
export const onRing = (row: number, column: number, rows: number, columns: number) =>
  row === 0 || column === 0 || row === rows - 1 || column === columns - 1;
/** Default assignment: split the columns evenly between the zones, left to right. */
export const defaultZone = (column: number, columns: number, zones: number) =>
  Math.min(zones - 1, Math.floor(column * zones / columns));
export function defaultZoneMap(rows: number, columns: number, zones: number) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, (_, c) => String(defaultZone(c, columns, zones) + 1)).join(""));
}

/** Mounted spots, back row first. Row 0 of the zone map is the row along the back wall. */
export function layoutSpots(rows: number, columns: number, wallsOnly: boolean, zoneMap: readonly string[], zones: number): Spot[] {
  const xs = axis(columns, W, wallsOnly), zs = axis(rows, D, wallsOnly);
  const spots: Spot[] = [];
  for (let row = 0; row < rows; row++) for (let column = 0; column < columns; column++) {
    if (wallsOnly && !onRing(row, column, rows, columns)) continue;
    const cell = zoneMap[row]?.charAt(column) ?? "";
    if (cell === ".") continue;
    const n = Number.parseInt(cell, 10);
    const zone = Math.min(zones - 1, n >= 1 ? n - 1 : defaultZone(column, columns, zones));
    spots.push({ row, column, zone, x: xs[column] - W / 2, z: zs[rows - 1 - row] });
  }
  return spots;
}

/** Plan position of a cell (0–1 across, 0–1 from the back wall), for the editor. */
export function planPosition(row: number, column: number, rows: number, columns: number, wallsOnly: boolean) {
  return { x: axis(columns, W, wallsOnly)[column] / W, y: (D - axis(rows, D, wallsOnly)[rows - 1 - row]) / D };
}

export type Rgb = readonly [number, number, number];
/** Black-body approximation (Tanner Helland) for 1000–40000 K. */
export function kelvinRgb(kelvin: number): Rgb {
  const t = kelvin / 100;
  const r = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592);
  const g = t <= 66 ? 99.4708025861 * Math.log(t) - 161.1195681661 : 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  const b = t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  return [r, g, b].map(v => Math.round(clamp(v, 0, 255))) as unknown as Rgb;
}
export const css = (c: Rgb) => `rgb(${c[0]},${c[1]},${c[2]})`;
/** Lamp colour mixed with the dark scene ground, as the garage interior does. */
const mix = (c: Rgb, f: number) => css(c.map((v, i) => Math.round(v * f + [13, 16, 17][i] * (1 - f))) as unknown as Rgb);

export interface ZoneLight { on: boolean; brightness: number; color: Rgb; unavailable: boolean }
export interface SpotDraw {
  zone: number; x: number; floorY: number;
  trimY: number; trimRx: number; trimRy: number; lensY: number; lensRx: number; lensRy: number;
  haloY: number; haloRx: number; haloRy: number;
  poolRx: number; poolRy: number; poolOpacity: number;
  cone: string; beamOpacity: number;
  glowX: number; glowRx: number; glowOpacity: number;
  lens: string; dim: number; highlighted: boolean;
  /** Tap target centre: the middle of the beam. */
  hitX: number; hitY: number;
}
export interface ZoneDraw { lamp: string; mixA: string; mixB: string; mixC: string; washOpacity: number; tint: number }
export interface LightScene {
  spots: SpotDraw[]; zones: ZoneDraw[];
  left: { zone: number; opacity: number }; right: { zone: number; opacity: number };
  beamMid: number; beamEnd: number; sceneOpacity: number;
}

export function lightScene(spots: readonly Spot[], zones: readonly ZoneLight[], options: { rows: number; columns: number; beamAngle: number; highlight?: number }): LightScene {
  const beam = clamp(options.beamAngle, 10, 120);
  // Floor radius = ceiling height × tan(half angle). Narrow beams pool brighter; wide beams spread thinner.
  const radius = CEILING * Math.tan(beam * Math.PI / 360), spread = clamp(radius / 0.91, 0.45, 1.6);
  const poolGain = clamp(Math.sqrt(40 / beam), 0.55, 1.35), coneGain = clamp(Math.sqrt(40 / beam), 0.55, 1);
  const near = (d: number) => clamp((1.3 - d) / 0.9, 0, 1);
  const level = zones.map(z => (z.on ? 0.3 + 0.7 * z.brightness / 100 : 0));
  const tally = zones.map(() => ({ n: 0, left: 0, right: 0 }));
  // Dense grids: smaller trims, and per-spot light scaled so many beams don't wash the room out.
  const density = clamp(Math.sqrt(12 / Math.max(1, spots.length)), 0.42, 1);
  const trim = clamp(4.5 / Math.max(options.rows, options.columns), 0.5, 1);
  const draws = spots.map(spot => {
    const zone = zones[spot.zone], lvl = level[spot.zone];
    const k = depthScale(spot.z), X = 20 + (spot.x + W / 2) * SX;
    const x = VX + (X - VX) * k, ceilingY = VY + (14 - VY) * k, floorY = VY + (144 - VY) * k;
    const backX = VX + (X - VX) * depthScale(D);
    const half = Math.min(46, radius * SX * k * 0.46);
    const toBack = D - spot.z, toSide = W / 2 - Math.abs(spot.x), t = tally[spot.zone];
    t.n++;
    if (toSide < 1.3) t[spot.x < 0 ? "left" : "right"] += near(toSide);
    const round = (v: number) => Math.round(v * 10) / 10;
    return {
      zone: spot.zone, x: round(x), floorY: round(floorY),
      trimY: round(ceilingY + 0.6), trimRx: 6.4 * k * trim, trimRy: 2 * k * trim,
      lensY: round(ceilingY + 0.8), lensRx: 4 * k * trim, lensRy: 1.15 * k * trim,
      haloY: round(ceilingY + 1), haloRx: 13 * k * trim, haloRy: 4 * k * trim,
      poolRx: round(Math.min(64, 1.15 * radius * SX * k)), poolRy: 1.15 * radius * (52 / ZC) * k * k,
      poolOpacity: zone.on ? Math.min(1, Math.min(1, (0.4 + 0.6 * lvl) * poolGain) * Math.sqrt(density)) : 0,
      cone: [[x - 2.6 * k, ceilingY + 1.2], [x + 2.6 * k, ceilingY + 1.2], [x + half, floorY], [x - half, floorY]]
        .map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" "),
      beamOpacity: lvl * coneGain * density,
      // Bounce from the lit floor behind each pool: brightest low on the wall, fading upwards.
      glowX: round(backX), glowRx: round(24 + 12 * toBack + 10 * spread),
      glowOpacity: lvl * 0.6 / (1 + (toBack / 1.2) ** 2) * density,
      lens: zone.on ? css(zone.color) : "#1b2c3d", dim: zone.unavailable ? 0.4 : 1,
      highlighted: options.highlight === spot.zone,
      hitX: x, hitY: (ceilingY + floorY) / 2,
    } satisfies SpotDraw;
  });
  const sideZone = (key: "left" | "right") => {
    let best = 0;
    tally.forEach((t, i) => { if (t[key] * level[i] > tally[best][key] * level[best]) best = i; });
    return { zone: best, opacity: level[best] * (0.5 + 0.25 * Math.min(1, tally[best][key])) };
  };
  const steep = clamp((40 - beam) / 30, 0, 1);
  return {
    spots: draws,
    zones: zones.map((z, i) => ({
      lamp: css(z.color), mixA: mix(z.color, 0.74), mixB: mix(z.color, 0.44), mixC: mix(z.color, 0.12),
      washOpacity: 0.9 * level[i], tint: tally[i].n ? 0.3 * Math.min(1, tally[i].n / 4) : 0,
    })),
    left: sideZone("left"), right: sideZone("right"),
    beamMid: 0.095 + 0.06 * steep, beamEnd: 0.015 + 0.06 * steep,
    sceneOpacity: zones.every(z => z.unavailable) ? 0.35 : 1,
  };
}

/** A fixture hit selects its zone; elsewhere use the nearest beam, favouring horizontal proximity. */
export function nearestZone(scene: LightScene, x: number, y: number) {
  // Test the visible trim in reverse paint order, so the top fixture wins any overlap.
  for (let i = scene.spots.length - 1; i >= 0; i--) {
    const s = scene.spots[i], dx = (x - s.x) / s.trimRx, dy = (y - s.trimY) / s.trimRy;
    if (dx * dx + dy * dy <= 1) return s.zone;
  }
  let best = -1, distance = Infinity;
  for (const s of scene.spots) {
    const dx = s.hitX - x, dy = (s.hitY - y) * 0.35, d = dx * dx + dy * dy;
    if (d < distance) { distance = d; best = s.zone; }
  }
  return best;
}
