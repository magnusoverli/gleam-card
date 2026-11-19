import { test, expect } from "@playwright/test";

test("partial lift offers both supported directions without needing SET_POSITION", async ({page}) => {
  const card=page.locator("#cover"), open=card.getByRole("button",{name:"Open",exact:true}), close=card.getByRole("button",{name:"Close",exact:true});
  await page.evaluate(()=>window.reportDoor("open",{current_position:45,supported_features:1}));
  await expect(open).toBeVisible();
  await expect(close).toBeHidden();
  await page.evaluate(()=>window.reportDoor("open",{current_position:45,supported_features:3}));
  await expect(close).toBeVisible();
  await expect(card.getByRole("slider")).toBeHidden();
  await open.click();
  expect(await page.evaluate(()=>window.demo.calls)).toEqual([["cover","open_cover",{entity_id:"cover.garage_door"}]]);
  await expect(card.locator(".action")).toHaveText("Opening…");
  await expect(card.locator(".action")).toBeDisabled();
  await expect(card.locator(".extra-open")).toBeHidden();
});

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

test("direct action follows state, survives an early report and never confirms closure", async ({page}) => {
  const card = page.locator("gleam-cover"), scene = card.locator(".scene"), action = card.locator(".action");
  await scene.click();
  await expect(action).toHaveText("Open");
  expect(await page.evaluate(() => window.demo.calls)).toEqual([]);
  await action.click();
  await expect(action).toBeDisabled();
  await expect(action).toHaveText("Opening…");
  expect(await page.evaluate(() => window.demo.calls)).toEqual([["cover","open_cover",{entity_id:"cover.garage_door"}]]);
  await page.evaluate(() => window.reportDoor("open"));
  await expect(card.locator(".state")).toHaveText("Open");
  await expect(action).toHaveText("Opening…");
  await expect(action).toHaveText("Close");
  await action.click();
  await expect(action).toHaveText("Awaiting confirmation");
  await expect(card.locator(".state")).toHaveText("Open");
  await page.evaluate(() => window.reportDoor("closed"));
  await expect(action).toHaveText("Open");
});

test("an unconfirmed open releases controls without claiming success or resending", async ({page}) => {
  const card = page.locator("gleam-cover");
  await page.clock.install();
  await card.locator(".action").click();
  await page.clock.fastForward(7000);
  await expect(card.locator(".action")).toHaveText("Open");
  await expect(card.locator(".hint")).toContainText("still reports closed");
  await expect(card.locator(".state")).toHaveText("Closed");
  expect(await page.evaluate(() => window.demo.calls.length)).toBe(1);
  await page.evaluate(() => window.reportDoor("open"));
  await expect(card.locator(".action")).toHaveText("Close");
  await expect(card.locator(".action")).toBeEnabled();
});

test("a movement acknowledgement is not final confirmation; reconcile the latest state", async ({page}) => {
  const card = page.locator("gleam-cover"), action = card.locator(".action");
  await page.clock.install();
  await action.click();
  await page.evaluate(() => { window.reportDoor("opening"); window.reportDoor("open"); window.reportDoor("closed"); });
  await expect(action).toHaveText("Opening…");
  await page.clock.fastForward(1500);
  await expect(action).toHaveText("Awaiting confirmation");
  await page.clock.fastForward(5000);
  await expect(action).toHaveText("Open");
  await expect(card.locator(".lit-depth")).toHaveAttribute("height","0");
  await expect(card.locator(".state")).toHaveText("Closed");
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
  await expect(card.locator(".action")).toHaveText("Open");
  await expect(card.locator(".lit-depth")).toHaveAttribute("height","0");
});

test("external movement, measured position, unavailable state and failed action", async ({page}) => {
  const card = page.locator("gleam-cover"), button = card.locator(".action");
  await page.evaluate(() => window.reportDoor("opening",{current_position:40}));
  await expect(button).toHaveText("Opening…");
  await expect.poll(async () => Number(await card.locator(".lit-depth").getAttribute("height"))).toBeCloseTo(7, 0);
  await page.evaluate(() => window.reportDoor("unavailable"));
  await expect(button).toBeHidden();
  await expect(card.locator(".panel").first()).toBeHidden();
  await page.evaluate(() => {
    window.reportDoor("closed");
    window.demo.cover.hass = {...window.demo.hass, callService:async () => { throw Error("offline"); }};
  });
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
  await expect(left.locator("h2")).toBeHidden();
  await expect(right.locator("h2")).toBeHidden();
  await right.getByRole("button",{name:"Close right door"}).click();
  await expect(right.locator(".state")).toHaveText("Closing");
  await expect(left.locator(".state")).toHaveText("Closed");
  await left.getByRole("button",{name:"Open left door"}).click();
  expect(await page.evaluate(() => window.demo.calls.map(c=>[c.service,c.data.entity_id]))).toEqual([
    ["close_cover","cover.right_garage"],["open_cover","cover.garage_door"]]);
  await page.getByLabel("Garage layout").selectOption({label:"Compact"});
  expect(await card.evaluate(c=>c.getGridOptions().columns)).toBe(6);
  await expect(bays).toHaveCount(1);
});

