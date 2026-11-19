export interface EntityState {
  state: string;
  last_changed?: string;
  last_updated?: string | number;
  attributes: Record<string, unknown>;
}

export interface HomeAssistant {
  fetchWithAuth?(path: string, init: RequestInit): Promise<Response>;
  states: Record<string, EntityState>;
  config?: { time_zone?: string; unit_system?: { temperature?: string } };
  locale?: { language?: string; time_zone?: string };
  callWS<T>(request: Record<string, unknown>): Promise<T>;
  callService(domain: string, service: string, data: Record<string, unknown>): Promise<unknown>;
}

export interface EnergyConfig {
  type?: "custom:gleam-energy-graph";
  energy_entity?: string;
  current_hour_entity?: string;
  price_entity?: string;
  power_entity?: string;
  voltage_entity?: string;
  hours_to_show?: number;
  future_hours?: number;
  refresh_interval?: number;
  dataset_spacing?: number;
  use_server_time?: boolean;
  title?: string;
  show_current_hour_readout?: boolean;
  show_price_readout?: boolean;
  current_hour_label?: string;
  price_label?: string;
  show_current_hour_label?: boolean;
  show_price_label?: boolean;
  separate_readout_sizes?: boolean;
  readout_value_size?: number;
  current_hour_value_size?: number;
  price_value_size?: number;
  show_dataset_buttons?: boolean;
  show_camera_buttons?: boolean;
  lock_navigation?: boolean;
  starting_view?: "isometric" | "front" | "top";
  start_energy?: boolean;
  start_price?: boolean;
  start_power?: boolean;
  start_voltage?: boolean;
  point_light_intensity?: number;
  energy_color?: string;
  now_marker_color?: string;
  price_color?: string;
  power_color?: string;
  voltage_color?: string;
  energy_opacity?: number;
  price_line_width?: number;
  power_line_width?: number;
  voltage_line_width?: number;
  price_opacity?: number;
  power_opacity?: number;
  voltage_opacity?: number;
  energy_shift_minutes?: number;
  price_shift_minutes?: number;
  power_shift_minutes?: number;
  voltage_shift_minutes?: number;
}

export interface ThermostatConfig {
  type?: "custom:gleam-thermostat";
  entity: string;
  name?: string;
  card_height?: number;
  card_max_width?: number;
  content_overflow?: "scale" | "scroll";
  show_name?: boolean;
  show_mode?: boolean;
  show_caption?: boolean;
  show_room_temperature?: boolean;
  dial_height?: number;
  dial_padding?: number;
  temperature_font_size?: number;
  card_padding?: number;
  corner_radius?: number;
  interactive_dial?: boolean;
  show_temperature_buttons?: boolean;
  show_temperature_slider?: boolean;
  show_hvac_modes?: boolean;
  show_fan?: boolean;
  show_presets?: boolean;
  show_swing?: boolean;
  advanced_open?: boolean;
  confirmation_timeout?: number;
  heat_color?: string;
  cool_color?: string;
  off_color?: string;
  background_color?: string;
  show_dial_ticks?: boolean;
  glass_opacity?: number;
  ring_thickness?: number;
  glow_intensity?: number;
}

export interface Card<Config> extends HTMLElement {
  hass: HomeAssistant;
  setConfig(config: Config): void;
}

export interface CoverConfig {
  cover_type?: "garage" | "shade";
  shade_opacity?: number;
  window_image?: string;
  window_image_zoom?: number;
  window_image_x?: number;
  window_image_y?: number;
  glazing_bar_width?: number;
  glazing_bar_color?: string;
  roof_type?: "pitched" | "flat";
  type?: "custom:gleam-cover";
  entity: string;
  name?: string;
  travel_seconds?: number;
  variant?: "normal" | "compact" | "double";
  right_entity?: string;
  right_travel_seconds?: number;
  light_entity?: string;
  light_temperature_kelvin?: number;
  right_light_entity?: string;
  /** Legacy read fallback. New configurations use light_temperature_kelvin for both bays. */
  right_light_temperature_kelvin?: number;
  left_label?: string;
  right_label?: string;
}
