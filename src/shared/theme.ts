/** Include first in each dashboard card's shadow root; editors use HA styling. */
export const foundationStyles = `
  :host {
    color-scheme: dark;
    display: block;
    color: var(--gleam-text, #d8edff);
    font-family: var(--ha-font-family-body, Inter, system-ui, sans-serif);
  }
  * { box-sizing: border-box; }
  .experimental { display:inline-block;margin-top:3px;padding:2px 7px;border:1px solid #796340;
    border-radius:12px;color:#ffd598;font-size:10px }
  [hidden] { display: none !important; }
  ha-card {
    display: block;
    overflow: hidden;
    color: inherit;
    border: 1px solid var(--gleam-border, #1d3b60);
    border-radius: var(--gleam-radius, 22px);
    background: radial-gradient(ellipse at 16% 0%, #122c60 0%, var(--gleam-surface, #080e24) 50%, #050914 100%);
    box-shadow: 0 12px 50px #02071680;
  }
  button, select {
    font: inherit;
    cursor: pointer;
    border: 1px solid var(--gleam-control-border, #24405f);
    border-radius: 30px;
    background: var(--gleam-control-surface, #0b1830);
    color: var(--gleam-control-text, #9fb4cb);
  }
  button { padding: 7px 10px; font-size: 11px; }
  button[aria-pressed=true] { color: #f0faff; border-color: #406580; background: #102944; }
  button, input, select, summary { -webkit-tap-highlight-color: transparent; }
  :focus-visible {
    outline: 2px solid var(--gleam-focus, #7eeaff);
    outline-offset: 3px;
  }
`;
