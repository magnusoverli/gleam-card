import type { EntityState, HomeAssistant } from "../../types.ts";

const rules = {
  set_temperature: { field: "temperature", modes: null, feature: 1 },
  set_hvac_mode: { field: "hvac_mode", modes: "hvac_modes", feature: 0 },
  set_fan_mode: { field: "fan_mode", modes: "fan_modes", feature: 8 },
  set_preset_mode: { field: "preset_mode", modes: "preset_modes", feature: 16 },
  set_swing_mode: { field: "swing_mode", modes: "swing_modes", feature: 32 },
} as const;
export type ClimateService = keyof typeof rules;

const numeric = (value: unknown): number | null =>
  value === null || value === undefined || value === "" || !Number.isFinite(Number(value)) ? null : Number(value);

export function temperatureBounds(state?: EntityState) {
  const a = state?.attributes ?? {};
  return { min: numeric(a.min_temp), max: numeric(a.max_temp), step: numeric(a.target_temp_step) || 1 };
}

export function roundTemperature(value: number, state?: EntityState) {
  const { min, max, step } = temperatureBounds(state);
  if (min === null || max === null || step <= 0) return NaN;
  return Number(Math.min(max, Math.max(min, min + Math.round((value - min) / step) * step)).toFixed(3));
}

/** Validation has no side effects; only sendClimateCommand performs an action. */
export function planClimateCommand(state: EntityState | undefined, service: ClimateService, data: Record<string, unknown>) {
  if (!state || ["unknown", "unavailable"].includes(state.state)) return null;
  const rule = rules[service];
  if (!rule) return null;
  const { field, modes, feature } = rule;
  const a = state.attributes, value = data[field];
  if (feature && !(Number(a.supported_features) & feature)) return null;
  if (service === "set_temperature") {
    const { min, max } = temperatureBounds(state);
    if (min === null || max === null || max <= min || typeof value !== "number"
      || !Number.isFinite(value) || roundTemperature(value, state) !== value) return null;
  } else {
    const allowed = modes ? a[modes] : undefined;
    if (!Array.isArray(allowed) || !allowed.includes(value)) return null;
  }
  return { field, value, unchanged: (field === "hvac_mode" ? state.state : a[field]) === value };
}

export function sendClimateCommand(client: Pick<HomeAssistant, "callService">, entity: string,
  service: ClimateService, data: Record<string, unknown>) {
  return client.callService("climate", service, { ...data, entity_id: entity });
}
