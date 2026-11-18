import type { EnergyConfig } from "../../types";

export const ENERGY_DEFAULTS = {
  energy_entity: "sensor.total_energy",
  current_hour_entity: "",
  price_entity: "",
  power_entity: "sensor.power",
  voltage_entity: "sensor.voltage",
  hours_to_show: 33, future_hours: 16.8, refresh_interval: 10,
  dataset_spacing: 5,
  use_server_time: false,
  now_marker_color: "#ff647c",
  title: "", starting_view: "isometric",
  show_current_hour_readout: true, show_price_readout: true,
  current_hour_label: "Current hour so far", price_label: "Current price",
  show_current_hour_label: true, show_price_label: true,
  separate_readout_sizes: false, readout_value_size: 100, current_hour_value_size: 100, price_value_size: 100,
  show_dataset_buttons: true, show_camera_buttons: true, lock_navigation: false,
  start_energy: true, start_price: true, start_power: false, start_voltage: false,
  point_light_intensity: 48,
  energy_color: "#22e4ef", price_color: "#ff883f", power_color: "#64f9a5", voltage_color: "#b48aff",
  energy_opacity: 65, price_opacity: 100, power_opacity: 100, voltage_opacity: 100,
  price_line_width: 100, power_line_width: 100, voltage_line_width: 100,
  energy_shift_minutes: 0, price_shift_minutes: 0, power_shift_minutes: 0, voltage_shift_minutes: 0,
} satisfies EnergyConfig;

export const ENERGY_ENTITIES = [
  ["energy_entity", "Cumulative energy", "Lifetime meter reading · kWh"],
  ["current_hour_entity", "Current-hour energy", "Usage since the start of this hour · kWh"],
  ["price_entity", "Electricity price", "Current rate · currency per kWh"],
  ["power_entity", "Power", "Instantaneous power · W"],
  ["voltage_entity", "Voltage", "Supply voltage · V"],
] as const;

export type EnergyEntityField = typeof ENERGY_ENTITIES[number][0];

export function hasEnergySource(field: EnergyEntityField, id: string, states?: Record<string, unknown>) {
  return /^sensor\.[a-z0-9_]+$/.test(id) && (id !== ENERGY_DEFAULTS[field] || !!states?.[id]);
}
export const SERIES = ["energy", "price", "power", "voltage"] as const;

export const SHIFT_FIELDS = [
  ["energy_shift_minutes", "Energy"], ["price_shift_minutes", "Price"],
  ["power_shift_minutes", "Power"], ["voltage_shift_minutes", "Voltage"],
] as const;

export function isCompatibleEnergyUnit(field: EnergyEntityField, unit: unknown): boolean {
  if (typeof unit !== "string") return false;
  const value = unit.trim();
  switch (field) {
    case "energy_entity":
    case "current_hour_entity": return value === "kWh";
    // Currency codes, names and symbols vary by integration; require a per-kWh rate.
    case "price_entity": return /^[\p{L}\p{Sc}][\p{L}\p{M}\p{Sc} .]*\/\s*kWh$/u.test(value);
    case "power_entity": return value === "W";
    case "voltage_entity": return value === "V";
  }
}

export class EnergyFieldError extends Error {
  constructor(readonly field: keyof typeof ENERGY_DEFAULTS, message: string) { super(message); }
}

export function resolveEnergyConfig(config: EnergyConfig) {
  const merged = { ...ENERGY_DEFAULTS, ...config };
  for (const name of ["price", "power", "voltage"] as const) {
    const key = `${name}_line_width` as const;
    if (!Number.isInteger(merged[key]) || merged[key] < 25 || merged[key] > 300)
      throw new EnergyFieldError(key, `${name} line width must be a whole percentage from 25 to 300.`);
  }
  if (typeof merged.now_marker_color !== "string" || !/^#[0-9a-f]{6}$/i.test(merged.now_marker_color))
    throw new EnergyFieldError("now_marker_color", "Now marker colour must be a six-digit hex colour.");
  for (const key of ["readout_value_size", "current_hour_value_size", "price_value_size"] as const)
    if (!Number.isInteger(merged[key]) || merged[key] < 50 || merged[key] > 200)
      throw new EnergyFieldError(key, "Readout value size must be a whole percentage from 50 to 200.");
  if (typeof merged.title !== "string") throw new EnergyFieldError("title", "Card title must be text.");
  for (const key of ["current_hour_label", "price_label"] as const)
    if (typeof merged[key] !== "string") throw new EnergyFieldError(key, "Readout label must be text.");
  if (!["isometric", "front", "top"].includes(merged.starting_view))
    throw new EnergyFieldError("starting_view", "Choose Isometric, Front, or Top as the starting view.");
  for (const key of Object.keys(ENERGY_DEFAULTS) as (keyof typeof ENERGY_DEFAULTS)[]) {
    if (typeof ENERGY_DEFAULTS[key] === "boolean" && typeof merged[key] !== "boolean")
      throw new EnergyFieldError(key, `${key} must be true or false.`);
  }
  if (!Number.isFinite(merged.point_light_intensity) || merged.point_light_intensity < 0 || merged.point_light_intensity > 200)
    throw new EnergyFieldError("point_light_intensity", "Point light intensity must be between 0 and 200.");
  for (const name of SERIES) {
    const color = `${name}_color` as const, opacity = `${name}_opacity` as const;
    if (typeof merged[color] !== "string" || !/^#[0-9a-f]{6}$/i.test(merged[color]))
      throw new EnergyFieldError(color, `${name} colour must be a six-digit hex colour.`);
    if (!Number.isInteger(merged[opacity]) || merged[opacity] < 0 || merged[opacity] > 100)
      throw new EnergyFieldError(opacity, `${name} opacity must be a whole percentage from 0 to 100.`);
  }
  for (const [key, label] of SHIFT_FIELDS) {
    if (!Number.isInteger(merged[key]) || Math.abs(merged[key]) > 30)
      throw new EnergyFieldError(key, `${label} time shift must be a whole number from -30 to 30 minutes.`);
  }
  if (!Number.isFinite(merged.hours_to_show) || !(merged.hours_to_show > 0 && merged.hours_to_show <= 168)) {
    throw new EnergyFieldError("hours_to_show", "Total time span must be greater than 0 and at most 168 hours.");
  }
  if (!Number.isFinite(merged.future_hours) || !(merged.future_hours >= 0 && merged.future_hours < merged.hours_to_show)) {
    throw new EnergyFieldError("future_hours", "Future hours must be at least 0 and less than the total time span.");
  }
  if (!Number.isFinite(merged.refresh_interval) || !(merged.refresh_interval >= 5)) {
    throw new EnergyFieldError("refresh_interval", "Refresh interval must be at least 5 seconds.");
  }
  if (!Number.isInteger(merged.dataset_spacing) || merged.dataset_spacing < 0 || merged.dataset_spacing > 10) {
    throw new EnergyFieldError("dataset_spacing", "Dataset spacing must be a whole number between 0 and 10.");
  }
  for (const [key, label] of ENERGY_ENTITIES) {
    if (key !== "energy_entity" && merged[key] === "") continue;
    if (typeof merged[key] !== "string" || !/^sensor\.[a-z0-9_]+$/.test(merged[key])) {
      throw new EnergyFieldError(key, `${label} must be a sensor entity ID.`);
    }
  }
  return merged;
}
