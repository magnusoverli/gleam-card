import { test, expect } from "@playwright/test";

test("an 8×8 Light preview batches beam edits and retains its fixtures", async ({ page }) => {
  await page.goto("/light/");
  await page.getByLabel("Example").selectOption("dense");
  const card = page.locator("#light");
  await card.scrollIntoViewIfNeeded();
  await expect(card.locator(".pools ellipse").last()).toHaveAttribute("rx", /.+/);
  const metrics = await card.evaluate(async light => {
    const config = { rows: 8, columns: 8, zones: [{ entity: "light.kitchen_counter" }] };
    light.setConfig(config);
    const editor = light.constructor.getConfigElement();
    editor.setConfig(config);
    document.body.append(editor);
    const beam = editor.shadowRoot.querySelector("#beam"), fixtures = light.shadowRoot.querySelector(".fixtures");
    const first = fixtures.firstElementChild, frame = () => new Promise(requestAnimationFrame);
    let emissions = 0;
    editor.addEventListener("config-changed", e => {
      emissions++;
      light.setConfig(e.detail.config);
      editor.setConfig(e.detail.config);
    });
    const start = performance.now();
    for (let angle = 20; angle <= 100; angle += 5) {
      beam.value = String(angle);
      beam.dispatchEvent(new Event("input", { bubbles: true }));
    }
    const inputCpuMs = performance.now() - start;
    await frame(); await frame();
    editor.remove();
    return { inputCpuMs, toPreviewFrameMs: performance.now() - start, emissions,
      retained: first === fixtures.firstElementChild, fixtures: fixtures.childElementCount };
  });
  expect(metrics).toMatchObject({ emissions: 1, retained: true, fixtures: 64 });
  console.log("Light editor preview (retained SVG)", metrics);
});

test("curtain batches reports on retained fabric and suspends off-screen",async({page})=>{
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption("cover.demo_curtain:center");
  const bay=page.locator("#cover gleam-cover-bay");
  await expect(bay.locator(".curtain-fabric")).toHaveAttribute("transform",/scale/);
  const metrics=await bay.evaluate(async b=>{
    const {cover,hass}=window.demo, id="cover.demo_curtain", fabric=b.shadowRoot.querySelector(".curtain-fabric");
    let writes=0;
    const count=new MutationObserver(records=>writes+=records.length);
    count.observe(fabric,{attributes:true});
    const start=performance.now();
    for(let i=1;i<=50;i++)cover.hass={...hass,states:{[id]:{state:"open",attributes:{supported_features:7,current_position:i}}}};
    const cpuMs=performance.now()-start;
    await new Promise(requestAnimationFrame);
    writes+=count.takeRecords().length;
    count.disconnect();
    return {cpuMs,toFrameMs:performance.now()-start,writes,reused:fabric===b.shadowRoot.querySelector(".curtain-fabric"),idle:b.frame===0};
  });
  expect(metrics).toMatchObject({writes:1,reused:true,idle:true});
  console.log("Curtain (retained SVG)",metrics);
  await bay.evaluate(b=>{
    const {cover,hass}=window.demo;
    cover.style.marginTop="3000px"; window.scrollTo(0,0);
    cover.hass={...hass,states:{"cover.demo_curtain":{state:"opening",attributes:{supported_features:3,current_position:50}}}};
  });
  await expect.poll(()=>bay.evaluate(b=>!b.visible && b.frame===0)).toBe(true);
  await bay.evaluate(b=>{const c=window.demo.cover;c.remove();if(b.frame || b.timer)throw Error("Active after disconnect");document.body.append(c);});
  await bay.scrollIntoViewIfNeeded();
  await expect.poll(()=>bay.evaluate(b=>b.visible && b.frame!==0)).toBe(true);
});

test("window cover footer mutations during position reports",async({page})=>{
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption("cover.demo_shade");
  const metrics=await page.evaluate(()=>{
    const {cover,hass}=window.demo,id="cover.demo_shade",bay=cover.shadowRoot.querySelector("gleam-cover-bay");
    const observer=new MutationObserver(()=>{});
    observer.observe(bay.shadowRoot.querySelector(".detail"),{attributes:true,childList:true,subtree:true});
    const report=p=>{cover.hass={...hass,states:{[id]:{...hass.states[id],attributes:{...hass.states[id].attributes,current_position:p}}}};};
    const start=performance.now();
    for(let i=1;i<=50;i++)report(i);
    const changed=observer.takeRecords().length;
    for(let i=0;i<50;i++)report(50);
    const unchanged=observer.takeRecords().length;
    observer.disconnect();
    return {changed,unchanged,cpuMs:performance.now()-start};
  });
  console.log("window footer:",metrics);
  expect(metrics.changed).toBeGreaterThan(0);
  expect(metrics.unchanged).toBe(0);
});

