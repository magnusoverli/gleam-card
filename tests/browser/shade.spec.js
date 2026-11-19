import {test,expect} from "@playwright/test";

test("window pixels remain stable at the end of opening with a photo", async ({page}) => {
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption("cover.state_only_shade");
  const card = page.locator("#cover"), scene = card.locator(".scene");
  await page.clock.install();
  await page.evaluate(()=>{
    const {cover,hass} = window.demo, id="cover.state_only_shade";
    cover.style.width="178px";
    cover.setConfig({entity:id,cover_type:"shade",variant:"compact",window_image:"/docs/images/cover.png",shade_opacity:65});
    window.reportEnd = state => {cover.hass = {...hass,states:{[id]:{state,last_changed:new Date().toISOString(),attributes:{supported_features:3}}},
      callService:async()=>window.reportEnd("opening")}};
    window.reportEnd("closed");
  });
  await card.locator(".action").click();
  const moving = await card.boundingBox();
  await page.clock.fastForward(6000);
  const pane = await card.locator(".window-view").boundingBox();
  const exposed = {x:Math.ceil(pane.x+4), y:Math.ceil(pane.y+pane.height*.65),width:Math.floor(pane.width-8),height:Math.floor(pane.height*.25)};
  const during = await page.screenshot({clip:exposed});
  await page.clock.fastForward(4100);
  await expect(card.locator(".shade-cloth")).toHaveAttribute("transform",/scale\(1 0\)/);
  await expect(card.locator(".action")).toHaveText("Awaiting confirmation");
  const sceneBefore = await scene.boundingBox();
  const before = await scene.screenshot();
  const awaiting = await card.boundingBox();
  await page.evaluate(()=>window.reportEnd("open"));
  await expect(card.locator(".action")).toHaveText("Close");
  expect([awaiting.height,(await card.boundingBox()).height]).toEqual([moving.height,moving.height]);
  expect(await scene.boundingBox()).toEqual(sceneBefore);
  const after = await scene.screenshot();
  const pixelDifference = async (a,b) => page.evaluate(async images=>{
    const pixels = await Promise.all(images.map(async base64=>{
      const img = new Image(); img.src = `data:image/png;base64,${base64}`; await img.decode();
      const c=document.createElement("canvas"); c.width=img.width; c.height=img.height;
      const ctx=c.getContext("2d"); ctx.drawImage(img,0,0);
      return ctx.getImageData(0,0,c.width,c.height).data;
    }));
    let changed=0;
    for (let i=0;i<pixels[0].length;i+=4)
      if ([0,1,2].some(k=>Math.abs(pixels[0][i+k]-pixels[1][i+k])>3)) changed++;
    return changed/(pixels[0].length/4);
  },[a,b].map(buffer=>buffer.toString("base64")));
  expect(await pixelDifference(before,after)).toBeLessThan(.001);
  expect(await pixelDifference(during,await page.screenshot({clip:exposed}))).toBeLessThan(.001);
});

test("sparse opening feedback does not leave fabric over the photo until the final report", async ({page}) => {
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption("cover.state_only_shade");
  const card = page.locator("#cover"), cloth = card.locator(".shade-cloth");
  await page.clock.install();
  await page.evaluate(()=>{
    const {cover,hass} = window.demo, id = "cover.state_only_shade";
    cover.setConfig({cover_type:"shade",entity:id,travel_seconds:10,shade_opacity:55,window_image:"/docs/images/cover.png"});
    window.shadeReport = (state,p) => {cover.hass = {...hass,states:{[id]:{state,attributes:{supported_features:3,current_position:p}}},callService:async()=>{}}};
    window.shadeReport("closed",0);
  });
  const image = await card.locator(".window-view").elementHandle();
  await card.getByRole("button",{name:"Open",exact:true}).click();
  await page.clock.fastForward(4000);
  await page.evaluate(()=>window.shadeReport("opening",40));
  await page.clock.fastForward(5000);
  const transform = await cloth.getAttribute("transform");
  expect(Number(transform.match(/scale\(1 ([\d.]+)\)/)[1])).toBeCloseTo(.1,1);
  await expect(card.locator(".state")).toHaveText("Opening · 40% open");
  await page.evaluate(()=>window.shadeReport("open",100));
  await page.clock.fastForward(1100);
  await expect(cloth).toHaveAttribute("transform",/scale\(1 0\)/);
  expect(await image.evaluate(el=>el.isConnected)).toBe(true);
});

