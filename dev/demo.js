const HOUR = 3600000;
const now = Date.now();
const hour = Math.floor(now / HOUR) * HOUR;
const state = (value, attributes = {}) => ({
  state: String(value), attributes, last_updated: new Date(now).toISOString(),
});
const states = {
  "sensor.total_energy": state(1200, { unit_of_measurement: "kWh" }),
  "sensor.current_hour_energy": state(.84, { unit_of_measurement: "kWh" }),
  "sensor.electricity_price": state(1.25, {
    unit_of_measurement: "kr/kWh",
    raw_today: Array.from({ length: 24 }, (_, i) => ({
      start: new Date(hour + i * HOUR).toISOString(),
      end: new Date(hour + (i + 1) * HOUR).toISOString(),
      value: 1.2 + Math.sin(i / 3) * .6,
    })),
  }),
  "sensor.power": state(2400, { unit_of_measurement: "W" }),
  "sensor.voltage": state(230, { unit_of_measurement: "V" }),
  "climate.heat_pump": state("heat", {
    friendly_name: "Demo heat pump", temperature: 22, current_temperature: 20.5,
    min_temp: 16, max_temp: 30, target_temp_step: .5, supported_features: 1 | 8 | 16 | 32,
    hvac_modes: ["off", "heat", "cool", "auto"], hvac_action: "heating",
    fan_modes: ["auto", "low", "high"], fan_mode: "auto",
    preset_modes: ["none", "eco"], preset_mode: "none",
    swing_modes: ["off", "vertical"], swing_mode: "off",
  }),
};
const calls = [];
const requests = [];
const hass = {
  states,
  config: { unit_system: { temperature: "°C" } },
  locale: { language: "en", number_format: "language" },
  async callWS(request) {
    requests.push(request);
    if (request.type === "recorder/statistics_during_period") {
      return { [request.statistic_ids[0]]: Array.from({ length: 40 }, (_, i) => ({
        start: hour - (39 - i) * HOUR, state: 1100 + i * 1.2 + Math.sin(i / 3) * .4,
      })) };
    }
    if (request.type === "history/history_during_period") {
      return Object.fromEntries(request.entity_ids.map(id => [id, Array.from({ length: 40 }, (_, i) => ({
        lu: (hour - (39 - i) * HOUR) / 1000,
        s: String(id === "sensor.power" ? 2400 + Math.sin(i) * 600 :
          id === "sensor.voltage" ? 230 + Math.sin(i) * 3 : 1.2 + Math.sin(i / 3) * .6),
      }))]));
    }
    throw new Error(`Unmocked request: ${request.type}`);
  },
  async callService(domain, service, data) {
    calls.push({ domain, service, data });
    document.querySelector("#actions").textContent = `Mock action: ${domain}.${service} ${JSON.stringify(data)}`;
    const { entity_id: id, ...values } = data;
    const previous = states[id];
    states[id] = { ...previous, attributes: { ...previous.attributes, ...values } };
    if (service === "set_hvac_mode") states[id].state = data.hvac_mode;
    queueMicrotask(() => { thermostat.hass = { ...hass, states: { ...states } }; });
  },
};
const energy = document.createElement("gleam-energy-graph");
energy.setConfig({ type: "custom:gleam-energy-graph", current_hour_entity: "sensor.current_hour_energy", price_entity: "sensor.electricity_price" });
energy.hass = hass;
const thermostat = document.createElement("gleam-thermostat");
thermostat.id = "thermostat";
thermostat.setConfig({ type: "custom:gleam-thermostat", entity: "climate.heat_pump", name: "Demo heat pump" });
thermostat.hass = { ...hass, states: { ...states } };
document.querySelector("#cards").append(energy, thermostat);
window.demo = { energy, thermostat, hass, calls, requests };
