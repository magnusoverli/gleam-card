import {test,expect} from "@playwright/test";

test("request a partial lift once; bottom slats ride the rail while top slats stay deployed",async({page})=>{
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption("cover.demo_blind");
  const card=page.locator("#cover"), lift=card.getByRole("slider",{name:"Lift position"});
  await page.clock.install();
  const slats=card.locator(".slats rect");
  await expect(slats.nth(1)).toHaveAttribute("y","31");
  await lift.fill("50");
  await page.clock.fastForward(5200);
  await expect(card.locator(".state")).toHaveText("Open · 50% open");
  expect(await page.evaluate(()=>window.demo.calls)).toEqual([{domain:"cover",service:"set_cover_position",data:{entity_id:"cover.demo_blind",position:50}}]);
  await expect(slats.nth(1)).toHaveAttribute("y","31");
  const y=i=>slats.nth(i).getAttribute("y").then(Number);
  expect(await y(13)-await y(12)).toBe(1);
  await lift.press("Home");
  await page.clock.fastForward(5200);
  await expect(card.locator(".state")).toHaveText("Closed · 0% open");
  expect(await y(13)-await y(12)).toBe(9);
});

test("a configured tilt transition passes through intermediate angles without changing lift",async({page})=>{
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption("cover.demo_blind");
  await page.clock.install();
  await page.evaluate(()=>window.demo.cover.setConfig({entity:"cover.demo_blind",cover_type:"blind",tilt_seconds:4}));
  const card=page.locator("#cover"), slat=card.locator(".slats rect").first();
  await card.getByRole("slider",{name:/Slat tilt/}).press("End");
  await page.clock.fastForward(2000);
  // Halfway from 50% to 100% tilt: projected slat height at 75%.
  expect(Number(await slat.getAttribute("height"))).toBeCloseTo(1+8*Math.cos(.75*Math.PI/2),1);
  await page.clock.fastForward(2100);
  expect(Number(await slat.getAttribute("height"))).toBeCloseTo(1);
  await expect(card.locator(".shade-rail")).toHaveAttribute("transform","translate(0 0)");
});

test("blind tilt changes slats without moving the lift; commands respect each capability",async({page})=>{
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption("cover.demo_blind");
  const card=page.locator("#cover"), slat=card.locator(".slats rect").first(), rail=card.locator(".shade-rail");
  await expect(card.locator(".state")).toHaveText("Closed · 0% open");
  await expect(rail).toHaveAttribute("transform","translate(0 0)");
  const initialHeight=await slat.getAttribute("height"), initialRail=await rail.getAttribute("transform");
  await card.getByRole("slider",{name:/Slat tilt/}).press("End");
  await expect.poll(async()=>Number(await slat.getAttribute("height"))).toBeCloseTo(1);
  expect(Number(initialHeight)).toBeGreaterThan(1);
  expect(await rail.getAttribute("transform")).toBe(initialRail);
  expect(await page.evaluate(()=>window.demo.calls)).toEqual([{domain:"cover",service:"set_cover_tilt_position",data:{entity_id:"cover.demo_blind",tilt_position:100}}]);
  await page.evaluate(()=>{
    const {cover,hass}=window.demo;
    window.blindReport=(state,flags)=>{cover.hass={...hass,states:{"cover.demo_blind":{state,attributes:{supported_features:flags,current_position:60}}},
      callService:async(...args)=>window.demo.calls.push(args)}};
    window.blindReport("open",32);
  });
  await expect(card.locator(".state")).toHaveText("Open · 60% open");
  await expect(card.getByRole("slider")).toBeHidden();
  await expect(card.locator(".action")).toBeHidden();
  await expect(card.getByRole("button")).toHaveCount(1);
  await card.getByRole("button",{name:"Close slats"}).click();
  expect(await page.evaluate(()=>window.demo.calls.at(-1))).toEqual(["cover","close_cover_tilt",{entity_id:"cover.demo_blind"}]);
  await page.evaluate(()=>window.blindReport("unavailable",255));
  await expect(card.getByRole("button")).toHaveCount(0);
  await expect(slat).toBeHidden();
});
