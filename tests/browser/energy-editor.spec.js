import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.waitForFunction(() => window.demo);
  await page.evaluate(() => {
    const Card = customElements.get("gleam-energy-graph");
    const editor = Card.getConfigElement();
    // Home Assistant may supply hass before config or connection.
    editor.hass = window.demo.hass;
    editor.setConfig({ ...Card.getStubConfig(), grid_options: { columns: 12 }, extra_option: "keep" });
    window.editorChanges = [];
    document.querySelector("main").addEventListener("config-changed", event => {
      window.editorChanges.push(event.detail.config);
      editor.setConfig(event.detail.config);
    });
    document.querySelector("main").append(editor);
  });
});

test("graph picker editor supports sensors, configuration round trips and live suggestions", async ({ page }) => {
  const editor = page.locator("gleam-energy-graph-editor");
  await expect(editor).toBeVisible();
  const energy = editor.getByRole("group", { name: "Main energy" }).getByLabel("Sensor", { exact: true });
  await expect(energy).toHaveValue("sensor.total_energy");
  expect(await page.evaluate(() => window.customCards.some(card => card.type === "gleam-energy-graph"))).toBe(true);
  await expect(editor.locator("#energy_entity-list option")).toHaveCount(2);
  await energy.fill("sensor.my_meter");
  await energy.dispatchEvent("change");
  await expect(editor.getByRole("status")).toContainText("sensor.my_meter");
  expect(await page.evaluate(() => window.editorChanges.at(-1))).toMatchObject({
    type: "custom:gleam-energy-graph", energy_entity: "sensor.my_meter",
    grid_options: { columns: 12 }, extra_option: "keep",
  });
  await energy.focus();
  await page.evaluate(() => {
    const editor = document.querySelector("gleam-energy-graph-editor");
    editor.hass = { ...window.demo.hass, states: {
      ...window.demo.hass.states,
      "sensor.my_meter": { state: "100", attributes: { friendly_name: "House meter", unit_of_measurement: "kWh" } },
    } };
  });
  await expect(energy).toBeFocused();
  await expect(editor.locator('#energy_entity-list option[value="sensor.my_meter"]')).toHaveAttribute("label", "House meter");
  await expect(editor.getByRole("status", { includeHidden: true })).toBeEmpty();
  await page.evaluate(() => {
    const editor = document.querySelector("gleam-energy-graph-editor");
    editor.remove();
    document.querySelector("main").append(editor);
    editor.setConfig({ type: "custom:gleam-energy-graph", future_hours: 0 });
  });
  await expect(editor.getByLabel("Future hours", { exact: true })).toHaveValue("0");
  await expect(energy).toHaveValue("sensor.total_energy");
  expect(await page.evaluate(() => window.demo.calls)).toEqual([]);
});

