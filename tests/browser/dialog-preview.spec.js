import { expect, test } from "@playwright/test";

// Model hui-card in preview mode: changing wrapper.config creates a new card.
// Deliberately do not wire config-changed to the existing card's setConfig.
for (const layout of ["card", "section"]) {
  test(`${layout} dialog: drag updates the existing scene; release publishes the final config once`, async ({ page }) => {
    await page.goto("/light/");
    await page.waitForFunction(() => window.demo?.light);
    const result = await page.evaluate(async layout => {
      const { light, hass, calls } = window.demo;
      const editor = light.constructor.getConfigElement();
      const dialog = document.createElement("hui-dialog-edit-card").attachShadow({ mode: "open" });
      document.body.prepend(dialog.host);
      dialog.innerHTML = `<div class="element-preview"></div><div class="editor"></div><button>Save</button>`;
      dialog.querySelector(".editor").attachShadow({ mode: "open" }).append(editor);
      const pane = dialog.querySelector(".element-preview"), wrapper = document.createElement("hui-card");
      if (layout === "section") {
        const section = document.createElement("hui-section"), grid = document.createElement("hui-grid-section");
        section.append(grid); pane.append(section); grid.attachShadow({ mode: "open" }).append(wrapper);
      } else pane.append(wrapper);

      const base = { type: "custom:gleam-light", zones: [{entity: "light.kitchen_counter"}], grid_options: {columns: 6} };
      const replace = config => {
        wrapper.config = structuredClone(config);
        const card = document.createElement("gleam-light");
        card.preview = true; card.setConfig(config); card.hass = hass; wrapper.replaceChildren(card);
      };
      replace(base); editor.setConfig(base); editor.hass = hass;
      const commits = [];
      editor.addEventListener("config-changed", ({ detail: {config} }) => {
        commits.push(config); replace(config); editor.setConfig(structuredClone(config));
      });
      const beam = editor.shadowRoot.querySelector("#beam"), initial = wrapper.firstElementChild;
      const frame = () => new Promise(requestAnimationFrame);
      wrapper.style.display = "block";
      while (!initial.shadowRoot.querySelector(".fixtures ellipse")) await frame();
      const lens = initial.shadowRoot.querySelector(".fixtures ellipse");
      beam.focus();
      for (const angle of [45, 50, 55, 60]) {
        beam.value = String(angle); beam.dispatchEvent(new Event("input", { bubbles: true }));
        await frame();
      }
      const during = { changes: commits.length, same: initial === wrapper.firstElementChild,
        retained: lens === wrapper.firstElementChild.shadowRoot.querySelector(".fixtures ellipse"), angle: initial.config.beam_angle };
      beam.dispatchEvent(new Event("change", { bubbles: true }));
      const after = { changes: commits.length, config: commits.at(-1), replaced: wrapper.firstElementChild !== initial };

      const name = editor.shadowRoot.querySelector("#name"); name.focus();
      for (const value of ["K", "Ki", "Kitchen"]) {
        name.value = value; name.dispatchEvent(new Event("input", { bubbles: true })); await frame();
      }
      const typed = wrapper.firstElementChild.shadowRoot.querySelector("h2").textContent;
      // Mimic a dialog footer that saves without taking focus.
      dialog.querySelector("button").dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, composed: true }));
      return {during, after, typed, savedName: wrapper.config.name, count: commits.length, commands: calls.length};
    }, layout);
    expect(result).toMatchObject({ during: {changes: 0, same: true, retained: true, angle: 60},
      after: {changes: 1, replaced: true, config: {beam_angle: 60, grid_options: {columns: 6}}},
      typed: "Kitchen", savedName: "Kitchen", count: 2, commands: 0 });
  });
}

test("an ambiguous dialog uses host events and never applies a draft to a neighbour", async ({ page }) => {
  await page.goto("/light/");
  await page.waitForFunction(() => window.demo?.light);
  expect(await page.evaluate(async () => {
    const { light } = window.demo, editor = light.constructor.getConfigElement();
    const dialog = document.createElement("hui-dialog-edit-card").attachShadow({mode:"open"});
    document.body.prepend(dialog.host);
    dialog.innerHTML = '<div class="element-preview"><hui-card></hui-card><hui-card></hui-card></div>';
    const config = {type:"custom:gleam-light", zones:[{entity:"light.kitchen_counter"}]};
    for (const wrapper of dialog.querySelectorAll("hui-card")) {
      const card = document.createElement("gleam-light");
      wrapper.config = config; card.preview = true; card.setConfig(config); wrapper.append(card);
    }
    dialog.append(editor); editor.setConfig(config);
    let emissions = 0;
    editor.addEventListener("config-changed", () => emissions++);
    const beam = editor.shadowRoot.querySelector("#beam");
    beam.focus(); beam.value = "55"; beam.dispatchEvent(new Event("input", {bubbles:true}));
    await new Promise(requestAnimationFrame);
    return [emissions, ...Array.from(dialog.querySelectorAll("gleam-light"), card => card.config.beam_angle)];
  })).toEqual([1, 40, 40]);
});
