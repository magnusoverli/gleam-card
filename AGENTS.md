# Project conventions

- For new cards and changes to dashboard UI, follow the
  [Gleam card design guide](docs/card-design.md). Use the Energy Graph as the
  visual reference and `src/shared/theme.ts` for the shared frame and controls.

- Use **Home Assistant Marketplace**, or **Marketplace** for short, in
  user-facing text and documentation.
- Preserve technical filenames, API identifiers, and configuration keys when
  required for compatibility, even if they retain older terminology.
- Use the latest stable dependency and tooling releases, including non-LTS
  versions. Exclude alpha, beta, RC, and other prereleases. Verify current
  versions before selecting them and retain a lockfile for reproducibility.
- Keep the application, tests, docs, and build self-contained in this repository.
- All agents, including subagents: work in `src/` and rebuild. Never read,
  print, or quote generated bundles or source maps during routine work. Scope
  searches and diffs to source, tests, and docs, or explicitly exclude `dist/`.
  Never edit `dist/gleam-card.js` by hand. Verify it by running the build and
  browser tests; use file size or a content hash when checking the artifact.
- Inspect generated code or dependency sources only for a specific bundling
  problem that source, build diagnostics, and tests cannot explain. State
  what you need to check first, then extract only the relevant symbol with a
  hard character cap before output reaches chat. Never dump a whole file or
  minified line. If an editor selection supplies build output automatically,
  do not repeat it or reopen the file.
- Prefer modern platform APIs and current stable language/tooling patterns:
  typed boundaries, ES modules, native web components, responsive CSS, and
  explicit resource ownership. Avoid legacy compatibility layers or new
  dependencies when a well-supported platform feature covers the need.
- Optimize for responsive interaction, low latency, and fast rendering. Reuse
  GPU resources, skip unrelated updates, and avoid idle animation loops.
- Keep source and documentation concise and readable. Prefer simple solutions
  over extra abstraction; use newer technology for measurable UX benefits.
- Keep Home Assistant transport, pure domain rules, GPU rendering, and UI
  coordination separate. Inject narrow client interfaces for tests. Extract
  shared behavior only when it is genuinely shared; avoid generic base classes.
- Use source reloads for local preview and production bundles for browser
  regression tests. Development deployment uses content hashes, not manually
  incremented versions. Publish manifests only after their bundles exist.
- Retain scene objects and GPU buffers across normal updates. Share geometry
  and materials; bound caches/pools and dispose them on disconnect. Do not
  rebuild a scene or allocate textures on every sensor update.
- Coalesce graphics updates into one animation frame; skip off-screen/hidden
  rendering and unrelated entity updates. Keep HTML feedback immediate.
- Type public configuration and Home Assistant contracts and new rendering
  modules. Avoid `any` or disabling checks to make new code compile.
- For rendering changes, run resource-reuse, lifecycle, visibility and action
  regression tests. Measure CPU work, draw calls, GPU resource counts and
  interaction-to-frame latency with `npm run benchmark`; report the environment
  and do not claim hardware-independent timing guarantees.
