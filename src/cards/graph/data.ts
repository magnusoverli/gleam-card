import type { Series } from "./config.ts";
import type { Reading } from "../../shared/graph/readings.ts";

export interface Point { time: number; value: number; run: number }
export interface Bar { from: number; to: number; value: number }
export interface Plot { points: Point[]; bars: Bar[] }
export const MINUTE = 60000, HOUR = 60 * MINUTE;
export function numberState(value: unknown) {
  if (typeof value !== "number" && (typeof value !== "string" || !value.trim())) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

/** Input is chronological. Never connect across an explicit nonnumeric report,
 * even if the entire outage is narrower than a decimation bucket. */
export function makePlot(rows: readonly Reading[], s: Series, start: number, end: number, budget = 160): Plot {
  const points: Point[] = [], bars: Bar[] = [];
  if (end <= start) return { points, bars };
  if (s.plot === "bar") {
    // Aggregate actual observations, never a synthetic boundary/held sample.
    const span = s.interval_minutes * MINUTE;
    let bucket = NaN, sum = 0, count = 0, value = 0, gap = false, unavailable = false;
    const finish = () => {
      if (count && !gap && bucket < end) bars.push({ from: Math.max(start, bucket), to: Math.min(end, bucket + span), value: s.aggregate === "mean" ? sum / count : value });
    };
    for (const row of rows) {
      if (row.time < start) { unavailable = row.value === null; continue; }
      if (row.time > end) break;
      const next = Math.floor(row.time / span) * span;
      if (next !== bucket) {
        finish(); bucket = next; count = sum = 0; gap = unavailable && row.time > Math.max(start, bucket);
      }
      unavailable = row.value === null;
      if (row.value === null) { gap = true; continue; }
      value = !count || s.aggregate === "last" ? row.value :
        s.aggregate === "min" ? Math.min(value, row.value) : Math.max(value, row.value);
      sum += row.value; count++;
    }
    finish();
    return { points, bars };
  }
  let run = 0, previous: Reading | undefined, bucket = -1;
  let first: Point | undefined, low: Point, high: Point, last: Point;
  const flush = () => {
    if (!first) return;
    for (const p of [...new Set([first, low, high, last])].sort((a,b) => a.time - b.time)) points.push(p);
    first = undefined;
  };
  const add = (time: number, value: number) => {
    const next = Math.floor((time - start) / (end - start) * budget), p = { time, value, run };
    if (next !== bucket) { flush(); bucket = next; }
    if (!first) first = low = high = p;
    if (value < low.value) low = p;
    if (value > high.value) high = p;
    last = p;
  };
  for (const row of rows) {
    if (row.time > end) break;
    if (row.time >= start) {
      if (previous && previous.time < start && previous.value !== null) {
        // Clip a crossing line to the boundary; steps hold the predecessor.
        const fraction = (start - previous.time) / (row.time - previous.time);
        add(start, s.plot === "step" || row.value === null ? previous.value : previous.value + (row.value - previous.value) * fraction);
      }
      if (row.value !== null) add(row.time, row.value);
      else {
        if (previous && previous.value !== null) add(row.time, previous.value);
        run++;
      }
    }
    previous = row;
  }
  // Recorder reports changes: an unchanged, known state remains valid through
  // the end of the requested history. An unavailable final state never extends.
  if (previous && previous.value !== null && previous.time < end) {
    if (previous.time < start) add(start, previous.value);
    add(end, previous.value);
  }
  flush();
  return { points, bars };
}

export function axisRange(values: number[], zero: boolean, min?: number, max?: number) {
  let lo = zero ? 0 : Infinity, hi = zero ? 0 : -Infinity;
  for (const v of values) { lo = Math.min(lo, v); hi = Math.max(hi, v); }
  if (!Number.isFinite(lo)) { lo = min ?? max ?? 0; hi = max ?? lo; }
  const pad = hi === lo ? Math.max(Math.abs(lo) * .01, .5) : (hi - lo) * .05;
  const bottom = min ?? (zero && lo === 0 ? 0 : lo - pad), top = max ?? (zero && hi === 0 && lo < 0 ? 0 : hi + pad);
  if (top > bottom) return [bottom, top] as const;
  return min !== undefined ? [min, min + pad] as const : [top - pad, top] as const;
}
