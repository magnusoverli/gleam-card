import {fileURLToPath} from "node:url";

/** Mount the production resource in a blank browser page, without a demo server. */
export async function loadCardBundle(page) {
  const base = "http://ha-preview.test";
  await page.route(`${base}/`, route => route.fulfill({contentType:"text/html", body:"<!doctype html><html><body></body></html>"}));
  await page.route(`${base}/card.js`, route => route.fulfill({contentType:"text/javascript",
    path:fileURLToPath(new URL("../../dist/gleam-card.js", import.meta.url))}));
  await page.goto(base);
  await page.addScriptTag({type:"module", url:`${base}/card.js`});
  await page.evaluate(() => customElements.whenDefined("gleam-light").then(() => true));
}
