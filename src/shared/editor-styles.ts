/** Settings panels follow the Home Assistant theme, not the dashboard card theme. */
export const editorPanelStyles = `
  :host{display:block;color:var(--primary-text-color,#222);font-family:var(--ha-font-family-body,system-ui)}
  form,.fields,label{display:grid;gap:12px}label{gap:6px;font-size:14px}
  [hidden]{display:none!important}
  fieldset,details{min-width:0;margin:0;border:1px solid var(--divider-color,#8886);
    border-radius:12px;background:var(--ha-card-background,var(--card-background-color,transparent))}
  fieldset{padding:8px 14px 14px}
  legend,summary{font-weight:600}legend{padding:0 5px}
  summary{padding:12px 14px;cursor:pointer;border-radius:inherit}
  summary small{display:block;margin:4px 0 0 1.2em;font-weight:400}
  details>.fields{border-top:1px solid var(--divider-color,#8886);padding:14px}
`;
