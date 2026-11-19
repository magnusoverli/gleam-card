const HOUR = 3600000;
const now = Date.now();
const hour = Math.floor(now / HOUR) * HOUR;
const state = (value, attributes = {}) => ({
  state: String(value), attributes, last_updated: new Date(now).toISOString(),
});
const states = {
  "cover.demo_blind": state("closed",{device_class:"blind",friendly_name:"Studio blinds",supported_features:7|128,current_position:0,current_tilt_position:50}),
  "cover.demo_shade": state("open",{device_class:"shade",friendly_name:"Living room shade",supported_features:7,current_position:40}),
  "cover.state_only_shade": state("closed",{device_class:"shade",friendly_name:"Office shade",supported_features:3}),
  "cover.offline_shade": state("unavailable",{device_class:"shade",friendly_name:"Guest room shade",supported_features:3}),
  "cover.right_garage": { ...state("open", { friendly_name:"Right garage", device_class:"garage", supported_features:3 }), last_changed:new Date(now-HOUR).toISOString() },
  "cover.garage_door": { ...state("closed", { friendly_name: "Garage", device_class: "garage", supported_features: 3 }), last_changed: new Date(now - 134 * 60000).toISOString() },
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
    const label = states[data.entity_id]?.attributes.friendly_name ?? data.entity_id;
    const value = Object.entries(data).find(([key]) => key !== "entity_id")?.[1];
    document.querySelector("#actions").textContent = `${label} · ${service.replaceAll("_"," ")}${value === undefined ? "" : `: ${value}`}`;
    const { entity_id: id, ...values } = data;
    const previous = states[id];
    if (domain === "cover") {
      if (service === "set_cover_tilt_position") {
        states[id]={...previous,attributes:{...previous.attributes,current_tilt_position:data.tilt_position}};
        cover.hass={...hass,states:{...states}};
        return;
      }
      const end = service === "set_cover_position" ? data.position : service === "open_cover" ? 100 : 0;
      const start = previous.attributes.current_position ?? (previous.state==="closed"?0:100);
      const opening = end>start;
      const report = value => {
        const attrs = {...states[id].attributes};
        if (id === "cover.demo_shade" || id === "cover.demo_blind") {
          if (value === "closed" || value === "open") attrs.current_position = end;
          else delete attrs.current_position;
        }
        states[id] = { ...previous, attributes:attrs, state: value, last_changed: new Date().toISOString() };
        cover.hass = { ...hass, states: { ...states } };
      };
      report(opening ? "opening" : "closing");
      setTimeout(() => report(end ? "open" : "closed"), 100*Math.abs(end-start));
      return;
    }
    states[id] = { ...previous, attributes: { ...previous.attributes, ...values } };
    if (service === "set_hvac_mode") states[id].state = data.hvac_mode;
    queueMicrotask(() => { thermostat.hass = { ...hass, states: { ...states } }; });
  },
};
const mount = document.querySelector("#cards");
const selected = document.body.dataset.card;
let energy, thermostat, cover;
if (!selected || selected === "energy") {
energy = document.createElement("gleam-energy-graph");
energy.id = "energy-graph";
energy.setConfig({ type: "custom:gleam-energy-graph", current_hour_entity: "sensor.current_hour_energy", price_entity: "sensor.electricity_price" });
energy.hass = hass;
mount.append(energy);
}
if (!selected || selected === "thermostat") {
thermostat = document.createElement("gleam-thermostat");
thermostat.id = "thermostat";
thermostat.setConfig({ type: "custom:gleam-thermostat", entity: "climate.heat_pump", name: "Demo heat pump" });
thermostat.hass = { ...hass, states: { ...states } };
mount.append(thermostat);
}
if (!selected || selected === "cover") {
cover = document.createElement("gleam-cover");
cover.id = "cover";
cover.hass = hass;
const layouts = document.createElement("label");
layouts.id = "garage-layout";
layouts.innerHTML = `<span>Garage layout</span> <select><option>Normal</option><option>Compact</option><option>Double</option></select>`;
const examples = document.createElement("label");
examples.id = "cover-example";
examples.innerHTML = `Example <select><option value="">Garage</option><option value="cover.demo_blind">Slatted blind · lift and tilt</option><option value="cover.demo_shade">Roller shade · measured position</option><option value="cover.state_only_shade">Roller shade · state only</option><option value="cover.offline_shade">Roller shade · unavailable</option></select>`;
const applyCoverLayout = () => {
  const id = examples.querySelector("select").value, select = layouts.querySelector("select");
  const blind = id === "cover.demo_blind";
  layouts.querySelector("span").textContent = blind ? "Blind layout" : id ? "Shade layout" : "Garage layout";
  select.options[2].hidden = select.options[2].disabled = !!id;
  if (id && select.value === "Double") select.value = "Normal";
  const variant = select.value.toLowerCase();
  cover.setConfig(id ? {entity:id,cover_type:blind?"blind":"shade",variant} : {entity:"cover.garage_door",variant,right_entity:"cover.right_garage"});
  cover.style.gridColumn = `span ${cover.getGridOptions().columns}`;
};
layouts.onchange = applyCoverLayout;
examples.onchange = applyCoverLayout;
applyCoverLayout();
mount.append(examples, layouts, cover);
}
window.demo = { energy, thermostat, cover, hass, calls, requests };
