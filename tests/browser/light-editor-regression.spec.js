import { test, expect } from "@playwright/test";

async function openEditor(page, zoneMap) {
  await page.goto("/dev/fixture.html");
  await page.evaluate(async zone_map => {
    const Light = await customElements.whenDefined("gleam-light");
    const editor = Light.getConfigElement();
    window.lightEdits = [];
    editor.addEventListener("config-changed", e => {
      window.lightEdits.push(e.detail.config);
      editor.setConfig(e.detail.config);
    });
    document.body.append(editor);
    editor.setConfig({
      type: "custom:gleam-light", rows: 2, columns: 4, zone_map,
      zones: [{ entity: "light.kitchen_counter" }, { entity: "light.kitchen_dining" }],
    });
  }, zoneMap);
  return page.locator("gleam-light-editor");
}

test("unquoted YAML rows show a repair hint and a plan edit writes quoted rows", async ({ page }) => {
  const editor = await openEditor(page, [1111, 2222]);
  await expect(editor.locator("#invalid")).toContainText(/quote.*zone_map.*YAML/i);
  await editor.getByLabel("Display name").fill("Kitchen");
  await editor.getByLabel("Display name").press("Tab");
  expect(await page.evaluate(() => window.lightEdits)).toEqual([]);

  await editor.getByRole("button", { name: /^Row 2 from the back wall, column 3:/ }).click();
  await expect(editor.locator("#invalid")).toBeEmpty();
  expect(await page.evaluate(() => window.lightEdits)).toEqual([
    expect.objectContaining({ name: "Kitchen", zone_map: ["1111", "22.2"] }),
  ]);
});

test("Enter and Space cycle the focused spot until Tab moves to the next one", async ({ page }) => {
  const editor = await openEditor(page, ["1111", "2222"]);
  const cell = editor.getByRole("button", { name: /^Row 1 from the back wall, column 2:/ });
  await cell.focus();
  await page.keyboard.press("Enter");
  await expect(cell).toBeFocused();
  await expect(cell).toHaveAccessibleName(/zone 2/i);
  await page.keyboard.press("Space");
  await expect(cell).toBeFocused();
  await expect(cell).toHaveAccessibleName(/no spot/i);
  await page.keyboard.press("Tab");
  await expect(editor.getByRole("button", { name: /^Row 1 from the back wall, column 3:/ })).toBeFocused();
});
