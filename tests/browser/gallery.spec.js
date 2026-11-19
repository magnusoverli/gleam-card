import {test,expect} from "@playwright/test";

test("gallery links open isolated demos and old bookmarks still work", async ({page}) => {
  await page.goto("/");
  for (const [slug,name] of [["energy-graph","Energy Graph"],["thermostat","Thermostat"],["cover","Cover"]]) {
    await page.locator(`.tile[href="./${slug}/"]`).click();
    await expect(page.getByRole("heading",{name,exact:true,level:1})).toBeVisible();
    await expect(page.locator("#cards > :is(gleam-energy-graph,gleam-thermostat,gleam-cover)")).toHaveCount(1);
    await page.getByRole("link",{name:"All cards"}).click();
  }
  await page.goto("/#garage-layout");
  await expect(page).toHaveURL(/\/cover\/$/);
  await page.getByLabel("Garage layout").selectOption({label:"Double"});
  await expect(page.getByRole("button",{name:"Close right door"})).toBeVisible();
});

test("cover layouts use the same responsive Sections grid", async ({page}) => {
  await page.goto("/cover/");
  const card = page.locator("#cover"), layout = page.getByLabel("Garage layout");
  const section = await page.locator("#cards").boundingBox();
  expect(section.width).toBeLessThanOrEqual(500);
  for (const [name, width] of [["Normal",section.width],["Compact",(section.width-8)/2],["Double",section.width]]) {
    await layout.selectOption({label:name});
    const rect = await card.boundingBox();
    expect(rect.width).toBeCloseTo(width,0);
    expect(rect.x).toBeCloseTo(section.x,0);
  }
});
