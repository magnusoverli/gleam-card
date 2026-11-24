import { test, expect } from "@playwright/test";

const counter = "light.kitchen_counter", dining = "light.kitchen_dining";

test.beforeEach(async ({ page }) => {
  await page.goto("/dev/fixture.html");
  await page.locator("gleam-light").scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    const { light, hass } = window.demo;
    window.lightCalls = [];
    window.lightStates = { ...hass.states };
    window.pushLights = () => {
      light.hass = { ...hass, states: { ...window.lightStates }, callService: async (...args) => { window.lightCalls.push(args); } };
    };
    window.reportLight = (id, state, attributes = {}) => {
      const previous = window.lightStates[id];
      window.lightStates[id] = { ...previous, state, attributes: { ...previous.attributes, ...attributes }, last_changed: new Date().toISOString() };
      window.pushLights();
    };
    light.setConfig({ name: "Kitchen", zones: [{ entity: "light.kitchen_counter" }, { entity: "light.kitchen_dining" }] });
    window.pushLights();
  });
});

test("renders a 3 × 4 grid in two zones and registers the card", async ({ page }) => {
  const card = page.locator("gleam-light");
  await expect(card.locator(".fixtures > g")).toHaveCount(12);
  await expect(card.locator(".controls .name")).toHaveText(["Counter", "Dining"]);
  await expect(card.locator(".controls .state")).toHaveText(["On", "On"]);
  await expect(card.locator(".brightness .value")).toHaveText(["85%", "40%"]);
  expect(await page.evaluate(() => window.customCards.map(c => c.type))).toContain("gleam-light");
  expect(await page.evaluate(() => window.lightCalls)).toEqual([]);
});

test("a zone button sends one command, shows it at once and settles on the report", async ({ page }) => {
  const card = page.locator("gleam-light"), zone = card.locator(".zone").first();
  await card.getByRole("button", { name: "Turn off Counter" }).click();
  expect(await page.evaluate(() => window.lightCalls)).toEqual([["light", "turn_off", { entity_id: counter }]]);
  await expect(zone.locator(".state")).toHaveText("Off");
  await expect(zone.locator(".age")).toHaveText("· Turning off…");
  await expect(card.locator(".fixtures > g").first().locator("ellipse").last()).toHaveAttribute("fill", "#1b2c3d");
  await page.evaluate(id => window.reportLight(id, "off"), counter);
  await expect(zone.locator(".age")).toHaveText("· Under 1 min");
  await expect(card.getByRole("button", { name: "Turn on Counter" })).toBeVisible();
  await expect(card.locator(".zone").nth(1).locator(".state")).toHaveText("On");
});

test("tapping the room switches only the zone nearest the tap", async ({ page }) => {
  const room = page.locator("gleam-light svg.room"), box = await room.boundingBox();
  await room.click({ position: { x: box.width * 0.3, y: box.height * 0.5 } });
  await room.click({ position: { x: box.width * 0.7, y: box.height * 0.5 } });
  expect(await page.evaluate(() => window.lightCalls)).toEqual([
    ["light", "turn_off", { entity_id: counter }],
    ["light", "turn_off", { entity_id: dining }],
  ]);
});

test("brightness and colour temperature send their values on release", async ({ page }) => {
  const card = page.locator("gleam-light");
  await card.getByRole("slider", { name: "Dining brightness" }).fill("70");
  await expect(card.locator(".brightness .value").nth(1)).toHaveText("70%");
  await card.getByText("Colour temperature").click();
  await card.getByRole("slider", { name: "Counter colour temperature" }).fill("4000");
  await expect(card.locator(".temperatures .value").first()).toHaveText("4000 K");
  expect(await page.evaluate(() => window.lightCalls)).toEqual([
    ["light", "turn_on", { entity_id: dining, brightness_pct: 70 }],
    ["light", "turn_on", { entity_id: counter, color_temp_kelvin: 4000 }],
  ]);
});

test("an unconfirmed change returns to the reported state and says so", async ({ page }) => {
  const card = page.locator("gleam-light"), zone = card.locator(".zone").first();
  await page.clock.install();
  await card.getByRole("button", { name: "Turn off Counter" }).click();
  await expect(zone.locator(".state")).toHaveText("Off");
  await page.clock.fastForward(6000);
  await expect(zone.locator(".state")).toHaveText("On");
  await expect(card.locator(".hint")).toContainText("Counter: change not confirmed");
  expect(await page.evaluate(() => window.lightCalls.length)).toBe(1);
});

