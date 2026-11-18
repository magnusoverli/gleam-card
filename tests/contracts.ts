import type { Card, EnergyConfig, ThermostatConfig } from "../src/types";

function configurationContract(energy: Card<EnergyConfig>, thermostat: Card<ThermostatConfig>) {
  energy.setConfig({ hours_to_show: 24, future_hours: 8 });
  thermostat.setConfig({ entity: "climate.demo", content_overflow: "scroll" });
  // @ts-expect-error Numeric configuration cannot be a string.
  energy.setConfig({ hours_to_show: "24" });
  // @ts-expect-error A climate entity is required.
  thermostat.setConfig({ name: "Missing entity" });
  // @ts-expect-error Only supported overflow modes are accepted.
  thermostat.setConfig({ entity: "climate.demo", content_overflow: "clip" });
}
