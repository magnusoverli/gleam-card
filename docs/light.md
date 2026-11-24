# Gleam Light

**New:** choose **Gleam Light** in the card picker. The first light type is
**In-roof spots**: recessed downlights in a ceiling, laid out in rows and
columns and split into up to three zones. Each zone is one `light.*` entity,
or a light group, that switches its spots together.

[Try the demo](https://magnusoverli.github.io/gleam-card/light/)

## In-roof spots

The illustration is a room seen from the front. Each spot throws a soft beam
onto the floor; the walls pick up light bounced from the lit floor, brightest
low down. The light follows each zone’s reported state, brightness and colour
temperature (or colour, for a light in an RGB mode). Lights without colour
temperature are drawn at 2700 K.

**Zones.** Under each zone’s name the card shows On, Off or Unavailable, how
long ago it changed, a **Turn on/off** button and a **Brightness** slider.
**Colour temperature** opens one slider per zone; it is hidden when no zone
supports it. Pointing at, or focusing, a zone’s controls outlines its spots.

**Tap a ceiling fixture** to switch its zone. Elsewhere in the room, the card
chooses the nearest beam, mostly by side-to-side position. Hovering previews that zone. Keyboard and
screen-reader users use the zone buttons instead.

Buttons and sliders update the card straight away and send
`light.turn_on` / `light.turn_off` (with `brightness_pct` or
`color_temp_kelvin`). If Home Assistant does not report the change within five
seconds, the card returns to the reported state and says so. Unavailable zones
cannot be operated; if every zone is unavailable the room is dimmed.

### Spot layout

| Setting | YAML | Default |
| --- | --- | --- |
| Rows | `rows` (1–8) | `3` |
| Columns | `columns` (1–8) | `4` |
| Only along the walls | `walls_only` | `false` |
| Beam angle | `beam_angle` (10–120°) | `40` |
| Layout | `variant`: `normal` or `compact` | `normal` |

Spots sit at the usual installer spacing: half a spacing in from each wall.
**Only along the walls** keeps the outer ring of the grid and moves it 45 cm
from the walls, leaving the middle of the floor darker. Take the **beam angle**
from the spot’s datasheet: narrow beams give small, brighter pools; wide beams
merge into an even wash. Dense grids draw smaller fittings and spread the
light so up to 8 × 8 spots stay readable.

**Normal** fills a row; from about 590 px wide the room moves beside the
controls. **Compact** takes half a row and shows each zone’s state and button only.

### Assign spots to zones

**Assign spots to zones** shows the grid from above, back wall at the top. Tap
a spot to move it to the next zone; after the last zone it becomes **no spot**
(for example over a kitchen island). **Left | right**, **Back | front** and
**Walls | centre** split the grid in one step.

In YAML, `zone_map` has one string per row, back wall first, with one character
per column: a zone number, or `.` for no spot. Quote rows such as `"1122"` so
YAML reads them as text rather than numbers. Without `zone_map` the columns
are split evenly between the zones, left to right.

```yaml
type: custom:gleam-light
light_type: in_roof_spots
name: Kitchen
rows: 3
columns: 4
beam_angle: 40
zones:
  - entity: light.kitchen_counter
    name: Counter          # Optional; defaults to the entity's friendly name
  - entity: light.kitchen_dining
    name: Dining
zone_map:
  - "1122"
  - "1122"
  - "1122"
```

Spots along the walls, with the back wall as its own zone:

```yaml
type: custom:gleam-light
name: Gallery
rows: 4
columns: 5
walls_only: true
zones:
  - entity: light.gallery_back
  - entity: light.gallery_sides
zone_map:
  - "11111"
  - "2...2"               # Inner cells are ignored along the walls
  - "2...2"
  - "22222"
```

The card draws in SVG and does not need WebGL. It is not yet tested against
physical lights; all automated tests use mock service calls.
