import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/dev/fixture.html");
  await page.locator("gleam-cover").scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    const {cover,hass,calls} = window.demo;
    const id = "cover.garage_door";
    cover.setConfig({entity:id,travel_seconds:1});
    window.reportDoor = (state,attrs={}) => {
      cover.hass = {...hass,states:{[id]:{...hass.states[id],state,attributes:{supported_features:3,...attrs}}},
        callService:async (...args) => { calls.push(args); }};
    };
    window.reportDoor("closed");
  });
});

test("reveal is safe, inferred motion survives an early report and never confirms closure", async ({page}) => {
  const card = page.locator("gleam-cover"), scene = card.locator(".scene"), action = card.locator(".action");
  await scene.press("Enter");
  await expect(action).toHaveText("Open");
  expect(await page.evaluate(() => window.demo.calls)).toEqual([]);
  await action.click();
  await expect(action).toBeDisabled();
  await expect(action).toHaveText("Opening…");
  expect(await page.evaluate(() => window.demo.calls)).toEqual([["cover","open_cover",{entity_id:"cover.garage_door"}]]);
  await page.evaluate(() => window.reportDoor("open"));
  await expect(card.locator(".state")).toHaveText("Open");
  await expect(action).toHaveText("Opening…");
  await expect(action).toBeHidden();
  await scene.click();
  await action.click();
  await expect(action).toHaveText("Awaiting confirmation");
  await expect(card.locator(".state")).toHaveText("Open");
  await page.evaluate(() => window.reportDoor("closed"));
  await expect(action).toBeHidden();
});

test("an unconfirmed open releases controls without claiming success or resending", async ({page}) => {
  const card = page.locator("gleam-cover");
  await page.clock.install();
  await card.locator(".scene").click();
  await card.locator(".action").click();
  await page.clock.fastForward(7000);
  await expect(card.locator(".action")).toBeHidden();
  await expect(card.locator(".hint")).toContainText("still reports closed");
  await expect(card.locator(".state")).toHaveText("Closed");
  expect(await page.evaluate(() => window.demo.calls.length)).toBe(1);
  await page.evaluate(() => window.reportDoor("open"));
  await card.locator(".scene").click();
  await expect(card.locator(".action")).toHaveText("Close");
  await expect(card.locator(".action")).toBeEnabled();
});

test("a movement acknowledgement is not final confirmation; reconcile the latest state", async ({page}) => {
  const card = page.locator("gleam-cover"), action = card.locator(".action");
  await page.clock.install();
  await card.locator(".scene").click();
  await action.click();
  await page.evaluate(() => { window.reportDoor("opening"); window.reportDoor("open"); window.reportDoor("closed"); });
  await expect(action).toHaveText("Opening…");
  await page.clock.fastForward(1500);
  await expect(action).toHaveText("Awaiting confirmation");
  await page.clock.fastForward(5000);
  await expect(action).toBeHidden();
  await expect(card.locator(".lit-depth")).toHaveAttribute("height","0");
  await expect(card.locator(".state")).toHaveText("Closed");
  await card.locator(".scene").click();
  await action.click();
  await page.evaluate(() => window.reportDoor("opening",{current_position:42}));
  await page.clock.fastForward(6500);
  await expect(action).toBeHidden();
  await expect(card.locator(".state")).toHaveText("Opening");
  expect(Number(await card.locator(".lit-depth").getAttribute("height"))).toBeCloseTo(7.5, 0);
});

test("binary endpoint reports do not snap a 40-second close animation", async ({page}) => {
  const card = page.locator("gleam-cover");
  await page.clock.install();
  await page.evaluate(() => {
    window.demo.cover.setConfig({entity:"cover.garage_door", travel_seconds:40});
    window.reportDoor("open",{current_position:100});
  });
  await card.locator(".scene").click();
  await card.locator(".action").click();
  await page.evaluate(() => {
    window.reportDoor("closing",{current_position:100});
    window.reportDoor("closed",{current_position:0});
    window.reportDoor("closed",{current_position:0});
  });
  await expect(card.locator(".state")).toHaveText("Closed");
  await page.clock.fastForward(20000);
  await expect(card.locator(".action")).toHaveText("Closing…");
  await expect(card.locator(".interior")).toHaveCSS("opacity","1");
  await expect(card.locator(".spill")).toHaveCSS("opacity","1");
  const depth = Number(await card.locator(".lit-depth").getAttribute("height"));
  expect(depth).toBeGreaterThan(8);
  expect(depth).toBeLessThan(12);
  await page.clock.fastForward(21000);
  await expect(card.locator(".action")).toBeHidden();
  await expect(card.locator(".lit-depth")).toHaveAttribute("height","0");
});

