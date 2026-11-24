import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/dev/fixture.html");
  const card = page.locator("gleam-energy-graph");
  await card.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => window.demo?.energy._targets?.length && !window.demo.energy._fetching);
  await page.evaluate(() => {
    const { energy, hass, requests } = window.demo;
    const editor = energy.constructor.getConfigElement();
    const config = { ...energy._config, title: "Solar roof", grid_options: { columns: 12 } };
    energy.setConfig(config);
    editor.hass = hass;
    editor.setConfig(config);
    const host = document.querySelector("main");
    host.append(editor);
    const changes = [];
    host.addEventListener("config-changed", ({ detail }) => {
      changes.push(detail.config);
      energy.setConfig(detail.config);
      editor.setConfig(structuredClone(detail.config));
    });
    window.previewTest = { changes, requestCount: requests.length };
  });
});

test("title, numeric and colour inputs reach the graph before commit and survive host echoes", async ({ page }) => {
  const editor = page.locator("gleam-energy-graph-editor");
  const card = page.locator("gleam-energy-graph");
  await editor.locator("summary").filter({ hasText: "Card appearance" }).click();
  const title = editor.getByLabel("Card title");
  await title.focus();
  await title.evaluate(input => input.setSelectionRange(5, 5));
  await page.keyboard.insertText(" PV");
  await expect(card.locator(".card-title")).toHaveText("Solar PV roof");
  await expect(title).toBeFocused();
  expect(await title.evaluate(input => input.selectionStart)).toBe(8);

  await editor.locator("summary").filter({ hasText: "Dataset appearance" }).click();
  const opacity = editor.getByLabel("Energy opacity (%)", { exact: true });
  await opacity.fill("");
  await expect(editor.locator("[role=alert]")).toBeEmpty();
  await opacity.evaluate(input => {
    input.value = "075";
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await expect(opacity).toHaveValue("075");
  expect(await card.evaluate(el => el._config.energy_opacity)).toBe(75);

  const picker = editor.getByLabel("Energy base colour");
  expect(await picker.evaluate(input => {
    for (const color of ["#223344", "#557799", "#7799bb"]) {
      input.value = color;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
    return window.previewTest.changes.length;
  })).toBe(2);
  await expect.poll(() => card.evaluate(el => el.style.getPropertyValue("--gleam-energy"))).toBe("#7799bb");
  await picker.dispatchEvent("change");
  await opacity.dispatchEvent("change");
  await card.scrollIntoViewIfNeeded();
  await expect.poll(() => card.evaluate(el => {
    const bar = el._targets.find(obj => obj.userData.tip?.startsWith("Energy"));
    return [bar?.material.opacity, bar?.material.color.getHexString()];
  })).toEqual([.75, "7799bb"]);
  expect(await page.evaluate(() => window.previewTest.changes)).toHaveLength(3);
  expect(await page.evaluate(() => window.previewTest.changes.at(-1).grid_options)).toEqual({ columns: 12 });
  expect(await page.evaluate(() => window.demo.requests.length - window.previewTest.requestCount)).toBe(0);
});

test("appearance previews isolate entity and time drafts; refresh commits retain recorder data", async ({ page }) => {
  const editor = page.locator("gleam-energy-graph-editor");
  const card = page.locator("gleam-energy-graph");
  // Keep the card on screen and leave each field uncommitted, including a valid entity draft.
  const result = await editor.evaluate(el => {
    const input = (key, value, event = "input") => {
      const field = el.shadowRoot.querySelector(`[data-key="${key}"]`);
      field.value = value;
      field.dispatchEvent(new Event(event, { bubbles: true }));
    };
    input("energy_entity", "sensor.new_meter");
    input("hours_to_show", "72");
    input("refresh_interval", "60");
    input("price_line_width", "");
    const before = window.previewTest.changes.length;
    input("price_label", "Tariff");
    input("refresh_interval", "60", "change");
    return { before, changes: window.previewTest.changes };
  });
  expect(result.before).toBe(0);
  expect(result.changes).toHaveLength(2);
  expect(result.changes[0]).toMatchObject({ energy_entity: "sensor.total_energy", hours_to_show: 33,
    refresh_interval: 10, price_line_width: 100, price_label: "Tariff" });
  expect(result.changes[1]).toMatchObject({ energy_entity: "sensor.total_energy", hours_to_show: 33,
    refresh_interval: 60, price_line_width: 100 });
  await expect(editor.locator("[role=alert]")).toBeEmpty();
  await expect(editor.locator("[data-key=price_line_width]")).toHaveValue("");
  await expect(editor.locator("[data-key=energy_entity]")).toHaveValue("sensor.new_meter");
  await expect(card.locator(".price-label")).toContainText("Tariff");
  expect(await page.evaluate(() => window.demo.requests.length - window.previewTest.requestCount)).toBe(0);
  await editor.locator("[data-key=energy_entity]").dispatchEvent("change");
  await expect.poll(() => page.evaluate(() => window.demo.requests.some(r => r.statistic_ids?.includes("sensor.new_meter")))).toBe(true);
});

test("a queued colour cannot overwrite a replacement config or publish after disconnect", async ({ page }) => {
  const result = await page.locator("gleam-energy-graph-editor").evaluate(async editor => {
    const picker = editor.shadowRoot.querySelector("[data-key=energy_color]");
    const pick = color => {
      picker.value = color;
      picker.dispatchEvent(new Event("input", { bubbles: true }));
    };
    let emitted = 0;
    editor.addEventListener("config-changed", () => emitted++);
    pick("#abcdef");
    editor.setConfig({ energy_color: "#224488" });
    await new Promise(requestAnimationFrame);
    const external = picker.value;
    pick("#113355");
    editor.remove();
    await new Promise(requestAnimationFrame);
    return { emitted, external };
  });
  expect(result).toEqual({ emitted: 0, external: "#224488" });
});
