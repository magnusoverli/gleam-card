# Gleam Cards

Interactive cards for Home Assistant. Install one bundle, then use each card’s visual editor to make it fit your dashboard.

[**Try the live demo →**](https://magnusoverli.github.io/gleam-card/) · [Install in Home Assistant](#install)

## Explore the cards

| Card & guide | At a glance | Live demo |
| --- | --- | --- |
| **[Energy Graph](docs/energy-graph.md)**<br>Stable | Compare hourly energy use with electricity prices on a 3D timeline. | [Try Gleam Energy Graph](https://magnusoverli.github.io/gleam-card/#energy-graph) |
| **[Thermostat](docs/thermostat.md)**<br>Experimental | Turn the dial to set the temperature. Controls adapt to your climate device. | [Try Gleam Thermostat](https://magnusoverli.github.io/gleam-card/#thermostat) |
| **[Cover](docs/cover.md)**<br>Experimental | See which garage door is open and for how long. Control one door or two. | [Try Gleam Cover](https://magnusoverli.github.io/gleam-card/#garage-layout) |

<details>
<summary>See the energy graph</summary>

![Gleam Energy Graph showing hourly consumption bars beside a stepped price forecast and power history](docs/images/energy-graph.png)

</details>

<details>
<summary>See the thermostat</summary>

![Gleam Thermostat showing the temperature dial, heating mode and experimental badge](docs/images/thermostat.png)

</details>

<details>
<summary>See the cover</summary>

![Gleam Cover in Double layout: the left garage door is closed and the right door is open, with amber light spilling onto the driveway.](docs/images/cover.png)

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

For climate controls, choose **Gleam Thermostat (Experimental)** and select a `climate.*` entity. For a garage door, choose **Gleam Cover (Experimental)** and select a `cover.*` entity.

<details>
<summary>Manual installation</summary>

Copy [`dist/gleam-card.js`](dist/gleam-card.js) to `<Home Assistant config>/www/gleam-card.js`. In **Settings → Dashboards → Resources**, register `/local/gleam-card.js?v=1` as a **JavaScript module** and reload the browser. Advanced Mode may be needed to see Resources. When updating manually, change the version in the existing URL. If switching to the Marketplace, remove the manual resource to avoid loading both copies.

</details>

## Requirements and support

[Release notes](https://github.com/magnusoverli/gleam-card/releases/latest) · [![Bundle downloads across GitHub releases](https://img.shields.io/github/downloads/magnusoverli/gleam-card/total?label=bundle%20downloads)](https://github.com/magnusoverli/gleam-card/releases)

The graph requires **WebGL 2**; the thermostat’s HTML controls also work without the 3D dial. Cover draws its garage in SVG and does not require WebGL. No card needs a CDN or a separate backend integration.

[Energy Graph guide](docs/energy-graph.md) · [Thermostat guide](docs/thermostat.md) · [Cover guide](docs/cover.md) · [Report an issue](https://github.com/magnusoverli/gleam-card/issues)

For local previews, builds, and tests, see [Development](docs/development.md). Release instructions are in [Publishing](docs/publishing.md).

Gleam Cards by Magnus Øverli · [Unlicense](LICENSE) · [Third-party notices](THIRD_PARTY_NOTICES.md)
