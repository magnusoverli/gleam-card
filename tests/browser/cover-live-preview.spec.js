import { expect, test } from "@playwright/test";

async function openPreview(page, options = {entity:"cover.demo_shade",cover_type:"shade"}) {
  await page.goto("/dev/fixture.html");
  await page.locator("#cover").waitFor();
  await page.evaluate(options => {
    const {cover,hass} = window.demo;
    const editor = customElements.get("gleam-cover").getConfigElement();
    const config = {travel_seconds:10,grid_options:{columns:6},...options};
    document.body.replaceChildren(cover,editor);
    editor.style.cssText = "display:block;max-height:45vh;overflow:auto";
    editor.hass = cover.hass = hass;
    editor.setConfig(config);
    cover.setConfig(config);
    window.changes = [];
    window.invalidReports = 0;
    editor.shadowRoot.addEventListener("invalid", () => window.invalidReports++, true);
    editor.addEventListener("config-changed", ({detail}) => {
      window.changes.push(detail.config);
      cover.setConfig(detail.config);
      editor.setConfig(structuredClone(detail.config));
    });
  }, options);
  const editor = page.locator("gleam-cover-editor");
  await editor.locator("summary").filter({hasText:"Card appearance"}).click();
  return {editor,card:page.locator("#cover")};
}

test("name previews before blur while entity and image drafts stay local", async ({page}) => {
  const {editor,card} = await openPreview(page);
  await editor.evaluate(el => {
    const root = el.shadowRoot;
    for (const [id,value] of [["entity","cover."],["window-image","/local/unfinished"]]) {
      const field = root.getElementById(id);
      field.value = value;
      field.dispatchEvent(new Event("input",{bubbles:true}));
    }
    const name = root.getElementById("name");
    name.focus();
    name.value = "  North shade  ";
    name.setSelectionRange(7,7);
    name.dispatchEvent(new Event("input",{bubbles:true}));
  });
  await expect(card.getByRole("heading",{name:"North shade"})).toBeVisible();
  const name = editor.getByLabel("Display name");
  await expect(name).toBeFocused();
  await expect(name).toHaveValue("  North shade  ");
  expect(await name.evaluate(el => el.selectionStart)).toBe(7);
  await expect(editor.locator("#entity")).toHaveValue("cover.");
  await expect(editor.locator("#window-image")).toHaveValue("/local/unfinished");
  await expect(card.locator(".window-view")).not.toHaveAttribute("src",/.+/);
  await name.dispatchEvent("change");
  expect(await page.evaluate(() => window.changes)).toEqual([{
    entity:"cover.demo_shade",cover_type:"shade",name:"North shade",travel_seconds:10,grid_options:{columns:6},
  }]);
  expect(await page.evaluate(() => window.invalidReports)).toBe(0);
  expect(await page.evaluate(() => window.demo.calls)).toEqual([]);
});

test("slider and color picker update visible artwork once per frame before release", async ({page}) => {
  const {editor,card} = await openPreview(page);
  expect(await editor.evaluate(el => {
    for (const [id,value] of [["bar-color","#119944"],["shade-opacity","53"],["shade-opacity","28"]]) {
      const field = el.shadowRoot.getElementById(id);
      field.value = value;
      field.dispatchEvent(new Event("input",{bubbles:true}));
    }
    return window.changes.length;
  })).toBe(0);
  await expect(card.locator(".shade-cloth")).toHaveCSS("opacity","0.28");
  await expect(card.locator(".glazing-bars")).toHaveCSS("stroke","rgb(17, 153, 68)");
  await expect(editor.locator("#opacity-reading")).toHaveText("28%");
  await editor.locator("#bar-color").dispatchEvent("change");
  await editor.locator("#shade-opacity").dispatchEvent("change");
  expect(await page.evaluate(() => window.changes)).toHaveLength(1);
  expect(await page.evaluate(() => window.demo.calls)).toEqual([]);
});

test("a duplicate door commit stays pending while labels preview and a second commit repairs the pair", async ({page}) => {
  const left = "cover.garage_door", right = "cover.right_garage";
  const {editor,card} = await openPreview(page,{entity:left,right_entity:right,variant:"double"});
  const second = editor.getByLabel("Right door entity");
  await second.fill(left);
  await second.press("Tab");
  await expect(editor.getByRole("alert")).toContainText("Both doors use the same cover entity");
  expect(await page.evaluate(() => window.changes)).toEqual([]);
  await editor.getByLabel("Left door label").fill("Workshop");
  await expect(card.getByRole("heading",{name:"Workshop"})).toBeVisible();
  expect(await page.evaluate(() => window.changes.at(-1))).toMatchObject({entity:left,right_entity:right});
  const first = editor.getByLabel("Left door entity");
  await first.fill(right);
  await expect(editor.getByRole("alert")).toBeHidden();
  expect(await page.evaluate(() => window.changes)).toHaveLength(1);
  await first.press("Tab");
  const changes = await page.evaluate(() => window.changes);
  expect(changes).toHaveLength(2);
  expect(changes[1]).toMatchObject({entity:right,right_entity:left,left_label:"Workshop",variant:"double"});
  expect(changes[1]).not.toHaveProperty("right_travel_seconds");
  expect(await page.evaluate(() => window.demo.calls)).toEqual([]);
});

test("valid travel time previews without blur, freezing the right-door default, or reporting an invalid draft", async ({page}) => {
  const {editor} = await openPreview(page,{entity:"cover.garage_door",right_entity:"cover.right_garage",variant:"double"});
  await editor.locator("summary").filter({hasText:"Cover movement"}).click();
  const time = editor.locator("#seconds");
  await time.fill("0");
  expect(await page.evaluate(() => [window.changes.length,window.invalidReports])).toEqual([0,0]);
  await time.fill("12.5");
  await expect(time).toBeFocused();
  await expect(editor.locator("#travel-summary")).toHaveText("Left: 12.5 s · Right: 12.5 s");
  const changes = await page.evaluate(() => window.changes);
  expect(changes).toHaveLength(1);
  expect(changes[0].travel_seconds).toBe(12.5);
  expect(changes[0]).not.toHaveProperty("right_travel_seconds");
  await time.press("Tab");
  expect(await page.evaluate(() => window.changes)).toHaveLength(1);
});

test("an external replacement or disconnect cancels the queued preview", async ({page}) => {
  const {editor,card} = await openPreview(page);
  await editor.evaluate(async el => {
    const field = el.shadowRoot.getElementById("shade-opacity");
    const queue = value => {
      field.value = value;
      field.dispatchEvent(new Event("input",{bubbles:true}));
    };
    queue("15");
    const external = {entity:"cover.demo_shade",cover_type:"shade",name:"External",shade_opacity:70};
    window.demo.cover.setConfig(external);
    el.setConfig(external);
    await new Promise(requestAnimationFrame);
    queue("35");
    el.remove();
    await new Promise(requestAnimationFrame);
  });
  await expect(card.getByRole("heading",{name:"External"})).toBeVisible();
  await expect(card.locator(".shade-cloth")).toHaveCSS("opacity","0.7");
  expect(await page.evaluate(() => window.changes)).toEqual([]);
});
