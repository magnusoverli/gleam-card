import { graphFrame } from "../../shared/graph/frame";

export const graphTemplate = graphFrame(
  `<div class="kpi"><span class="live-label"></span><strong class="live">—</strong></div>
   <div class="kpi"><span class="price-label">Current price</span><strong class="price">—</strong></div>`,
  ["energy", "price", "power", "voltage"].map((key, i) =>
    `<button data-series="${key}" aria-pressed="${i < 2}"><i class="dot" style="--color:var(--gleam-${key})"></i>${["Energy", "Price + forecast", "Power", "Voltage"][i]}</button>`).join(""),
  "Interactive 3D energy and price chart.");
