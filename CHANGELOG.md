# Gleam Cards changelog

## Unreleased

## [0.0.7](https://github.com/magnusoverli/gleam-card/releases/tag/v0.0.7) · 2026-11-19

### 🏡 Gleam Cover: your doors, your lights, one tap

Gleam Cover debuted in v0.0.6. Now the illustrated garage can match your roof, follow your ceiling lights, and open or close either door with one press.

#### 💡 Light that follows your garage

- **Independent lights.** Link a `light.*` entity to each bay. Open a lit door and the beam reaches into the haze above the driveway; switch the lamp off and the glow disappears.
- **One shared warmth.** Choose **2000–6500 K** for the whole garage. The illustration follows on/off state, not dimmer brightness. Leave the entities blank to keep the original always-on glow.

#### 🚪 Controls and appearance

- **One-press controls.** A closed door offers **Open**; an open door offers **Close**. The button shows progress during travel and operates only its own bay.
- **Roof and bay labels.** Choose a pitched or flat roof. Names like *Workshop* and *Driveway* sit above their openings without shifting the building or controls.
- **Paired settings.** Left and right doors sit side by side in the editor on wider screens. Movement, appearance, and lighting each have their own section.
- **More room for the garage.** The Experimental badge now sits in the upper-right corner instead of taking up a row above the illustration.

#### ▶️ Try it before updating

- **[Open the Cover demo](https://magnusoverli.github.io/gleam-card/cover/)**, choose **Double**, and close the open bay. Switch to **Compact** to preview a half-width card.
- **[Cover settings and YAML examples](https://github.com/magnusoverli/gleam-card/blob/v0.0.7/docs/cover.md)** show how to configure a single door or a two-bay garage.

### 🌡️ Gleam Thermostat

- **A slimmer header.** The Experimental badge moves to the upper-right corner, leaving more room for the dial and readouts.

### 📦 General

- **[Interactive demo gallery](https://magnusoverli.github.io/gleam-card/).** Each card now has its own demo page. The README screenshots and “Try” links take you directly to the card you want to explore.

[Compare v0.0.6 → v0.0.7](https://github.com/magnusoverli/gleam-card/compare/v0.0.6...v0.0.7)

## [0.0.6](https://github.com/magnusoverli/gleam-card/releases/tag/v0.0.6) · 2026-11-19

### ✨ New card: Gleam Cover (Experimental)

**Did I leave the garage open?** The third Gleam card puts the answer on your dashboard: a wireframe garage, warm light on the driveway, and a readout like **Closed · 2 h 14 min**.

#### 🚪 Three ways to see your doors

- **Normal** gives one garage door a full dashboard row.
- **Compact** fits two single-door cards side by side on a phone.
- **Double** puts two independently operated doors under one roof.

#### 🛠️ Set up your first garage

- After updating, choose **Gleam Cover (Experimental)** in the card picker and select your `cover.*` entity.
- Set the travel time to match your opener. The status comes from Home Assistant; the animation finishing never declares the door closed.
- In **v0.0.6**, tap the illustrated door to reveal its **Open** or **Close** button. Garage doors are the first supported cover type.

[Cover setup and YAML examples for v0.0.6](https://github.com/magnusoverli/gleam-card/blob/v0.0.6/docs/cover.md)

### 📦 General

- **One Marketplace update installs all three cards.** The existing `gleam-card.js` bundle now includes Energy Graph (Stable), Thermostat (Experimental), and Cover (Experimental). No second dashboard resource is needed.

[Compare v0.0.5 → v0.0.6](https://github.com/magnusoverli/gleam-card/compare/v0.0.5...v0.0.6)

[Earlier releases](https://github.com/magnusoverli/gleam-card/releases)
