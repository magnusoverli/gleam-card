import { test } from "node:test";
import assert from "node:assert/strict";
import { dialAngle, dialFraction } from "../src/cards/thermostat/dial-angle.ts";

test("rendered dial angles round-trip through pointer angles, including the atan2 seam", () => {
  for (let i = 0; i <= 100; i++) {
    const angle = dialAngle(i / 100);
    assert.ok(Math.abs(dialFraction(Math.atan2(Math.sin(angle), Math.cos(angle))) - i / 100) < 1e-12);
  }
  for (const [degrees, expected] of [[-46, 1], [-89, 1], [-91, 0], [-134, 0]]) {
    assert.equal(dialFraction(degrees * Math.PI / 180), expected);
  }
});
