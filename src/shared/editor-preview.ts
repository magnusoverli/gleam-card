import { dialogPreview } from "./dialog-preview.ts";

/** Publish validated editor snapshots to Home Assistant, never to a device. */
export class EditorPreview<T extends object = object> {
  private readonly host: HTMLElement;
  private frame = 0;
  private pending?: T;
  private last?: string;
  private baseline?: string;
  private local?: T;
  private localTarget?: HTMLElement;
  private dialog?: ShadowRoot;
  private flush = () => {
    if (this.local && this.host.isConnected) this.emit(this.pending ?? this.local);
  };
  private beforeDialogAction = (e: Event) => { if (!e.composedPath().includes(this.host)) this.flush(); };
  // HA can echo an older snapshot after the next input. Drop acknowledged entries.
  private outstanding: string[] = [];

  constructor(host: HTMLElement) {
    this.host = host;
    // Commit the last valid draft even if a later incomplete value doesn't fire change.
    host.addEventListener("focusout", this.flush);
    host.addEventListener("keydown", e => {
      if (e.key === "Enter" || ((e.ctrlKey || e.metaKey) && ["s", "y"].includes(e.key.toLowerCase()))) this.flush();
    });
  }

  /** A new external config is authoritative; echoes must not replace an active draft. */
  isEcho(config: T) {
    const key = JSON.stringify(config);
    const i = this.outstanding.lastIndexOf(key);
    if (i >= 0) this.outstanding.splice(0, i + 1);
    if (i >= 0 || key === this.last) return true;
    this.cancel();
    this.last = key;
    this.baseline = key;
    this.outstanding = [];
    return false;
  }

  emit(config: T) {
    const key = JSON.stringify(config);
    // Pointer release can beat the queued frame when returning to the host value.
    if (this.local && key === this.last && this.host.isConnected && JSON.stringify(this.local) !== key)
      dialogPreview(this.host, this.last)?.card.setConfig(config);
    this.cancel();
    if (key === this.last) return;
    this.last = key;
    if (this.outstanding.length >= 8) this.outstanding.shift();
    this.outstanding.push(key);
    this.host.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config }, bubbles: true, composed: true,
    }));
  }

  /** HA replaces preview cards on config-changed. Once dirty, update the same
   * visual instance during a gesture and publish its final value on native change.
   * Other hosts keep the standard event path. */
  live(config: T) {
    const field = this.host.shadowRoot?.activeElement;
    const dragging = field?.localName === "input" && (field as HTMLInputElement).type === "range";
    const target = this.host.isConnected && (dragging || this.last !== this.baseline)
      ? dialogPreview(this.host, this.last) : undefined;
    if (!target) { this.emit(config); return; }
    const { card, dialog } = target;
    if (!this.dialog) {
      // Don't depend on a footer button taking focus (not universal on touch/Safari).
      this.dialog = dialog;
      dialog.addEventListener("pointerdown", this.beforeDialogAction, true);
    }
    if (this.localTarget !== card || JSON.stringify(this.local) !== JSON.stringify(config)) card.setConfig(config);
    this.local = config;
    this.localTarget = card;
  }

  queue(config: T) {
    this.pending = config;
    if (!this.frame) this.frame = requestAnimationFrame(() => {
      const latest = this.pending;
      this.frame = 0;
      this.pending = undefined;
      if (latest) this.live(latest);
    });
  }

  cancel() {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.pending = undefined;
    this.local = undefined;
    this.localTarget = undefined;
    this.dialog?.removeEventListener("pointerdown", this.beforeDialogAction, true);
    this.dialog = undefined;
  }
}
