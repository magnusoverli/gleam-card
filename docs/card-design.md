# Designing a Gleam card

For experimental cards, place one `.experimental` badge directly inside the
outer `ha-card`. The shared theme pins it to the upper-right corner outside
the content flow. Use `.badge-clearance` on the adjacent heading so its text
can wrap beside the badge; keep the badge outside scrollable or scaled content.

Use the stable **Energy Graph** as the visual reference. In the [interactive
demo](https://magnusoverli.github.io/gleam-card/), notice what you can read
before touching the chart: the current values, their meaning, and which series
are visible. Give a new card the same clarity. Pick the visualization and
interactions that suit its task; a simple card can use HTML and CSS throughout.

## Start with the shared frame

Import `foundationStyles` from `src/shared/theme.ts` and include it first in
the card's shadow-root stylesheet. Wrap the dashboard content in one `ha-card`.
The foundation supplies the dark gradient, border, rounded corners, shadow,
Home Assistant font, pill buttons, pressed state and keyboard focus ring.
The [graph template](../src/cards/energy-graph/template.ts) is a working example.
Keep editor styles separate so configuration forms fit Home Assistant.

| Element | Design decision |
| --- | --- |
| Readouts | Lead with the value people came for. Pair it with its unit and a short label. Use `--gleam-muted` (fallback `#8ba8c6`) for supporting text. Show missing data as unavailable or `—`, never as a measured zero. |
| Color | Reuse the frame and control defaults. Reserve brighter accents for data, device state or an action. Pair color with a label or state indicator; amber need not mean “price” outside the graph. |
| Spacing | On the graph, related controls sit 6–8 px apart; separate groups get more space. Let controls wrap and adapt to the **card width**, including a narrow column on a wide dashboard. Keep labels, units and focus rings visible. |
| Controls | Use native buttons and labeled inputs. Use `aria-pressed` for toggles. Keep primary actions reachable by touch and keyboard; give drag-only gestures a button or keyboard equivalent. Hide unsupported actions or explain why they are unavailable. |
| Configuration | Start with a useful minimal configuration. Put optional display choices in the visual editor and document them with valid YAML. Preserve unrelated dashboard options when editing. |

Keep task-specific styles local. For example, the thermostat can use its heat
accent for a selected mode and its configured radius for the frame. If a new
visual rule really belongs to all cards, change the foundation rather than
copying the graph template or introducing a shared controller.

## Make interaction immediate

- In visual editors, preview valid appearance changes while the user types or drags.
  Use `EditorPreview` for the Home Assistant `config-changed` event: coalesce continuous input,
  flush on commit, ignore host echoes, and cancel queued work when disconnected. Keep incomplete
  numbers and text selection in the form. Commit entity IDs, image URLs, uploads, and settings
  that reload history only when the user finishes. Preview never sends a device command or saves the dashboard.
- Home Assistant may replace a preview card for every `config-changed` event. During continuous
  edits, update only a positively identified Gleam preview in the same card editor dialog; never
  target the dashboard. Publish the final config on commit and fall back to host events if the
  preview layout is unknown. Exercise a replacement-style host as well as a retained-card test.
- Reflect input in HTML immediately. For device actions, distinguish a requested
  value from confirmed device state; don't send commands while rendering.
- Ignore unrelated entity updates. For graphics, batch pending work into one
  animation frame and stop drawing when idle, off-screen or hidden.
- Keep scene objects, geometry and buffers across updates. Bound caches and
  release timers, observers, listeners and GPU resources on disconnect. Check
  that reconnecting restores interaction. Keep useful status text available
  if WebGL cannot initialize.

## Review a new card

1. Register `gleam-<type>` in `src/index.ts` and add it to the synthetic demo.
   Compare it beside Energy Graph at desktop and narrow card widths. Try long
   labels, unavailable entities, keyboard focus, touch and selected states.
2. Cover the new card's actual actions, configuration and lifecycle in tests.
   Run `npm test` and `npm run test:browser`; the latter rebuilds and exercises
   the production bundle in desktop and mobile-sized Chromium.
3. For rendering changes, exercise resource reuse, off-screen suspension and
   cleanup for the new renderer. Extend `tests/browser/performance.spec.js`
   for new rendering paths and run `npm run benchmark`. Report the environment,
   CPU work, draw calls, resource counts and interaction-to-frame latency;
   software-WebGL measurements are comparisons, not physical-device guarantees.
