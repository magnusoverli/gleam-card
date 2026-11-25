import { readHistory } from "../../shared/graph/history.ts";
import { mergeHistory, timestamp, type Reading } from "../../shared/graph/readings.ts";
import type { HomeAssistant } from "../../types.ts";
import { HOUR, MINUTE, numberState } from "./data.ts";

interface Entry { rows: Reading[]; last: number; full: number; retry: number; error: string }
/** Entries belong to a card and entity. Reconfiguration/disconnect can detach an
 * entry while a request is in flight without letting its result touch new data. */
export class GraphHistory {
  private entries = new Map<string, Entry>();
  retain(ids: string[]) {
    for (const id of this.entries.keys()) if (!ids.includes(id)) this.entries.delete(id);
    for (const id of ids) if (!this.entries.has(id))
      this.entries.set(id, { rows: [], last: -Infinity, full: -Infinity, retry: 0, error: "" });
  }
  get(id: string) { return this.entries.get(id); }
  async refresh(client: Pick<HomeAssistant,"callWS">, ids: string[], start: number, now: number) {
    const due = ids.flatMap(id => {
      const e = this.entries.get(id);
      return e && now >= e.retry && now - e.last >= MINUTE ? [{ id, e }] : [];
    });
    await Promise.all([true, false].map(async full => {
      const batch = due.filter(({ e }) => (now - e.full >= HOUR) === full);
      if (!batch.length) return;
      const from = full ? start : Math.max(start, Math.min(...batch.map(({e}) => e.last)) - MINUTE);
      try {
        const result = await readHistory(client, batch.map(b => b.id), from, now);
        for (const { id, e } of batch) {
          const rows: Reading[] = (result[id] ?? []).map(row => ({
            time: timestamp(row.lu ?? row.last_updated ?? row.last_changed),
            value: numberState(row.s ?? row.state),
          })).filter(p => Number.isFinite(p.time)).sort((a,b) => a.time - b.time);
          e.rows = full ? rows : mergeHistory(e.rows, rows, from, start);
          e.last = now; if (full) e.full = now;
          e.error = "";
        }
      } catch {
        for (const {id,e} of batch) { e.error = `Could not load history for ${id}.`; e.retry = now + MINUTE; }
      }
    }));
  }
}
