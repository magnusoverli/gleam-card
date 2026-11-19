import { test, expect } from "@playwright/test";

test("releasing just beyond the dial maximum sends maximum, once", async ({ page }) => {
  await page.goto("/dev/fixture.html");
  const dial = page.locator("gleam-thermostat .dial");
  await dial.scrollIntoViewIfNeeded();
  const { x, y, width, height } = await dial.boundingBox();
  const move = degrees => {
    const angle = degrees * Math.PI / 180, radius = Math.min(width, height) * .35;
    return page.mouse.move(x + width / 2 + radius * Math.cos(angle), y + height / 2 - radius * Math.sin(angle));
  };
  await move(-40);
  await page.mouse.down();
  await move(-48);
  expect(await page.evaluate(() => window.demo.calls.length)).toBe(0);
  await page.mouse.up();
  await expect.poll(() => page.evaluate(() => window.demo.calls.map(call => call.data.temperature))).toEqual([30]);
});

test("dispatch deadline, early confirmation and reconnect ignore obsolete replies", async ({ page }) => {
  await page.goto("/dev/fixture.html");
  const plus = page.getByRole("button", { name: "Increase target temperature" });
  const message = page.locator("gleam-thermostat .message");
  await plus.scrollIntoViewIfNeeded();
  await page.clock.install();
  await page.evaluate(() => {
    const { thermostat, hass } = window.demo;
    window.replies = [];
    thermostat.setConfig({ ...thermostat._config, confirmation_timeout: 5 });
    thermostat.hass = { ...hass, callService: () => new Promise((resolve, reject) => window.replies.push({ resolve, reject })) };
  });
  await plus.click();
  await expect(plus).toBeDisabled();
  await page.clock.fastForward(5100);
  await expect(message).toContainText("outcome unknown");
  await expect(plus).toBeEnabled();
  await plus.click();
  await page.evaluate(() => window.replies[0].reject(new Error("late failure")));
  await expect(message).toContainText("Sending command");
  await page.evaluate(() => {
    const card = window.demo.thermostat, hass = card._hass, id = card._config.entity, state = hass.states[id];
    card.hass = { ...hass, states: { ...hass.states, [id]: { ...state, attributes: { ...state.attributes, temperature: 22.5 } } } };
    window.replies[1].resolve();
  });
  await expect(message).toBeEmpty();
  await expect(plus).toBeEnabled();
  await plus.click();
  await page.evaluate(() => window.replies[2].resolve());
  await expect(message).toContainText("awaiting reported state");
  await page.evaluate(() => {
    const card = window.demo.thermostat, parent = card.parentElement;
    card.remove(); parent.append(card);
  });
  await page.clock.fastForward(5100);
  await expect(message).toBeEmpty();
  await expect(plus).toBeEnabled();
  expect(await page.evaluate(() => window.replies.length)).toBe(3);
});
