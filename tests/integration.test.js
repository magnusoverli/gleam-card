import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { deploy, loader } from "../scripts/deploy.js";
import { planClimateCommand, roundTemperature, sendClimateCommand } from "../src/cards/thermostat/commands.ts";
import { readHistory, readStatistics } from "../src/cards/energy-graph/recorder.ts";

test("deployment is repeatable, immutable and preserves previous builds", async () => {
  const root = await mkdtemp(join(tmpdir(), "gleam-deploy-"));
  try {
    const bundle = join(root, "build.js");
    await writeFile(bundle, "/* first */");
    const first = await deploy(bundle, root);
    assert.deepEqual(await deploy(bundle, root), first);
    await writeFile(bundle, "/* second */");
    const second = await deploy(bundle, root);
    assert.notEqual(first.file, second.file);
    assert.equal(await readFile(join(first.directory, first.file), "utf8"), "/* first */");
    assert.deepEqual(JSON.parse(await readFile(join(first.directory, "manifest.json"), "utf8")), { file: second.file });
    assert.equal(await readFile(join(first.directory, "loader.js"), "utf8"), loader);
    await writeFile(join(first.directory, "loader.js"), "user content");
    await assert.rejects(deploy(bundle, root), /refusing to overwrite/);
    assert.equal(await readFile(join(first.directory, "loader.js"), "utf8"), "user content");
  } finally { await rm(root, { recursive: true, force: true }); }
});

const climate = {
  state: "heat",
  attributes: { supported_features: 1, temperature: 22, min_temp: 16, max_temp: 30, target_temp_step: .5, hvac_modes: ["off", "heat"] },
};
test("climate planning rejects invalid values and unsupported actions without sending", () => {
  for (const temperature of [NaN, Infinity, 31, 22.1, "22"]) {
    assert.equal(planClimateCommand(climate, "set_temperature", { temperature }), null);
  }
  assert.equal(planClimateCommand(climate, "set_fan_mode", { fan_mode: "auto" }), null);
  assert.equal(planClimateCommand({ ...climate, state: "unavailable" }, "set_temperature", { temperature: 23 }), null);
  assert.equal(planClimateCommand(climate, "set_temperature", { temperature: 22 }).unchanged, true);
  assert.equal(roundTemperature(23.24, climate), 23);
});
test("climate transport targets exactly the selected entity", async () => {
  const calls = [];
  await sendClimateCommand({ callService: async (...args) => calls.push(args) },
    "climate.demo", "set_temperature", { temperature: 23, entity_id: "climate.wrong" });
  assert.deepEqual(calls, [["climate", "set_temperature", { temperature: 23, entity_id: "climate.demo" }]]);
});
test("Recorder adapters preserve timestamps, selected entity and request failures", async () => {
  const requests = [];
  const rows = [{ start: "2026-11-18T10:00:00Z", state: 10 }];
  const client = { callWS: async request => { requests.push(request); return { "sensor.demo": rows }; } };
  assert.deepEqual(await readStatistics(client, "sensor.demo", 0, 3600000), rows);
  assert.deepEqual(await readHistory(client, ["sensor.demo", "sensor.other"], 0, 3600000), { "sensor.demo": rows });
  assert.deepEqual(requests[1].entity_ids, ["sensor.demo", "sensor.other"]);
  assert.deepEqual(requests[0].statistic_ids, ["sensor.demo"]);
  assert.equal(requests[0].start_time, "1970-01-01T00:00:00.000Z");
  assert.equal(requests[1].include_start_time_state, true);
  const failure = { callWS: async () => { throw new Error("Recorder unavailable"); } };
  await assert.rejects(readStatistics(failure, "sensor.demo", 0, 1), /Recorder unavailable/);
  await assert.rejects(readHistory(failure, ["sensor.demo"], 0, 1), /Recorder unavailable/);
});
