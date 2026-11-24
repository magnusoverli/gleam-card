import { test, expect } from "@playwright/test";

const changes = page => page.evaluate(() => window.editorChanges);
const nextFrame = page => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => resolve())));

test.beforeEach(async ({ page }) => {
  await page.goto("/dev/fixture.html");
  await page.waitForFunction(() => window.demo?.thermostat);
  await page.evaluate(() => {
    const { thermostat, hass } = window.demo;
    const config = { type: "custom:gleam-thermostat", entity: "climate.heat_pump",
      name: "Demo heat pump", grid_options: { columns: 6 } };
    const editor = thermostat.constructor.getConfigElement();
    editor.hass = hass; editor.setConfig(config);
    window.editorChanges = [];
    const host = thermostat.parentElement;
    host.addEventListener("config-changed", event => {
      const snapshot = structuredClone(event.detail.config);
      window.editorChanges.push(snapshot);
      thermostat.setConfig(snapshot);
      editor.setConfig(structuredClone(snapshot));
    });
    host.append(editor);
  });
});

test.afterEach(async ({ page }) => {
  expect(await page.evaluate(() => window.demo.calls)).toEqual([]);
});

test("name, color and size update the real preview before commit without overwriting drafts", async ({ page }) => {
  const editor = page.locator("gleam-thermostat-editor"), card = page.locator("gleam-thermostat");
  const name = editor.getByLabel("Display name"), color = editor.getByLabel("Background color");
  const padding = editor.getByLabel("Card padding (px)", { exact: true });
  await name.fill("Living room");
  await expect(card.getByRole("heading")).toHaveText("Living room");
  await expect(name).toBeFocused();
  await name.press("Home"); await name.press("X");
  await expect(card.getByRole("heading")).toHaveText("XLiving room");
  expect(await name.evaluate(input => input.selectionStart)).toBe(1);

  // Native picker input events can arrive several times before change.
  await color.evaluate(input => {
    for (const value of ["#112233", "#445566", "#778899"]) {
      input.value = value; input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });
  await expect(card.locator("ha-card")).toHaveCSS("--background", "#778899");
  await color.dispatchEvent("change");
  await padding.focus();
  await padding.evaluate(input => {
    input.value = "024"; input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await expect(card.locator(".content")).toHaveCSS("padding-top", "24px");
  await expect(padding).toHaveValue("024"); await expect(padding).toBeFocused();
  await padding.dispatchEvent("change");
  expect(await changes(page)).toHaveLength(4);
  expect((await changes(page)).at(-1)).toMatchObject({
    name: "XLiving room", background_color: "#778899", card_padding: 24, grid_options: { columns: 6 },
  });
});

test("invalid drafts keep the last preview; entity changes and reset emit only once", async ({ page }) => {
  const editor = page.locator("gleam-thermostat-editor"), card = page.locator("gleam-thermostat");
  const height = editor.getByLabel("Card height (px, 0 = automatic)", { exact: true });
  await height.fill("300");
  await expect(card.locator("ha-card")).toHaveCSS("height", "300px");
  await height.fill("1");
  await expect(editor.getByRole("status")).toContainText("at least 120");
  await expect(height).toHaveValue("1");
  await height.fill("");
  await nextFrame(page);
  await expect(card.locator("ha-card")).toHaveCSS("height", "300px");
  expect(await changes(page)).toHaveLength(1);
  await height.fill("350");
  await expect(card.locator("ha-card")).toHaveCSS("height", "350px");
  await expect(editor.getByRole("status")).toBeEmpty();

  const entity = editor.getByLabel("Climate entity");
  await entity.fill("climate.guest_room");
  await nextFrame(page);
  expect((await changes(page)).map(config => config.entity)).toEqual(["climate.heat_pump", "climate.heat_pump"]);
  await entity.press("Tab");
  expect((await changes(page)).at(-1).entity).toBe("climate.guest_room");
  await height.fill("119");
  await expect(editor.getByRole("status")).toContainText("at least 120");
  const reset = editor.getByRole("button", { name: /Reset display/ });
  await reset.click(); await reset.click();
  await expect(height).toHaveValue("0");
  await expect(editor.getByRole("status")).toBeEmpty();
  await expect(card.locator("ha-card")).not.toHaveClass(/fixed/);
  const snapshots = await changes(page);
  expect(snapshots).toHaveLength(4);
  expect(snapshots.at(-1)).toEqual({ type: "custom:gleam-thermostat", entity: "climate.guest_room",
    name: "Demo heat pump", grid_options: { columns: 6 } });
});

test("external config and disconnection cancel queued appearance previews", async ({ page }) => {
  const editor = page.locator("gleam-thermostat-editor");
  await editor.evaluate(element => {
    const input = element.shadowRoot.querySelector('[data-key="heat_color"]');
    input.value = "#123456"; input.dispatchEvent(new Event("input", { bubbles: true }));
    element.setConfig({ type: "custom:gleam-thermostat", entity: "climate.external", heat_color: "#abcdef" });
  });
  await nextFrame(page);
  await expect(editor.getByLabel("Heating accent")).toHaveValue("#abcdef");
  await editor.evaluate(element => {
    const input = element.shadowRoot.querySelector('[data-key="heat_color"]');
    input.value = "#345678"; input.dispatchEvent(new Event("input", { bubbles: true }));
    const host = element.parentElement;
    element.remove(); host.append(element);
  });
  await nextFrame(page);
  expect(await changes(page)).toEqual([]);
});