test("suggestions filter units per field and follow metadata without replacing drafts", async ({ page }) => {
  await page.evaluate(() => {
    const sensor = (unit, attributes = {}) => ({
      state: "unavailable", attributes: { unit_of_measurement: unit, ...attributes },
    });
    window.suggestionStates = {
      "sensor.energy": sensor("kWh"),
      "sensor.wh": sensor("Wh", { device_class: "energy" }),
      "sensor.mwh": sensor("MWh"),
      "sensor.power": sensor("W"),
      "sensor.kw": sensor("kW"),
      "sensor.voltage": sensor("V"),
      "sensor.mv": sensor("mV"),
      "sensor.eur": sensor("EUR/kWh"),
      "sensor.nok": sensor("NOK / kWh"),
      "sensor.dollar": sensor("$/kWh"),
      "sensor.minor": sensor("øre/kWh"),
      "sensor.symbol": sensor("€/kWh"),
      "sensor.money": sensor("EUR", { device_class: "monetary" }),
      "sensor.price_mwh": sensor("EUR/MWh"),
      "sensor.price_wh": sensor("USD/Wh"),
      "sensor.no_currency": sensor("/kWh"),
      "sensor.missing": sensor(undefined),
      "sensor.invalid": sensor(123),
      "sensor.temperature": sensor("°C"),
      "number.energy": sensor("kWh"),
    };
    document.querySelector("gleam-energy-graph-editor").hass = {
      ...window.demo.hass, states: window.suggestionStates,
    };
  });
  const editor = page.locator("gleam-energy-graph-editor");
  const expected = {
    energy_entity: ["sensor.energy"],
    current_hour_entity: ["sensor.energy"],
    price_entity: ["sensor.dollar", "sensor.eur", "sensor.minor", "sensor.nok", "sensor.symbol"],
    power_entity: ["sensor.power"],
    voltage_entity: ["sensor.voltage"],
  };
  for (const [field, ids] of Object.entries(expected)) {
    await expect(editor.locator(`input[data-key="${field}"]`)).toHaveAttribute("list", `${field}-list`);
    expect(await editor.locator(`#${field}-list option`).evaluateAll(options => options.map(o => o.value))).toEqual(ids);
  }
  const energy = editor.getByLabel("Sensor", { exact: true });
  await energy.fill("sensor.unsaved_draft");
  await page.evaluate(() => {
    const editor = document.querySelector("gleam-energy-graph-editor");
    window.savedSuggestion = editor.shadowRoot.querySelector("#energy_entity-list option");
    window.suggestionStates = {
      ...window.suggestionStates,
      "sensor.energy": { ...window.suggestionStates["sensor.energy"], state: "42" },
    };
    editor.hass = { ...window.demo.hass, states: window.suggestionStates };
  });
  expect(await page.evaluate(() => window.savedSuggestion === document.querySelector("gleam-energy-graph-editor")
    .shadowRoot.querySelector("#energy_entity-list option"))).toBe(true);
  await page.evaluate(() => {
    window.suggestionStates["sensor.energy"] = {
      state: "42", attributes: { unit_of_measurement: "W" },
    };
    document.querySelector("gleam-energy-graph-editor").hass = {
      ...window.demo.hass, states: window.suggestionStates,
    };
  });
  await expect(editor.locator("#energy_entity-list option")).toHaveCount(0);
  await expect(editor.locator("#power_entity-list option")).toHaveCount(2);
  await expect(energy).toHaveValue("sensor.unsaved_draft");
  await expect(energy).toBeFocused();
  expect(await page.evaluate(() => window.editorChanges)).toEqual([]);
});

test("graph price labels and tooltips follow the sensor currency", async ({ page }) => {
  await expect.poll(() => page.evaluate(() => window.demo.energy._targets?.length ?? 0)).toBeGreaterThan(0);
  const card = page.locator("gleam-energy-graph");
  for (const unit of ["EUR/kWh", "$/kWh", "øre/kWh", undefined]) {
    await page.evaluate(unit => {
      const { energy, hass } = window.demo;
      const price = hass.states["sensor.electricity_price"];
      energy.hass = { ...hass, states: { ...hass.states, "sensor.electricity_price": {
        ...price, attributes: { ...price.attributes, unit_of_measurement: unit },
      } } };
    }, unit);
    await expect(card.locator(".price-label")).toHaveText(`Current price${unit ? ` · ${unit}` : ""}`);
    await expect.poll(() => page.evaluate(unit => {
      const tips = window.demo.energy._targets.map(object => object.userData.tip)
        .filter(tip => /^(Future|Recorded) price/.test(tip));
      return tips.length > 0 && tips.every(tip => unit ? tip.endsWith(` ${unit}`) : !tip.includes("/kWh"));
    }, unit)).toBe(true);
    await expect(card.locator(".price")).toHaveText("1.250");
  }
});

test("readout values share a size by default and retain independent sizes", async ({ page }) => {
  const editor = page.locator("gleam-energy-graph-editor"), card = page.locator("gleam-energy-graph");
  await editor.evaluate(el => el.setConfig(window.demo.energy._config));
  await editor.locator("summary").filter({ hasText: "Card appearance" }).click();
  const separate = editor.getByLabel("Use separate sizes");
  const common = editor.getByLabel("Shared size (%)", { exact: true });
  const prices = editor.getByLabel("Price (%)", { exact: true });
  const sizes = () => card.evaluate(el => [".live", ".price"].map(s => parseFloat(getComputedStyle(el.shadowRoot.querySelector(s)).fontSize)));
  const apply = () => card.evaluate(el => el.setConfig(window.editorChanges.at(-1)));
  const [base] = await sizes();
  await expect(separate).not.toBeChecked();
  await common.fill("150"); await common.dispatchEvent("change"); await apply();
  expect(await sizes()).toEqual([base * 1.5, base * 1.5]);
  await separate.check(); await expect(common).toBeHidden();
  await prices.fill("75"); await prices.dispatchEvent("change"); await apply();
  expect(await sizes()).toEqual([base, base * .75]);
  await separate.uncheck(); await apply();
  expect(await sizes()).toEqual([base * 1.5, base * 1.5]);
  await separate.check(); await expect(prices).toHaveValue("75");
});

