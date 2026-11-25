# Gleam Energy Graph

For temperature, humidity, pressure or other numeric sensor history, use [Graph (Experimental)](graph.md). Gleam Energy Graph is for hourly energy use and electricity prices.

Use `type: custom:gleam-energy-graph`, or choose **Gleam Energy Graph** in the
dashboard's **Add card** dialog. The visual editor supports all options below.
Sensor fields offer searchable entity-ID suggestions with friendly names from
Home Assistant, filtered by `unit_of_measurement`: kWh for both energy fields,
W for power, V for voltage, and currency/kWh for price (for example NOK/kWh,
EUR/kWh, $/kWh or øre/kWh). Currency codes, names and symbols are accepted without
a fixed currency list. Sensors with missing or unsupported units are omitted.
You can also type an ID; existing selections are preserved. Missing entities are
flagged without preventing saves. Unit matching cannot distinguish cumulative
meters from current-hour counters or guarantee Recorder statistics; choose
sensors matching the data contract below.

The editor validates time and spacing settings before updating the preview and preserves
additional YAML options such as `grid_options`. Invalid edits stay in the form
until corrected. You can switch between YAML and the visual editor.

| Option | Default | Meaning |
| --- | --- | --- |
| `energy_entity` | `sensor.total_energy` | Cumulative meter in kWh with hourly Recorder `state` statistics |
| `current_hour_entity` | Unset | Optional current-hour usage in kWh; omit for completed hourly bars only |
| `price_entity` | Unset | Optional price in currency/kWh; enables price history, readout and forecast when supplied |
| `power_entity` | `sensor.power` | Power in W, displayed as kW |
| `voltage_entity` | `sensor.voltage` | Voltage in V |
| `hours_to_show` | `33` | Total time span, greater than 0 and at most 168 hours |
| `future_hours` | `16.8` | Future portion, at least 0 and less than total span |
| `refresh_interval` | `10` | Refresh period in seconds, at least 5 |
| `dataset_spacing` | `5` | Whole number from 0 to 10; 0 overlays datasets on one plane, larger values spread them apart |
| `use_server_time` | `false` | Axis and tooltip times use the viewing device’s time zone. Enable **Graph settings → Use Home Assistant server time** to use the installation’s zone instead. |
| `point_light_intensity` | `48` | Brightness of the camera-following point light, from 0 (off) to 200. It stays centred in the view as you orbit or pan. Set under **Graph settings**. |

Use a `sensor.*` ID for each configured source, or `""` to disable an optional source. Defaults are placeholders, not entity
discovery. Power and voltage lanes start hidden and load history on demand.

Set **Graph settings → Dataset spacing** in the visual editor, or add
`dataset_spacing: 10` in YAML for twice the default distance between layers. Energy bars keep
their spacing-1 thickness at every setting.
Preset cameras refit automatically; an orbit/zoom you adjusted manually is retained
(select Isometric to restore the default framing). Spacing-only edits reuse loaded sensor history.

## Data contract

Under **Graph settings → Time shifts**, move each series earlier
(negative) or later (positive) by up to 30 whole minutes. In YAML use
`energy_shift_minutes`, `price_shift_minutes`, `power_shift_minutes`, and
`voltage_shift_minutes`. All default to `0`. Shifts change plot positions only:
tooltips show source times, and the time axis and “now” marker stay fixed.
The editor shows a shift when its sensor is selected or its default sensor
exists in Home Assistant. Either energy sensor enables the energy shift.
Clear Power or Voltage to omit that lane; its saved shift is kept for reuse.

**Dataset appearance** offers a base colour and an opacity (0–100%) for each
configured series. In YAML, use `<series>_color` (e.g. `energy_color: "#22e4ef"`)
and `<series>_opacity`, with `energy`, `price`, `power`, or `voltage` as the series.
Current-hour and completed bars share the energy style. Energy defaults to 65%
opacity; the other series default to 100%. Price fills and forecast shading stay
lighter than the price line. Opacity affects plotted data, not axes or controls.
Colours use six hexadecimal digits; quote the `#` colour in YAML. These are the defaults:

| Series | Base colour | Opacity |
| --- | --- | --- |
| Energy | `#22e4ef` | 65% |
| Price | `#ff883f` | 100% |
| Power | `#64f9a5` | 100% |
| Voltage | `#b48aff` | 100% |

Price, power, and voltage also have independent **Line width (%)** settings.
Use `price_line_width`, `power_line_width`, or `voltage_line_width` in YAML.
Values range from 25 to 300; 100 keeps the original stroke and join thickness.

- Completed energy bars use consecutive hourly cumulative `state` differences.
  Meter resets and missing intervals are not bridged. Each bar is centered
  on its statistic timestamp by default. A +30 minute shift centres the bar
  halfway through the hour.
- Current-hour usage must have been updated in the current hour. A completed
  reading, including zero consumption, takes precedence.
