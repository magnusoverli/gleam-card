interface PreviewCard extends HTMLElement {
  preview?: boolean;
  setConfig(config: object): void;
}

/** Only use the unambiguous, top-level card in this editor's own HA preview.
 * Never search the dashboard, target a nested card, or change HA host internals. */
export function dialogPreview(editor: HTMLElement, expected: string | undefined) {
  let node: Element | null = editor;
  while (node && node.localName !== "hui-dialog-edit-card") {
    const root = node.getRootNode();
    node = node.parentElement ?? (root instanceof ShadowRoot ? root.host : null);
  }
  const dialog = node?.shadowRoot;
  const pane = dialog?.querySelector(".element-preview");
  if (!dialog || !pane) return;
  const section = pane.querySelector(":scope > hui-section");
  const wrappers = section
    ? section.querySelector("hui-grid-section")?.shadowRoot?.querySelectorAll("hui-card")
    : pane.querySelectorAll(":scope > hui-card");
  if (wrappers?.length !== 1) return;
  const wrapper = wrappers[0] as HTMLElement & { config?: object };
  if (!wrapper.config || JSON.stringify(wrapper.config) !== expected) return;
  const card = wrapper?.firstElementChild as PreviewCard | null;
  if (card?.preview === true && `${card.localName}-editor` === editor.localName &&
      typeof card.setConfig === "function" && wrapper.childElementCount === 1) return { card, dialog };
}
