import { test, expect } from "@playwright/test";

test("clicking each 2 × 4 Back | front lens routes to the entity for its row", async ({ page }) => {
  const back = "light.kitchen_counter", front = "light.kitchen_dining";
  await page.goto("/dev/fixture.html");
  const room = page.locator("gleam-light svg.room");
  await room.scrollIntoViewIfNeeded();
  await page.evaluate(([back, front]) => {
    const { light, hass } = window.demo;
    window.hitEntities = [];
    light.setConfig({ rows: 2, columns: 4, zone_map: ["1111", "2222"], zones: [{ entity: back }, { entity: front }] });
    light.hass = { ...hass, callService: async (_domain, _service, data) => window.hitEntities.push(data.entity_id) };
  }, [back, front]);

  const lenses = room.locator(".fixtures > g > g > ellipse:last-child");
  await expect(lenses).toHaveCount(8);
  await expect(lenses.last()).toHaveAttribute("cx", /.+/);
  for (const lens of await lenses.all()) {
    const box = await lens.boundingBox();
    await page.mouse.click(Math.round(box.x + box.width / 2), Math.round(box.y + box.height / 2));
  }
  expect(await page.evaluate(() => window.hitEntities)).toEqual([back, back, back, back, front, front, front, front]);
});
