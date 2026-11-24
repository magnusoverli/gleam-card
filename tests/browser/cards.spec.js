import { test, expect } from "@playwright/test";

test("bundle renders both cards, camera and series controls work, reconnects cleanly", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/dev/fixture.html");
  await expect(page.locator("gleam-energy-graph canvas")).toBeVisible();
  await page.locator("gleam-thermostat").scrollIntoViewIfNeeded();
  await expect(page.locator("gleam-thermostat canvas")).toBeVisible();
  await expect(page.locator("gleam-energy-graph .live")).toHaveText("0.84");
  await page.getByRole("button", { name: "Front", exact: true }).click();
  await expect(page.getByRole("button", { name: "Front", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Power", exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.demo.requests.some(r => r.entity_ids?.includes("sensor.power")))).toBe(true);
  expect(await page.evaluate(() => window.demo.calls)).toEqual([]);
  await page.evaluate(() => {
    const { energy, thermostat } = window.demo;
    energy.remove(); thermostat.remove();
    document.querySelector("#cards").append(energy, thermostat);
  });
  await expect(page.locator("gleam-energy-graph canvas")).toHaveCount(1);
  await page.locator("gleam-thermostat").scrollIntoViewIfNeeded();
  await expect(page.locator("gleam-thermostat canvas")).toHaveCount(1);
  expect(await page.evaluate(() => window.customCards.map(c => c.type))).toEqual(["gleam-energy-graph", "gleam-thermostat", "gleam-cover", "gleam-light"]);
  expect(errors).toEqual([]);
});

test("translucent bars and price fills composite back-to-front from either side", async ({ page }) => {
  await page.goto("/dev/fixture.html");
  await expect.poll(() => page.evaluate(() => window.demo?.energy?._targets?.some(o =>
    o.userData.tip?.startsWith("Recorded price")))).toBe(true);
  const drawOrders = () => page.evaluate(() => {
    const { _targets, _renderer, _scene, _camera, _controls } = window.demo.energy;
    const draws = [];
    for (const obj of _targets) {
      const tip = obj.userData.tip;
      if (tip?.startsWith("Energy") || tip?.startsWith("Recorded price"))
        obj.onBeforeRender = () => draws.push(tip.startsWith("Energy") ? "energy" : "price");
    }
    return [8, -8].map(z => {
      _camera.position.copy(_controls.target);
      _camera.position.x += 9; _camera.position.y += 6; _camera.position.z += z;
      _camera.lookAt(_controls.target);
      draws.length = 0;
      _renderer.render(_scene, _camera);
      return draws.filter((v, i) => draws[i - 1] !== v);
    });
  });
  expect(await drawOrders()).toEqual([["price", "energy"], ["energy", "price"]]);
  await page.evaluate(() => {
    const card = window.demo.energy;
    card.setConfig({ ...card._config, dataset_spacing: 0 });
  });
  await expect.poll(drawOrders).toEqual([["price", "energy"], ["price", "energy"]]);
});

test("dataset units stay stacked in top-view order across presets", async ({ page }) => {
  await page.goto("/dev/fixture.html");
  for (const name of ["Power", "Voltage"]) await page.getByRole("button", {name, exact:true}).click();
  const layout = () => page.evaluate(() => {
    const { _scene, _camera, _targets } = window.demo.energy;
    const bounds = _targets[0].geometry.boundingBox.clone().makeEmpty();
    for (const target of _targets) bounds.expandByObject(target);
    const plotTop = bounds.applyMatrix4(_camera.matrixWorldInverse).max.y;
    const front = window.demo.energy._cameraPreset === "front";
    return _scene.children.filter(o => o.isSprite && /^(ENERGY|PRICE|POWER|VOLTAGE)\b/.test(o.userData.label))
      .map(o => {
        const projectedY = o.getWorldPosition(o.position.clone()).applyMatrix4(_camera.matrixWorldInverse).y;
        return { name: o.userData.label.split(" ")[0], top: projectedY + (1-o.center.y)*o.scale.y,
          bottom: projectedY-o.center.y*o.scale.y, anchored: o.position.x === -8.1 && o.position.y === 5.1 };
      }).sort((a,b) => b.top-a.top)
       .map((v,i,rows) => [v.name,v.anchored && (!front || v.bottom > plotTop) && v.top <= _camera.top / _camera.zoom && (!i || v.top <= rows[i-1].bottom + 1e-6)]);
  });
  for (const name of ["Top", "Front", "Isometric"]) {
    await page.getByRole("button", {name, exact:true}).click();
    await expect.poll(layout).toEqual(["VOLTAGE","POWER","PRICE","ENERGY"].map(key => [key,true]));
  }
  await page.evaluate(() => {
    const card = window.demo.energy;
    card._cameraPreset = null;
    card._camera.position.copy(card._controls.target);
    card._camera.position.x -= 18; card._camera.position.y += 20; card._camera.position.z += 12;
    card._controls.update();
  });
  await expect.poll(layout).toEqual(["VOLTAGE","POWER","PRICE","ENERGY"].map(key => [key,true]));
  await page.getByRole("button", {name:"Voltage", exact:true}).click();
  await expect.poll(layout).toHaveLength(3);
});

test.describe("graph clock", () => {
  test.use({ timezoneId: "Europe/Oslo" });
  test("device and server zones label the same now instant", async ({ page }) => {
    await page.clock.setFixedTime(new Date("2026-11-18T18:16:00Z"));
    await page.addInitScript(() => { window.__haNativeTimeZone = "America/New_York"; });
    await page.goto("/dev/fixture.html");
    await page.waitForFunction(() => window.demo?.energy?._timeFormat);
    await page.evaluate(() => {
      const { energy, hass } = window.demo;
      energy.hass = { ...hass, locale: { language: "en-GB", time_zone: "server" }, config: { ...hass.config, time_zone: "America/New_York" } };
    });
    const markerTime = () => page.evaluate(() => {
      const card = window.demo.energy;
      const ticks = card._scene.children.filter(o => /^\d\d:\d\d:#/.test(o.userData.label)).sort((a,b) => a.position.x-b.position.x);
      const marker = card._scene.children.find(o => o.geometry?.type === "CircleGeometry");
      const tick = ticks.findLast(o => o.position.x <= marker.position.x);
      const [hour, minute] = tick.userData.label.slice(0,5).split(":").map(Number);
      return hour * 60 + minute + Math.round((marker.position.x-tick.position.x)*card._config.hours_to_show*60/18);
    });
    await expect.poll(markerTime).toBe(19*60+16);
    await page.evaluate(() => window.demo.energy.setConfig({ ...window.demo.energy._config, use_server_time: true }));
    await expect.poll(markerTime).toBe(13*60+16);
  });
});

test("right-drag pans the graph without rotating or zooming", async ({ page }) => {
  await page.goto("/dev/fixture.html");
  const canvas = page.locator("gleam-energy-graph canvas");
  await canvas.scrollIntoViewIfNeeded();
  const pose = () => page.evaluate(() => {
    const { _camera: camera, _controls: controls } = window.demo.energy;
    return { target: controls.target.toArray(), direction: camera.quaternion.toArray(), zoom: camera.zoom };
  });
  const { x, y, width, height } = await canvas.boundingBox();
  await page.mouse.move(x + width / 2, y + height / 2);
  await page.mouse.down({ button: "right" });
  const before = await pose();
  await page.mouse.move(x + width / 2 + 50, y + height / 2 + 30, { steps: 4 });
  await page.mouse.up({ button: "right" });
  const after = await pose();
  expect(after.target).not.toEqual(before.target);
  after.direction.forEach((value, i) => expect(value).toBeCloseTo(before.direction[i], 8));
  expect(after.zoom).toBe(before.zoom);
});

test("point light stays centred across camera presets", async ({ page }) => {
  await page.goto("/dev/fixture.html");
  for (const name of ["Front", "Top", "Isometric"]) {
    await page.getByRole("button", { name, exact: true }).click();
    await expect.poll(() => page.evaluate(() => {
      const { _chart, _camera, _controls } = window.demo.energy;
      const light = _chart.pointLight;
      return light.getWorldPosition(light.position.clone()).sub(_controls.target)
        .applyQuaternion(_camera.quaternion.clone().invert()).toArray().map(v => Number(v.toFixed(3)));
    })).toEqual([expect.closeTo(0, 3), expect.closeTo(0, 3), 5]);
  }
});

test("vertical Now marker spans the graph except on the price plane", async ({ page }) => {
  await page.goto("/dev/fixture.html");
  await expect(page.locator("gleam-energy-graph canvas")).toBeVisible();
  const toggle = name => page.getByRole("button", { name, exact: true }).click();
  const marker = () => page.evaluate(() => {
    const parts = window.demo.energy._scene.children.filter(o =>
      o.visible && o.material?.color?.getHex() === 0xff647c);
    const floor = parts.find(o => Math.abs(o.quaternion.x) > .5);
    return {
      floorEnd: floor ? Number((floor.position.z - floor.scale.y / 2).toFixed(2)) : null,
      verticals: parts.filter(o => o !== floor && o.geometry.type === "CylinderGeometry").map(o => ({ z: Number(o.position.z.toFixed(2)), y: o.position.y, height: o.scale.y })),
    };
  });
  await expect.poll(() => page.evaluate(() => window.demo.energy._targets?.some(o =>
    o.userData.tip?.startsWith("Recorded price")))).toBe(true);
  const [price] = (await marker()).verticals;
  expect(price.z).toBe(-1.55);
  expect(price.height).toBeGreaterThan(0);
  await toggle("Front");
  expect(await page.evaluate(() => {
    const { _scene, _targets } = window.demo.energy;
    const bar = _targets.find(o => o.userData.tip?.startsWith("Energy"));
    const tip = _scene.children.find(o => o.geometry?.type === "CircleGeometry");
    return tip.position.z - (bar.position.z + bar.scale.z / 2);
  })).toBeCloseTo(.022, 5);
  const fullHeight = { y: 2.4, height: 4.8 };
  const check = (z, range = fullHeight) => expect.poll(marker).toEqual({
    floorEnd: z, verticals: range ? [{ ...range, z }] : [],
  });
  await toggle("Power"); await check(-3.9);
  await toggle("Voltage"); await check(-5.9);
  const checkVoltage = z => expect.poll(() => page.evaluate(() => {
    const stroke = window.demo.energy._targets.find(o => o.userData.tips?.some(tip => tip?.startsWith("Voltage")));
    return stroke && Number(stroke.instanceMatrix.array[14].toFixed(2));
  })).toBe(z);
  await checkVoltage(-5.9);
  await toggle("Power"); await checkVoltage(-3.9); await check(-3.9);
  await toggle("Price + forecast"); await checkVoltage(-1.55); await check(-1.55);
  await toggle("Energy"); await checkVoltage(1.5); await check(1.5);
  await toggle("Power"); await checkVoltage(-1.55);
  await toggle("Energy"); await checkVoltage(-3.9);
  await toggle("Price + forecast"); await checkVoltage(-5.9);
  await toggle("Power");
  await toggle("Voltage"); await check(-1.55, price);
  await toggle("Price + forecast"); await check(1.44);
  await toggle("Energy"); await check(null, null);
});

test("dataset spacing updates every lane without refetching or replacing GPU resources", async ({ page }) => {
  await page.goto("/dev/fixture.html");
  await page.getByRole("button", { name: "Power", exact: true }).click();
  await page.getByRole("button", { name: "Voltage", exact: true }).click();
  await expect.poll(() => page.evaluate(() => [...new Set(window.demo.energy._targets?.flatMap(o =>
    (o.userData.tips ?? [o.userData.tip]).filter(Boolean).map(tip => tip.split(/[\n·]/)[0].trim())))].sort()))
    .toEqual(["Energy", "Recorded price", "Future price", "Power", "Voltage"].sort());
  const result = await page.evaluate(async () => {
    const { energy: card, requests } = window.demo;
    const frame = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const now = Date.now;
    const time = now();
    Date.now = () => time;
    try {
      await frame();
      card._build();
      await frame();
      const targets = [...card._targets];
      const positions = targets.map(object => object.getWorldPosition(object.position.clone()));
      const children = [...card._scene.children];
      const stats = card._stats, history = card._history;
      const memory = { ...card._renderer.info.memory };
      const requestCount = requests.length;
      const checks = [];
      card.setConfig({ ...card._config, dataset_spacing: 0 });
      await frame();
      const depth = targets[0].getWorldPosition(targets[0].position.clone()).z;
      checks.push(targets.every(object => {
        const z = object.isInstancedMesh ? object.instanceMatrix.array[14] : object.position.z;
        return Math.abs(z * card._scene.scale.z - depth) < 1e-6
          && (!object.userData.tip?.startsWith("Energy") || Math.abs(object.scale.z * card._scene.scale.z - .062) < 1e-6);
      }));
      for (const dataset_spacing of [1, 3, 7, 10]) {
        card.setConfig({ ...card._config, dataset_spacing });
        await frame();
        checks.push(targets.every((object, index) => {
          const position = object.getWorldPosition(object.position.clone());
          const projected = position.clone().project(card._camera);
          return card._targets[index] === object
            && (!object.userData.tip?.startsWith("Energy") || Math.abs(object.getWorldScale(position.clone()).z - .062) < 1e-6)
            && Math.abs(position.x - positions[index].x) < 1e-6
            && Math.abs(position.y - positions[index].y) < 1e-6
            && Math.abs(position.z - positions[index].z * dataset_spacing / 5) < 1e-6
            && [projected.x, projected.y, projected.z].every(value => Math.abs(value) <= 1);
        }));
      }
      card._defaultCamera = false;
      const camera = card._camera.position.clone(), zoom = card._camera.zoom;
      card.setConfig({ ...card._config, dataset_spacing: 8 });
      await frame();
      const manualCameraPreserved = card._camera.position.equals(camera) && card._camera.zoom === zoom;
      const reused = children.every((object, index) => card._scene.children[index] === object)
        && card._renderer.info.memory.geometries === memory.geometries
        && card._renderer.info.memory.textures === memory.textures;
      const cached = requests.length === requestCount && stats === card._stats && history === card._history;
      card.remove();
      document.querySelector("#cards").prepend(card);
      await frame();
      return { checks, reused, cached, manualCameraPreserved, restoredDepth: card._scene.scale.z };
    } finally { Date.now = now; }
  });
  expect(result).toEqual({
    checks: [true, true, true, true, true], reused: true, cached: true,
    manualCameraPreserved: true, restoredDepth: 0.8,
  });
});

test("thermostat sends only explicit user actions and editor emits configuration", async ({ page }) => {
  await page.goto("/dev/fixture.html");
  await expect(page.locator("gleam-thermostat .value")).toHaveText("22");
  expect(await page.evaluate(() => window.demo.calls)).toEqual([]);
  await page.getByRole("button", { name: "Increase target temperature" }).click();
  await expect.poll(() => page.evaluate(() => window.demo.calls.length)).toBe(1);
  expect(await page.evaluate(() => window.demo.calls[0])).toEqual({
    domain: "climate", service: "set_temperature", data: { entity_id: "climate.heat_pump", temperature: 22.5 },
  });
  await expect(page.locator("gleam-thermostat .value")).toHaveText("22.5");
  await page.evaluate(() => {
    const editor = customElements.get("gleam-thermostat").getConfigElement();
    editor.addEventListener("config-changed", e => { window.editedConfig = e.detail.config; });
    editor.setConfig({ type: "custom:gleam-thermostat", entity: "climate.heat_pump" });
    editor.hass = window.demo.hass;
    document.querySelector("main").append(editor);
  });
  await expect(page.locator("gleam-thermostat-editor")).toBeVisible();
  await expect(page.getByLabel("Display name")).toHaveValue("Thermostat");
  expect(await page.evaluate(() => window.editedConfig)).toBeUndefined();
  const text = page.locator("gleam-thermostat-editor input").first();
  await text.fill("climate.other");
  await text.dispatchEvent("change");
  await expect.poll(() => page.evaluate(() => window.editedConfig?.entity)).toBe("climate.other");
  expect(await page.evaluate(() => window.demo.calls.length)).toBe(1);
});

test("missing WebGL reports an error and leaves thermostat controls usable", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type.startsWith("webgl") ? null : original.call(this, type, ...args);
    };
  });
  await page.goto("/dev/fixture.html");
  await expect(page.locator("gleam-energy-graph .notice")).toContainText("WebGL 2");
  await expect(page.locator("gleam-energy-graph .live")).toHaveText("0.84");
  await page.evaluate(() => {
    const { hass, energy } = window.demo;
    energy.hass = { ...hass, states: { ...hass.states,
      "sensor.electricity_price": { state: "2.45", attributes: { unit_of_measurement: "EUR/kWh" } } } };
  });
  await expect(page.locator("gleam-energy-graph .price")).toHaveText("2.450");
  await expect(page.locator("gleam-energy-graph .price-label")).toContainText("EUR/kWh");
  await page.locator("gleam-thermostat").scrollIntoViewIfNeeded();
  await expect(page.locator("gleam-thermostat .message")).toContainText("3D graphics unavailable");
  await page.getByRole("button", { name: "Increase target temperature" }).click();
  await expect.poll(() => page.evaluate(() => window.demo.calls.length)).toBe(1);
});