- Recorded prices use Recorder history. Missing history is never filled with
  today's published schedule.
- Future prices come from `raw_today` and `raw_tomorrow` arrays containing
  `{ start, end, value }` intervals. A sensor without these still supplies
  history, but no future schedule. The active interval uses the current state.
- Energy and price have independent labelled linear height scales. Price
  intervals remain stepped; decorative depth is not a measured quantity.
- Power and voltage history is sampled every 20 minutes. Historical requests
  are cached for 60 seconds. Enabled history lanes with the same refresh needs
  share one request. Subsequent requests overlap the recent history; the full
  window is reread hourly to pick up older corrections. Failed requests are
  reported and retried without silently discarding previous data.

Price labels and tooltips use the selected sensor's unit; values are not converted
between currencies or between major/minor currency units. History and forecast
values must use the same unit as the current state. Energy inputs require kWh,
power W, and voltage V; Wh/MWh energy and price-per-Wh/MWh are not converted.

## Interaction

Open **Card appearance** to set an optional title, header readouts, startup datasets,
controls and camera. The title defaults to blank. A hidden readout or button
does not disable its dataset. An empty header takes no space.

| YAML option | Default | Effect |
| --- | --- | --- |
| `title` | `""` | Heading above the chart |
| `now_marker_color` | `"#ff647c"` | Colour of the floor marker, its tip and the vertical “now” line |
| `readout_value_size` | `100` | Shared numeric readout size as a percentage of the responsive default (50–200) |
| `separate_readout_sizes` | `false` | Use independent sizes instead of the shared size |
| `current_hour_value_size`, `price_value_size` | `100` | Independent percentages (50–200); switching modes retains both sets of values |
| `show_current_hour_readout`, `show_price_readout` | `true` | Show the respective reading when its sensor is configured |
| `current_hour_label`, `price_label` | `Current hour so far`, `Current price` | Custom header text before the unit |
| `show_current_hour_label`, `show_price_label` | `true` | Turn off to show only the unit above the value, keeping the custom text for later. If the price sensor has no unit, only its value is shown. |
| `start_energy`, `start_price` | `true` | Start with these configured datasets visible |
| `start_power`, `start_voltage` | `false` | Start with these configured datasets visible when enabled |
| `show_dataset_buttons` | `true` | Show series toggles when there is more than one dataset |
| `show_camera_buttons` | `true` | Show the three preset buttons |
| `starting_view` | `isometric` | Choose `isometric`, `front`, or `top` |
| `lock_navigation` | `false` | Disable drag, pinch and wheel navigation and allow touch scrolling; visible preset buttons still work |

Drag to orbit, right-drag to pan, and pinch or scroll to zoom. Select Isometric, Front, or Top to refit the graph.
Series toggles are keyboard accessible; plotted tooltips use pointer input.
Rendering is demand-driven and refreshes pause off-screen. Removing the card
disposes its observers, timers, controls, textures, geometries and WebGL renderer.

## YAML examples

**Energy only.** Show the past 24 hours with no forecast window. Replace the
meter ID with your own. Empty IDs disable the optional power and voltage lanes.

```yaml
type: custom:gleam-energy-graph
energy_entity: sensor.house_total_energy
power_entity: ""
voltage_entity: ""
hours_to_show: 24
future_hours: 0
```

**Four-series dashboard.** This complete example shows every card option. It
opens in Front view with energy, price, and power visible; voltage can be
toggled on. Remove any optional settings you want to leave at their defaults.

```yaml
type: custom:gleam-energy-graph
title: Household energy
energy_entity: sensor.house_total_energy
current_hour_entity: sensor.house_energy_this_hour
price_entity: sensor.electricity_price
power_entity: sensor.house_power
voltage_entity: sensor.supply_voltage
hours_to_show: 36
future_hours: 12
refresh_interval: 30
use_server_time: true
dataset_spacing: 5
point_light_intensity: 40
now_marker_color: "#ff647c"

energy_color: "#22e4ef"
price_color: "#ff883f"
power_color: "#64f9a5"
voltage_color: "#b48aff"
energy_opacity: 75
price_opacity: 95
power_opacity: 85
voltage_opacity: 80
price_line_width: 125
power_line_width: 100
voltage_line_width: 75
energy_shift_minutes: 30
price_shift_minutes: 0
power_shift_minutes: -5
voltage_shift_minutes: 0

show_current_hour_readout: true
show_price_readout: true
current_hour_label: Usage this hour
price_label: Tariff
show_current_hour_label: true
show_price_label: false       # Unit only; the price value remains visible.
separate_readout_sizes: true
readout_value_size: 100       # Used when separate_readout_sizes is false.
current_hour_value_size: 125
price_value_size: 90
start_energy: true
start_price: true
start_power: true
start_voltage: false
show_dataset_buttons: true
show_camera_buttons: true
starting_view: front
lock_navigation: false
```
