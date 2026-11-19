import type { CoverConfig, EntityState, HomeAssistant } from "../../types";

export const MIN_KELVIN = 2000, MAX_KELVIN = 6500;
function validateLamp(id?: string, kelvin?: number) {
  if (id !== undefined && !/^light\.[a-z0-9_]+$/.test(id)) throw Error("Select a light entity or leave it blank.");
  if (kelvin !== undefined && (!Number.isInteger(kelvin) || kelvin < MIN_KELVIN || kelvin > MAX_KELVIN))
    throw Error(`Light temperature must be a whole number from ${MIN_KELVIN} to ${MAX_KELVIN} K.`);
}

export function settings(config: CoverConfig) {
  if (!/^cover\.[a-z0-9_]+$/.test(config?.entity)) throw Error("Select a cover entity.");
  const seconds = config.travel_seconds ?? 10;
  if (!Number.isFinite(seconds) || seconds < 1 || seconds > 300) throw Error("Travel time must be 1–300 seconds.");
  if (!["normal","compact","double"].includes(config.variant ?? "normal")) throw Error("Unknown cover variant.");
  if (config.roof_type !== undefined && config.roof_type !== "pitched" && config.roof_type !== "flat")
    throw Error("Roof type must be pitched or flat.");
  const kelvin = sharedTemperature(config);
  validateLamp(config.light_entity, kelvin);
  if (config.variant === "double") {
    validateLamp(config.right_light_entity);
    if (!/^cover\.[a-z0-9_]+$/.test(config.right_entity ?? "") || config.right_entity === config.entity)
      throw Error("Select a different cover entity for the right door.");
    const right = config.right_travel_seconds ?? seconds;
    if (!Number.isFinite(right) || right < 1 || right > 300) throw Error("Right travel time must be 1–300 seconds.");
  }
  return { ...config, travel_seconds: seconds, light_temperature_kelvin: kelvin };
}

export function sharedTemperature(config: CoverConfig) {
  return config.light_temperature_kelvin ?? (config.variant === "double" ? config.right_light_temperature_kelvin : undefined);
}

export function position(entity?: EntityState) {
  const p = entity?.attributes.current_position;
  return typeof p === "number" && Number.isFinite(p) && p >= 0 && p <= 100 ? p / 100 : undefined;
}

export function action(entity?: EntityState) {
  const features = Number(entity?.attributes.supported_features);
  if (entity?.state === "closed" && (features & 1)) return "open";
  if (entity?.state === "open" && (features & 2)) return "close";
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
