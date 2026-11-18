import type { ThermostatConfig } from "../../types";

type Settings = Required<Omit<ThermostatConfig, "type" | "entity" | "name">>;
type Option = { [K in keyof Settings]: Settings[K] extends number
  ? [K, string, number, number, number, number]
  : Settings[K] extends boolean ? [K, string, boolean]
  : K extends "content_overflow" ? [K, string, Settings[K], Settings[K][]]
  : [K, string, string] }[keyof Settings];

export const DEFAULT_NAME = "Thermostat";
export const OPTIONS: [string, Option[]][] = [
  ["Card size", [
    ["card_height", "Card height (px, 0 = automatic)", 0, 0, 1600, 1],
    ["card_max_width", "Maximum card width (px, 0 = fill available width)", 0, 0, 1600, 1],
    ["content_overflow", "Content inside a fixed-height card", "scale", ["scale", "scroll"]],
  ]],
  ["Display", [
    ["show_name", "Show name", true], ["show_mode", "Show current mode", true],
    ["show_caption", "Show target-temperature caption", true], ["show_room_temperature", "Show room-temperature status", true],
    ["dial_height", "Dial height (px)", 265, 180, 420, 5], ["dial_padding", "Dial padding (%)", 10, 0, 30, 1],
    ["temperature_font_size", "Temperature text size (px)", 58, 32, 88, 1],
    ["card_padding", "Card padding (px)", 20, 8, 32, 1], ["corner_radius", "Corner radius (px)", 22, 0, 40, 1],
  ]],
  ["Controls", [
    ["interactive_dial", "Enable dial dragging and keyboard controls", true],
    ["show_temperature_buttons", "Show temperature +/− buttons", true],
    ["show_temperature_slider", "Show temperature slider", true],
    ["show_hvac_modes", "Show heat-pump mode buttons", true],
    ["show_fan", "Show fan speed selector", true], ["show_presets", "Show preset selector", true],
    ["show_swing", "Show swing selector", true], ["advanced_open", "Open advanced controls by default", false],
    ["confirmation_timeout", "Reported-state confirmation timeout (seconds)", 12, 5, 60, 1],
  ]],
  ["Appearance", [
    ["heat_color", "Heating accent", "#ffab70"], ["cool_color", "Cooling accent", "#65f0ff"],
    ["off_color", "Off / unavailable accent", "#8fa9c2"], ["background_color", "Background color", "#080e24"],
    ["show_dial_ticks", "Show dial tick marks", true], ["glass_opacity", "Glass opacity", .7, .1, 1, .05],
    ["ring_thickness", "Active ring thickness", .08, .03, .15, .01],
    ["glow_intensity", "Ring glow intensity", .45, 0, 1.5, .05],
  ]],
];

export const DEFAULTS = Object.fromEntries(OPTIONS.flatMap(([, fields]) => fields.map(([key, , value]) => [key, value]))) as Settings;

export function resolveThermostatConfig(config: ThermostatConfig) {
  if (!/^climate\.[a-z0-9_]+$/.test(config.entity || "")) throw new Error("Gleam Thermostat needs a climate entity.");
  const resolved = { ...DEFAULTS, name: DEFAULT_NAME, ...config };
  for (const [, fields] of OPTIONS) for (const [key, label, initial, min, max] of fields) {
    const value = resolved[key];
    if (typeof min === "number" && !(typeof value === "number" && Number.isFinite(value) && value >= min && value <= max!))
      throw new Error(`${label} must be between ${min} and ${max}.`);
    if (typeof initial === "boolean" && typeof value !== "boolean") throw new Error(`${label} must be true or false.`);
    if (Array.isArray(min) && !min.some(choice => choice === value)) throw new Error(`${label} must be one of: ${min.join(", ")}.`);
    if (typeof initial === "string" && !min && !(typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value)))
      throw new Error(`${label} must be a six-digit hex color.`);
  }
  if (resolved.card_height > 0 && resolved.card_height < 120) throw new Error("Card height must be 0 (automatic) or at least 120 px.");
  if (resolved.card_max_width > 0 && resolved.card_max_width < 200) throw new Error("Maximum card width must be 0 (available width) or at least 200 px.");
  if (typeof resolved.name !== "string") throw new Error("Display name must be text.");
  return resolved;
}
