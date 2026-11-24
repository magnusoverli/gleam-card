import { expect, test } from "@playwright/test";

test.beforeEach(async ({page}) => {
  await page.goto("/dev/fixture.html");
  await page.locator("#cover").scrollIntoViewIfNeeded();
});

test("a double garage appearance preview does not replay a stale partial position", async ({page}) => {
  const card = page.locator("#cover"), left = card.locator("gleam-cover-bay").first();
  const skin = left.locator(".door-skin");
  await card.evaluate(card => {
    const {hass,calls} = window.demo, entity = "cover.garage_door";
    window.preview = edits => card.setConfig({entity,right_entity:"cover.right_garage",variant:"double",travel_seconds:10,...edits});
    window.preview({});
    card.hass = {...hass,states:{...hass.states,[entity]:{state:"open",attributes:{current_position:40,supported_features:3}}},
      callService:async (...args) => { calls.push(args); }};
  });
  const height = async () => Number(await skin.getAttribute("height"));
  await expect.poll(height).toBeLessThan(55);
  await page.clock.install();
  await left.getByRole("button",{name:"Open left door"}).click();
  await page.clock.fastForward(2000);
  const moving = await height();
  expect(moving).toBeLessThan(38);
  await page.evaluate(() => window.preview({left_label:"Workshop",roof_type:"flat",light_temperature_kelvin:3200}));
  await expect(left.getByRole("button",{name:"Opening… Workshop"})).toBeDisabled();
  await page.clock.fastForward(1000);
  expect(await height()).toBeLessThan(moving - 5);
  expect(await page.evaluate(() => window.demo.calls)).toEqual([["cover","open_cover",{entity_id:"cover.garage_door"}]]);
});

test("normal and compact share the same blind, focused control and in-flight tilt", async ({page}) => {
  const card = page.locator("#cover"), slat = card.locator(".slats rect").first();
  const tilt = card.locator(".tilt input");
  await card.evaluate(card => {
    const {hass} = window.demo, entity = "cover.demo_blind";
    window.preview = variant => card.setConfig({entity,cover_type:"blind",variant,tilt_seconds:10});
    window.preview("normal");
    window.reportTilt = angle => {
      const blind = hass.states[entity];
      card.hass = {...hass,states:{...hass.states,[entity]:{...blind,attributes:{...blind.attributes,current_tilt_position:angle}}}};
    };
  });
  const height = async () => Number(await slat.getAttribute("height"));
  await expect.poll(height).toBeCloseTo(6.66,1);
  await tilt.focus();
  await page.clock.install();
  await page.evaluate(() => window.reportTilt(100));
  await page.clock.fastForward(3000);
  const moving = await height();
  expect(moving).toBeGreaterThan(4);
  expect(moving).toBeLessThan(6);
  const original = await slat.elementHandle();
  await page.evaluate(() => window.preview("compact"));
  await expect(card.locator("gleam-cover-bay")).toHaveAttribute("compact","");
  await expect(tilt).toBeFocused();
  expect(await original.evaluate(el => el.isConnected)).toBe(true);
  await page.clock.fastForward(1000);
  expect(await height()).toBeLessThan(moving);
  expect(await height()).toBeGreaterThan(4);
  await page.evaluate(() => window.preview("normal"));
  await page.clock.fastForward(7000);
  expect(await height()).toBeCloseTo(1);
  expect(await page.evaluate(() => window.demo.calls)).toEqual([]);
});