test("bay labels overlay the roof space without moving the building or controls", async ({page}) => {
  const card = page.locator("gleam-cover"), bays = card.locator("gleam-cover-bay");
  await page.getByLabel("Garage layout").selectOption({label:"Double"});
  const geometry = () => Promise.all([card,bays.first().locator("svg"),bays.last().locator("svg"),bays.first().locator(".row"),bays.last().locator(".row")].map(el=>el.boundingBox()));
  const original = await geometry();
  await page.evaluate(() => window.demo.cover.setConfig({variant:"double",entity:"cover.garage_door",right_entity:"cover.right_garage",left_label:"Workshop"}));
  const label = card.getByRole("heading",{name:"Workshop"});
  await expect(label).toBeVisible();
  await expect(bays.last().locator("h2")).toBeHidden();
  expect(await geometry()).toEqual(original);
  expect((await bays.first().locator("svg").boundingBox()).y).toBe((await bays.last().locator("svg").boundingBox()).y);
  const pitched = await label.boundingBox();
  await page.evaluate(() => window.demo.cover.setConfig({variant:"double",entity:"cover.garage_door",right_entity:"cover.right_garage",left_label:"Workshop",right_label:"Driveway",roof_type:"flat"}));
  expect((await label.boundingBox()).y).toBeGreaterThan(pitched.y);
  expect(await geometry()).toEqual(original);
  for (const [i,name] of ["Workshop","Driveway"].entries()) {
    const heading = await card.getByRole("heading",{name}).boundingBox();
    const opening = await bays.nth(i).locator(".interior path").boundingBox();
    expect(Math.abs(heading.x+heading.width/2-opening.x-opening.width/2)).toBeLessThan(1);
    expect(heading.y+heading.height).toBeLessThan(opening.y);
  }
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

test("roof editor changes the shared double roof without replacing either door", async ({page}) => {
  await page.evaluate(() => {
    const config = {variant:"double",entity:"cover.garage_door",right_entity:"cover.right_garage"};
    const {cover} = window.demo;
    cover.setConfig(config);
    const editor = document.createElement("gleam-cover-editor");
    editor.setConfig(config);
    editor.addEventListener("config-changed", e => cover.setConfig(e.detail.config));
    document.body.append(editor);
  });
  const roof = page.getByLabel("Roof type"), card = page.locator("gleam-cover");
  await expect(page.locator("gleam-cover-editor details[open]")).toHaveCount(0);
  await page.locator("gleam-cover-editor summary").filter({hasText:"Card appearance"}).click();
  const skin = await card.locator(".door-skin").first().elementHandle();
  await expect(roof).toHaveValue("pitched");
  await roof.selectOption("flat");
  await expect(card.locator("g.flat-shell:visible")).toHaveCount(2);
  await expect(card.locator(".pitched-shell:visible")).toHaveCount(0);
  await roof.selectOption("pitched");
  await expect(card.locator(".flat-shell:visible")).toHaveCount(0);
  expect(await skin.evaluate(el => el.isConnected)).toBe(true);
});

test("one garage temperature slider migrates the old right-only setting and restores amber", async ({page}) => {
  await page.evaluate(() => {
    const editor = document.createElement("gleam-cover-editor");
    editor.setConfig({variant:"double",entity:"cover.left",right_entity:"cover.right",right_light_temperature_kelvin:3123});
    editor.addEventListener("config-changed",e => window.demo.calls.push(e.detail.config));
    document.body.append(editor);
  });
  const editor = page.locator("gleam-cover-editor"), slider = editor.getByRole("slider");
  await editor.locator("summary").filter({hasText:"Garage lighting"}).click();
  await expect(slider).toHaveCount(1);
  await expect(slider).toHaveValue("3123");
  for (const [key,k] of [["End",6500],["Home",2000],["ArrowRight",2001]]) {
    await slider.press(key);
    await expect(editor.locator("#reading")).toHaveText(`${k} K`);
    expect(await page.evaluate(()=>window.demo.calls.at(-1).light_temperature_kelvin)).toBe(k);
  }
  await editor.locator("#custom").uncheck();
  const config = await page.evaluate(()=>window.demo.calls.at(-1));
  expect(config).not.toHaveProperty("right_light_temperature_kelvin");
  expect(config).not.toHaveProperty("light_temperature_kelvin");
});

test("double bay lighting responds to light-only updates without moving either door", async ({page}) => {
  await page.evaluate(() => {
    const {cover,hass} = window.demo;
    cover.setConfig({entity:"cover.garage_door",variant:"double",right_entity:"cover.right_garage",
      light_entity:"light.left",right_light_entity:"light.right",light_temperature_kelvin:2000,right_light_temperature_kelvin:6500});
    window.reportLight = (state,brightness=128) => {cover.hass = {...hass,states:{...hass.states,
      "light.left":{state,attributes:{brightness}}, "light.right":{state:"on",attributes:{}}}}};
    window.reportLight("off");
  });
  const bays = page.locator("gleam-cover-bay"), left = bays.first(), right = bays.last();
  for (const layer of [".interior",".spill",".air"]) {
    await expect(left.locator(layer)).toHaveCSS("opacity","0");
    await expect(right.locator(layer)).toHaveCSS("opacity","1");
  }
  await expect(left.locator(".interior rect")).toHaveCSS("fill","rgb(255, 168, 86)");
  await expect(right.locator("#spill stop").first()).toHaveCSS("stop-color","rgb(255, 168, 86)");
  for (const brightness of [128,0,255]) {
    await page.evaluate(b => window.reportLight("on",b), brightness);
    for (const layer of [".interior",".spill",".air"]) await expect(left.locator(layer)).toHaveCSS("opacity","1");
  }
  await page.evaluate(() => window.reportLight("unavailable"));
  await expect(left.locator(".interior")).toHaveCSS("opacity","0");
  await expect(left.locator(".state")).toHaveText("Closed");
  expect(await page.evaluate(()=>window.demo.calls)).toEqual([]);
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
