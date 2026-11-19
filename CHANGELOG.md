# Gleam Cards changelog

## Unreleased

## [0.0.7](https://github.com/magnusoverli/gleam-card/releases/tag/v0.0.7) · 2026-11-19

### Gleam Cover: make the garage look and act like yours

Gleam Cover made its debut in v0.0.6. This update brings the real garage lights into the illustration, puts the door controls one tap away, and gives a two-door garage a more personal touch.

**Let the light tell part of the story.** Link the ceiling fixture to a Home Assistant `light.*` entity. When the light is on and the door lifts, the beam reaches into the haze above the driveway. Switch the light off and the glow disappears. In Double, one bay can be dark while the other is lit. A single **2000–6500 K** slider sets the warmth for the whole building; dimmer brightness is ignored. Leave the light entities blank to keep the original always-on look.

**One press to move a door.** The old tap-to-reveal step is gone: a closed door offers **Open**, an open door offers **Close**, and the same button shows progress during travel. In Double, each button operates only its own door.

**A garage you can recognize.** Keep the original pitched roof or choose a flat roof across the building. Give the bays names like *Workshop* and *Driveway*: each label sits above its own opening without shifting the roof or controls. In the visual editor, left and right doors now sit side by side on wider screens, with movement, appearance, and lighting grouped separately.

**Try it before updating:** open the [Cover demo](https://magnusoverli.github.io/gleam-card/cover/), choose **Double**, and close the open bay. The [demo gallery](https://magnusoverli.github.io/gleam-card/) now gives each card its own page; Compact previews at half a Home Assistant section. Cover and Thermostat remain **Experimental**, with their badges tucked into the upper-right corner. Energy Graph remains **Stable**.

[Cover settings and YAML examples](https://github.com/magnusoverli/gleam-card/blob/v0.0.7/docs/cover.md) · [Compare v0.0.6 → v0.0.7](https://github.com/magnusoverli/gleam-card/compare/v0.0.6...v0.0.7)

## [0.0.6](https://github.com/magnusoverli/gleam-card/releases/tag/v0.0.6) · 2026-11-19

### Introducing Gleam Cover (Experimental)

**Did I leave the garage open?** The third Gleam card puts the answer on your dashboard. A wireframe garage shows the sectional door lifting, warm light spilling onto the driveway, and a compact readout such as **Closed · 2 h 14 min**. The readout follows Home Assistant; the animation alone never declares the door closed.

Start with a single `cover.*` entity. **Normal** gives the garage a full row, **Compact** lets two cards sit side by side on a phone, and **Double** puts two independently operated doors under one roof. Set the travel time to match your opener. In this first version, tap a door to reveal its Open or Close button.

Choose **Gleam Cover (Experimental)** in the card picker after updating. It ships in the same bundle as the stable Energy Graph and experimental Thermostat. Garage doors are the first supported cover type.

[Getting started with v0.0.6](https://github.com/magnusoverli/gleam-card/blob/v0.0.6/docs/cover.md) · [Compare v0.0.5 → v0.0.6](https://github.com/magnusoverli/gleam-card/compare/v0.0.5...v0.0.6)

[Earlier releases](https://github.com/magnusoverli/gleam-card/releases)
