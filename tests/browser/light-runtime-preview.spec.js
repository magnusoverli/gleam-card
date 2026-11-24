import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/light/");
  await expect(page.locator("#light .pools ellipse").last()).toHaveAttribute("rx", /.+/);
});

test("labels leave the room idle; geometry edits paint together without a blank layout", async ({ page }) => {
  const result = await page.locator("#light").evaluate(async light => {
    const frame = () => new Promise(requestAnimationFrame);
    const config = { zones: [{ entity: "light.kitchen_counter" }, { entity: "light.kitchen_dining" }] };
    light.setConfig(config);
    await frame();
    const pools = light.shadowRoot.querySelector(".pools"), pool = pools.firstElementChild;
    const before = pool.getAttribute("rx"), layout = light.spots;
    let draws = 0;
    const draw = light.renderer.draw;
    light.renderer.draw = scene => { draws++; draw(scene); };
    const named = { ...config, name: "New kitchen", zones: [{ ...config.zones[0], name: "Stove" }, config.zones[1]] };
    light.setConfig(named);
    light.setConfig(structuredClone(named));
    await frame();
    const labelDraws = draws, heading = light.shadowRoot.querySelector("h2").textContent;
    light.setConfig({ ...named, beam_angle: 20 });
    await frame();
    const beamLayoutRetained = light.spots === layout, beamDraws = draws - labelDraws;
    const narrower = Number(pool.getAttribute("rx")) < Number(before);
    light.setConfig({ ...named, rows: 2, columns: 3 });
    light.setConfig({ ...named, rows: 2, columns: 2 });
    const previousStillPainted = pools.childElementCount === 12 && pools.firstElementChild === pool && pool.hasAttribute("rx");
    await frame();
    return { labelDraws, heading, beamLayoutRetained, beamDraws, narrower, previousStillPainted, draws,
      count: pools.childElementCount, retained: pools.firstElementChild === pool };
  });
  expect(result).toEqual({ labelDraws: 0, heading: "New kitchen", beamLayoutRetained: true, beamDraws: 1,
    narrower: true, previousStillPainted: true, draws: 2, count: 4, retained: true });
});

test("reordering zones preserves the pending command, focused draft and release target", async ({ page }) => {
  const card = page.locator("#light");
  await card.evaluate(light => {
    window.commands = [];
    light.hass = { ...window.demo.hass, callService: async (...args) => window.commands.push(args) };
  });
  await card.getByRole("button", { name: "Turn off Counter" }).click();
  const slider = card.getByRole("slider", { name: "Dining brightness" });
  await slider.focus();
  await slider.evaluate(input => {
    input.value = "73";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    window.demo.light.setConfig({ zones: [
      { entity: "light.kitchen_dining", name: "Table" }, { entity: "light.kitchen_counter" },
      { entity: "light.bookcase_spots" },
    ] });
  });
  const moved = card.getByRole("slider", { name: "Table brightness" });
  await expect(moved).toBeFocused();
  await expect(moved).toHaveValue("73");
  await expect(card.locator(".controls .name")).toHaveText(["Table", "Counter", "Bookcase"]);
  await expect(card.locator(".zone .age").nth(1)).toHaveText("· Turning off…");
  await moved.dispatchEvent("change");
  expect(await page.evaluate(() => window.commands)).toEqual([
    ["light", "turn_off", { entity_id: "light.kitchen_counter" }],
    ["light", "turn_on", { entity_id: "light.kitchen_dining", brightness_pct: 73 }],
  ]);
});

test("off-screen layout edits keep the last picture until the card is visible again", async ({ page }) => {
  const card = page.locator("#light"), pools = card.locator(".pools ellipse");
  await card.evaluate(light => {
    light.style.marginTop = "3000px";
    window.scrollTo(0, 0);
  });
  await expect.poll(() => card.evaluate(light => light.visible)).toBe(false);
  await card.evaluate(light => {
    light.setConfig({ rows: 1, columns: 2, zones: [{ entity: "light.kitchen_counter" }] });
    light.setConfig({ rows: 1, columns: 3, zones: [{ entity: "light.kitchen_counter" }] });
  });
  await expect(pools).toHaveCount(12);
  await card.scrollIntoViewIfNeeded();
  await expect(pools).toHaveCount(3);
  await expect(pools.last()).toHaveAttribute("rx", /.+/);
});