test("photo picker uploads to HA, saves the served URL and preserves it on a failed replacement", async ({page}) => {
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption("cover.demo_shade");
  await page.evaluate(()=>{
    const editor = document.createElement("gleam-cover-editor");
    editor.setConfig({entity:"cover.demo_shade",cover_type:"shade"});
    editor.hass = {...window.demo.hass, fetchWithAuth:(url,init)=>fetch(url,init)};
    editor.addEventListener("config-changed",e=>window.demo.cover.setConfig(e.detail.config));
    document.body.append(editor);
  });
  let posts = 0;
  await page.route("**/api/image/upload", route=>{
    expect(route.request().method()).toBe("POST");
    expect(route.request().postDataBuffer().toString()).toContain('name="file"; filename="garden.png"');
    return route.fulfill(++posts === 1 ? {json:{id:"demo123"}} : {status:413});
  });
  await page.locator("gleam-cover-editor summary").filter({hasText:"Card appearance"}).click();
  const file = {name:"garden.png",mimeType:"image/png",buffer:Buffer.from([137,80,78,71])};
  const picker = page.getByLabel("Add window photo"), photo = page.locator("#cover .window-view");
  await picker.setInputFiles(file);
  await expect(photo).toHaveAttribute("src","/api/image/serve/demo123/original");
  await picker.setInputFiles(file);
  await expect(page.getByText("This photo is too large.",{exact:false})).toBeVisible();
  await expect(photo).toHaveAttribute("src","/api/image/serve/demo123/original");
});

test("editor sets and clears the stationary view behind the window", async ({page}) => {
  let requests = 0;
  await page.route("**/local/garden.svg",route=>{
    requests++;
    return route.fulfill({contentType:"image/svg+xml",body:'<svg xmlns="http://www.w3.org/2000/svg" width="100" height="80"><rect width="100" height="80" fill="green"/></svg>'});
  });
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption("cover.demo_shade");
  await page.evaluate(()=>{
    const editor = document.createElement("gleam-cover-editor");
    editor.setConfig({entity:"cover.demo_shade",cover_type:"shade"});
    editor.addEventListener("config-changed",e=>window.demo.cover.setConfig(e.detail.config));
    document.body.append(editor);
  });
  await page.locator("gleam-cover-editor summary").filter({hasText:"Card appearance"}).click();
  const field = page.getByLabel(/Window view image/), image = page.locator("#cover .window-view");
  await field.fill("/local/garden.svg"); await field.press("Tab");
  await expect(image).toHaveAttribute("src","/local/garden.svg");
  await editorSlider("window_image_zoom").press("End");
  await editorSlider("window_image_x").press("Home");
  await editorSlider("window_image_y").press("End");
  function editorSlider(key) { return page.locator(`gleam-cover-editor #${key}`); }
  await expect(image).toHaveCSS("object-position","0% 100%");
  await expect(image).toHaveCSS("transform","matrix(3, 0, 0, 3, 0, 0)");
  const bars = page.locator("#cover .glazing-bars");
  await expect(bars).toHaveCSS("stroke-width","3px");
  await editorSlider("bar-width").press("Home");
  await expect(bars).toHaveCSS("stroke-width","0px");
  await editorSlider("bar-color").fill("#995533");
  await editorSlider("bar-width").press("End");
  await expect(bars).toHaveCSS("stroke-width","10px");
  await expect(bars).toHaveCSS("stroke","rgb(153, 85, 51)");
  await expect.poll(()=>requests).toBe(1);
  const positionInWindow = () => image.evaluate(el=>{
    const box=el.getBoundingClientRect(), scene=el.closest("svg").getBoundingClientRect();
    return [box.x-scene.x,box.y-scene.y,box.width,box.height].map(Math.round);
  });
  const bounds = await positionInWindow();
  await page.locator("#cover .action").click();
  await expect(page.locator("#cover .state")).toContainText("Closing");
  expect(await positionInWindow()).toEqual(bounds);
  await field.fill(""); await field.press("Tab");
  await expect(image).not.toHaveAttribute("src",/.*/);
});

