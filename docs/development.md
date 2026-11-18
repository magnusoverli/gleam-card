# Development

## Structure

| Path | Purpose |
| --- | --- |
| `src/index.ts` | Typed entry point; idempotent custom-element and card-picker registration |
| `src/shared/theme.ts` | Shared shadow-DOM style foundation |
| `src/cards/energy-graph/` | Energy card and pure data transforms |
| `src/cards/thermostat/` | Thermostat and its visual editor |
| `src/cards/energy-graph/recorder.ts` | Recorder requests through a narrow client interface |
| `src/cards/thermostat/commands.ts` | Pure command validation and climate-action transport |
| `scripts/deploy.js` | Content-hashed filesystem deployment with a stable loader |
| `dev/preview.js` | Synthetic Home Assistant states, history, statistics and mock actions |
| `tests/data.test.js` | Data-contract regression tests |
| `tests/browser/` | Built-bundle browser and interaction checks |
| `vite.config.ts` | Single-resource library build and license distribution |
| `dist/` | Generated distributable module and license notices |

The cards use native custom elements, Shadow DOM, ES modules, AbortController,
ResizeObserver, container queries, and demand-driven Three.js rendering.
Vite 8 uses Rolldown to bundle one shared Three.js dependency into one resource.
There is no runtime loader or CDN.

TypeScript checks the public card contracts, pooled chart renderer, arc-buffer
updates, entry point and build. The existing DOM controllers remain JavaScript
with typed public inputs; their internals are not fully type-checked.

## Commands

```sh
npm ci
npm run build
npm test
npx playwright install chromium
npm run test:browser
npm run benchmark
npm run dev
npm run deploy -- --config "<Home Assistant config>"
```

`dev` imports source and reloads on changes (native custom elements cannot be
redefined in place). `dev:test` builds and serves the production bundle for
browser tests. Deployment publishes immutable bundles before atomically replacing
the manifest. Register the loader once; reload the dashboard after deployment.

The browser tests build the distribution and load it in desktop and mobile-sized
Chromium. Tests cover rendering, registration, series/camera interactions,
disconnect/reconnect, explicit climate actions, editor changes, and WebGL failure.
All service calls are mocks. No live Home Assistant or physical-device
verification is implied by passing these tests.

The suite runs with Node 26.13.1 and npm 12.2.3.
Tests check resource reuse/disposal, frame batching, off-screen suspension and
public configuration types.

Card controllers own UI state and lifecycle. Recorder adapters own request
shapes; command functions own validation/transport; renderers own GPU resources.
Tests inject narrow clients instead of requiring a live Home Assistant.

## Rendering

- Energy uses bounded object pools and shared geometry/materials. Unchanged
  label textures survive updates; expired slots are released. Individual
  transparent bars retain sorting and tooltip behavior rather than instancing.
- Thermostat updates arc positions/normals in place and batches ticks into one
  draw call. HTML feedback is immediate; graphics are frame-coalesced.
- Both suspend hidden rendering, avoid idle loops and release GPU resources
  on disconnect.

`npm run benchmark` reports warmed chart-update CPU time, draw calls, GPU resource
counts and thermostat interaction-to-render-callback latency. JSON results are
attached under `test-results/`. Chromium uses software WebGL in this test setup;
timings are not GPU execution or physical-display latency measurements. Profile
real Home Assistant devices before setting hardware-specific budgets.

Dependency audit currently reports four development-tool findings stemming from
picomatch's ReDoS advisory (GHSA-fc5q-39xc-vjpf). The latest stable picomatch
(4.0.7) is affected; no patched stable version was available during setup.
The affected tools are not bundled into the card.

The reference handoff mentioned external tests on another machine. Those files
were not supplied; this repository contains its own portable regression suite.

## Adding cards

Add the card under `src/cards/<type>/`, reuse the shared style foundation, and
register it centrally in `src/index.ts` as `gleam-<type>`. Keep data transforms
separate from rendering. Clean up timers, observers, events and GPU resources
on disconnection; reconnection must create usable resources again.

Use latest stable versions, including non-LTS releases; exclude prereleases.
Update explicit versions and the lockfile together and run the regression suite.
End-user browser requirements are separate from the developer Node.js version.