test("card appearance recolours all three parts of the now marker", async ({ page }) => {
  const editor = page.locator("gleam-energy-graph-editor"), card = page.locator("gleam-energy-graph");
  await editor.locator("summary").filter({ hasText: "Card appearance" }).click();
  const picker = editor.getByLabel("Now marker colour");
  await expect(picker).toHaveValue("#ff647c");
  await picker.fill("#12ab34");
  await picker.dispatchEvent("change");
  await card.evaluate(el => el.setConfig({ ...el._config, now_marker_color: window.editorChanges.at(-1).now_marker_color }));
  await card.scrollIntoViewIfNeeded();
  await expect.poll(() => card.evaluate(el => el._scene.children.filter(obj =>
    obj.material?.color?.getHex() === 0x12ab34).length)).toBe(3);
});

test("price line width scales both strokes and joins", async ({ page }) => {
  const editor = page.locator("gleam-energy-graph-editor"), card = page.locator("gleam-energy-graph");
  await editor.evaluate(el => el.setConfig(window.demo.energy._config));
  await editor.locator("summary").filter({hasText:"Dataset appearance"}).click();
  const width = editor.getByLabel("Price line width (%)");
  await expect(width).toHaveValue("100");
  await width.fill("200");
  await width.dispatchEvent("change");
  await card.evaluate(el => el.setConfig(window.editorChanges.at(-1)));
  await card.scrollIntoViewIfNeeded();
  await expect.poll(() => card.evaluate(el => el._scene.children.filter(o =>
    o.isInstancedMesh && o.count && o.material.color.getHexString() === "ff883f")
    .map(o => Number(Math.hypot(...o.instanceMatrix.array.slice(0, 3)).toFixed(3))))).toEqual([.07, .07]);
});

test("header labels can show custom text or just the unit independently", async ({ page }) => {
  const editor = page.locator("gleam-energy-graph-editor");
  const card = page.locator("gleam-energy-graph");
  await editor.evaluate(el => el.setConfig(window.demo.energy._config));
  await editor.locator("summary").filter({ hasText: "Card appearance" }).click();
  await editor.getByLabel("Current-hour label text").fill("Usage this hour");
  await editor.getByLabel("Price label text").fill("Tariff");
  await editor.getByLabel("Show price label with unit").uncheck();
  await expect(editor.getByLabel("Price label text")).toBeHidden();
  await card.evaluate(el => el.setConfig(window.editorChanges.at(-1)));
  await expect(card.locator(".live-label")).toHaveText("Usage this hour · kWh");
  const unit = await card.evaluate(el => el._priceUnit());
  await expect(card.locator(".price-label")).toHaveText(unit);
  await editor.getByLabel("Show price label with unit").check();
  await editor.getByLabel("Show current-hour label with unit").uncheck();
  await card.evaluate(el => el.setConfig(window.editorChanges.at(-1)));
  await expect(card.locator(".live-label")).toHaveText("kWh");
  await expect(card.locator(".price-label")).toHaveText(`Tariff · ${unit}`);
});

test("card layout round trips and applies independently of plotted data", async ({ page }) => {
  const editor = page.locator("gleam-energy-graph-editor");
  await editor.evaluate(el => el.setConfig(window.demo.energy._config));
  await editor.locator("summary").filter({ hasText: "Card appearance" }).click();
  await editor.getByLabel("Card title").fill("Garage");
  await editor.getByLabel("Show current-hour readout").uncheck();
  await editor.getByLabel("Show price readout").uncheck();
  await editor.getByLabel("Show dataset buttons").uncheck();
  await editor.getByLabel("Show camera preset buttons").uncheck();
  await editor.getByRole("group", { name: "Visible on startup" }).getByLabel("Power", { exact: true }).check();
  await editor.getByLabel("Lock drag and zoom").check();
  await editor.getByLabel("Starting view").selectOption("top");
  const card = page.locator("gleam-energy-graph");
  await card.evaluate(el => el.setConfig(window.editorChanges.at(-1)));
  await card.scrollIntoViewIfNeeded();
  await expect(card.getByRole("heading", { name: "Garage" })).toBeVisible();
  await expect(card.locator(".controls")).toBeHidden();
  await expect(card.locator(".kpis")).toBeHidden();
  await expect(card.locator(".camera-controls")).toBeHidden();
  await expect.poll(() => card.evaluate(el => [el._enabled.energy, el._enabled.price, el._enabled.power,
    el._cameraPreset, el._controls.enabled, el._renderer.domElement.style.touchAction]))
    .toEqual([true, true, true, "top", false, "auto"]);
});

