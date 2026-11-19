import {test,expect} from "@playwright/test";

const entity="cover.demo_curtain", styles=["center","left_to_right","right_to_left"];
test.beforeEach(async({page})=>{
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption(`${entity}:center`);
});

test("curtain editor changes the draw at 30% without replacing the window or commanding the motor",async({page})=>{
  const card=page.locator("#cover"), editor=page.locator("gleam-cover-editor");
  const image=await card.locator(".window-view").elementHandle();
  await page.evaluate(entity=>{
    const e=document.createElement("gleam-cover-editor");
    e.setConfig({entity,cover_type:"curtain",name:"Curtains",window_aspect_ratio:"portrait"});
    e.addEventListener("config-changed",event=>{
      window.edited=event.detail.config;
      window.demo.cover.setConfig(window.edited);
    });
    document.body.append(e);
  },entity);
  await expect(editor.getByLabel("Opening direction")).toBeHidden();
  const left=card.locator(".gather-left"),right=card.locator(".gather-right");
  await editor.getByLabel("Panels").selectOption("single");
  await expect(left).toBeHidden();
  await expect(right).toBeVisible();
  await editor.getByLabel("Opening direction").selectOption("right_to_left");
  await expect(right).toBeHidden();
  await expect(left).toBeVisible();
  await expect(card.getByRole("slider",{name:"Opening position"})).toHaveValue("30");
  expect(await page.evaluate(()=>window.edited)).toMatchObject({curtain_opening:"right_to_left",window_aspect_ratio:"portrait",name:"Curtains"});
  await editor.getByLabel("Panels").selectOption("center");
  await expect(right).toBeVisible();
  expect(await page.evaluate(()=>window.edited)).not.toHaveProperty("curtain_opening");
  expect(await image.evaluate(el=>el.isConnected)).toBe(true);
  expect(await page.evaluate(()=>window.demo.calls)).toEqual([]);
});

test("the panel edges gather against the correct jamb across positions and aspect ratios",async({page})=>{
  const card=page.locator("#cover");
  for(const style of styles){
    await page.getByLabel("Example").selectOption(`${entity}:${style}`);
    for(const ratio of ["landscape","portrait","square"]){
      await card.evaluate((c,[entity,curtain_opening,window_aspect_ratio])=>{
        c.setConfig({entity,cover_type:"curtain",curtain_opening,window_aspect_ratio});
      },[entity,style,ratio]);
      for(const position of [0,50,100]){
        const {left,right}=await card.evaluate(async(c,[id,p])=>{
          const {hass}=window.demo;
          c.hass={...hass,states:{[id]:{state:p?"open":"closed",attributes:{supported_features:7,current_position:p}}}};
          await new Promise(requestAnimationFrame);
          const root=c.shadowRoot.querySelector("gleam-cover-bay").shadowRoot;
          const pane=root.querySelector("foreignObject").getBoundingClientRect();
          const edges=selector=>{
            const rect=root.querySelector(selector).getBoundingClientRect();
            return rect.width ? [(rect.left-pane.left)/pane.width,(rect.right-pane.left)/pane.width] : null;
          };
          return {left:edges(".gather-left"),right:edges(".gather-right")};
        },[entity,position]);
        const width=(style==="center"?.5:1)*(1-.88*position/100);
        if(style==="left_to_right")expect(left).toBeNull();
        else { expect(left[0]).toBeCloseTo(0,1); expect(left[1]).toBeCloseTo(width,1); }
        if(style==="right_to_left")expect(right).toBeNull();
        else { expect(right[0]).toBeCloseTo(1-width,1); expect(right[1]).toBeCloseTo(1,1); }
      }
    }
  }
});

