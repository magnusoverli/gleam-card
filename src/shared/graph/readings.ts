export interface Reading { time: number; value: number | null }

export function timestamp(value?: string | number) {
  return typeof value === "number" ? (value < 1e11 ? value * 1000 : value) : Date.parse(value ?? "");
}

// Replace the queried tail while retaining a boundary state for stepped
// history. Recorder may return the predecessor at its original timestamp.
export function mergeHistory(previous: Reading[], incoming: Reading[], from: number, keepFrom: number) {
  const prefix = previous.filter(p => p.time < from);
  let i = incoming.length - 1;
  while (i >= 0 && incoming[i].time > from) i--;
  const anchor = incoming[i];
  if (anchor && prefix.at(-1)?.value !== anchor.value) {
    while (prefix.length && prefix.at(-1)!.time >= anchor.time) prefix.pop();
    prefix.push(anchor);
  } else if (!anchor && prefix.length && prefix.at(-1)!.value !== null) {
    prefix.push({ time: from, value: null });
  }
  let first = prefix.length - 1;
  while (first > 0 && prefix[first].time > keepFrom) first--;
  return prefix.slice(first).concat(incoming.filter(p => p.time > from));
}
