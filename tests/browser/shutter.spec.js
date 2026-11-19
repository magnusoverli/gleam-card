import {test,expect} from "@playwright/test";

test("fabric opacity validation belongs to the roller shade only",async({page})=>{
  await page.goto("/cover/");
  await page.locator("#cover").waitFor();
  const result=await page.evaluate(()=>["shade","blind","shutter"].map(cover_type=>{
    try {
      window.demo.cover.setConfig({entity:"cover.demo_shutter",cover_type,shade_opacity:101});
      return "accepted";
    } catch(error) { return error.message; }
  }));
  expect(result).toEqual(["Shade opacity must be a whole percentage from 0 to 100.","accepted","accepted"]);
});

test("both lift buttons use the layout size rather than stretching with the card", async ({page})=>{
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption("cover.demo_shutter");
  const card=page.locator("#cover");
  for (const [layout,width,buttonWidth,buttonHeight] of [["Normal",415,76,36],["Compact",178,64,32],["Compact",415,64,32]]) {
    await page.getByLabel("Shutter layout").selectOption(layout);
    await card.evaluate((el,w)=>{el.style.width=`${w}px`;},width);
    const buttons=card.locator(".actions button:visible");
    await expect(buttons).toHaveCount(2);
    for(const button of await buttons.all()){
      const {width:w,height:h}=await button.boundingBox();
      expect(w).toBe(buttonWidth);
      expect(h).toBe(buttonHeight);
    }
  }
});

test("shutter travels as a rigid curtain and confirms a requested partial lift",async({page})=>{
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption("cover.demo_shutter");
  await page.getByLabel("Shutter layout").selectOption("Compact");
  const card=page.locator("#cover"), curtain=card.locator(".shutter-curtain");
  await expect(card.locator(".lift-value")).toHaveText("35%");
  const offset=()=>curtain.evaluate(el=>el.transform.baseVal.numberOfItems ? el.transform.baseVal.getItem(0).matrix.f : 0);
  await expect.poll(offset).toBeCloseTo(-44.1);
  const retained=await curtain.elementHandle();
  await expect(card.getByRole("slider")).toHaveCount(1);
  await page.clock.install();
  await card.getByRole("slider",{name:"Lift position"}).fill("85");
  await page.clock.fastForward(2500);
  expect(await offset()).toBeCloseTo(-75.6,0);
  expect(await curtain.evaluate(el=>el.getAttribute("transform")===el.closest("svg").querySelector(".shade-rail").getAttribute("transform"))).toBe(true);
  await page.clock.fastForward(2600);
  await expect(card.locator(".lift-value")).toHaveText("85%");
  expect(await retained.evaluate(el=>el.isConnected)).toBe(true);
  expect(await page.evaluate(()=>window.demo.calls)).toEqual([{domain:"cover",service:"set_cover_position",data:{entity_id:"cover.demo_shutter",position:85}}]);
});