test("blind batches lift and tilt on retained slats and goes idle", async ({page})=>{
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption("cover.demo_blind");
  await expect(page.locator("#cover .shade-rail")).toHaveAttribute("transform","translate(0 0)");
  const metrics=await page.evaluate(async()=>{
    const {cover,hass}=window.demo, id="cover.demo_blind", bay=cover.shadowRoot.querySelector("gleam-cover-bay");
    const slat=bay.shadowRoot.querySelector(".slats rect"), start=performance.now();
    for(let i=1;i<=50;i++)cover.hass={...hass,states:{[id]:{state:"open",attributes:{current_position:i,current_tilt_position:100-i,supported_features:131}}}};
    const cpuMs=performance.now()-start;
    await new Promise(requestAnimationFrame);
    return {cpuMs,toFrameMs:performance.now()-start,reused:slat===bay.shadowRoot.querySelector(".slats rect")};
  });
  console.log("Slatted blind (SVG)",metrics);
  expect(metrics.reused).toBe(true);
  await expect.poll(()=>page.locator("#cover gleam-cover-bay").evaluate(b=>b.frame)).toBe(0);
});

test("shade reuses its fabric and frame scheduler across measured-position updates", async ({page}) => {
  await page.goto("/cover/");
  await page.getByLabel("Example").selectOption("cover.demo_shade");
  const cloth = page.locator("#cover .shade-cloth");
  await expect(cloth).toHaveAttribute("transform",/scale\(1 0\.6\)/);
  const result = await page.evaluate(async ()=>{
    const {cover,hass} = window.demo, entity = hass.states["cover.demo_shade"];
    const bay = cover.shadowRoot.querySelector("gleam-cover-bay"), fabric = bay.shadowRoot.querySelector(".shade-cloth");
    const start = performance.now();
    for(let i=1;i<=50;i++) cover.hass = {...hass,states:{"cover.demo_shade":{...entity,attributes:{...entity.attributes,current_position:i}}}};
    const cpuMs = performance.now()-start;
    await new Promise(requestAnimationFrame);
    return {cpuMs,updateToFrameMs:performance.now()-start,reused:fabric===bay.shadowRoot.querySelector(".shade-cloth"),idle:bay.frame===0};
  });
  expect(result.reused && result.idle).toBe(true);
  await expect(cloth).toHaveAttribute("transform",/scale\(1 0\.5\)/);
  console.log("roller shade (retained SVG)",result);
});

test("garage retains panels and suspends long travel off-screen and on disconnect", async ({ page }, info) => {
  await page.goto("/dev/fixture.html");
  const card = page.locator("gleam-cover");
  await card.scrollIntoViewIfNeeded();
  await expect.poll(() => card.locator("gleam-cover-bay").evaluate(b => b.visible)).toBe(true);
  const result = await page.evaluate(async () => {
    const { cover,hass } = window.demo;
    const bay = cover.shadowRoot.querySelector("gleam-cover-bay"), panel = bay.shadowRoot.querySelector(".panel");
    const frame = () => new Promise(resolve => requestAnimationFrame(resolve));
    cover.setConfig({entity:"cover.garage_door",travel_seconds:40});
    const start = performance.now();
    cover.hass = {...hass,states:{"cover.garage_door":{state:"opening",attributes:{supported_features:3}}}};
    const updateCpuMs = performance.now()-start;
    await frame();
    return { updateCpuMs, interactionToFrameMs:performance.now()-start,
      reused:bay.shadowRoot.querySelector(".panel")===panel, position:bay.p };
  });
  expect(result.reused).toBe(true);
  expect(result.position).toBeGreaterThan(0);
  expect(result.position).toBeLessThan(.1);
  await page.evaluate(() => { window.demo.cover.style.marginTop="3000px"; window.scrollTo(0,0); });
  await expect.poll(() => card.locator("gleam-cover-bay").evaluate(b => b.frame)).toBe(0);
  await page.evaluate(() => { const c=window.demo.cover; c.remove(); document.body.append(c); });
  await card.scrollIntoViewIfNeeded();
  await expect(card.locator(".state")).toHaveText("Opening");
  await expect(card.locator(".panel")).toHaveCount(6);
  console.log(`${info.project.name} cover (SVG): ${JSON.stringify(result)}`);
});

