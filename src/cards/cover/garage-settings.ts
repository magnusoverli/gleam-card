import type { CoverConfig } from "../../types";
export const MIN_KELVIN = 2000, MAX_KELVIN = 6500;
export function sharedTemperature(config: CoverConfig) {
  return config.light_temperature_kelvin ?? (config.variant === "double" ? config.right_light_temperature_kelvin : undefined);
}
export function validateGarage(config: CoverConfig) {
  if (config.roof_type !== undefined && config.roof_type !== "pitched" && config.roof_type !== "flat")
    throw Error("Roof type must be pitched or flat.");
  const kelvin = sharedTemperature(config);
  if (kelvin !== undefined && (!Number.isInteger(kelvin) || kelvin < MIN_KELVIN || kelvin > MAX_KELVIN))
    throw Error(`Light temperature must be a whole number from ${MIN_KELVIN} to ${MAX_KELVIN} K.`);
  const double = config.variant === "double";
  for (const id of [config.light_entity, double ? config.right_light_entity : undefined])
    if (id !== undefined && !/^light\.[a-z0-9_]+$/.test(id)) throw Error("Select a light entity or leave it blank.");
  if (!double) return;
  if (!/^cover\.[a-z0-9_]+$/.test(config.right_entity ?? "") || config.right_entity === config.entity)
    throw Error("Select a different cover entity for the right door.");
  const right = config.right_travel_seconds ?? config.travel_seconds ?? 10;
  if (!Number.isFinite(right) || right < 1 || right > 300) throw Error("Right travel time must be 1–300 seconds.");
}
