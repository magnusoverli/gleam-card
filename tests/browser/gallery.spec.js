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
  await expect(page.getByRole("button",{name:"right door controls"})).toBeVisible();
});
