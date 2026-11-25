# Graph

Choose **Graph** in the Home Assistant card picker, select a numeric `sensor.*` and add up to three more. Use **Move up** and **Move down** to change lane order. **Front** is useful for comparing curves; **Isometric** shows the lanes separately. Drag to orbit, right-drag to pan, pinch or scroll to zoom, and point at a measurement for its time and value.

```yaml
type: custom:gleam-graph
title: Indoor and outdoor temperature
series:
  - entity: sensor.living_room_temperature
    name: Living room
    color: "#ff883f"
  - entity: sensor.outdoor_temperature
    name: Outside
    color: "#22e4ef"
```

The default is 24 hours of Recorder history. Readouts show the current Home Assistant state. Labels use the sensor’s friendly name and `unit_of_measurement`; values are never converted. Series with the same non-empty unit share an automatic scale. Different units, unitless sensors and series with explicit bounds have independent scales. Hidden series do not influence the scale. Hiding a series keeps its current-value readout available.

### Series settings

| YAML | Meaning |
| --- | --- |
| `entity`, `name` | Required sensor ID; optional display name. Each sensor appears once. |
| `plot` | `line` (default), `step`, or `bar`. Lines connect numeric readings; steps hold each value until the next change. The last known state extends to the end of the history window. |
| `interval_minutes`, `aggregate` | For bars, a whole-minute interval (default 60) and `mean`, `min`, `max` or `last` (default `mean`). A mean is the arithmetic mean of reported observations, not a time-weighted average. Intervals align to UTC; partial edge intervals include only observations inside the displayed window. Choose a size that fits at most 336 intervals. |
| `min`, `max` | Optional numeric axis limits. By default, lines fit the observed range; scales containing bars also include zero. |
| `color`, `opacity`, `line_width` | Six-digit hex colour, opacity 0–100% (default 100), line width 25–300% (default 100). |
| `shift_minutes` | Plot the series up to 30 whole minutes earlier or later. Tooltip times remain source times. |
| `visible`, `show_readout` | Initial chart visibility and header value visibility; both default to `true`. |

```yaml
type: custom:gleam-graph
title: Air pressure
hours_to_show: 48
starting_view: front
series:
  - entity: sensor.barometer
    plot: bar
    interval_minutes: 60
    aggregate: mean
    min: 950
    max: 1050
```

### Graph settings

| YAML | Default | Range or choices |
| --- | --- | --- |
| `title` | blank | Optional heading |
| `hours_to_show` | `24` | One minute to 168 hours of history |
| `refresh_interval` | `60` | 5–86400 seconds; Recorder requests are cached for 60 seconds |
| `dataset_spacing` | `5` | 0–10; 0 overlays the lanes |
| `starting_view` | `isometric` | `isometric`, `front`, `top` |
| `lock_navigation`, `use_server_time` | `false` | Lock drag/zoom; use the installation time zone instead of the device’s |
| `show_camera_buttons`, `show_dataset_buttons` | `true` | Show preset and series controls |
| `readout_value_size` | `100` | 50–200% |
| `point_light_intensity`, `now_marker_color` | `48`, `"#ff647c"` | Lighting 0–200 and colour of the now marker |

Chart history requires Recorder and WebGL 2. Explicit unavailable or nonnumeric states break lines before dense data is reduced for drawing. Empty bar intervals and intervals containing an outage stay empty. A current reading does not fill missing earlier history. Only visible series request history, in batches; incremental reads overlap and the window is reread hourly for corrections. The graph pauses off-screen.

For cumulative meter differences, current-hour energy, electricity-price schedules or forecasts, use [Gleam Energy Graph](energy-graph.md).