test("external movement, measured position, unavailable state and failed action", async ({page}) => {
  const card = page.locator("gleam-cover"), button = card.locator(".action");
  await page.evaluate(() => window.reportDoor("opening",{current_position:40}));
  await card.locator(".scene").click();
  await expect(button).toHaveText("Opening…");
  expect(Number(await card.locator(".lit-depth").getAttribute("height"))).toBeCloseTo(7, 0);
  await page.evaluate(() => window.reportDoor("unavailable"));
  await expect(button).toBeHidden();
  await expect(card.locator(".panel").first()).toBeHidden();
  await page.evaluate(() => {
    window.reportDoor("closed");
    window.demo.cover.hass = {...window.demo.hass, callService:async () => { throw Error("offline"); }};
  });
  await card.locator(".scene").click();
  await button.click();
  await expect(card.locator(".hint")).toContainText("Command failed");
  await expect(button).toHaveText("Open");
  await expect(button).toBeEnabled();
});

test("double garage keeps each command and status scoped to its bay; compact requests half width", async ({page}) => {
  const card = page.locator("gleam-cover");
  await page.evaluate(() => { window.demo.cover.hass = window.demo.hass; });
  await page.getByLabel("Garage layout").selectOption({label:"Double"});
  const bays = card.locator("gleam-cover-bay"), left = bays.first(), right = bays.last();
  await expect(left.locator(".state")).toHaveText("Closed");
  await expect(right.locator(".state")).toHaveText("Open");
  await right.locator(".scene").click();
  await right.getByRole("button",{name:"Close right door"}).click();
  await expect(right.locator(".state")).toHaveText("Closing");
  await expect(left.locator(".state")).toHaveText("Closed");
  await left.locator(".scene").click();
  await left.getByRole("button",{name:"Open left door"}).click();
  expect(await page.evaluate(() => window.demo.calls.map(c=>[c.service,c.data.entity_id]))).toEqual([
    ["close_cover","cover.right_garage"],["open_cover","cover.garage_door"]]);
  await page.getByLabel("Garage layout").selectOption({label:"Compact"});
  expect(await card.evaluate(c=>c.getGridOptions().columns)).toBe(6);
  await expect(bays).toHaveCount(1);
});

test("editor preserves dashboard options and rejects invalid travel time", async ({page}) => {
  const result = await page.evaluate(() => {
    const editor = customElements.get("gleam-cover").getConfigElement();
    editor.setConfig({entity:"cover.garage_door",grid_options:{columns:12}});
    editor.hass = window.demo.hass;
    document.body.append(editor);
    const events = [];
    editor.addEventListener("config-changed",e => events.push(e.detail.config));
    const input = editor.shadowRoot.querySelector("#seconds");
    for (const value of ["0","40"]) { input.value=value; input.dispatchEvent(new Event("change",{bubbles:true})); }
    editor.remove();
    return events;
  });
  expect(result).toEqual([{entity:"cover.garage_door",grid_options:{columns:12},travel_seconds:40}]);
});

test("double editor explains a duplicate immediately and accepts the correction", async ({page}) => {
  await page.evaluate(() => {
    const editor = document.createElement("gleam-cover-editor");
    editor.setConfig({variant:"double",entity:"cover.left",right_entity:"cover.right"});
    editor.addEventListener("config-changed",e => window.demo.calls.push(e.detail.config));
    document.body.append(editor);
  });
  const editor = page.locator("gleam-cover-editor"), right = editor.getByLabel("Right door entity");
  await right.fill("cover.left");
  await expect(editor.getByRole("alert")).toContainText("Both doors use the same cover entity");
  await right.press("Tab");
  expect(await page.evaluate(() => window.demo.calls.length)).toBe(0);
  await right.fill("cover.other");
  await expect(editor.getByRole("alert")).toBeHidden();
  await right.press("Tab");
  expect(await page.evaluate(() => window.demo.calls.at(-1).right_entity)).toBe("cover.other");
});