test("a closed single curtain has visible fabric folds across the whole pane in either direction",async({page})=>{
  const card=page.locator("#cover");
  for(const curtain_opening of ["left_to_right","right_to_left"]){
    await card.evaluate((c,[entity,curtain_opening])=>{
      c.setConfig({entity,cover_type:"curtain",curtain_opening,window_aspect_ratio:"square"});
      c.hass={...window.demo.hass,states:{[entity]:{state:"closed",attributes:{current_position:0,supported_features:7}}}};
    },[entity,curtain_opening]);
    await expect(card.locator(".curtain-fabric")).toHaveAttribute("transform","scale(1 1)");
    const png=await card.locator("foreignObject").screenshot();
    const contrasts=await page.evaluate(async data=>{
      const image=new Image(); image.src=`data:image/png;base64,${data}`; await image.decode();
      const canvas=document.createElement("canvas"); canvas.width=image.width; canvas.height=1;
      const ctx=canvas.getContext("2d");
      ctx.drawImage(image,0,Math.floor(image.height/2),image.width,1,0,0,image.width,1);
      // Each interior third should contain both a fold highlight and a shadow.
      return [.05,.35,.65].map(start=>{
        const row=ctx.getImageData(Math.floor(image.width*start),0,Math.floor(image.width*.3),1).data;
        const reds=row.filter((_,i)=>i%4===0);
        return Math.max(...reds)-Math.min(...reds);
      });
    },png.toString("base64"));
    expect(Math.min(...contrasts),curtain_opening).toBeGreaterThan(25);
  }
});

test("curtains validate opening styles and respect state-only and unavailable devices",async({page})=>{
  const card=page.locator("#cover");
  for(const extra of [{curtain_opening:"sideways"},{variant:"double"}]){
    await expect(card.evaluate((c,extra)=>c.setConfig({entity:"cover.demo_curtain",cover_type:"curtain",...extra}),extra)).rejects.toThrow();
  }
  const report=state=>card.evaluate((c,state)=>{
    const {hass}=window.demo;
    c.hass={...hass,states:{"cover.demo_curtain":{state,attributes:{supported_features:3}}}};
  },state);
  await report("closed");
  await expect(card.getByRole("slider")).toHaveCount(0);
  await expect(card.getByRole("button",{name:"Open",exact:true})).toBeVisible();
  await report("opening");
  await expect(card.locator(".state")).toHaveText("Opening");
  await report("unavailable");
  await expect(card.locator(".curtain-panels")).toBeHidden();
  await expect(card.getByRole("button")).toHaveCount(0);
});

test("all demo draws use the same non-inverted position command; the exposed photo stays still",async({page})=>{
  const card=page.locator("#cover");
  await page.getByLabel("Curtain layout").selectOption("Compact");
  await page.clock.install();
  for (const style of styles){
    await page.getByLabel("Example").selectOption(`${entity}:${style}`);
    await card.evaluate((c,[entity,curtain_opening])=>{
      c.setConfig({entity,cover_type:"curtain",curtain_opening,variant:"compact",window_image:"/docs/images/cover.png"});
      return c.shadowRoot.querySelector("gleam-cover-bay").shadowRoot.querySelector("img").decode();
    },[entity,style]);
    const slider=card.getByRole("slider",{name:"Opening position"});
    await slider.fill("60");
    await page.clock.fastForward(10000);
    await expect(card.locator(".lift-value")).toHaveText("60%");
    const pane=await card.locator(".window-view").boundingBox();
    // Sample well inside the exposed area, away from antialiased fabric edges.
    const x=style==="center"?.57:style==="left_to_right"?.25:.75;
    const clip={x:Math.round(pane.x+pane.width*x),y:Math.round(pane.y+pane.height*.24),width:4,height:12};
    const before=await page.screenshot({clip});
    await slider.fill("90");
    await page.clock.fastForward(1500);
    expect(await page.screenshot({clip})).toEqual(before);
    await page.clock.fastForward(8500);
    await expect(card.locator(".lift-value")).toHaveText("90%");
  }
  expect(await page.evaluate(()=>window.demo.calls)).toEqual(styles.flatMap(()=>[60,90].map(position=>({
    domain:"cover",service:"set_cover_position",data:{entity_id:entity,position}
  }))));
});
