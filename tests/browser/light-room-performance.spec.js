import {test, expect} from "@playwright/test";
import {loadCardBundle} from "./load-card-bundle.js";

test("room furnishings move independently without rebuilding the room or changing light controls", async ({page}) => {
  await loadCardBundle(page);
  const sample = await page.evaluate(async () => {
    const card = document.createElement("gleam-light"), entity = "light.living_room";
    const config = {zones:[{entity}], rows:8, columns:8};
    const calls = [];
    card.setConfig(config);
    card.hass = {states:{[entity]:{state:"on", attributes:{brightness:200, supported_color_modes:["brightness"]}}},
      callService:async (...args) => calls.push(args)};
    card.preview = true;
    document.body.append(card);
    const root = card.shadowRoot, svg = root.querySelector("svg.room");
    const frame = () => new Promise(requestAnimationFrame);
    await frame();
    const visible = kind => [...svg.querySelectorAll(`.wall-${kind}`)].filter(el => el.getBoundingClientRect().width > 0)
      .map(el => el.dataset.wall).sort();
    const defaults = [visible("window"), visible("tv"), visible("couch")];
    const old = [...svg.querySelectorAll("*")], start = performance.now();
    const placements = [];
    for (const wall of ["left", "back", "right"]) {
      const windows = ["left", "back", "right"].filter(other => other !== wall);
      card.setConfig({...config, windows, tv_wall:wall, couch_wall:wall});
      placements.push([visible("window"), visible("tv"), visible("couch")]);
    }
    const cpuMs = performance.now() - start;
    await frame();
    const toFrameMs = performance.now() - start;
    card.setConfig({...config, windows:[]});
    const cleared = [visible("window"), visible("tv"), visible("couch")];
    const nodes = [...svg.querySelectorAll("*")];
    const beforeAction = calls.length;
    root.querySelector(".zone button").click();
    return {defaults, placements, cleared, retained:old.length === nodes.length && old.every((el,i) => el === nodes[i]),
      beforeAction, calls, fixtures:svg.querySelector(".fixtures").childElementCount, cpuMs, toFrameMs};
  });
  expect(sample).toMatchObject({defaults:[["right"], [], []], cleared:[[], [], []], retained:true,
    fixtures:64, beforeAction:0, calls:[["light","turn_off",{entity_id:"light.living_room"}]]});
  for (const [i, wall] of ["left", "back", "right"].entries())
    expect(sample.placements[i]).toEqual([["back","left","right"].filter(other => other !== wall), [wall], [wall]]);
  console.log("Light room (retained SVG, three placement edits)", {cpuMs:sample.cpuMs, toFrameMs:sample.toFrameMs});
});