test("fabric opacity changes independently of the rail and measured position", async ({page}) => {
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption("cover.demo_shade");
  await page.evaluate(()=>{
    const editor = document.createElement("gleam-cover-editor");
    editor.setConfig({entity:"cover.demo_shade",cover_type:"shade",shade_opacity:64});
    editor.addEventListener("config-changed",e=>window.demo.cover.setConfig(e.detail.config));
    document.body.append(editor);
  });
  await page.locator("gleam-cover-editor summary").filter({hasText:"Card appearance"}).click();
  const slider = page.getByRole("slider",{name:/Fabric opacity/}), card = page.locator("#cover");
  await expect(slider).toHaveValue("64");
  for (const [key,opacity] of [["ArrowRight","0.65"],["Home","0"],["End","1"]]) {
    await slider.press(key);
    await expect(card.locator(".shade-cloth")).toHaveCSS("opacity",opacity);
    await expect(card.locator(".shade-rail")).toHaveCSS("opacity","1");
    await expect(card.locator(".state")).toHaveText("Open · 40% open");
  }
});

test("early endpoint feedback does not skip a ten-second shade movement in either direction", async ({page}) => {
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption("cover.demo_shade");
  const card = page.locator("#cover"), cloth = card.locator(".shade-cloth");
  await page.clock.install();
  await page.evaluate(()=>{
    const {cover,hass} = window.demo, id = "cover.demo_shade";
    const report = (state,percent) => {
      cover.hass = {...hass,states:{[id]:{state,attributes:{supported_features:3,current_position:percent}}},
        callService:async (_,service)=>{
          const open = service === "open_cover";
          report(open?"opening":"closing",open?0:100);
          report(open?"open":"closed",open?100:0);
        }};
    };
    report("closed",0);
  });
  for(const [button,status,scale] of [["Open","Open · 100% open",0],["Close","Closed · 0% open",1]]) {
    await card.getByRole("button",{name:button,exact:true}).click();
    await expect(card.locator(".state")).toHaveText(status);
    await page.clock.fastForward(5000);
    const transform = await cloth.getAttribute("transform");
    expect(Number(transform.match(/scale\(1 ([\d.]+)\)/)[1])).toBeCloseTo(.5,1);
    await page.clock.fastForward(5100);
    await expect(cloth).toHaveAttribute("transform",new RegExp(`scale\\(1 ${scale}\\)`));
  }
});

test("roller shade distinguishes measured, state-only and unavailable feedback", async ({page}) => {
  await page.goto("/cover/");
  const demo = page.getByLabel("Example"), card = page.locator("#cover");
  await demo.selectOption("cover.demo_shade");
  await expect(card.locator(".state")).toHaveText("Open · 40% open");
  await expect(card.locator(".shade-cloth")).toHaveAttribute("transform",/scale\(1 0\.6\)/);
  await expect(card.locator(".door-skin")).toHaveCount(0);
  await page.getByLabel("Shade layout").selectOption({label:"Compact"});
  expect(await card.evaluate(el=>el.getGridOptions().columns)).toBe(6);
  await demo.selectOption("cover.state_only_shade");
  await expect(card.locator(".state")).toHaveText("Closed");
  await card.getByRole("button",{name:"Open",exact:true}).click();
  await expect(card.locator(".state")).toHaveText("Opening");
  expect(await page.evaluate(()=>window.demo.calls.map(c=>[c.service,c.data.entity_id]))).toEqual([["open_cover","cover.state_only_shade"]]);
  await demo.selectOption("cover.offline_shade");
  await expect(card.locator(".state")).toHaveText("Unavailable");
  await expect(card.locator(".shade-cloth")).toBeHidden();
  await expect(card.locator(".action")).toBeHidden();
});

test("editor switches Double to a supported shade layout without exposing garage settings", async ({page}) => {
  await page.goto("/cover/");
  await page.locator("#cover").waitFor();
  await page.evaluate(()=>{
    const editor = document.createElement("gleam-cover-editor");
    editor.setConfig({entity:"cover.demo_shade",variant:"double",right_entity:"cover.right_garage",roof_type:"flat"});
    editor.hass = window.demo.hass;
    editor.addEventListener("config-changed",e=>window.demo.calls.push(e.detail.config));
    document.body.append(editor);
  });
  const editor = page.locator("gleam-cover-editor");
  await expect(editor.getByLabel("Cover type")).toHaveValue("garage");
  await expect(editor.locator("#suggestion")).toContainText("Roller shade");
  await editor.getByLabel("Cover type").selectOption("shade");
  await expect(editor.getByLabel("Layout")).toHaveValue("normal");
  await expect(editor.getByLabel("Right door entity")).toBeHidden();
  await expect(editor.getByText("Garage lighting")).toBeHidden();
  expect(await page.evaluate(()=>window.demo.calls.at(-1))).toEqual({entity:"cover.demo_shade",cover_type:"shade",travel_seconds:10});
});
