import test from "node:test";
import assert from "node:assert/strict";
import { EditorPreview } from "../src/shared/editor-preview.ts";

test("preview coalesces drafts, flushes once, recognises host echoes and cancels stale frames", () => {
  const frames = new Map(), values = [], host = new EventTarget(), preview = new EditorPreview(host);
  let id = 0;
  globalThis.requestAnimationFrame = cb => {
    const key = ++id;
    frames.set(key, () => { frames.delete(key); cb(); });
    return key;
  };
  globalThis.cancelAnimationFrame = key => frames.delete(key);
  host.addEventListener("config-changed", e => values.push(e.detail.config.name));
  try {
    assert.equal(preview.isEcho({ name: "Original" }), false);
    preview.queue({ name: "A" });
    preview.queue({ name: "AB" });
    assert.equal(frames.size, 1);
    frames.get(id)();
    preview.emit({ name: "AB" }); // trailing change
    preview.queue({ name: "ABC" });
    preview.emit({ name: "ABC" }); // commit beats the frame
    assert.deepEqual(values, ["AB", "ABC"]);
    assert.equal(frames.size, 0);
    assert.equal(preview.isEcho({ name: "AB" }), true);
    assert.equal(preview.isEcho({ name: "ABC" }), true);
    preview.queue({ name: "Obsolete" });
    assert.equal(preview.isEcho({ name: "Original" }), false);
    assert.equal(frames.size, 0);
    // If HA renders only the final A in an A → B → A sequence, a later undo to B
    // is an external edit, not an unacknowledged echo.
    for (const name of ["A", "B", "A"]) preview.emit({ name });
    assert.equal(preview.isEcho({ name: "A" }), true);
    assert.equal(preview.isEcho({ name: "B" }), false);
    preview.queue({ name: "Disconnected" });
    preview.cancel();
    assert.equal(frames.size, 0);
  } finally {
    delete globalThis.requestAnimationFrame;
    delete globalThis.cancelAnimationFrame;
  }
});