test("cached graph ignores Recorder-only live states but updates the current-hour reading immediately", async ({ page }) => {
  await page.goto("/dev/fixture.html");
  await page.waitForFunction(() => window.demo?.energy._targets?.length > 5);
  const result = await page.evaluate(async () => {
    const { energy, hass, requests } = window.demo;
    const settle = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    const now = Date.now;
    const time = now();
    Date.now = () => time;
    try {
      await energy._refresh(); await settle();
      const frame = energy._renderer.info.render.frame, count = requests.length;
      const states = { ...hass.states };
      for (const id of ["sensor.power", "sensor.voltage", "sensor.total_energy"]) {
        states[id] = { ...states[id], state: "300" };
        energy.hass = { ...hass, states: { ...states } };
      }
      await energy._refresh(); await settle();
      const skipped = frame === energy._renderer.info.render.frame && requests.length === count;
      states["sensor.current_hour_energy"] = { ...states["sensor.current_hour_energy"], state: "1.23" };
      energy.hass = { ...hass, states };
      const reading = energy.shadowRoot.querySelector(".live").textContent;
      await settle();
      return { skipped, reading, frames: energy._renderer.info.render.frame - frame };
    } finally { Date.now = now; }
  });
  expect(result).toEqual({ skipped: true, reading: "1.23", frames: 1 });
});

test("compact thermostat limits pixel allocation, DOM writes and off-screen startup", async ({ page }) => {
  await page.goto("/dev/fixture.html");
  await page.waitForFunction(() => window.demo);
  const card = page.locator("#compact");
  await page.evaluate(() => {
    const card = document.createElement("gleam-thermostat");
    card.id = "compact"; card.style.marginTop = "3000px";
    card.setConfig({ entity: "climate.heat_pump", card_height: 180, card_max_width: 350 });
    card.hass = window.demo.hass; document.body.append(card);
  });
  await expect(card.locator(".value")).toHaveText("22");
  await expect(card.locator("canvas")).toHaveCount(0);
  await card.scrollIntoViewIfNeeded();
  const ratio = () => card.locator("canvas").evaluate(canvas =>
    canvas.width / (canvas.getBoundingClientRect().width * Math.min(devicePixelRatio, 1.75)));
  await expect.poll(ratio).toBeCloseTo(1, 1);
  const writes = await card.evaluate(c => {
    const root = c.shadowRoot, { hass } = window.demo, id = c._config.entity;
    const observer = new MutationObserver(() => {});
    observer.observe(root, { attributes: true, childList: true, subtree: true });
    const state = hass.states[id], change = attributes => { c.hass = { ...hass, states: { ...hass.states,
      [id]: { ...state, attributes: { ...state.attributes, ...attributes } } } }; };
    change({ hvac_action: "idle" });
    const irrelevant = observer.takeRecords().length;
    change({ current_temperature: 21 });
    const ambientOnly = observer.takeRecords().every(r => r.target.matches(".ambient"));
    const slider = root.querySelector("#target");
    slider.value = "23"; slider.dispatchEvent(new Event("input")); observer.takeRecords();
    for (let i = 0; i < 20; i++) slider.dispatchEvent(new Event("input"));
    const repeat = observer.takeRecords().length;
    observer.disconnect();
    return { irrelevant, ambientOnly, repeat, commands: window.demo.calls.length };
  });
  expect(writes).toEqual({ irrelevant: 0, ambientOnly: true, repeat: 0, commands: 0 });
  await expect(card.locator(".ambient")).toHaveText("Room 21 °C");
  await expect(card.locator(".dial")).toHaveAttribute("aria-valuetext", "23 °C preview");
  await card.locator("summary").click();
  await expect.poll(ratio).toBeCloseTo(1, 1);
  await card.evaluate(c => c.setConfig({ ...c._config, content_overflow: "scroll" }));
  await expect.poll(ratio).toBeCloseTo(1, 1);
});

