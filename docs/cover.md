# Gleam Cover

**Experimental:** garage doors are the first supported cover type. Blinds,
shades and curtains do not yet have their own visuals or controls.

Choose **Gleam Cover (Experimental)** in the card picker. This version illustrates one garage
door per `cover.*` entity. Pick a layout in the editor:

| `variant` | Home Assistant Sections default | Layout |
| --- | --- | --- |
| `normal` (default) | Full row | Original single garage; illustration beside the readout in wider cards. |
| `compact` | Half row | Smaller single garage. Add two Compact cards to the same section to place them side by side on a phone. An explicit dashboard width overrides the default. |
| `double` | Full row | One building with left and right doors. Tap a bay to reveal its own action. |

**Double:** use different entities for the two doors. The editor warns if you select the same one twice.

```yaml
type: custom:gleam-cover
variant: double
name: Garage
entity: cover.left_garage         # Left door
right_entity: cover.right_garage  # Required for Double; must be distinct
travel_seconds: 10
right_travel_seconds: 16          # Optional; otherwise uses travel_seconds
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
```

The status and elapsed time come from Home Assistant (`last_changed`), not the
animation. Intermediate positions (1–99%) take priority. During a timed
movement, an opener that jumps straight to 0% or 100% updates the status
without making the illustrated door snap to the endpoint. Without position feedback, reported
movement or pressing the revealed action starts an estimated visual journey.
An early Open report updates the text without cutting that journey short.
An external change with only a final state updates the illustration directly.
For a stationary Open report without position, the illustration is symbolic.

Tap the illustration (or focus it and press Enter) to reveal the supported
**Open** or **Close** action. Revealing controls never sends a command. During
travel the same button shows progress. If time runs out without a final state,
the card checks the latest state: **Open** for an open command, **Closed** for
a close command. A movement report acknowledges the start, not the finish.
An unexpected state gets five more seconds, measured from the end of the
configured travel time. If it still doesn't match, the card clears the action
and displays the reported state and position directly, without a return
animation or retry. Unavailable and unknown doors cannot be operated.
