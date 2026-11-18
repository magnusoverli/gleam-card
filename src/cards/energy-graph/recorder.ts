import type { HomeAssistant } from "../../types.ts";

type Recorder = Pick<HomeAssistant, "callWS">;
export interface Statistic { start: string | number; state: string | number | null }
export interface HistoryRow { lu?: number; s?: string; state?: string; last_updated?: string; last_changed?: string }

export async function readStatistics(client: Recorder, entity: string, start: number, end: number) {
  const result = await client.callWS<Record<string, Statistic[]>>({
    type: "recorder/statistics_during_period",
    start_time: new Date(start).toISOString(), end_time: new Date(end).toISOString(),
    statistic_ids: [entity], period: "hour", types: ["state"],
  });
  return result[entity] ?? [];
}

export async function readHistory(client: Recorder, entities: string[], start: number, end: number) {
  return client.callWS<Record<string, HistoryRow[]>>({
    type: "history/history_during_period",
    start_time: new Date(start).toISOString(), end_time: new Date(end).toISOString(),
    entity_ids: entities, include_start_time_state: true,
    significant_changes_only: true, minimal_response: true, no_attributes: true,
  });
}