test("dataset spacing validates drafts and round trips through YAML defaults", async ({ page }) => {
  const editor = page.locator("gleam-energy-graph-editor");
  await editor.locator("summary").filter({ hasText: "Graph settings" }).click();
  const spacing = editor.getByLabel("Dataset spacing", { exact: true });
  await expect(spacing).toHaveValue("5");
  for (const value of ["-1", "11", "3.1", ""]) {
    await spacing.fill(value);
    await spacing.dispatchEvent("change");
    await expect(editor.getByRole("alert")).toContainText("between 0 and 10");
  }
  expect(await page.evaluate(() => window.editorChanges)).toEqual([]);
  for (const value of ["0", "1", "6", "10"]) {
    await spacing.fill(value);
    await spacing.dispatchEvent("change");
    expect(await page.evaluate(() => window.editorChanges.at(-1))).toMatchObject({
      dataset_spacing: Number(value), extra_option: "keep",
    });
  }
  expect(await page.evaluate(() => {
    const card = document.createElement("gleam-energy-graph");
    return [NaN, Infinity, "2", -1, 11].every(dataset_spacing => {
      try { card.setConfig({ dataset_spacing }); return false; } catch { return true; }
    });
  })).toBe(true);
  await page.evaluate(() => {
    document.querySelector("gleam-energy-graph-editor").setConfig({ dataset_spacing: 3 });
  });
  await expect(spacing).toHaveValue("3");
  await page.evaluate(() => document.querySelector("gleam-energy-graph-editor").setConfig({}));
  await expect(spacing).toHaveValue("5");
  await spacing.press("ArrowUp");
  await expect(spacing).toHaveValue("6");
  await spacing.press("ArrowDown");
  await expect(spacing).toHaveValue("5");
});

test("dataset appearance follows sensor selection and updates the retained bar material", async ({ page }) => {
  const editor = page.locator("gleam-energy-graph-editor");
  await editor.locator("summary").filter({ hasText: "Dataset appearance" }).click();
  await expect(editor.getByLabel("Price base colour")).toBeHidden();
  await editor.getByLabel("Energy base colour").fill("#da2377");
  const opacity = editor.getByLabel("Energy opacity (%)", { exact: true });
  await opacity.fill("38");
  await opacity.dispatchEvent("change");
  await page.evaluate(() => {
    const card = window.demo.energy;
    const { energy_color, energy_opacity } = window.editorChanges.at(-1);
    window.appearanceBar = card._targets.find(obj => obj.userData.tip?.startsWith("Energy"));
    card.setConfig({ ...card._config, energy_color, energy_opacity });
  });
  await page.locator("gleam-energy-graph canvas").scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => [window.demo.energy._targets.includes(window.appearanceBar),
    window.appearanceBar.material.color.getHexString(), window.appearanceBar.material.opacity])).toEqual([true, "da2377", .38]);
  await editor.locator("summary").filter({ hasText: "Optional sensors" }).click();
  await editor.getByLabel("Electricity price", { exact: true }).fill("sensor.price");
  await expect(editor.getByLabel("Price opacity (%)", { exact: true })).toBeVisible();
});

test("point light intensity can be turned off without rebuilding the chart", async ({ page }) => {
  const editor = page.locator("gleam-energy-graph-editor");
  await editor.locator("summary").filter({ hasText: "Graph settings" }).click();
  const field = editor.getByLabel("Point light intensity", { exact: true });
  await expect(field).toHaveValue("48");
  await field.fill("201");
  await field.dispatchEvent("change");
  await expect(editor.getByRole("alert")).toContainText("between 0 and 200");
  await field.fill("0");
  await field.dispatchEvent("change");
  expect(await page.evaluate(() => {
    const card = window.demo.energy, light = card._chart.pointLight, stats = card._stats;
    card.setConfig({ ...card._config, point_light_intensity: window.editorChanges.at(-1).point_light_intensity });
    return [light.intensity, light === card._chart.pointLight, stats === card._stats];
  })).toEqual([0, true, true]);
});

test("each dataset has its own bounded time shift", async ({ page }) => {
  const editor = page.locator("gleam-energy-graph-editor");
  await editor.evaluate(el => el.setConfig({ price_entity: "sensor.electricity_price" }));
  await editor.locator("summary").filter({ hasText: "Graph settings" }).click();
  const expected = {};
  for (const [name, value] of [["Energy", 30], ["Price", -30], ["Power", 15], ["Voltage", -5]]) {
    const input = editor.getByLabel(`${name} (min)`);
    await expect(input).toHaveValue("0");
    await input.fill(String(value));
    await input.dispatchEvent("change");
    expected[`${name.toLowerCase()}_shift_minutes`] = value;
  }
  expect(await page.evaluate(() => window.editorChanges.at(-1))).toMatchObject(expected);
  const price = editor.getByLabel("Price (min)");
  for (const value of ["-31", "31", "0.5"]) {
    await price.fill(value);
    await price.dispatchEvent("change");
    await expect(editor.getByRole("alert")).toContainText("Price time shift");
  }
  expect(await page.evaluate(() => window.editorChanges.length)).toBe(4);
});

