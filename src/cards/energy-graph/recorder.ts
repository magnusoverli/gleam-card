import type { HomeAssistant } from "../../types.ts";

type Recorder = Pick<HomeAssistant, "callWS">;
export interface Statistic { start: string | number; state: string | number | null }
export { readHistory } from "../../shared/graph/history.ts";

export async function readStatistics(client: Recorder, entity: string, start: number, end: number) {
  const result = await client.callWS<Record<string, Statistic[]>>({
    type: "recorder/statistics_during_period",
    start_time: new Date(start).toISOString(), end_time: new Date(end).toISOString(),
    statistic_ids: [entity], period: "hour", types: ["state"],
  });
  return result[entity] ?? [];
}
