# Gleam Cards changelog

## Unreleased

### Live visual editor previews

- Preview names, colours, and appearance values while typing or dragging in all four cards. Entity IDs, image URLs, and history settings still wait until you finish editing. Previewing does not operate devices or save the dashboard.

### 💡 New: Gleam Light · In-roof spots

- Choose **Gleam Light** in the card picker to show recessed ceiling spots in rows and columns (up to 8 × 8), or only along the walls.
- Split the spots into up to three zones, each a light entity or group with its own switch, brightness and colour temperature. Tap the room to switch the nearest zone.
- Reflected light now softens the rear corners where the beams cross them. Unlit corners remain visible, and the beams stay translucent.
- Choose windows on any combination of the left, back and right walls. Place a TV on a window-free wall and a couch against any wall.
- Assign spots in the visual editor’s plan view, or with the Left | right, Back | front and Walls | centre splits. Set the beam angle from the spot’s datasheet.

[Light settings and YAML](https://github.com/magnusoverli/gleam-card/blob/main/docs/light.md)

## [0.0.11](https://github.com/magnusoverli/gleam-card/releases/tag/v0.0.11) · 2026-11-19

### 🪟 Gleam Cover is stable

Choose **Gleam Cover** in the card picker. Existing configurations keep working without changes.

- Gleam Cover: interrupt travel with Stop when the cover entity supports it, including travel to a requested position.

- Gleam Cover: show shades, blinds, shutters and curtains mounted inside or outside the glass. Existing configurations keep the inside view.

- Gleam Cover: choose a base color for shade fabric, blind and shutter slats, or curtain panels under Card appearance.

- Gleam Cover: add center-split curtains and single panels that gather on either side. All three styles support Normal and Compact layouts and share the window photo and framing controls.

[Try the covers](https://magnusoverli.github.io/gleam-card/cover/) · [Cover settings and YAML](https://github.com/magnusoverli/gleam-card/blob/v0.0.11/docs/cover.md)

## [0.0.10](https://github.com/magnusoverli/gleam-card/releases/tag/v0.0.10) · 2026-11-19

### 🪟 Gleam Cover: introducing Roller shutter

- **Rigid shutter slats.** Choose Roller shutter in Normal or Compact layout. The slats travel together into a fixed housing above the window.
- **Match your window.** Choose Portrait, Square or Landscape for shades, blinds and shutters. The photo crops without stretching, and glazing bars keep their configured thickness. Landscape remains the default.
- **Open or close from halfway.** A stationary cover with a reported partial position offers both directions when supported. Buttons have fixed sizes for Normal and Compact layouts.
- **A clearer readout.** Window illustrations are larger, and covers with a lift slider show the percentage beside the slider instead of repeating it in the status line.
- **Fewer redundant updates.** Window renderers share their frame geometry, and unchanged position reports no longer rewrite the footer.

[Try the roller shutter](https://magnusoverli.github.io/gleam-card/cover/) · [Cover settings and YAML](https://github.com/magnusoverli/gleam-card/blob/v0.0.10/docs/cover.md)

## [0.0.9](https://github.com/magnusoverli/gleam-card/releases/tag/v0.0.9) · 2026-11-19

### 🪟 Gleam Cover: introducing Slatted blind

Let light in without raising the blind. Choose **Slatted blind** in the visual editor to control slat angle separately from lift, in Normal or Compact layout.

- **Lift and stack.** The rising rail collects each slat from the bottom. Lower it and each slat settles back into place.
- **Tilt independently.** The card shows only the tilt controls your entity supports. Set **Cover movement → Tilt transition** to match your motor; the default is one second.
- **Keep your view.** Use the same window photos, crop, zoom and glazing bars as Roller shade.
- **Set a lift target on any supported cover.** Release the **Lift position** slider to request 0–100% open on a blind, shade or garage door. The target stays distinct from the reported position.

[Try the simulated blind](https://magnusoverli.github.io/gleam-card/cover/) · [Cover settings and YAML](https://github.com/magnusoverli/gleam-card/blob/v0.0.9/docs/cover.md)

## [0.0.8](https://github.com/magnusoverli/gleam-card/releases/tag/v0.0.8) · 2026-11-19

### 🪟 Gleam Cover: introducing Roller shade

Put the view from your own window on your dashboard and watch the fabric roll up to reveal it. Choose **Cover type → Roller shade** in the visual editor. Garage remains the default, so existing cards need no changes.

#### 🎛️ Movement and status

- **Measured or state-only.** Use Normal or Compact layout. A shade that reports 40% open shows that measurement; a state-only shade never shows an invented percentage.
- **Timed travel.** Set the full movement time to match your motor. The illustration keeps moving between sparse position reports, while the readout follows Home Assistant. Open and Close are offered according to device capabilities.

#### 🖼️ Make the window yours
- Match sheer or blackout fabric using **Card appearance → Fabric opacity**. The window frame and bottom rail stay solid.
- Upload a photo from your phone or computer in **Card appearance**, or paste a URL in **Window view image**, to show the actual view behind the roller shade.
- Frame the outdoor view with photo zoom and horizontal/vertical position sliders.
- Customize the roller shade’s glazing bar color and width, or hide the bars entirely.

**[Try the Cover demo](https://magnusoverli.github.io/gleam-card/cover/)** and select a roller shade from **Example**, or follow the [setup guide and YAML example](https://github.com/magnusoverli/gleam-card/blob/v0.0.8/docs/cover.md). Gleam Cover retains its **Experimental** badge.

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
