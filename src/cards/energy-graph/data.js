// Pure data transforms, shared by the card and its tests. All times are UTC ms.
export const HOUR = 3600000;
export const GRAPH_HEIGHT = 4.8;
export const numeric = value => {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};
export const timestamp = value => typeof value === "number"
  ? (value < 1e11 ? value * 1000 : value) : Date.parse(value);
export const clockHour = now => Math.floor(now / HOUR) * HOUR;

export function energyFromStatistics(rows, start, end) {
  const sorted = (rows || []).map(row => ({
    time: timestamp(row.start), value: numeric(row.state),
  })).filter(row => Number.isFinite(row.time)).sort((a, b) => a.time - b.time);
  const result = [];
  for (let i = 1; i < sorted.length; i++) {
    const a = sorted[i - 1], b = sorted[i];
    if (a.value === null || b.value === null || b.time - a.time !== HOUR) continue;
    const value = b.value - a.value;
    if (value >= 0 && b.time >= start && b.time <= end) {
      result.push({ time: b.time, value, live: false });
    }
  }
  return result;
}

export function withLiveEnergy(completed, sensor, now) {
  const hour = clockHour(now);
  const value = numeric(sensor?.state);
  const updated = timestamp(sensor?.last_updated);
  if (completed.some(p => p.time >= hour && p.time < hour + HOUR)
    || value === null || value < 0 || !Number.isFinite(updated) || updated < hour) {
    return [...completed];
  }
  return [...completed, { time: hour, value, live: true }];
}

export function normalizeHistory(rows) {
  return (rows || []).map(row => ({
    time: row.lu !== undefined ? timestamp(row.lu)
      : timestamp(row.last_updated || row.last_changed),
    value: numeric(row.s ?? row.state),
  })).filter(p => Number.isFinite(p.time)).sort((a, b) => a.time - b.time);
}

// Replace the queried tail, retaining one predecessor for step values at the
// rolling window boundary. Recorder can return the start state at its original
// timestamp or at the requested boundary.
export function mergeHistory(previous, incoming, from, keepFrom) {
  const prefix = previous.filter(p => p.time < from);
  const anchor = incoming.findLast(p => p.time <= from);
  if (anchor && prefix.at(-1)?.value !== anchor.value) {
    while (prefix.length && prefix.at(-1).time >= anchor.time) prefix.pop();
    prefix.push(anchor);
  } else if (!anchor && prefix.length && prefix.at(-1).value !== null) {
    prefix.push({ time: from, value: null });
  }
  const first = Math.max(0, prefix.findLastIndex(p => p.time <= keepFrom));
  return prefix.slice(first).concat(incoming.filter(p => p.time > from));
}

export function priceSegments(history, sensor, start, end, now) {
  const points = history.filter(p => p.time <= now);
  const current = numeric(sensor?.state);
  // Add the actual snapshot at its own timestamp, never backfill missing history.
  const changed = timestamp(sensor?.last_updated);
  if (Number.isFinite(changed) && changed <= now && current !== null
    && (!points.length || changed > points.at(-1).time)) {
    points.push({ time: changed, value: current });
  }
  const segments = [];
  for (let i = 0; i < points.length; i++) {
    const from = Math.max(start, points[i].time);
    const to = Math.min(now, end, points[i + 1]?.time ?? now);
    if (to > from && points[i].value !== null) {
      segments.push({ from, to, value: points[i].value, future: false });
    }
  }
  const attrs = sensor?.attributes || {};
  const prices = [
    ...(Array.isArray(attrs.raw_today) ? attrs.raw_today : []),
    ...(Array.isArray(attrs.raw_tomorrow) ? attrs.raw_tomorrow : []),
  ].filter(Boolean).map(p => ({
    from: timestamp(p.start), to: timestamp(p.end), value: numeric(p.value),
  })).filter(p => Number.isFinite(p.from) && Number.isFinite(p.to)
    && p.to > p.from && p.to > now && p.from < end && p.value !== null)
    .sort((a, b) => a.from - b.from);
  for (const p of prices) {
    const from = Math.max(now, start, p.from), to = Math.min(end, p.to);
    if (to > from) segments.push({
      from, to, value: p.from <= now && current !== null ? current : p.value,
      future: true,
    });
  }
  return segments;
}

export function sampledHistory(history, start, end, interval = HOUR / 3, divisor = 1) {
  const result = [];
  let i = 0;
  for (let time = Math.ceil(start / interval) * interval; time <= end; time += interval) {
    while (i + 1 < history.length && history[i + 1].time <= time) i++;
    if (history[i]?.time <= time && history[i].value !== null) {
      result.push({ time, value: history[i].value / divisor });
    }
  }
  return result;
}

export function scaleFor(values, steps = 4) {
  const finite = values.filter(Number.isFinite);
  const low = Math.min(0, ...finite);
  const high = Math.max(0, ...finite);
  const raw = Math.max(0.001, (high - low) / steps);
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map(n => n * magnitude).find(n => n >= raw);
  const min = Math.floor(low / step) * step;
  const max = Math.max(min + step, Math.ceil(high / step) * step);
  return { min, max, height: value => (value - min) / (max - min) * GRAPH_HEIGHT };
}
