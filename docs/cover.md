# Gleam Cover

**Experimental:** garage doors are the first supported cover type. Blinds,
shades and curtains do not yet have their own visuals or controls.

Choose **Gleam Cover (Experimental)** in the card picker. This version illustrates one garage
door per `cover.*` entity. Pick a layout in the editor:

**Garage setup** keeps the layout and required door entities visible. Expand
**Door movement** for travel times, **Card appearance** for the name, roof and
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