test("week graph batches strokes and refreshes history with overlap", async ({ page }, info) => {
  await page.goto("/dev/fixture.html");
  await page.waitForFunction(() => window.demo?.energy._targets?.length > 5);
  const result = await page.evaluate(async () => {
    const { energy: card, hass } = window.demo;
    const H = 3600000, now = Date.now, hour = Math.floor(now() / H) * H;
    let time = hour + H / 2, calls = [];
    Date.now = () => time;
    try {
      const sample = (from, to, step, row) => Array.from({ length: Math.floor(to / step) - Math.floor(from / step) + 1 },
        (_, i) => row((Math.floor(from / step) + i) * step));
      card.hass = { ...hass, callWS: async q => {
        calls.push(q);
        const from = Date.parse(q.start_time), to = Date.parse(q.end_time);
        if (q.statistic_ids) return { [q.statistic_ids[0]]: sample(from, to, H, t =>
          ({ start: t, state: t / H + (t === hour && time > hour + H / 2 ? .1 : 0) })) };
        return Object.fromEntries(q.entity_ids.map(id => [id, sample(from, to,
          id === "sensor.electricity_price" ? H / 4 : 60000, t =>
            ({ lu: t / 1000, s: String(50 + Math.sin(t / H)) }))]));
      } };
      card._enabled.power = card._enabled.voltage = true;
      card.setConfig({ ...card._config, hours_to_show: 168, future_hours: 0, refresh_interval: 3600 });
      const frame = () => new Promise(r => requestAnimationFrame(r));
      await frame(); await frame();
      const draws = card._renderer.info.render.calls, memory = { ...card._renderer.info.memory };
      const initialGroups = calls.filter(q => q.entity_ids).map(q => q.entity_ids);
      const history = card._history["sensor.power"], stats = card._stats.at(-1).state;
      const times = [];
      for (let i = 0; i < 25; i++) {
        const t = performance.now(); card._build(); times.push(performance.now() - t);
      }
      times.sort((a, b) => a - b);
      // Pick a projected power stroke by its instance index.
      const mesh = card._targets.find(o => o.userData.tips?.[0]?.startsWith("Power"));
      const instance = Math.floor(mesh.count / 2), matrix = mesh.matrix.clone();
      mesh.getMatrixAt(instance, matrix);
      const center = mesh.position.clone().setFromMatrixPosition(matrix).applyMatrix4(mesh.matrixWorld).project(card._camera);
      card._raycaster.setFromCamera(center, card._camera);
      const pick = card._raycaster.intersectObject(mesh).some(hit => hit.instanceId === instance && mesh.userData.tips[hit.instanceId]);
      calls = []; time += 60000;
      await card._refresh(); await frame();
      const q = calls.find(q => q.entity_ids);
      const retained = card._history["sensor.power"].includes(history[100]);
      const historyWindowMs = time - Date.parse(q.start_time), corrected = card._stats.at(-1).state > stats;
      // A long pause/reconnect must pick up the missing window, including older corrections.
      card.remove(); time += 2 * H; calls = []; document.querySelector("#cards").prepend(card);
      while (!calls.some(q => q.entity_ids)) await frame();
      const resumedWindow = time - Date.parse(calls.find(q => q.entity_ids).start_time);
      return { draws, memory, initialGroups, incrementalIds: q.entity_ids, historyWindowMs,
        retained, corrected, resumedWindow, pick, updateCpuMs: {median: times[12], p95: times[23]} };
    } finally { Date.now = now; }
  });
  expect(result.initialGroups).toEqual([["sensor.electricity_price", "sensor.power", "sensor.voltage"]]);
  expect(result.incrementalIds).toEqual(result.initialGroups[0]);
  expect(result.historyWindowMs).toBe(120000);
  expect(result.resumedWindow).toBe(169 * 3600000);
  expect(result.pick && result.retained && result.corrected).toBe(true);
  expect(result.draws).toBeLessThan(3500);
  console.log(`${info.project.name} week: ${JSON.stringify(result)}`);
});

