import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile, rename, rm } from "node:fs/promises";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";

export const loader = `const response = await fetch(new URL("./manifest.json?t=" + Date.now(), import.meta.url), { cache: "no-store" });
if (!response.ok) throw new Error("Gleam Card: manifest could not be loaded");
const { file } = await response.json();
if (!/^gleam-card\\.[a-f0-9]{16}\\.js$/.test(file)) throw new Error("Gleam Card: invalid manifest");
await import(new URL(file, import.meta.url).href);
`;

/** Publish the manifest last: readers see either the previous or the new build. */
export async function deploy(bundlePath, configPath) {
  const bundle = await readFile(bundlePath);
  const hash = createHash("sha256").update(bundle).digest("hex").slice(0, 16);
  const directory = join(resolve(configPath), "www", "gleam-card");
  await mkdir(directory, { recursive: true });
  const loaderPath = join(directory, "loader.js");
  try {
    await writeFile(loaderPath, loader, { flag: "wx" });
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
    if (await readFile(loaderPath, "utf8") !== loader) {
      throw new Error("Existing loader.js differs; refusing to overwrite it.");
    }
  }
  const file = `gleam-card.${hash}.js`;
  try {
    await writeFile(join(directory, file), bundle, { flag: "wx" });
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
    if (!(await readFile(join(directory, file))).equals(bundle)) throw new Error("Bundle hash collision or modified deployment.");
  }
  const temporary = join(directory, `manifest.${randomUUID()}.tmp`);
  try {
    await writeFile(temporary, JSON.stringify({ file }) + "\n", { flag: "wx" });
    await rename(temporary, join(directory, "manifest.json"));
  } finally {
    await rm(temporary, { force: true });
  }
  return { directory, file, resource: "/local/gleam-card/loader.js" };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [, , flag, config, ...extra] = process.argv;
  if (flag !== "--config" || !config || extra.length) {
    throw new Error('Usage: npm run deploy -- --config "<Home Assistant config directory>"');
  }
  console.log(await deploy(new URL("../dist/gleam-card.js", import.meta.url), config));
}
