# Gleam Cards

See **when you used energy and what electricity cost at the time** on one interactive Home Assistant dashboard. Start with a cumulative energy meter; add price, power, and voltage sensors when you have them.

The Energy Graph and Thermostat are the first two cards in a planned Gleam series. The long-term goal is to cover most everyday Home Assistant dashboard needs with cards that look and feel consistent.

[Install](#install) · [Energy Graph guide](docs/energy-graph.md) · [Thermostat guide](docs/thermostat.md)

![Gleam Energy Graph showing hourly consumption bars beside a stepped price forecast and power history](docs/images/energy-graph.png)

### Energy Graph · Stable

Compare hourly consumption with recorded prices and, when your price sensor supplies them, upcoming rates. Drag to rotate, right-drag to pan, or choose **Front** to compare the series on a timeline. The visual editor lets you pick sensors, colours, readouts, and a starting view.

### Thermostat · Experimental

Adjust a climate entity’s target temperature with a dial, or use the buttons and keyboard. Available modes and controls follow the device’s capabilities. The thermostat ships in the same package as the graph and carries an **Experimental** badge because real-device testing is limited.

<details>
<summary>See the thermostat</summary>

![Gleam Thermostat showing the temperature dial, heating mode and experimental badge](docs/images/thermostat.png)

</details>

## Install

[![Open Gleam Cards in your Home Assistant Marketplace](https://my.home-assistant.io/badges/marketplace_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=magnusoverli&repository=gleam-card&category=plugin)

1. Open the link above. If Gleam Cards isn’t in your catalog, confirm **Add custom repository** when prompted, then install the Dashboard package.
2. Reload the dashboard. Choose **Edit dashboard → Add card → Gleam Energy Graph**.
3. Under **Main energy → Sensor**, select a cumulative meter that reports kWh and has hourly Recorder statistics. Save the card. Price and current-hour readings are optional.

Prefer YAML? Replace the example entity with your meter:

```yaml
type: custom:gleam-energy-graph
energy_entity: sensor.total_energy
```

For climate controls, choose **Gleam Thermostat (Experimental)** in the card picker or use `type: custom:gleam-thermostat` with `entity: climate.heat_pump`. Installing the package doesn’t add either card to a dashboard automatically.

<details>
<summary>Manual installation</summary>

Copy [`dist/gleam-card.js`](dist/gleam-card.js) to `<Home Assistant config>/www/gleam-card.js`. In **Settings → Dashboards → Resources**, register `/local/gleam-card.js?v=1` as a **JavaScript module** and reload the browser. Advanced Mode may be needed to see Resources. When updating manually, change the version in the existing URL. If switching to the Marketplace, remove the manual resource to avoid loading both copies.

</details>

## Requirements and support

The cards bundle Three.js and run locally, without a CDN or a separate backend integration. The graph requires **WebGL 2**; the thermostat’s HTML controls also work without the 3D dial.

[Graph configuration and sensor requirements](docs/energy-graph.md) · [Thermostat configuration](docs/thermostat.md) · [Report an issue](https://github.com/magnusoverli/gleam-card/issues)

For local previews, builds, and tests, see [Development](docs/development.md). Release instructions are in [Publishing](docs/publishing.md).

Gleam Cards by Magnus Øverli · [Unlicense](LICENSE) · [Third-party notices](THIRD_PARTY_NOTICES.md)
