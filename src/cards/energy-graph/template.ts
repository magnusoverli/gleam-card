import { foundationStyles } from "../../shared/theme";

export const graphTemplate = `
  <style>
    ${foundationStyles}
    :host{display:block;container-type:inline-size;color:#d8edff;font-family:var(--ha-font-family-body,Inter,system-ui,sans-serif)}
    *{box-sizing:border-box}ha-card{display:block;overflow:hidden;border:1px solid #1d3b60;border-radius:22px;
      background:radial-gradient(ellipse at 16% 0%,#122c60 0%,#080e24 50%,#050914 100%);
      box-shadow:0 12px 50px #02071680;color:#d8edff}
    header{display:flex;flex-wrap:wrap;align-items:flex-start;gap:12px;padding:14px 22px 6px}
    .readouts,.controls{display:grid;gap:8px;max-width:100%}.controls{margin-left:auto}
    .eyebrow{font-size:10px;font-weight:700;letter-spacing:.24em;color:#67c7e3}
    h2{font-size:25px;letter-spacing:-.04em;margin:0;font-weight:600;overflow-wrap:anywhere}
    .sub{font-size:12px;color:#8ba8c6;line-height:1.6}.kpis{display:flex;gap:24px}
    .kpi span{display:block;font-size:10px;letter-spacing:.09em;color:#8ba8c6;text-transform:uppercase}
    .kpi strong{display:block;margin-top:6px;font-size:calc(var(--value-base,23px) * var(--value-scale,1));font-weight:500;white-space:nowrap}
    .live{color:var(--gleam-energy)}.price{color:var(--gleam-price)}
    nav{display:flex;justify-content:flex-end;gap:7px;flex-wrap:wrap}
    button{font:inherit;cursor:pointer;border:1px solid #24405f;background:#0b1830;color:#9fb4cb;
      padding:7px 10px;border-radius:30px;font-size:11px;display:flex;align-items:center;gap:7px;white-space:nowrap}
    button[aria-pressed=true]{color:#f0faff;border-color:#406580;background:#102944}
    button:focus-visible{outline:2px solid #7eeaff;outline-offset:3px}
    .dot{width:7px;height:7px;border-radius:50%;background:var(--color);box-shadow:0 0 10px var(--color)}
    .stage{position:relative;width:100%;aspect-ratio:2.2;min-height:220px;max-height:650px}
    .camera-controls{gap:6px}
    [hidden]{display:none!important}
    .camera-controls button{font-size:10px;padding:6px 9px}
    canvas{display:block;width:100%;height:100%;touch-action:none}
    .tip{position:absolute;pointer-events:none;z-index:2;display:none;white-space:pre-line;line-height:1.8;
      border:1px solid #408ca2;background:#071426ed;box-shadow:0 8px 28px #0008;
      padding:10px 14px;border-radius:10px;font-size:12px;color:#e5fbff;max-width:240px}
    .notice{padding:0 28px 12px;color:#f5ba83;font-size:12px;white-space:pre-line}
    .notice:empty{display:none}
    .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
    @container(max-width:780px){header{padding:14px 16px 4px}
      .kpis{gap:18px;--value-base:20px}.kpi span{font-size:9px}}
    @container(max-width:450px){header{gap:10px;padding:14px 12px 4px}
      .kpis{gap:12px}.kpi span{max-width:100px;line-height:1.5;font-size:8px}
      button{font-size:10px;padding:7px 9px}.stage{min-height:200px}
       .camera-controls{gap:4px}
      .camera-controls button{font-size:9px;padding:5px 7px}}
  </style>
  <ha-card>
    <header>
      <div class="readouts">
      <h2 class="card-title" hidden></h2>
      <div class="kpis">
        <div class="kpi"><span class="live-label"></span><strong class="live">—</strong></div>
        <div class="kpi"><span class="price-label">Current price</span><strong class="price">—</strong></div>
      </div>
      </div>
      <div class="controls">
      <nav class="series-controls" aria-label="Chart series">
        <button data-series="energy" aria-pressed="true"><i class="dot" style="--color:var(--gleam-energy)"></i>Energy</button>
        <button data-series="price" aria-pressed="true"><i class="dot" style="--color:var(--gleam-price)"></i>Price + forecast</button>
        <button data-series="power" aria-pressed="false"><i class="dot" style="--color:var(--gleam-power)"></i>Power</button>
        <button data-series="voltage" aria-pressed="false"><i class="dot" style="--color:var(--gleam-voltage)"></i>Voltage</button>
      </nav>
      <nav class="camera-controls" aria-label="Camera angles">
        <button data-camera="isometric" aria-pressed="true">Isometric</button>
        <button data-camera="front" aria-pressed="false">Front</button>
        <button data-camera="top" aria-pressed="false">Top</button>
      </nav>
      </div>
    </header>
    <div class="stage" role="group" aria-label="Interactive 3D energy and price chart.">
      <div class="tip"></div>
    </div>
    <div class="notice" role="status"></div>
  </ha-card>`;
