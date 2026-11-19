import {test,expect} from "@playwright/test";

test("each window covering takes a base color and restores its original artwork",async({page})=>{
  await page.goto("/cover/");
  const card=page.locator("#cover");
  for(const kind of ["shade","blind","shutter","curtain"]){
    const entity=`cover.demo_${kind}`;
    await card.evaluate((c,[entity,kind])=>{
      const {hass}=window.demo;
      c.hass={...hass,states:{[entity]:{state:"closed",attributes:{current_position:0,current_tilt_position:0}}}};
      c.setConfig({entity,cover_type:kind});
    },[entity,kind]);
    const pane=card.locator("foreignObject");
    const recolor=color=>card.evaluate((c,[entity,kind,color])=>{
      c.setConfig({entity,cover_type:kind,cover_color:color});
    },[entity,kind,color]);
    const sample=async()=>page.evaluate(async png=>{
      const image=new Image(); image.src=`data:image/png;base64,${png}`; await image.decode();
      const c=document.createElement("canvas"); c.width=image.width;c.height=image.height;
      const ctx=c.getContext("2d");ctx.drawImage(image,0,0);
      const {data}=ctx.getImageData(0,0,c.width,c.height);
      let red=0,r=0,g=0,b=0;
      for(let i=0;i<data.length;i+=4){
        r+=data[i];g+=data[i+1];b+=data[i+2];
        if(data[i]-data[i+1]>45 && data[i]-data[i+2]>45)red++;
      }
      return [red,r,g,b].map(n=>n/(c.width*c.height));
    },(await pane.screenshot()).toString("base64"));
    const original=await sample();
    await recolor("#cc3030");
    expect((await sample())[0],kind).toBeGreaterThan(.8);
    await recolor(undefined);
    const restored=await sample();
    expect(restored[0],kind).toBe(0);
    for(let i=1;i<=3;i++)expect(Math.abs(restored[i]-original[i]),`${kind} restored`).toBeLessThan(2);
    await expect(recolor("red")).rejects.toThrow(/six-digit hex/);
  }
});

test("the editor shares the color across windows, resets it, and omits it for garages",async({page})=>{
  await page.goto("/cover/");
  await page.locator("#cover").waitFor();
  await page.evaluate(()=>{
    const e=document.createElement("gleam-cover-editor");
    e.setConfig({entity:"cover.demo_shade",cover_type:"shade",shade_opacity:60,cover_color:"#ffeedd"});
    e.addEventListener("config-changed",event=>window.edited=event.detail.config);
    document.body.append(e);
  });
  const e=page.locator("gleam-cover-editor");
  await e.locator("summary").filter({hasText:"Card appearance"}).click();
  const toggle=e.getByLabel("Customize cover base color"), picker=e.getByLabel("Cover base color",{exact:true});
  await expect(toggle).toBeChecked();
  await expect(picker).toHaveValue("#ffeedd");
  await picker.fill("#123456");
  expect(await page.evaluate(()=>window.edited)).toMatchObject({cover_color:"#123456",shade_opacity:60});
  await e.getByLabel("Cover type").selectOption("curtain");
  expect(await page.evaluate(()=>window.edited.cover_color)).toBe("#123456");
  await toggle.uncheck();
  await expect(picker).toBeDisabled();
  expect(await page.evaluate(()=>window.edited)).not.toHaveProperty("cover_color");
  await toggle.check();
  await e.getByLabel("Cover type").selectOption("garage");
  await expect(picker).toBeHidden();
  expect(await page.evaluate(()=>window.edited)).not.toHaveProperty("cover_color");
});
