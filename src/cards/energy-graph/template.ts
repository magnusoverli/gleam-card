import { foundationStyles } from "../../shared/theme";

export const graphTemplate = `
  <style>
    ${foundationStyles}
    :host{container-type:inline-size}
    header{display:flex;flex-wrap:wrap;align-items:flex-start;gap:12px;padding:14px 22px 6px}
    .readouts,.controls{display:grid;gap:8px;max-width:100%}.controls{margin-left:auto}
    .eyebrow{font-size:10px;font-weight:700;letter-spacing:.24em;color:#67c7e3}
    h2{font-size:25px;letter-spacing:-.04em;margin:0;font-weight:600;overflow-wrap:anywhere}
    .sub{font-size:12px;color:var(--gleam-muted,#8ba8c6);line-height:1.6}.kpis{display:flex;gap:24px}
    .kpi span{display:block;font-size:10px;letter-spacing:.09em;color:var(--gleam-muted,#8ba8c6);text-transform:uppercase}
    .kpi strong{display:block;margin-top:6px;font-size:calc(var(--value-base,23px) * var(--value-scale,1));font-weight:500;white-space:nowrap}
    .live{color:var(--gleam-energy)}.price{color:var(--gleam-price)}
    nav{display:flex;justify-content:flex-end;gap:7px;flex-wrap:wrap}
    button{display:flex;align-items:center;gap:7px;white-space:nowrap}
    .dot{width:7px;height:7px;border-radius:50%;background:var(--color);box-shadow:0 0 10px var(--color)}
    .stage{position:relative;width:100%;aspect-ratio:2.2;min-height:220px;max-height:650px}
    .camera-controls{gap:6px}
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
