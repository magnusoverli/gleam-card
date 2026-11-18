# Gleam Cards

[![Bundle downloads across GitHub releases](https://img.shields.io/github/downloads/magnusoverli/gleam-card/total?label=bundle%20downloads)](https://github.com/magnusoverli/gleam-card/releases)

**Your energy use and electricity prices on one timeline.** Rotate the graph to explore a day in depth, or switch to Front view to see which hours used the most energy.

The Energy Graph and Thermostat are the first two cards in a planned Gleam series. The long-term goal is to cover most everyday Home Assistant dashboard needs with cards that look and feel consistent.

[**Try the live demo ↗**](https://magnusoverli.github.io/gleam-card/) · [Install in Home Assistant](#install) · [Release notes](https://github.com/magnusoverli/gleam-card/releases/latest)

![Gleam Energy Graph showing hourly consumption bars beside a stepped price forecast and power history](docs/images/energy-graph.png)

### Energy Graph · Stable

Start with a single cumulative meter. Add price, power, or voltage when you’re ready; if your price sensor publishes tomorrow’s rates, the graph shows those too. [Configure the graph →](docs/energy-graph.md)

### Thermostat · Experimental

Set a target temperature by turning the dial or using the keyboard. Fan, preset, and swing controls follow the capabilities of your climate entity. Real-device testing is limited; you can [try the demo dial](https://magnusoverli.github.io/gleam-card/#thermostat) without controlling any equipment. [Thermostat settings →](docs/thermostat.md)

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