test("thermostat skips unrelated updates and reuses static GPU geometry", async ({ page }) => {
  await page.goto("/dev/fixture.html");
  await page.locator("gleam-thermostat").scrollIntoViewIfNeeded();
  await expect(page.locator("gleam-thermostat canvas")).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.demo.thermostat._renderer.info.render.frame)).toBeGreaterThan(0);
  await page.locator("gleam-thermostat").scrollIntoViewIfNeeded();
  const result = await page.evaluate(async () => {
    const { thermostat, hass } = window.demo;
    const settle = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    await settle();
    const frames = thermostat._renderer.info.render.frame;
    const dial = thermostat._dial;
    const objects = [...dial.scene.children];
    const geometry = dial.ring.geometry, positions = geometry.getAttribute("position"), version = positions.version;
    thermostat.hass = { ...hass, states: { ...hass.states, "sensor.unrelated": { state: "1", attributes: {} } } };
    await settle();
    const skipped = thermostat._renderer.info.render.frame === frames;
    thermostat.hass = { ...hass, states: { ...hass.states, "climate.heat_pump": { ...hass.states["climate.heat_pump"], state: "cool" } } };
    await settle();
    return { skipped, reused: objects.every(o => thermostat._dial.scene.children.includes(o))
      && thermostat._dial.ring.geometry.getAttribute("position") === positions && positions.version === version,
      accent: thermostat._dial.ring.material.color.getHexString() };
  });
  expect(result).toEqual({ skipped: true, reused: true, accent: "65f0ff" });
});

