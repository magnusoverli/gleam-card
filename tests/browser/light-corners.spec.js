import { test, expect } from "@playwright/test";

// Sample the rendered SVG, not its path attributes: gradients, clipping and paint
// order all contribute to whether the room corner reads as a dark stripe.
async function corners(room) {
  const png = (await room.screenshot()).toString("base64");
  return room.evaluate(async (_, png) => {
    const image = await createImageBitmap(await (await fetch(`data:image/png;base64,${png}`)).blob());
    const ctx = new OffscreenCanvas(image.width, image.height).getContext("2d");
    ctx.drawImage(image, 0, 0); image.close();
    const { width, height } = ctx.canvas;
    const { data } = ctx.getImageData(0, 0, width, height);
    const luma = (x, y) => {
      const i = 4 * (Math.floor(y * height / 174) * width + Math.floor(x * width / 320));
      return .213 * data[i] + .715 * data[i + 1] + .072 * data[i + 2];
    };
    return [86, 258].map(x => {
      let trough = 0, step = 0;
      for (let y = 64; y < 116; y++) {
        const left = luma(x - 4, y), right = luma(x + 4, y);
        trough += Math.max(0, Math.min(left, right) - Math.min(luma(x - 1, y), luma(x, y), luma(x + 1, y)));
        step += Math.abs(luma(x - 1, y) - luma(x + 1, y));
      }
      return { trough: trough / 52, step: step / 52 };
    });
  }, png);
}

test("warm beams soften both rear corners without removing the unlit crease", async ({ page }) => {
  await page.goto("/light/");
  const room = page.locator("gleam-light svg.room");
  await expect(room.locator(".cones polygon").first()).toHaveAttribute("points", /.+/);
  await room.evaluate(svg => {
    svg.style.cssText = "width:320px;height:174px;max-width:none"; // 1 viewBox unit per CSS pixel
    const { light, hass } = window.demo, ids = ["light.kitchen_counter", "light.kitchen_dining"];
    light.setConfig({ rows:3, columns:4, beam_angle:40, zones:ids.map(entity => ({entity})) });
    window.reportCornerLight = async (...on) => {
      const states = {...hass.states};
      ids.forEach((id, i) => {
        const state = states[id];
        states[id] = {...state, state:on[i] ? "on" : "off", attributes:{ ...state.attributes,
          brightness:255, color_mode:"color_temp", color_temp_kelvin:2700 }};
      });
      light.hass = { ...hass, states };
      await new Promise(requestAnimationFrame);
    };
  });
  await page.evaluate(() => window.reportCornerLight(false, false));
  const off = await corners(room);
  await page.evaluate(() => window.reportCornerLight(true, true));
  const on = await corners(room);
  console.log("Rear corner contrast (8-bit luma)", { off, on });
  for (const [i, lit] of on.entries()) {
    expect(off[i].trough).toBeGreaterThan(.5);
    expect(lit.trough).toBeLessThan(off[i].trough);
    expect(lit.step).toBeLessThan(4); // No abrupt brightness jump across the lit wall join.
  }
  await page.evaluate(() => window.reportCornerLight(true, false));
  const [litLeft, unlitRight] = await corners(room);
  expect(litLeft.trough).toBeLessThan(off[0].trough);
  expect(unlitRight.trough).toBeGreaterThan(on[1].trough);
});
