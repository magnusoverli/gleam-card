import { test, expect } from "@playwright/test";

test("thermostat previews retain the open controls, dial buffers and pending slider command", async ({ page }) => {
  await page.goto("/dev/fixture.html");
  const card = page.locator("gleam-thermostat");
  await card.scrollIntoViewIfNeeded();
  await expect.poll(() => card.evaluate(c => c._dial?.fraction ?? 0)).toBeGreaterThan(0);
  await card.locator("summary").click();
  const result = await card.evaluate(async c => {
    const frame = () => new Promise(requestAnimationFrame);
    const { hass, calls } = window.demo;
    c.hass = { ...hass, callService: async (...args) => { calls.push(args); } };
    const root = c.shadowRoot, slider = root.querySelector("#target"), details = root.querySelector("details");
    const canvas = root.querySelector("canvas"), ring = c._dial.ring, position = ring.geometry.getAttribute("position");
    slider.value = "24"; slider.dispatchEvent(new Event("input")); slider.dispatchEvent(new Event("change"));
    await frame();
    const before = c._renderer.info.render.frame, version = position.version;
    for (const thickness of [.09, .10, .11]) c.setConfig({ ...c._config, ring_thickness: thickness });
    await frame();
    const after = c._renderer.info.render.frame;
    c.setConfig({ ...c._config, name: "Edited name" });
    await frame();
    const pending = { open: details.open, disabled: slider.disabled, message: root.querySelector(".message").textContent,
      reading: root.querySelector(".dial").getAttribute("aria-valuetext") };
    const state = hass.states[c._config.entity];
    c.hass = { ...c._hass, states: { ...hass.states, [c._config.entity]: {
      ...state, attributes: { ...state.attributes, temperature: 24 },
    } } };
    return { pending, confirmed: !slider.disabled && !root.querySelector(".message").textContent,
      calls, frames: after - before, nameFrames: c._renderer.info.render.frame - after,
      retained: canvas === root.querySelector("canvas") && ring === c._dial.ring
        && position === c._dial.ring.geometry.getAttribute("position") && position.version > version };
  });
  expect(result).toEqual({ retained: true, frames: 1, nameFrames: 0, confirmed: true,
    calls: [["climate", "set_temperature", { entity_id: "climate.heat_pump", temperature: 24 }]],
    pending: { open: true, disabled: true, message: "Command sent · awaiting reported state", reading: "24 °C preview" } });
});

test("graph previews reuse plotted data and buffers; resizing preserves manual navigation", async ({ page }) => {
  await page.goto("/dev/fixture.html");
  const card = page.locator("gleam-energy-graph");
  await card.evaluate(c => { c.style.width = "500px"; c.setConfig({ ...c._config, refresh_interval: 3600 }); });
  await card.scrollIntoViewIfNeeded();
  await expect.poll(() => card.evaluate(c => !!c._targets?.length && !c._fetching)).toBe(true);
  await card.locator("canvas").dispatchEvent("wheel", { deltaY: -100 });
  await expect.poll(() => card.evaluate(c => c._camera.zoom)).toBeGreaterThan(1);
  const result = await card.evaluate(async c => {
    const frame = () => new Promise(requestAnimationFrame);
    await frame(); await frame();
    const { requests } = window.demo, count = requests.length;
    const stats = c._stats, prices = c._history[c._config.price_entity];
    const canvas = c.shadowRoot.querySelector("canvas"), bar = c._targets.find(o => o.geometry.type === "BoxGeometry");
    const material = bar.material, buffer = bar.geometry.getAttribute("position");
    const pose = () => [c._camera.zoom, ...c._camera.position.toArray(), ...c._controls.target.toArray()];
    const beforePose = pose(), before = c._renderer.info.render.frame;
    c.setConfig({ ...c._config, power_color: "#ffeedd" }); // series is disabled
    await frame();
    const afterHidden = c._renderer.info.render.frame;
    c.setConfig({ ...c._config, current_hour_entity: "", energy_opacity: 74 });
    c.setConfig({ ...c._config, energy_opacity: 80 });
    await frame();
    const afterVisible = c._renderer.info.render.frame;
    c.style.width = "720px";
    await frame(); await frame();
    return { hiddenFrames: afterHidden - before, visibleFrames: afterVisible - afterHidden,
      resized: canvas.clientWidth > 650 && canvas.width > 650,
      poseRetained: JSON.stringify(beforePose) === JSON.stringify(pose()),
      extraRequests: requests.length - count, dataRetained: stats.length > 0 && stats === c._stats
        && prices.length > 0 && prices === c._history[c._config.price_entity],
      retained: canvas === c._renderer.domElement && c._targets.includes(bar) && material === bar.material
        && buffer === bar.geometry.getAttribute("position"), opacity: material.opacity,
      readout: c.shadowRoot.querySelector(".live").textContent };
  });
  expect(result).toEqual({ hiddenFrames: 0, visibleFrames: 1, resized: true, poseRetained: true,
    extraRequests: 0, dataRetained: true, retained: true, opacity: .8, readout: "—" });
});
