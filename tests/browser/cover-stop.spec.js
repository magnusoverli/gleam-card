import {test,expect} from "@playwright/test";

test("Stop interrupts a curtain position request and leaves its measured partial position",async({page})=>{
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption("cover.demo_curtain:center");
  const card=page.locator("#cover"), stop=card.getByRole("button",{name:"Stop",exact:true});
  await expect(stop).toHaveCount(0);
  await page.clock.install();
  await card.getByLabel("Opening position").fill("90");
  await page.clock.fastForward(2000);
  await stop.click();
  const actual=Number(await card.getByLabel("Opening position").inputValue());
  expect(actual).toBeGreaterThan(30);expect(actual).toBeLessThan(90);
  await expect(stop).toHaveCount(0);
  await expect(card.getByRole("button",{name:"Open",exact:true})).toBeEnabled();
  await expect(card.getByRole("button",{name:"Close",exact:true})).toBeEnabled();
  await page.clock.fastForward(16000);
  await expect(card.locator(".lift-value")).toHaveText(`${actual}%`);
  await expect(card.locator(".hint")).toBeEmpty();
  expect(await page.evaluate(()=>window.demo.calls.map(c=>c.service))).toEqual(["set_cover_position","stop_cover"]);
});

test("only the capable moving bay can stop; wait for a report and ignore late replies",async({page})=>{
  await page.goto("/cover/");
  await page.getByLabel("Garage layout").selectOption("Double");
  const card=page.locator("#cover"), stop=card.getByRole("button",{name:"Stop right door"});
  await page.evaluate(()=>{
    const {cover,hass}=window.demo;
    window.report=(state,features=8)=>{
      cover.hass={...hass,states:{
        "cover.garage_door":{state:"closing",attributes:{supported_features:64}},
        "cover.right_garage":{state,attributes:{supported_features:features}}
      },callService:(...args)=>{window.demo.calls.push(args);return new Promise((_,reject)=>window.rejectStop=reject);}};
    };
    window.report("opening");
  });
  await expect(card.getByRole("button",{name:"Stop left door"})).toHaveCount(0);
  await stop.click();
  await expect(card.getByRole("button",{name:"Stopping… right door"})).toBeDisabled();
  expect(await page.evaluate(()=>window.demo.calls)).toEqual([["cover","stop_cover",{entity_id:"cover.right_garage"}]]);
  await page.evaluate(()=>{window.report("open",11);window.rejectStop(Error("late"));});
  await expect(card.getByRole("button",{name:"Close right door"})).toBeEnabled();
  await expect(card.locator(".hint").last()).toBeEmpty();
  await page.evaluate(()=>window.report("unavailable",8));
  await expect(stop).toHaveCount(0);
});

test("unconfirmed Stop can be retried without discarding an ongoing close",async({page})=>{
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption("cover.demo_curtain:center");
  await page.evaluate(()=>{
    const {cover,hass}=window.demo,id="cover.demo_curtain";
    cover.hass={...hass,callService:async(_,service)=>{
      window.demo.calls.push(service);
      if(window.demo.calls.length===2)throw Error("unreachable");
    }};
  });
  const c=page.locator("#cover"),stop=c.getByRole("button",{name:"Stop",exact:true});
  await page.clock.install();
  await c.getByRole("button",{name:"Close",exact:true}).click();
  await stop.click();
  await expect(c.locator(".hint")).toContainText("Stop command failed");
  await stop.click();
  await expect(c.getByRole("button",{name:"Stopping…"})).toBeDisabled();
  await page.clock.fastForward(5100);
  await expect(stop).toBeEnabled();
  await expect(c.locator(".hint")).toContainText("Stop not confirmed");
  expect(await page.evaluate(()=>window.demo.calls)).toEqual(["close_cover","stop_cover","stop_cover"]);
});
