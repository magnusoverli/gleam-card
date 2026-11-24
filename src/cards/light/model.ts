import type { EntityState, HomeAssistant, LightConfig } from "../../types.ts";
import { MAX_GRID, MAX_ZONES, defaultZoneMap, type Rgb } from "./spots.ts";

export const DEFAULT_KELVIN = 2700;
const LIGHT = /^light\.[a-z0-9_]+$/;
const wholeNumber = (value: unknown, min: number, max: number) =>
  typeof value === "number" && Number.isInteger(value) && value >= min && value <= max;

/** Validate a configuration and fill in defaults. Throws a message suitable for the card picker. */
export function settings(config: LightConfig) {
  if ((config?.light_type ?? "in_roof_spots") !== "in_roof_spots") throw Error("Unknown light type.");
  const zones = config.zones;
  if (!Array.isArray(zones) || zones.length < 1) throw Error("Add at least one zone with a light entity.");
  if (zones.length > MAX_ZONES) throw Error(`Use at most ${MAX_ZONES} zones.`);
  zones.forEach((zone, i) => {
    if (!LIGHT.test(zone?.entity ?? "")) throw Error(`Select a light entity for zone ${i + 1}.`);
  });
  if (new Set(zones.map(z => z.entity)).size !== zones.length) throw Error("Each zone needs its own light entity.");
  const rows = config.rows ?? 3, columns = config.columns ?? 4, beam = config.beam_angle ?? 40;
  if (!wholeNumber(rows, 1, MAX_GRID) || !wholeNumber(columns, 1, MAX_GRID))
    throw Error(`Rows and columns must be whole numbers from 1 to ${MAX_GRID}.`);
  if (!wholeNumber(beam, 10, 120)) throw Error("Beam angle must be a whole number of degrees from 10 to 120.");
  if (config.variant !== undefined && config.variant !== "normal" && config.variant !== "compact")
    throw Error("Layout must be normal or compact.");
  if (config.walls_only !== undefined && typeof config.walls_only !== "boolean") throw Error("walls_only must be true or false.");
  const map = config.zone_map ?? defaultZoneMap(rows, columns, zones.length);
  if (!Array.isArray(map) || map.some(row => typeof row !== "string" || !/^[1-9.]*$/.test(row)))
    throw Error("Zone map rows may contain only zone numbers and “.” for no spot.");
  const highest = Math.max(0, ...map.flatMap(row => [...row].map(Number).filter(Number.isFinite)));
  if (highest > zones.length) throw Error(`Zone map uses zone ${highest}, but only ${zones.length} zone${zones.length === 1 ? " is" : "s are"} configured.`);
  return { ...config, zones, rows, columns, beam_angle: beam, walls_only: config.walls_only ?? false, variant: config.variant ?? "normal", zone_map: map };
}
export type LightSettings = ReturnType<typeof settings>;

/** What a light entity reports, normalised for the card. */
export function readLight(entity?: EntityState) {
  const attributes = entity?.attributes ?? {};
  const available = !!entity && (entity.state === "on" || entity.state === "off");
  const modes = Array.isArray(attributes.supported_color_modes) ? attributes.supported_color_modes as string[] : undefined;
  const features = Number(attributes.supported_features) || 0;
  const dimmable = modes ? modes.some(m => m !== "onoff") : !!(features & 1);
  const tunable = modes ? modes.includes("color_temp") : !!(features & 2);
  const raw = Number(attributes.brightness);
  const brightness = Number.isFinite(raw) && raw > 0 ? Math.max(1, Math.round(raw / 255 * 100)) : undefined;
  const kelvin = Number(attributes.color_temp_kelvin);
  const rgb = attributes.rgb_color;
  const colour: Rgb | undefined = attributes.color_mode !== "color_temp" && Array.isArray(rgb) && rgb.length === 3 && rgb.every(Number.isFinite)
    ? rgb as unknown as Rgb : undefined;
  return {
    available, on: entity?.state === "on", dimmable, tunable, brightness, colour,
    kelvin: Number.isFinite(kelvin) && kelvin > 0 ? Math.round(kelvin) : undefined,
    minKelvin: Number(attributes.min_color_temp_kelvin) || 2000,
    maxKelvin: Number(attributes.max_color_temp_kelvin) || 6500,
  };
}

type Client = Pick<HomeAssistant, "callService">;
export const sendPower = (client: Client, entity_id: string, on: boolean) =>
  client.callService("light", on ? "turn_on" : "turn_off", { entity_id });
export const sendBrightness = (client: Client, entity_id: string, percent: number) =>
  client.callService("light", "turn_on", { entity_id, brightness_pct: percent });
export const sendKelvin = (client: Client, entity_id: string, kelvin: number) =>
  client.callService("light", "turn_on", { entity_id, color_temp_kelvin: kelvin });
