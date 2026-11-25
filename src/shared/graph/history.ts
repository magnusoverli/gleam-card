import type { HomeAssistant } from "../../types.ts";

export interface HistoryRow { lu?: number; s?: string; state?: string; last_updated?: string; last_changed?: string }

export function readHistory(client: Pick<HomeAssistant, "callWS">, entities: string[], start: number, end: number) {
  return client.callWS<Record<string, HistoryRow[]>>({
    type: "history/history_during_period",
    start_time: new Date(start).toISOString(), end_time: new Date(end).toISOString(),
    entity_ids: entities, include_start_time_state: true,
    significant_changes_only: true, minimal_response: true, no_attributes: true,
  });
}
