import { test } from "node:test";
import assert from "node:assert/strict";
import { defaultZoneMap, kelvinRgb, layoutSpots, lightScene, nearestZone, planPosition } from "../src/cards/light/spots.ts";
import { readLight, sendBrightness, sendKelvin, sendPower, settings } from "../src/cards/light/model.ts";

const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≈ ${b}`);

test("grid spots sit half a spacing from the walls; the zone map's first row is the back wall", () => {
  const spots = layoutSpots(3, 4, false, ["1122", "1122", "1122"], 2);
  assert.equal(spots.length, 12);
  near(spots[0].x, 0.6 - 2.4);
  near(spots[0].z, 4 - 4 / 6);
  near(spots.at(-1).z, 4 / 6);
  assert.deepEqual(spots.map(s => s.zone).slice(0, 4), [0, 0, 1, 1]);
});

test("along the walls keeps the outer ring 45 cm from the walls and ignores inner cells", () => {
  const spots = layoutSpots(4, 5, true, ["11111", "2...2", "2...2", "22222"], 2);
  assert.equal(spots.length, 14);
  near(spots[0].x, 0.45 - 2.4);
  near(spots[0].z, 4 - 0.45);
  assert.equal(layoutSpots(8, 8, true, [], 1).length, 28);
  const corner = planPosition(0, 0, 4, 5, true);
  near(corner.x, 0.45 / 4.8); assert.ok(Math.abs(corner.y - 0.45 / 4) < 1e-12);
});

test("a dot removes a spot; missing cells split the columns between zones", () => {
  assert.equal(layoutSpots(2, 3, false, ["1.1", "111"], 1).length, 5);
  assert.deepEqual(defaultZoneMap(2, 6, 3), ["112233", "112233"]);
  assert.deepEqual(layoutSpots(1, 4, false, [], 2).map(s => s.zone), [0, 0, 1, 1]);
  assert.deepEqual(layoutSpots(1, 2, false, ["33"], 2).map(s => s.zone), [1, 1]);
});

test("settings fill defaults and reject what the card cannot draw or control", () => {
  const base = { zones: [{ entity: "light.a" }, { entity: "light.b" }] };
  const config = settings(base);
  assert.equal(config.rows, 3); assert.equal(config.columns, 4); assert.equal(config.beam_angle, 40);
  assert.equal(config.walls_only, false); assert.equal(config.variant, "normal");
  assert.deepEqual(config.zone_map, ["1122", "1122", "1122"]);
  for (const [bad, message] of [
    [{ zones: [] }, /at least one zone/],
    [{ zones: [{ entity: "switch.a" }] }, /light entity for zone 1/],
    [{ zones: [{ entity: "light.a" }, { entity: "light.a" }] }, /its own light entity/],
    [{ ...base, zones: [...base.zones, { entity: "light.c" }, { entity: "light.d" }] }, /at most 3/],
    [{ ...base, rows: 9 }, /1 to 8/],
    [{ ...base, columns: 2.5 }, /1 to 8/],
    [{ ...base, beam_angle: 5 }, /Beam angle/],
    [{ ...base, zone_map: ["1132"] }, /uses zone 3/],
    [{ ...base, zone_map: ["11x2"] }, /zone numbers/],
    [{ ...base, light_type: "pendant" }, /Unknown light type/],
    [{ ...base, variant: "double" }, /normal or compact/],
  ]) assert.throws(() => settings(bad), message);
});

test("room furnishings support every wall, with only the TV and window mutually exclusive", () => {
  const zones = [{entity: "light.a"}], walls = ["left", "back", "right"];
  assert.deepEqual(settings({zones}).windows, ["right"]);
  assert.deepEqual(settings({zones, tv_wall:"right"}).windows, []);
  for (let mask = 0; mask < 8; mask++) {
    const windows = walls.filter((_, i) => mask & (1 << i));
    for (const tv_wall of [undefined, ...walls]) for (const couch_wall of [undefined, ...walls]) {
      const config = {zones, windows:[...windows].reverse(), tv_wall, couch_wall};
      if (windows.includes(tv_wall)) assert.throws(() => settings(config), /both a TV and a window/);
      else {
        const room = settings(config);
        assert.deepEqual(room.windows, windows);
        assert.equal(room.tv_wall, tv_wall);
        assert.equal(room.couch_wall, couch_wall);
      }
    }
  }
  for (const windows of ["left", null, ["floor"], ["left", "left"]])
    assert.throws(() => settings({zones, windows}), /windows must be a list/);
  for (const key of ["tv_wall", "couch_wall"])
    assert.throws(() => settings({zones, [key]:"floor"}), new RegExp(key));
});

test("light readings normalise brightness, capabilities and colour", () => {
  const on = readLight({ state: "on", attributes: { brightness: 255, supported_color_modes: ["color_temp"], color_temp_kelvin: 3003, color_mode: "color_temp" } });
  assert.deepEqual([on.available, on.on, on.brightness, on.dimmable, on.tunable, on.kelvin, on.colour], [true, true, 100, true, true, 3003, undefined]);
  assert.equal(readLight({ state: "on", attributes: { brightness: 1 } }).brightness, 1);
  const plain = readLight({ state: "off", attributes: { supported_color_modes: ["onoff"] } });
  assert.deepEqual([plain.dimmable, plain.tunable, plain.brightness], [false, false, undefined]);
  assert.deepEqual(readLight({ state: "on", attributes: { color_mode: "hs", rgb_color: [255, 0, 0] } }).colour, [255, 0, 0]);
  assert.equal(readLight({ state: "unavailable", attributes: {} }).available, false);
  assert.equal(readLight(undefined).available, false);
});

test("commands target exactly the zone's entity", async () => {
  const calls = [], client = { callService: async (...args) => calls.push(args) };
  await sendPower(client, "light.a", false);
  await sendPower(client, "light.a", true);
  await sendBrightness(client, "light.b", 40);
  await sendKelvin(client, "light.b", 3000);
  assert.deepEqual(calls, [
    ["light", "turn_off", { entity_id: "light.a" }],
    ["light", "turn_on", { entity_id: "light.a" }],
    ["light", "turn_on", { entity_id: "light.b", brightness_pct: 40 }],
    ["light", "turn_on", { entity_id: "light.b", color_temp_kelvin: 3000 }],
  ]);
});

test("scene light follows state, beam angle and spot density", () => {
  const warm = kelvinRgb(2700);
  const zone = (on, brightness = 80) => ({ on, brightness, color: warm, unavailable: false });
  const grid = layoutSpots(3, 4, false, ["1122", "1122", "1122"], 2);
  const scene = lightScene(grid, [zone(true), zone(false)], { rows: 3, columns: 4, beamAngle: 40 });
  assert.ok(scene.spots[0].beamOpacity > 0 && scene.spots[0].poolOpacity > 0);
  assert.equal(scene.spots[3].beamOpacity, 0);
  assert.equal(scene.spots[3].lens, "#1b2c3d");
  const narrow = lightScene(grid, [zone(true), zone(true)], { rows: 3, columns: 4, beamAngle: 10 });
  assert.ok(narrow.spots[0].poolRx < scene.spots[0].poolRx / 3);
  const dense = layoutSpots(8, 8, false, [], 2);
  const crowded = lightScene(dense, [zone(true), zone(true)], { rows: 8, columns: 8, beamAngle: 40 });
  const sparse = lightScene(grid, [zone(true), zone(true)], { rows: 3, columns: 4, beamAngle: 40 });
  assert.ok(crowded.spots[0].trimRx < sparse.spots[0].trimRx);
  assert.ok(crowded.spots[0].beamOpacity < sparse.spots[0].beamOpacity);
  assert.equal(nearestZone(scene, 40, 80), 0);
  assert.equal(nearestZone(scene, 290, 80), 1);
  assert.equal(lightScene(grid, [{ ...zone(false), unavailable: true }, { ...zone(false), unavailable: true }], { rows: 3, columns: 4, beamAngle: 40 }).sceneOpacity, 0.35);
});

test("each rear crease responds only to light reaching its side", () => {
  const zone = brightness => ({ on: brightness > 0, brightness, color: kelvinRgb(2700), unavailable: false });
  const scene = (map, levels, beamAngle = 40) => lightScene(layoutSpots(3, 4, true, map, 2), levels.map(zone),
    { rows: 3, columns: 4, beamAngle });
  const map = ["1..2", "....", "...."];
  const dark = scene(map, [0, 0]), left = scene(map, [100, 0]), right = scene(map, [0, 100]);
  assert.ok(dark.left.creaseOpacity > 0 && dark.right.creaseOpacity > 0);
  assert.deepEqual(left.right, dark.right);
  assert.deepEqual(right.left, dark.left);
  assert.ok(left.left.creaseOpacity < scene(map, [25, 0]).left.creaseOpacity);
  assert.ok(right.right.creaseOpacity < dark.right.creaseOpacity);
  assert.ok(scene(map, [100, 0], 90).left.creaseOpacity < scene(map, [100, 0], 10).left.creaseOpacity);

  const empty = scene(["....", "....", "...."], [100, 100]);
  assert.deepEqual([empty.left, empty.right], [dark.left, dark.right]);
  const unassigned = scene(["...2", "....", "...."], [100, 0]);
  assert.deepEqual([unassigned.left, unassigned.right], [dark.left, dark.right]);
  assert.equal(unassigned.zones[0].washOpacity * unassigned.zones[0].tint, 0);
});

test("every projected lens and trim selects its configured zone", () => {
  const zones = [true, false, true].map(on => ({ on, brightness: 80, color: kelvinRgb(2700), unavailable: false }));
  for (const [rows, columns, wallsOnly, map] of [
    [2, 4, false, ["1111", "2222"]], // Back | front
    [3, 4, false, ["1111", "1221", "1111"]], // Walls | centre
    [4, 3, true, ["1.3", "2.1", "3.2", "123"]],
    [8, 8, false, Array.from({ length: 8 }, (_, r) =>
      Array.from({ length: 8 }, (_, c) => (r + c) % 3 + 1).join(""))],
  ]) {
    const grid = layoutSpots(rows, columns, wallsOnly, map, zones.length);
    const scene = lightScene(grid, zones, { rows, columns, beamAngle: 40 });
    for (const [i, { row, column }] of grid.entries()) {
      const s = scene.spots[i], expected = Number(map[row][column]) - 1;
      const where = `${rows} × ${columns}, row ${row}, column ${column}`;
      assert.equal(nearestZone(scene, s.x, s.lensY), expected, where);
      assert.equal(nearestZone(scene, s.x + 0.85 * s.trimRx, s.trimY), expected, where);
      assert.equal(nearestZone(scene, s.hitX, s.hitY), expected, `${where} beam centre`);
    }
  }
  assert.equal(nearestZone({ spots: [] }, 160, 87), -1);
});