test("changing graph sensors during a request fetches the latest selection", async ({ page }) => {
  await page.goto("/dev/fixture.html");
  await page.waitForFunction(() => Boolean(window.demo));
  await page.evaluate(() => {
    const { energy, hass } = window.demo;
    energy.hass = { ...hass, callWS: async request => {
      const id = request.statistic_ids?.[0];
      if (id === "sensor.first") return new Promise((_, reject) => { window.finishOld = () => reject(Error("obsolete")); });
      if (id === "sensor.latest") return { [id]: [{ start: Date.now(), state: 123456 }] };
      return hass.callWS(request);
    } };
    energy.setConfig({ energy_entity: "sensor.first", refresh_interval: 3600 });
  });
  await expect.poll(() => page.evaluate(() => typeof window.finishOld)).toBe("function");
  await page.evaluate(() => {
    window.demo.energy.setConfig({ energy_entity: "sensor.latest", refresh_interval: 3600 });
    window.finishOld();
  });
  await expect.poll(() => page.evaluate(() => window.demo.energy._stats[0]?.state)).toBe(123456);
  await expect(page.locator("gleam-energy-graph .notice")).not.toContainText("obsolete");
});

for (const order of ["connect first", "configure first"]) {
  test(`off-screen graph defers requests and frames: ${order}`, async ({ page }) => {
    await page.goto("/dev/fixture.html");
    await page.waitForFunction(() => Boolean(window.demo));
    await page.evaluate(async order => {
      const card = document.createElement("gleam-energy-graph");
      card.id = "late";
      card.style.marginTop = "4000px";
      window.lateRequests = [];
      card.hass = { ...window.demo.hass, callWS: request => {
        window.lateRequests.push(request);
        return window.demo.hass.callWS(request);
      } };
      if (order === "configure first") card.setConfig({});
      document.body.append(card);
      if (order === "connect first") card.setConfig({});
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }, order);
    expect(await page.evaluate(() => [window.lateRequests.length, !!document.querySelector("#late")._renderer])).toEqual([0, false]);
    await page.locator("#late").scrollIntoViewIfNeeded();
    await expect.poll(() => page.evaluate(() => window.lateRequests.length)).toBe(1);
    await expect(page.locator("#late .kpis")).toBeHidden();
    await expect.poll(() => page.locator("#late").evaluate(card => card._scene?.children.some(o =>
      o.visible && o.material?.color?.getHex() === 0xff647c && o.scale.y === 4.8 && o.position.y === 2.4))).toBe(true);
    await expect(page.locator('#late [data-series="price"]')).toBeHidden();
    await expect.poll(() => page.evaluate(() => document.querySelector("#late")._renderer.info.render.frame)).toBeGreaterThan(0);
  });
}
