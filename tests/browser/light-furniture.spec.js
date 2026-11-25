import { test, expect } from "@playwright/test";

const numbers = path => path.match(/-?\d+(?:\.\d+)?/g).map(Number);
const corners = coords => [0, 2, 4, 6].map(i => coords.slice(i, i + 2));

test("the smaller windows and 16:9 TV sit flush on all three walls", async ({ page }) => {
  await page.goto("/dev/fixture.html");
  const card = page.locator("gleam-light");
  await card.evaluate(light => light.setConfig({
    zones: [{ entity: "light.kitchen_counter" }], windows: ["left", "back", "right"],
  }));
  const [, frontTop, , rightX, backTop, leftX] = numbers(await card.locator(".room-ceiling").getAttribute("d"));
  const [, backFloor] = numbers(await card.locator(".room-floor").getAttribute("d"));
  const frontLeft = [20, frontTop, 144], backLeft = [leftX, backTop, backFloor];
  const frontRight = [300, frontTop, 144], backRight = [rightX, backTop, backFloor];
  for (const [wall, left, right, span] of [
    ["left", frontLeft, backLeft, 4],
    ["back", backLeft, backRight, 4.8],
    ["right", backRight, frontRight, 4],
  ]) {
    const onWall = ([x, y]) => {
      const t = (x - left[0]) / (right[0] - left[0]);
      const top = left[1] * (1 - t) + right[1] * t;
      const hLeft = left[2] - left[1], hRight = right[2] - right[1];
      const height = hLeft * (1 - t) + hRight * t;
      return [t * hRight / height, (y - top) / height];
    };
    const screen = corners(numbers(await card.locator(`.wall-tv[data-wall="${wall}"] path`).last().getAttribute("d")));
    const [[l, t], [r, topRight], [rightBottom, b], [leftBottom, bottomLeft]] = screen.map(onWall);
    expect(topRight).toBeCloseTo(t, 3);
    expect(bottomLeft).toBeCloseTo(b, 3);
    expect(leftBottom).toBeCloseTo(l, 3);
    expect(rightBottom).toBeCloseTo(r, 3);
    expect((l + r) / 2).toBeCloseTo(.5, 3);
    expect((r - l) * span / ((b - t) * 2.5)).toBeCloseTo(16 / 9, 2);
    const leftHeight = screen[3][1] - screen[0][1], rightHeight = screen[2][1] - screen[1][1];
    if (wall === "left") expect(leftHeight).toBeGreaterThan(rightHeight);
    else if (wall === "right") expect(rightHeight).toBeGreaterThan(leftHeight);
    else expect(leftHeight).toBeCloseTo(rightHeight, 2);

    const frame = card.locator(`.wall-window[data-wall="${wall}"] path`).first();
    const width = await frame.evaluate(path => path.getBBox().width);
    const oldWidth = (right[0] - left[0]) * (wall === "back" ? .4 : .6);
    expect(width).toBeLessThan(oldWidth * .9);
    expect(width).toBeGreaterThan(oldWidth * .8);
  }
});

test("the side walls, windows and TVs mirror around the centre of the room", async ({ page }) => {
  await page.goto("/dev/fixture.html");
  const room = page.locator("gleam-light svg.room");
  const [frontLeft, frontTop, frontRight, right, backTop, left] =
    numbers(await room.locator(".room-ceiling").getAttribute("d"));
  const [floorLeft, backFloor, floorRight, outerRight, outerFloor] =
    numbers(await room.locator(".room-floor").getAttribute("d"));
  const atCentre = (x1, y1, x2, y2) => y1 + (160 - x1) * (y2 - y1) / (x2 - x1);
  expect(frontLeft + frontRight).toBeCloseTo(320, 2);
  expect(left + right).toBeCloseTo(320, 2);
  expect(floorLeft).toBe(left);
  expect(floorRight).toBe(right);
  expect(atCentre(frontLeft, frontTop, left, backTop)).toBeCloseTo(92, 1);
  expect(atCentre(frontRight, frontTop, right, backTop)).toBeCloseTo(92, 1);
  expect(atCentre(outerRight, outerFloor, right, backFloor)).toBeCloseTo(92, 1);
  expect(atCentre(0, outerFloor, left, backFloor)).toBeCloseTo(92, 1);

  for (const [kind, parts] of [["window", [0, 1, 2, 3]], ["tv", [0, 1]]]) {
    for (const part of parts) {
      const shape = async wall => corners(numbers(await room.locator(`.wall-${kind}[data-wall="${wall}"] path`).nth(part).getAttribute("d")));
      const leftShape = await shape("left"), rightShape = await shape("right");
      const mirrorOrder = kind === "window" && part === 2 ? [0, 1, 3, 2] : [1, 0, 3, 2];
      for (const [i, j] of mirrorOrder.entries()) {
        expect(leftShape[i][0] + rightShape[j][0]).toBeCloseTo(320, 2);
        expect(leftShape[i][1]).toBeCloseTo(rightShape[j][1], 2);
      }
    }
  }
});
