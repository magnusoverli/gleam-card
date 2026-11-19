# Gleam Cards

**A collection of interactive cards for Home Assistant.** Start with the view you want, then make it yours in the visual editor. All three cards run locally and install as one bundle.

[**Try the live demo →**](https://magnusoverli.github.io/gleam-card/) · [Install in Home Assistant](#install)

## Gleam Energy Graph

**Stable** · See when your home used the most energy and what electricity cost that hour. Rotate the timeline to explore, or switch to Front view to compare.

<a href="https://magnusoverli.github.io/gleam-card/energy-graph/"><img src="docs/images/energy-graph.png" width="640" alt="Hourly energy bars alongside the electricity price forecast and power history."></a>

[**Try Gleam Energy Graph →**](https://magnusoverli.github.io/gleam-card/energy-graph/) · [Graph settings](docs/energy-graph.md)

## Gleam Thermostat

**Experimental** · Turn the dial to set a target temperature. Fan, preset, and swing controls follow the capabilities of your climate device.

<a href="https://magnusoverli.github.io/gleam-card/thermostat/"><img src="docs/images/thermostat.png" width="320" alt="Gleam Thermostat with a temperature dial and heating mode selected."></a>

[**Try Gleam Thermostat →**](https://magnusoverli.github.io/gleam-card/thermostat/) · [Thermostat settings](docs/thermostat.md)

## Gleam Cover

**Experimental** · Which garage door is still open? See its state and how long it’s been that way. In Double layout, each door has its own control.

<a href="https://magnusoverli.github.io/gleam-card/cover/"><img src="docs/images/cover.png" width="480" alt="Double garage with the left door closed and the right door open, casting warm light onto the driveway."></a>

[**Try Gleam Cover →**](https://magnusoverli.github.io/gleam-card/cover/) · [Cover settings](docs/cover.md)

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

For climate controls, choose **Gleam Thermostat (Experimental)** and select a `climate.*` entity. For a garage door, choose **Gleam Cover (Experimental)** and select a `cover.*` entity.

<details>
<summary>Manual installation</summary>

Copy [`dist/gleam-card.js`](dist/gleam-card.js) to `<Home Assistant config>/www/gleam-card.js`. In **Settings → Dashboards → Resources**, register `/local/gleam-card.js?v=1` as a **JavaScript module** and reload the browser. Advanced Mode may be needed to see Resources. When updating manually, change the version in the existing URL. If switching to the Marketplace, remove the manual resource to avoid loading both copies.

</details>

## Requirements and support

[Changelog, including unreleased changes](CHANGELOG.md)

[Release notes](https://github.com/magnusoverli/gleam-card/releases/latest) · [![Bundle downloads across GitHub releases](https://img.shields.io/github/downloads/magnusoverli/gleam-card/total?label=bundle%20downloads)](https://github.com/magnusoverli/gleam-card/releases)

The graph requires **WebGL 2**; the thermostat’s HTML controls also work without the 3D dial. Cover draws its garage in SVG and does not require WebGL. No card needs a CDN or a separate backend integration.

[Energy Graph guide](docs/energy-graph.md) · [Thermostat guide](docs/thermostat.md) · [Cover guide](docs/cover.md) · [Report an issue](https://github.com/magnusoverli/gleam-card/issues)

For local previews, builds, and tests, see [Development](docs/development.md). Release instructions are in [Publishing](docs/publishing.md).

Gleam Cards by Magnus Øverli · [Unlicense](LICENSE) · [Third-party notices](THIRD_PARTY_NOTICES.md)
