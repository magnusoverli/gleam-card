# Gleam Cards changelog

## Unreleased

- **Cover controls:** Open or close a door directly from its action button. The button follows the reported state and shows progress during travel.
- **Garage appearance:** Choose a pitched (default) or flat roof. In Double, optional labels sit above their respective doors without moving the garage or controls.
- **Garage lighting:** Link a `light.*` entity to each bay. The illustration follows on/off state, ignores dimmer brightness, and supports an optional color temperature from 2000 to 6500 K. Without a linked light, the existing always-on appearance is preserved.
- **Cover editor:** Door selection stays visible; movement, appearance and lighting settings are grouped in collapsible panels.
- **Experimental badge:** Thermostat and Cover show the badge in the upper-right corner without reserving a row.
- **Demo gallery:** Each card has a dedicated interactive page. The Cover preview follows Home Assistant Sections sizing, with Compact taking half a row.

## [0.0.6](https://github.com/magnusoverli/gleam-card/releases/tag/v0.0.6) · 2026-11-19

- Introduced experimental Gleam Cover for garage doors, with Normal, Compact and Double layouts, configurable travel times and independent controls for two doors.
- Distributed Cover alongside the stable Energy Graph and experimental Thermostat in the same `gleam-card.js` bundle.

[Earlier releases](https://github.com/magnusoverli/gleam-card/releases)
