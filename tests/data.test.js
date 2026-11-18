import { test } from "node:test";
import assert from "node:assert/strict";
import { HOUR, energyFromStatistics, withLiveEnergy, priceSegments, normalizeHistory, mergeHistory, scaleFor } from "../src/cards/energy-graph/data.js";

const now = Date.parse("2026-11-18T12:30:00Z");
const hour = now - HOUR / 2;
test("incremental history replaces corrections, retains a boundary state and preserves unavailable gaps", () => {
  const points = rows => rows.map(([time, value]) => ({ time, value }));
  const old = points([[0, 0], [4, 1], [7, 2], [11, 3]]);
  assert.deepEqual(mergeHistory(old, points([[10, 2], [12, null], [14, 4]]), 10, 6),
    points([[4, 1], [7, 2], [12, null], [14, 4]]));
  assert.deepEqual(mergeHistory(old, [], 10, 6), points([[4, 1], [7, 2], [10, null]]));
});
test("energy differences preserve zero readings and skip gaps and meter resets", () => {
  const rows = [10, 10, 12, 1].map((state, i) => ({ start: hour + i * HOUR, state }));
  rows.push({ start: hour + 5 * HOUR, state: 4 });
  assert.deepEqual(energyFromStatistics(rows, hour, hour + 6 * HOUR).map(p => p.value), [0, 2]);
});
test("completed zero consumption takes precedence over live energy", () => {
  const completed = [{ time: hour, value: 0, live: false }];
  assert.deepEqual(withLiveEnergy(completed, { state: "2", last_updated: now }, now), completed);
});
test("previous-hour live values are rejected", () => {
  assert.deepEqual(withLiveEnergy([], { state: "2", last_updated: hour - 1 }, now), []);
});
test("forecast never fills missing recorded history", () => {
  const sensor = { state: "1.5", attributes: { raw_today: [
    { start: hour, end: hour + HOUR, value: 2 },
    { start: hour + HOUR, end: hour + 2 * HOUR, value: 3 },
  ] } };
  const segments = priceSegments([], sensor, hour - HOUR, hour + 2 * HOUR, now);
  assert.equal(segments.length, 2);
  assert.ok(segments.every(p => p.future && p.from >= now));
  assert.equal(segments[0].value, 1.5);
  assert.equal(segments[1].value, 3);
});
test("unavailable history is retained as a gap rather than zero", () => {
  const points = normalizeHistory([{ lu: hour / 1000, s: "unavailable" }]);
  assert.deepEqual(points, [{ time: hour, value: null }]);
});
test("scales support negative prices and empty data", () => {
  const scale = scaleFor([-2, 4]);
  assert.ok(scale.min <= -2 && scale.max >= 4);
  assert.ok(scale.height(-2) < scale.height(4));
  assert.ok(Number.isFinite(scaleFor([]).height(0)));
});
