import { expect, test } from "@playwright/test";
import { fileURLToPath } from "node:url";

const base = {
  type: "custom:gleam-light", name: "Living room", zones: [{ entity: "light.ceiling", name: "Reading" }],
  rows: 1, columns: 2, zone_map: ["1."], beam_angle: 60, grid_options: { columns: 6 },
};
const walls = ["Left", "Back", "Right"];

async function setup(page, extra = {}) {
  const url = "http://light-editor.test";
  await page.route(`${url}/`, route => route.fulfill({ contentType: "text/html", body: "<!doctype html><main></main><aside></aside>" }));
  await page.route(`${url}/card.js`, route => route.fulfill({ contentType: "text/javascript",
    path: fileURLToPath(new URL("../../dist/gleam-card.js", import.meta.url)) }));
  await page.goto(url);
  await page.addScriptTag({ type: "module", url: `${url}/card.js` });
  await page.evaluate(async config => {
    const Card = await customElements.whenDefined("gleam-light");
    const editor = Card.getConfigElement(), calls = [], edits = [];
    const hass = { states: { "light.ceiling": { state: "on", attributes: {} } }, callService: (...args) => calls.push(args) };
    editor.hass = hass;
    editor.setConfig(config);
    document.querySelector("main").append(editor);
    const cell = editor.shadowRoot.querySelector(".plan button");
    window.roomTest = { edits, calls, retainedCell: () => cell === editor.shadowRoot.querySelector(".plan button") };
    document.addEventListener("config-changed", ({ detail: { config } }) => {
      const preview = new Card();
      preview.preview = true;
      preview.setConfig(config);
      preview.hass = hass;
      document.querySelector("aside").replaceChildren(preview);
      editor.setConfig(structuredClone(config));
      edits.push(structuredClone(config));
    });
  }, { ...base, ...extra });
  const editor = page.locator("gleam-light-editor");
  return {
    editor, checkbox: wall => editor.getByRole("checkbox", { name: `${wall} wall`, exact: true }),
    tv: editor.getByLabel("TV wall"), couch: editor.getByLabel("Couch wall"),
    replace: extra => editor.evaluate((e, c) => e.setConfig(c), { ...base, ...extra }),
    last: () => page.evaluate(() => window.roomTest.edits.at(-1)),
  };
}

test.afterEach(async ({ page }) => {
  expect(await page.evaluate(() => window.roomTest?.calls)).toEqual([]);
});

test("legacy rooms start with the right window; each combination previews once and retains the spot plan", async ({ page }) => {
  const { checkbox, tv, couch } = await setup(page);
  await expect(checkbox("Left")).not.toBeChecked();
  await expect(checkbox("Back")).not.toBeChecked();
  await expect(checkbox("Right")).toBeChecked();
  await expect(tv).toHaveValue("");
  await expect(couch).toHaveValue("");

  // Visit every combination by toggling a single wall each time.
  const path = [
    ["Right", []], ["Left", ["left"]], ["Back", ["left", "back"]], ["Left", ["back"]],
    ["Right", ["back", "right"]], ["Left", ["left", "back", "right"]], ["Back", ["left", "right"]], ["Left", ["right"]],
  ];
  for (const [wall, windows] of path) {
    const input = checkbox(wall);
    await input.press("Space");
    await expect(input).toBeFocused();
    if (windows.length === walls.length) {
      await expect(tv).toBeDisabled();
      await expect(couch).toBeEnabled();
    } else {
      await expect(tv).toBeEnabled();
      expect(await tv.locator("option:enabled").evaluateAll(options => options.map(o => o.value)))
        .toEqual(["", ...["left", "back", "right"].filter(w => !windows.includes(w))]);
    }
  }
  const edits = await page.evaluate(() => window.roomTest.edits);
  expect(edits.map(config => ({ ...config, windows: config.windows ?? ["right"] }))).toEqual(path.map(([, windows]) => ({ ...base, windows })));
  expect(await page.evaluate(() => window.roomTest.retainedCell())).toBe(true);
});

test("TV and windows reserve walls; couch placement is independent through echoes and external changes", async ({ page }) => {
  const { checkbox, tv, couch, replace, last } = await setup(page);
  await expect(tv.getByRole("option", { name: "Right wall" })).toBeDisabled();
  await tv.selectOption("back");
  await expect(checkbox("Back")).toBeDisabled();
  await couch.selectOption("back");
  expect(await last()).toEqual({ ...base, tv_wall: "back", couch_wall: "back" });
  await couch.selectOption("right");
  await tv.selectOption("left");
  await expect(checkbox("Back")).toBeEnabled();
  await expect(checkbox("Left")).toBeDisabled();
  await checkbox("Back").check();
  await expect(tv.getByRole("option", { name: "Back wall" })).toBeDisabled();
  expect(await last()).toEqual({ ...base, tv_wall: "left", couch_wall: "right", windows: ["back", "right"] });

  await replace({ tv_wall: "right", couch_wall: "left" });
  for (const wall of walls) await expect(checkbox(wall)).not.toBeChecked();
  await expect(checkbox("Right")).toBeDisabled();
  await expect(couch).toHaveValue("left");
  await tv.selectOption("");
  await expect(checkbox("Right")).toBeEnabled();
  await expect(checkbox("Right")).not.toBeChecked();
  expect(await last()).toEqual({ ...base, couch_wall: "left", windows: [] });
  await couch.selectOption("");
  expect(await last()).toEqual({ ...base, windows: [] });
});

test("conflicting YAML can be repaired by removing either placement and undo restores the conflict", async ({ page }) => {
  const conflict = { tv_wall: "right", windows: ["right"], couch_wall: "right" };
  const { editor, checkbox, tv, couch, replace, last } = await setup(page, conflict);
  await expect(editor.locator("#invalid")).not.toBeEmpty();
  await expect(checkbox("Right")).toBeChecked();
  await expect(checkbox("Right")).toBeEnabled();
  await expect(tv.getByRole("option", { name: "None" })).toBeEnabled();
  await checkbox("Right").uncheck();
  await expect(editor.locator("#invalid")).toBeEmpty();
  expect(await last()).toEqual({ ...base, ...conflict, windows: [] });
  await replace(conflict);
  await expect(checkbox("Right")).toBeChecked();
  await expect(tv).toHaveValue("right");
  await expect(couch).toHaveValue("right");
  await expect(editor.locator("#invalid")).not.toBeEmpty();
  await tv.selectOption("");
  await expect(editor.locator("#invalid")).toBeEmpty();
  expect(await last()).toEqual({ ...base, windows: ["right"], couch_wall: "right" });
});

test("malformed external window and couch values stay editable until both repairs are valid", async ({ page }) => {
  const { editor, checkbox, couch, last } = await setup(page, { windows: "left", couch_wall: "front", tv_wall: "back" });
  await expect(editor.locator("#invalid")).not.toBeEmpty();
  await checkbox("Left").check();
  expect(await last()).toBeUndefined();
  await couch.selectOption("left");
  await expect(editor.locator("#invalid")).toBeEmpty();
  expect(await last()).toEqual({ ...base, windows: ["left"], couch_wall: "left", tv_wall: "back" });
});
