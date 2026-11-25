import { test, expect } from "@playwright/test";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, basename } from "node:path";
import { deploy } from "../../scripts/deploy.js";

test("one resource URL loads the latest deployed hash after a reload", async ({ page }) => {
  const root = await mkdtemp(join(tmpdir(), "gleam-loader-"));
  try {
    const bundle = join(root, "bundle.js");
    const source = await readFile("dist/gleam-card.js", "utf8");
    await writeFile(bundle, source);
    const first = await deploy(bundle, root);
    const loaded = [];
    await page.route("**/local/gleam-card/*", async route => {
      const file = basename(new URL(route.request().url()).pathname);
      loaded.push(file);
      await route.fulfill({ body: await readFile(join(first.directory, file)),
        contentType: file.endsWith(".json") ? "application/json" : "text/javascript" });
    });
    await page.route("**/deployment-test", route => route.fulfill({
      contentType: "text/html",
      body: '<script type="module" src="/local/gleam-card/loader.js"></script>',
    }));
    await page.goto("/deployment-test");
    await expect.poll(() => page.evaluate(() => window.customCards?.length)).toBe(5);
    expect(loaded).toContain(first.file);
    await writeFile(bundle, source + "\nwindow.deploymentUpdated = true;\n");
    const second = await deploy(bundle, root);
    await page.reload();
    await expect.poll(() => page.evaluate(() => window.deploymentUpdated)).toBe(true);
    expect(loaded).toContain(second.file);
    expect(second.file).not.toBe(first.file);
  } finally { await rm(root, { recursive: true, force: true }); }
});
