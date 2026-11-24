import { test, expect } from "@playwright/test";

test("Light previews names while typing and beam width before release, without switching a light", async ({ page }) => {
  await page.goto("/light/");
  await page.locator("gleam-light .fixtures ellipse").first().waitFor();
  await page.evaluate(() => {
    const { light, hass } = window.demo, editor = light.constructor.getConfigElement();
    light.style.cssText = "position:fixed;top:0;right:0;width:240px;pointer-events:none";
    const config = { type: "custom:gleam-light", zones: [{ entity: "light.kitchen_counter" }] };
    light.setConfig(config);
    editor.setConfig(config);
    editor.hass = hass;
    document.body.append(editor);
    window.edits = 0;
    editor.addEventListener("config-changed", e => {
      ++window.edits;
      light.setConfig(e.detail.config);
      editor.setConfig(structuredClone(e.detail.config));
    });
  });
  const editor = page.locator("gleam-light-editor"), card = page.locator("gleam-light");
  const name = editor.getByLabel("Display name");
  await name.fill("Living ");
  await expect(card.locator("h2")).toHaveText("Living");
  await expect(name).toBeFocused();
  await name.pressSequentially("room");
  await expect(card.locator("h2")).toHaveText("Living room");
  const updates = await page.evaluate(() => window.edits);
  await name.press("Tab");
  expect(await page.evaluate(() => window.edits)).toBe(updates);
  const zone = editor.getByLabel("Zone 1 name");
  await zone.fill("Reading");
  await expect(card.locator(".zone .name")).toHaveText("Reading");
  await expect(zone).toBeFocused();

  const beam = editor.locator("#beam"), pool = card.locator(".pools ellipse").first();
  await expect(pool).toHaveAttribute("rx", /.+/);
  const before = await pool.getAttribute("rx");
  await beam.scrollIntoViewIfNeeded();
  const box = await beam.boundingBox();
  await page.mouse.move(box.x + box.width * .28, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * .8, box.y + box.height / 2);
  await expect(pool).not.toHaveAttribute("rx", before);
  const dragging = await page.evaluate(() => window.edits);
  await page.mouse.up();
  expect(await page.evaluate(() => window.edits)).toBe(dragging);
  expect(await page.evaluate(() => window.demo.calls)).toHaveLength(0);
});
