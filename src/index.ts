import { GleamEnergyGraph } from "./cards/energy-graph/gleam-energy-graph.js";
import { GleamEnergyGraphEditor } from "./cards/energy-graph/editor";
import { GleamThermostat, GleamThermostatEditor } from "./cards/thermostat/gleam-thermostat.js";
import { GleamCover } from "./cards/cover/cover";
import { GleamCoverEditor } from "./cards/cover/editor";
import { GleamLight } from "./cards/light/light";
import { GleamLightEditor } from "./cards/light/editor";
import type { Card, CoverConfig, EnergyConfig, LightConfig, ThermostatConfig } from "./types";

// Check the public integration contract without adding a runtime base class.
const Energy: new () => Card<EnergyConfig> = GleamEnergyGraph;
const Thermostat: new () => Card<ThermostatConfig> = GleamThermostat;
const Cover: new () => Card<CoverConfig> = GleamCover;
const Light: new () => Card<LightConfig> = GleamLight;

declare global {
  interface Window {
    customCards?: { type: string; name: string; description: string; preview: boolean }[];
  }
}

const cards = [
  { type: "gleam-energy-graph", name: "Gleam Energy Graph", element: Energy,
    description: "Interactive energy and price timeline with power and voltage lanes." },
  { type: "gleam-thermostat", name: "Gleam Thermostat (Experimental)", element: Thermostat,
    description: "Experimental climate controls with limited real-device testing." },
  { type: "gleam-cover", name: "Gleam Cover", element: Cover,
    description: "Garage doors, roller shades, slatted blinds, roller shutters and curtains with live status and controls." },
  { type: "gleam-light", name: "Gleam Light", element: Light,
    description: "In-roof spots in rows and columns, split into zones with brightness and colour temperature." },
];

for (const { type, element, ...metadata } of cards) {
  if (!customElements.get(type)) customElements.define(type, element);
  window.customCards ??= [];
  if (!window.customCards.some(card => card.type === type)) {
    window.customCards.push({ type, ...metadata, preview: false });
  }
}
if (!customElements.get("gleam-thermostat-editor")) {
  customElements.define("gleam-thermostat-editor", GleamThermostatEditor);
}
if (!customElements.get("gleam-energy-graph-editor")) {
  customElements.define("gleam-energy-graph-editor", GleamEnergyGraphEditor);
}
if (!customElements.get("gleam-cover-editor")) customElements.define("gleam-cover-editor", GleamCoverEditor);
if (!customElements.get("gleam-light-editor")) customElements.define("gleam-light-editor", GleamLightEditor);
