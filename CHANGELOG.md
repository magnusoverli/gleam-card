# Gleam Cards changelog

## Unreleased

## [0.0.7](https://github.com/magnusoverli/gleam-card/releases/tag/v0.0.7) · 2026-11-19

- **Cover controls:** Open or close a door directly from its action button. The button follows the reported state and shows progress during travel.
- **Garage appearance:** Choose a pitched (default) or flat roof. In Double, optional labels sit above their respective doors without moving the garage or controls.
- **Garage lighting:** Link a `light.*` entity to each bay for independent on/off lighting. One garage-wide temperature (2000–6500 K) sets the warmth of both lamps; brightness is ignored. Without a linked light, the existing always-on appearance is preserved.
- **Cover editor:** Left and right doors have equal status in Double. Door selection stays visible; movement, appearance and lighting settings are grouped in collapsible panels.
- **Experimental badge:** Thermostat and Cover show the badge in the upper-right corner without reserving a row.
- **[Demo gallery](https://magnusoverli.github.io/gleam-card/):** Each card has a dedicated interactive page. The Cover preview follows Home Assistant Sections sizing, with Compact taking half a row.

## [0.0.6](https://github.com/magnusoverli/gleam-card/releases/tag/v0.0.6) · 2026-11-19

- Introduced experimental Gleam Cover for garage doors, with Normal, Compact and Double layouts, configurable travel times and independent controls for two doors.
- Distributed Cover alongside the stable Energy Graph and experimental Thermostat in the same `gleam-card.js` bundle.

[Earlier releases](https://github.com/magnusoverli/gleam-card/releases)
