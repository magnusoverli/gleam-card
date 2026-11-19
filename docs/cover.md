# Gleam Cover

**Experimental:** choose Garage, Roller shade or Slatted blind in the visual editor. Omit
`cover_type` to keep the original garage illustration. Device-class suggestions
do not override an existing choice.

## Slatted blind · Development build

All cover types show a **Lift position** slider when the entity supports
`SET_POSITION`. Release the slider to request 0–100% open. The target is
separate from the reported position. Each Double garage bay checks its own
capabilities. On blinds, this slider moves the rail; **Slat tilt** changes angle.

```yaml
type: custom:gleam-cover
cover_type: blind
entity: cover.studio_blinds
variant: compact
tilt_seconds: 1       # Per reported tilt change; 0 disables animation
```

As the rail rises it picks up slats from the bottom. Lowering it deposits
each slat at its resting height. Use Normal or Compact. Set up the window photo, crop and glazing bars just as
for Roller shade. Raising the blind stacks the slats; tilting them changes how
much of the view shows through without changing the lift position.
The separate tilt slider needs `SET_TILT_POSITION`; open/close/stop tilt
buttons appear only for their respective capabilities. An unreported tilt has
a symbolic angle, not a measured percentage. Set **Cover movement → Tilt transition**
to 0–300 seconds (default 1). A new tilt report during movement redirects the
animation from its current angle. Lift timing is independent. Fabric opacity is shade-only.

## Roller shade · New in v0.0.8

Select **Cover type → Roller shade** and choose your shade entity. Under
**Cover movement**, enter the time for a full open or close. Only the entity
and cover type are needed in YAML; the other fields below illustrate optional
customizations.

```yaml
type: custom:gleam-cover
cover_type: shade
entity: cover.living_room_shade
variant: compact
shade_opacity: 65       # Fabric only; 0–100%, default 100 (opaque)
window_image: /local/garden.jpg   # Optional view behind the pane and shade
window_image_zoom: 150            # 100–300%; default 100 (fill the pane)
window_image_x: 30                # 0 = left, 100 = right; default 50
window_image_y: 60                # 0 = top, 100 = bottom; default 50
glazing_bar_width: 5              # 0–10; 0 hides both bars, default 3
glazing_bar_color: "#436878"      # Default #30566a
```

Under **Card appearance → Add window photo**, choose an image from your phone
or computer. It uploads to your Home Assistant instance; save the card to keep
the returned image URL. Some phones also offer the camera in the image picker.
Alternatively, under **Window view image**, enter a photo URL, or put a
photo in your Home Assistant `www` folder (e.g. `www/garden.jpg`) and enter
`/local/garden.jpg`. The image is center-cropped to the window without
stretching and stays still behind the crossbars, fabric and bottom rail.
Use **Photo framing** to zoom in and move the crop horizontally or vertically.
Clear the image field to restore the blue sky.

Roller shades support Normal and Compact. The fabric rolls up into a fixed
headrail. A percentage appears only for a reported `current_position`; Open
alone can mean partially open. Movement estimates never become measured
percentages. The card offers the same supported lift controls as Garage;
tilt is blind-specific. Double, roof style and lights
are garage-specific.

## Garage

Choose **Gleam Cover (Experimental)** in the card picker. Each illustrated cover
uses one `cover.*` entity.

**Cover setup** keeps the type, layout and required entities visible. Expand
**Cover movement** for travel times, **Card appearance** for the name, roof and
bay labels, or **Garage lighting** for lamps and color temperature. Right-door
settings appear only in Double.

| `variant` | Home Assistant Sections default | Layout |
| --- | --- | --- |
| `normal` (default) | Full row | Original single garage; illustration beside the readout in wider cards. |
| `compact` | Half row | Smaller single garage. Add two Compact cards to the same section to place them side by side on a phone. An explicit dashboard width overrides the default. |
| `double` | Full row | One building with two independently operated doors, each with its own action button. |

**Double:** use different entities for the two doors. The editor warns if you select the same one twice.
Optional bay labels use the existing space above the roof, centered on their
door openings. Adding or removing labels does not resize the card or shift its controls.

**Roof type:** choose **Pitched** (the original default) or **Flat** in the
visual editor. It applies to the whole garage in every layout, including both
bays in Double.

```yaml
type: custom:gleam-cover
variant: double
roof_type: flat                   # Optional: pitched (default) or flat
name: Garage
entity: cover.left_garage         # Left door
right_entity: cover.right_garage  # Required for Double; must be distinct
left_label: Workshop              # Optional; blank or omitted hides the label
right_label: Driveway             # Set either label independently
travel_seconds: 10
right_travel_seconds: 16          # Optional; otherwise uses travel_seconds
light_entity: light.left_garage
light_temperature_kelvin: 2700    # Shared by both bays
right_light_entity: light.right_garage
```

**Normal:** only the entity is required.

```yaml
type: custom:gleam-cover
entity: cover.garage_door
```

**Compact:** all settings are available in the visual editor. For a half-width card with a slower door:

```yaml
type: custom:gleam-cover
entity: cover.garage_door
name: West garage       # Defaults to the entity's friendly name, then Garage
variant: compact
travel_seconds: 40      # 1–300 seconds; default 10, for either direction
light_entity: light.garage_ceiling
light_temperature_kelvin: 3000
```

**Garage lighting** is optional. With no entity selected the illustrated lamp
stays on. A selected `light.*` entity lights the fixture, interior, driveway and
haze at a fixed intensity when it reports `on`, regardless of brightness. A missing
or unavailable light produces no glow and does not disable the door. The
temperature slider (2000–6500 K) changes the illustration only. Enable
**Customize light temperature** to use it, or turn customization off for the
original amber palette. Double uses one garage-wide temperature and two
independent on/off light entities. For older Double configs, the existing
`light_temperature_kelvin` wins; if only the former right-door temperature
was set, it becomes the shared value.
The card never sends commands to your lights.

The status and elapsed time come from Home Assistant (`last_changed`), not the
animation. Intermediate positions (1–99%) take priority. During a timed
movement, an opener that jumps straight to 0% or 100% updates the status
without making the illustrated door snap to the endpoint. Without position feedback, reported
movement or pressing the action button starts an estimated visual journey.
An early Open report updates the text without cutting that journey short.
An external change with only a final state updates the illustration directly.
For a stationary Open report without position, the illustration is symbolic.

Press **Open** on a closed door or **Close** on an open door to send the supported
command directly. The illustration itself does not send commands. During
travel the same button shows progress. If time runs out without a final state,
the card checks the latest state: **Open** for an open command, **Closed** for
a close command. A movement report acknowledges the start, not the finish.
An unexpected state gets five more seconds, measured from the end of the
configured travel time. If it still doesn't match, the card clears the action
and displays the reported state and position directly, without a return
animation or retry. Unavailable and unknown doors cannot be operated.