test("optional lane shifts follow sensor selection and preserve saved values", async ({ page }) => {
  const editor = page.locator("gleam-energy-graph-editor");
  await editor.evaluate(el => el.setConfig({ power_entity: "", power_shift_minutes: 12 }));
  await editor.locator("summary").filter({ hasText: "Graph settings" }).click();
  const powerShift = editor.getByLabel("Power (min)");
  await expect(powerShift).toBeHidden();
  await expect(editor.getByLabel("Voltage (min)")).toBeVisible();
  await editor.locator("summary").filter({ hasText: "Optional sensors" }).click();
  const power = editor.locator("#optional").getByLabel("Power", { exact: true });
  await power.fill("sensor.power");
  await power.dispatchEvent("change");
  await expect(powerShift).toBeVisible();
  await expect(powerShift).toHaveValue("12");
  await power.fill("");
  await power.dispatchEvent("change");
  await expect(powerShift).toBeHidden();
  expect(await page.evaluate(() => window.editorChanges.at(-1))).toMatchObject({ power_entity: "", power_shift_minutes: 12 });
});

test("invalid drafts do not emit; related time fields can be corrected together", async ({ page }) => {
  const editor = page.locator("gleam-energy-graph-editor");
  await editor.locator("summary").filter({ hasText: "Graph settings" }).click();
  const total = editor.getByLabel("Time span (hours)", { exact: true });
  const future = editor.getByLabel("Future hours", { exact: true });
  const refresh = editor.getByLabel("Refresh interval (seconds)", { exact: true });
  await total.fill("12");
  await total.dispatchEvent("change");
  await expect(editor.getByRole("alert")).toContainText("less than the total");
  expect(await page.evaluate(() => window.editorChanges.length)).toBe(0);
  await future.fill("0");
  await future.dispatchEvent("change");
  expect(await page.evaluate(() => window.editorChanges.at(-1))).toMatchObject({ hours_to_show: 12, future_hours: 0 });
  await expect(editor.getByRole("alert", { includeHidden: true })).toBeEmpty();
  for (const value of ["4", ""]) {
    await refresh.fill(value);
    await refresh.dispatchEvent("change");
    await expect(editor.getByRole("alert")).toContainText("at least 5");
  }
  expect(await page.evaluate(() => window.editorChanges.length)).toBe(1);
  await refresh.fill("5");
  await refresh.dispatchEvent("change");
  const energy = editor.getByLabel("Sensor", { exact: true });
  await energy.fill("climate.wrong");
  await energy.dispatchEvent("change");
  await expect(editor.getByRole("alert")).toContainText("sensor entity ID");
  expect(await page.evaluate(() => window.editorChanges.length)).toBe(2);
  await energy.fill("sensor.correct");
  await energy.dispatchEvent("change");
  // The emitted configuration must also be accepted by the actual card.
  expect(await page.evaluate(() => {
    const card = document.createElement("gleam-energy-graph");
    card.setConfig(window.editorChanges.at(-1));
    return card._config;
  })).toMatchObject({ energy_entity: "sensor.correct", hours_to_show: 12, future_hours: 0, refresh_interval: 5 });
});

test("editor starts collapsed and reports invalid saved settings outside the groups", async ({ page }) => {
  const editor = page.locator("gleam-energy-graph-editor");
  await expect(editor.locator("input:visible")).toHaveCount(1);
  await expect(editor.locator("summary").first()).toContainText("2 optional sensors available");
  await expect(editor.locator("#time-summary")).toContainText("33 hours · refresh every 10 seconds");
  await editor.evaluate(el => el.setConfig({dataset_spacing: 1.4}));
  await expect(editor.locator("details[open]")).toHaveCount(0);
  await expect(editor.getByRole("alert")).toContainText("whole number");
  await editor.locator("summary").filter({hasText:"Graph settings"}).click();
  await expect(editor.getByLabel("Dataset spacing", { exact: true })).toBeVisible();
  await expect(editor.locator("#optional").getByLabel("Power", {exact: true})).toBeHidden();
});