test("an unavailable zone cannot be operated; colour temperature hides when unsupported", async ({ page }) => {
  const card = page.locator("gleam-light"), zone = card.locator(".zone").nth(1);
  await page.evaluate(id => window.reportLight(id, "unavailable"), dining);
  await expect(zone.locator(".state")).toHaveText("Unavailable");
  await expect(card.getByRole("button", { name: "Turn on Dining" })).toBeDisabled();
  await expect(zone.locator(".brightness .value")).toHaveText("—");
  await expect(card.locator("details")).toBeVisible();
  await page.evaluate(([a, b]) => {
    window.reportLight(a, "on", { supported_color_modes: ["brightness"] });
    window.reportLight(b, "on", { supported_color_modes: ["onoff"] });
  }, [counter, dining]);
  await expect(card.locator("details")).toBeHidden();
  await expect(zone.locator(".brightness")).toBeHidden();
});

test("layouts: 8 × 8 grid, a ring along the walls, gaps and Compact", async ({ page }) => {
  const card = page.locator("gleam-light");
  const configure = config => page.evaluate(c => window.demo.light.setConfig({ zones: [{ entity: "light.kitchen_counter" }, { entity: "light.kitchen_dining" }], ...c }), config);
  await configure({ rows: 8, columns: 8 });
  await expect(card.locator(".fixtures > g")).toHaveCount(64);
  await configure({ rows: 8, columns: 8, walls_only: true });
  await expect(card.locator(".fixtures > g")).toHaveCount(28);
  await configure({ rows: 2, columns: 3, zone_map: ["1.2", "1.2"] });
  await expect(card.locator(".fixtures > g")).toHaveCount(4);
  await configure({ variant: "compact" });
  await expect(card.locator(".brightness").first()).toBeHidden();
  await expect(card.getByRole("button", { name: "Turn off Dining" })).toBeVisible();
  expect(await page.evaluate(() => window.demo.light.getGridOptions().columns)).toBe(6);
});

test("reconnecting keeps the scene and its controls working", async ({ page }) => {
  await page.evaluate(() => { const { light } = window.demo; light.remove(); document.querySelector("#cards").append(light); });
  const card = page.locator("gleam-light");
  await card.scrollIntoViewIfNeeded();
  await expect(card.locator(".fixtures > g")).toHaveCount(12);
  await card.getByRole("button", { name: "Turn off Dining" }).click();
  expect(await page.evaluate(() => window.lightCalls)).toEqual([["light", "turn_off", { entity_id: dining }]]);
});

test("editor assigns spots in the plan, resizes the grid and splits zones", async ({ page }) => {
  await page.evaluate(() => {
    const editor = customElements.get("gleam-light").getConfigElement();
    window.lightConfigs = [];
    editor.addEventListener("config-changed", e => window.lightConfigs.push(e.detail.config));
    editor.setConfig({ type: "custom:gleam-light", zones: [{ entity: "light.kitchen_counter" }, { entity: "light.kitchen_dining" }] });
    editor.hass = window.demo.hass;
    document.body.append(editor);
  });
  const editor = page.locator("gleam-light-editor"), last = () => page.evaluate(() => window.lightConfigs.at(-1));
  await editor.getByRole("button", { name: /^Row 1 from the back wall, column 1:/ }).click();
  expect((await last()).zone_map).toEqual(["2122", "1122", "1122"]);
  await editor.getByRole("button", { name: /^Row 1 from the back wall, column 1:/ }).click();
  expect((await last()).zone_map[0]).toBe(".122");
  await editor.getByRole("button", { name: "More rows" }).click();
  expect((await last()).rows).toBe(4);
  expect((await last()).zone_map).toHaveLength(4);
  await editor.getByRole("button", { name: "Walls | centre" }).click();
  expect((await last()).zone_map).toEqual(["1111", "1221", "1221", "1111"]);
  await editor.getByLabel("Only along the walls").check();
  expect((await last()).walls_only).toBe(true);
  await expect(editor.getByRole("button", { name: "Walls | centre" })).toBeDisabled();
  await expect(editor.locator(".plan button")).toHaveCount(12);
  await editor.getByRole("button", { name: "Remove zone 2" }).click();
  expect((await last()).zones).toEqual([{ entity: "light.kitchen_counter" }]);
  expect((await last()).zone_map.every(row => /^[1.]+$/.test(row))).toBe(true);
});
