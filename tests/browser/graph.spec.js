import { expect, test } from "@playwright/test";
import { loadCardBundle } from "./load-card-bundle.js";

test("Graph only requests selected sensors and preserves independent readouts and camera controls", async ({page})=>{
  await loadCardBundle(page);
  await page.evaluate(()=>{
    const graph = document.createElement("gleam-graph"), now = Date.now();
    window.requests = [];
    const state = (state,unit) => ({state,last_updated:new Date(now).toISOString(),attributes:{unit_of_measurement:unit}});
    window.client = {states:{"sensor.a":state("0","°C"),"sensor.b":state("1012","hPa")},async callWS(req) {
      window.requests.push(req);
      return Object.fromEntries(req.entity_ids.map(id=>[id,Array.from({length:6},(_,i)=>({
        lu:(now-(6-i)*3600000)/1000,s:String(id === "sensor.a" ? i-3 : 1008+i),
      }))]));
    }};
    window.cfg = {series:[{entity:"sensor.a",name:"Outside",plot:"step"},{entity:"sensor.b",name:"Pressure",plot:"bar",visible:false}]};
    graph.hass=window.client;graph.setConfig(window.cfg);document.body.append(graph);
  });
  const g=page.locator("gleam-graph");
  await expect(g.locator("canvas")).toBeVisible();
  await expect(g.locator(".kpi strong")).toHaveText(["0","1,012"]);
  expect(await page.evaluate(()=>window.requests.map(r=>r.entity_ids))).toEqual([["sensor.a"]]);
  await g.getByRole("button",{name:"Pressure"}).click();
  await expect.poll(()=>page.evaluate(()=>window.requests.map(r=>r.entity_ids))).toEqual([["sensor.a"],["sensor.b"]]);
  await expect.poll(()=>g.evaluate(g=>g.view.targets.some(o=>o.userData.tip?.includes("hPa")))).toBe(true);
  await g.getByRole("button",{name:"Front",exact:true}).click();
  await expect(g.getByRole("button",{name:"Front",exact:true})).toHaveAttribute("aria-pressed","true");
  await g.evaluate(g=>g.setConfig({...window.cfg,lock_navigation:true,title:"Garden",dataset_spacing:0}));
  await expect(g.locator("canvas")).toHaveCSS("touch-action","auto");
  await expect(g.getByRole("button",{name:"Pressure"})).toHaveAttribute("aria-pressed","true");
  expect(await page.evaluate(()=>window.requests.length)).toBe(2);
  await g.evaluate(g=>g.hass={...window.client,states:{...window.client.states,"sensor.a":{state:"unavailable",attributes:{unit_of_measurement:"°C"}}}});
  await expect(g.locator(".kpi strong").first()).toHaveText("—");
});

test("Graph editor adds, configures, reorders and removes series while preserving unrelated YAML",async({page})=>{
  await loadCardBundle(page);
  await page.evaluate(()=>{
    const Graph=customElements.get("gleam-graph"),editor=Graph.getConfigElement();
    window.edits=[];
    editor.setConfig({type:"custom:gleam-graph",grid_options:{columns:6},series:[{entity:"sensor.a"}]});
    editor.addEventListener("config-changed",e=>{window.edits.push(e.detail.config);editor.setConfig(structuredClone(e.detail.config));});
    document.body.append(editor);
  });
  const e=page.locator("gleam-graph-editor"),s=e.getByRole("group",{name:"Series 2"});
  await e.getByRole("button",{name:"Add series"}).click();
  await s.getByLabel("Sensor",{exact:true}).fill("sensor.b");
  expect(await page.evaluate(()=>window.edits)).toEqual([]);
  await s.getByLabel("Sensor",{exact:true}).press("Tab");
  await s.getByRole("combobox",{name:"Plot",exact:true}).selectOption("bar");
  await s.getByRole("combobox",{name:"Bar aggregation"}).selectOption("max");
  await s.getByRole("button",{name:"Move up"}).click();
  expect(await page.evaluate(()=>window.edits.at(-1))).toMatchObject({grid_options:{columns:6},series:[
    {entity:"sensor.b",plot:"bar",aggregate:"max"},{entity:"sensor.a"},
  ]});
  await s.getByRole("button",{name:"Remove"}).click();
  expect(await page.evaluate(()=>window.edits.at(-1).series.length)).toBe(1);
});

test("Graph keeps readouts and editor controls usable when WebGL is unavailable",async({page})=>{
  await page.addInitScript(()=>{
    const get=HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext=function(kind,...args) {
      return kind==="webgl2" ? null : get.call(this,kind,...args);
    };
  });
  await page.goto("/graph/");
  const g=page.locator("gleam-graph");
  await expect(g.locator(".notice")).toContainText("WebGL 2");
  await expect(g.locator(".kpi strong").first()).not.toHaveText("—");
  await g.getByRole("button",{name:"Outdoors"}).click();
  await expect(g.getByRole("button",{name:"Outdoors"})).toHaveAttribute("aria-pressed","false");
});
