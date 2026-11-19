import type { CoverConfig, EntityState, HomeAssistant } from "../../types";
import { kinds } from "./kinds";

export function settings(config: CoverConfig) {
  if (!/^cover\.[a-z0-9_]+$/.test(config?.entity)) throw Error("Select a cover entity.");
  const seconds = config.travel_seconds ?? 10;
  if (!Number.isFinite(seconds) || seconds < 1 || seconds > 300) throw Error("Travel time must be 1–300 seconds.");
  const kind = config.cover_type ?? "garage";
  if (!Object.hasOwn(kinds,kind)) throw Error("Unknown cover type.");
  if (!kinds[kind].layouts.includes(config.variant ?? "normal")) throw Error(`Unsupported layout for ${kinds[kind].label}.`);
  kinds[kind].validate?.(config);
  return { ...config, travel_seconds: seconds };
}

export function position(entity?: EntityState) {
  const p = entity?.attributes.current_position;
  return typeof p === "number" && Number.isFinite(p) && p >= 0 && p <= 100 ? p / 100 : undefined;
}

export function canSetPosition(entity?: EntityState) {
  return !!entity && ["closed","open","opening","closing"].includes(entity.state) && !!(Number(entity.attributes.supported_features) & 4);
}

export function sendPosition(client: Pick<HomeAssistant,"callService">, entity_id:string, percent:number) {
  return client.callService("cover","set_cover_position",{entity_id,position:percent});
}

export type Direction = "open" | "close";
export function available(entity: EntityState | undefined, direction: Direction) {
  if (!entity || (entity.state !== "open" && entity.state !== "closed")) return false;
  const features = Number(entity?.attributes.supported_features);
  const p = position(entity);
  if (direction === "open") return !!(features & 1) && (p === undefined ? entity.state === "closed" : p < 1);
  return !!(features & 2) && (p === undefined ? entity.state === "open" : p > 0);
}

export function send(client: Pick<HomeAssistant, "callService">, id: string, direction: "open" | "close") {
  return client.callService("cover", `${direction}_cover`, { entity_id: id });
}

export interface Travel { from: number; to: number; start: number; duration: number }
export function fraction(travel: Travel, now: number) {
  const t = Math.min(1, Math.max(0, (now - travel.start) / travel.duration));
  return t === 1 ? travel.to : travel.from + (travel.to - travel.from) * t;
}

export function elapsed(since?: string) {
  const m = Math.floor((Date.now() - Date.parse(since ?? "")) / 60000);
  if (!Number.isFinite(m) || m < 0) return "";
  return m < 1 ? "Under 1 min" : m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${m % 60} min`;
}