test("energy updates reuse GPU resources and release them on disconnect", async ({ page }, info) => {
  await page.goto("/dev/fixture.html");
  await expect.poll(() => page.evaluate(() => window.demo?.energy._targets?.length ?? 0)).toBeGreaterThan(0);
  const result = await page.evaluate(async () => {
    const card = window.demo.energy;
    const resources = () => {
      const geometries = new Set(), materials = new Set(), textures = new Set();
      card._scene.traverse(object => {
        if (object.geometry && !object.isSprite) geometries.add(object.geometry);
        for (const material of [object.material].flat().filter(Boolean)) {
          materials.add(material);
          if (material.map) textures.add(material.map);
        }
      });
      return { geometries, materials, textures };
    };
    const now = Date.now;
    const time = now();
    Date.now = () => time;
    try {
      card._build();
      const before = resources(), times = [];
      const firstBar = card._targets.filter(object => object.geometry?.type === "BoxGeometry").at(-1);
      const oldHeight = firstBar.scale.y;
      // Change actual chart data, not just rerender the same state.
      const last = card._stats.length - 1;
      card._stats[last] = { ...card._stats[last], state: Number(card._stats[last].state) + .1 };
      for (let i = 0; i < 40; i++) {
        const start = performance.now();
        card._build();
        times.push(performance.now() - start);
      }
      const frame = () => new Promise(resolve => requestAnimationFrame(resolve));
      await frame();
      const beforeFrames = card._renderer.info.render.frame;
      const spacingStart = performance.now();
      card.setConfig({ ...card._config, dataset_spacing: 2 });
      await frame();
      const spacingUpdate = {
        interactionToFrameMs: performance.now() - spacingStart,
        frames: card._renderer.info.render.frame - beforeFrames,
      };
      const after = resources();
      const reused = Object.keys(before).every(kind =>
        before[kind].size === after[kind].size && [...before[kind]].every(item => after[kind].has(item)));
      const draws = card._renderer.info.render.calls;
      const dataUpdated = firstBar.scale.y !== oldHeight;
      const memory = { ...card._renderer.info.memory };
      const disposed = new Map();
      for (const set of Object.values(after)) for (const item of set) {
        item.addEventListener("dispose", () => disposed.set(item, (disposed.get(item) ?? 0) + 1));
      }
      card.remove();
      const releasedOnce = Object.values(after).every(set => [...set].every(item => disposed.get(item) === 1));
      document.querySelector("#cards").prepend(card);
      times.sort((a, b) => a - b);
      return { reused, releasedOnce, dataUpdated, draws, memory, spacingUpdate,
        updateCpuMs: { median: times[20], p95: times[38] } };
    } finally {
      Date.now = now;
    }
  });
  expect(result.reused).toBe(true);
  expect(result.releasedOnce).toBe(true);
  expect(result.dataUpdated).toBe(true);
  expect(result.spacingUpdate.frames).toBe(1);
  await expect(page.locator("gleam-energy-graph canvas")).toHaveCount(1);
  await expect.poll(() => page.evaluate(() => window.demo.energy._renderer.info.render.frame)).toBeGreaterThan(0);
  await page.screenshot({ path: info.outputPath("cards.png"), fullPage: true });
  await info.attach("energy-performance", { body: JSON.stringify(result, null, 2), contentType: "application/json" });
  console.log(`${info.project.name} energy: ${JSON.stringify(result)}`);
});

test("thermostat batches interaction, retains buffers and suspends off-screen graphics", async ({ page }, info) => {
  await page.goto("/dev/fixture.html");
  await page.locator("gleam-thermostat").scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.demo?.thermostat._dial?.fraction)).toBeGreaterThan(0);
  const result = await page.evaluate(async () => {
    const card = window.demo.thermostat;
    const frame = () => new Promise(resolve => requestAnimationFrame(resolve));
    await frame();
    const geometry = card._dial.ring.geometry;
    const positions = geometry.getAttribute("position");
    const before = card._renderer.info.render.frame;
    const start = performance.now();
    for (let i = 0; i < 100; i++) {
      card._draft = 20 + i / 100;
      card._drawDial();
    }
    await frame();
    const interactionToFrameMs = performance.now() - start;
    const frames = card._renderer.info.render.frame - before;
    const reused = geometry === card._dial.ring.geometry && positions === geometry.getAttribute("position");
    const memory = { ...card._renderer.info.memory };
    const draws = card._renderer.info.render.calls;
    const endpoint = [
      positions.getX(120), positions.getY(120), positions.getZ(120),
    ];
    return { frames, reused, interactionToFrameMs, memory, draws, endpoint };
  });
  expect(result.frames).toBe(1);
  expect(result.reused).toBe(true);

  // Use real IntersectionObserver delivery, not a manually changed visibility flag.
  await page.evaluate(() => { window.demo.thermostat.style.marginTop = "3000px"; window.scrollTo(0, 0); });
  await expect.poll(() => page.evaluate(() => window.demo.thermostat._visible)).toBe(false);
  const hiddenFrames = await page.evaluate(async () => {
    const card = window.demo.thermostat;
    const before = card._renderer.info.render.frame;
    card._draft = 26;
    card._drawDial();
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    return card._renderer.info.render.frame - before;
  });
  expect(hiddenFrames).toBe(0);
  await page.locator("gleam-thermostat").scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.demo.thermostat._dial.fraction)).toBeCloseTo(10 / 14);
  await page.locator("gleam-thermostat").screenshot({ path: info.outputPath("thermostat.png") });
  expect(await page.evaluate(() => window.demo.calls.length)).toBe(0);
  await info.attach("thermostat-performance", { body: JSON.stringify(result, null, 2), contentType: "application/json" });
  console.log(`${info.project.name} thermostat: ${JSON.stringify(result)}`);
});
