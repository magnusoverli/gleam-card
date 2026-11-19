import {test,expect} from "@playwright/test";

test("mounting side changes which surface is visible from the room",async({page})=>{
  await page.goto("/cover/");
  const card=page.locator("#cover");
  for(const kind of ["shutter","blind","shade","curtain"]){
    const entity=`cover.demo_${kind}`;
    await card.evaluate((c,id)=>{
      c.hass={...window.demo.hass,states:{[id]:{state:"closed",attributes:{current_position:0,current_tilt_position:0}}}};
    },entity);
    const configure=side=>card.evaluate((c,[entity,kind,side])=>c.setConfig({entity,cover_type:kind,mounting_side:side,
      glazing_bar_color:"#ff0000",glazing_bar_width:8,window_aspect_ratio:"portrait",cover_color:"#009933"}),[entity,kind,side]);
    await configure(undefined);
    const bars=await card.locator(".glazing-bars").elementHandle(), photo=await card.locator("foreignObject").elementHandle();
    for(const side of ["inside","outside","inside"]){
      await configure(side);
      // Sample the middle of the vertical bar away from edges, slat seams and the center of the curtain.
      const pane=await photo.boundingBox();
      const png=await page.screenshot({clip:{x:Math.floor(pane.x+pane.width/2+1),y:Math.floor(pane.y+pane.height*.3),width:1,height:1}});
      const isRed=await page.evaluate(async data=>{
        const img=new Image();img.src=`data:image/png;base64,${data}`;await img.decode();
        const ctx=document.createElement("canvas").getContext("2d");ctx.drawImage(img,0,0);
        const [r,g,b]=ctx.getImageData(0,0,1,1).data;
        return r>230 && g<30 && b<30;
      },png.toString("base64"));
      expect(isRed,`${kind}: ${side}`).toBe(side==="outside");
      expect(await bars.evaluate(el=>el.isConnected)).toBe(true);
    }
  }
  expect(await page.evaluate(()=>window.demo.calls)).toEqual([]);
});

test("the editor round-trips outside, restores inside, and excludes garage",async({page})=>{
  await page.goto("/cover/");
  await page.locator("#cover").waitFor();
  await page.evaluate(()=>{
    const e=document.createElement("gleam-cover-editor");
    e.setConfig({entity:"cover.demo_blind",cover_type:"blind",mounting_side:"outside"});
    e.addEventListener("config-changed",event=>window.edited=event.detail.config);
    document.body.append(e);
  });
  const e=page.locator("gleam-cover-editor"), side=e.getByLabel("Mounting side");
  await e.locator("summary").filter({hasText:"Card appearance"}).click();
  await expect(side).toHaveValue("outside");
  await side.selectOption("inside");
  expect(await page.evaluate(()=>window.edited)).not.toHaveProperty("mounting_side");
  await side.selectOption("outside");
  expect(await page.evaluate(()=>window.edited.mounting_side)).toBe("outside");
  await e.getByLabel("Cover type").selectOption("garage");
  await expect(side).toBeHidden();
  expect(await page.evaluate(()=>window.edited)).not.toHaveProperty("mounting_side");
  await expect(page.locator("#cover").evaluate(c=>c.setConfig({cover_type:"shade",entity:"cover.demo_shade",mounting_side:"left"}))).rejects.toThrow(/inside or outside/);
});
