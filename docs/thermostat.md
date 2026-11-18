# Gleam Thermostat

**Experimental:** the thermostat has limited real-device testing. It ships
alongside the stable Energy Graph and is marked in the card picker and header.

Use `type: custom:gleam-thermostat` with a `climate.*` entity.
The included visual editor exposes the options below.

| Option | Default | Accepted values / purpose |
| --- | --- | --- |
| `entity` | Required | Climate entity ID |
| `name` | `Thermostat` | Display name |
| `card_height` | `0` | Automatic, or 120–1600 px |
| `card_max_width` | `0` | Fill available width, or 200–1600 px |
| `content_overflow` | `scale` | `scale` or `scroll` |
| `show_name` | `true` | Show heading |
| `show_mode` | `true` | Show current mode |
| `show_caption` | `true` | Show target caption |
| `show_room_temperature` | `true` | Show room-temperature status |
| `dial_height` | `265` | 180–420 px |
| `dial_padding` | `10` | 0–30 percent |
| `temperature_font_size` | `58` | 32–88 px |
| `card_padding` | `20` | 8–32 px |
| `corner_radius` | `22` | 0–40 px |
| `interactive_dial` | `true` | Drag and keyboard interaction |
| `show_temperature_buttons` | `true` | Plus/minus controls |
| `show_temperature_slider` | `true` | HTML temperature slider |
| `show_hvac_modes` | `true` | Mode buttons |
| `show_fan` | `true` | Fan selector |
| `show_presets` | `true` | Preset selector |
| `show_swing` | `true` | Swing selector |
| `advanced_open` | `false` | Expand advanced controls initially |
| `confirmation_timeout` | `12` | 5–60 seconds |
| `heat_color` | `#ffab70` | Six-digit hex color |
| `cool_color` | `#65f0ff` | Six-digit hex color |
| `off_color` | `#8fa9c2` | Six-digit hex color |
| `background_color` | `#080e24` | Six-digit hex color |
| `show_dial_ticks` | `true` | Dial tick marks |
| `glass_opacity` | `0.7` | 0.1–1 |
| `ring_thickness` | `0.08` | 0.03–0.15 |
| `glow_intensity` | `0.45` | 0–1.5 |

## Device behavior

Temperature bounds, units, step and available modes come from Home Assistant.
Capability flags determine whether controls are usable. The single-setpoint
control requires the entity's target-temperature capability. Dual-target
heat/cool ranges are not supported.

Plus/minus, the slider, dial dragging, arrow keys, Home and End can set the
temperature. Dragging previews locally and commits on release. Mode and advanced
selectors send real climate actions. Editing configuration, mounting, resizing,
reconnecting and receiving state updates do not send commands.

An action remains pending until Home Assistant reports the requested value.
Timeouts and failures are displayed, not blindly retried. A matching state is
not proof that a physical IR-controlled appliance received the command.

Unavailable entities disable controls. Missing room temperatures are disclosed.
Enabled HTML controls remain usable if WebGL initialization fails.

## Layout

Dial padding changes framing independently of card padding and text size.
Fixed-height `scale` shrinks the entire content to fit; `scroll` keeps controls
at their normal sizes and allows overflow scrolling. Prefer scrolling or a
larger card if scaling makes controls difficult to use.

The visual editor preserves unrecognized configuration and layout keys when
resetting display/control options.
