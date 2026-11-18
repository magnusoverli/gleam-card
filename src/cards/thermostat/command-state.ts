import type { EntityState } from "../../types";

type Request = { field: string; value: unknown };
type State = { phase: "idle"; message: string }
  | { phase: "sending" | "awaiting_report"; request: Request };

export class CommandState {
  #state: State = { phase: "idle", message: "" };
  #timer?: number;

  get busy() { return this.#state.phase !== "idle"; }
  get message() {
    switch (this.#state.phase) {
      case "idle": return this.#state.message;
      case "sending": return "Sending command…";
      case "awaiting_report": return "Command sent · awaiting reported state";
    }
  }

  reset(message = "") {
    window.clearTimeout(this.#timer);
    this.#state = { phase: "idle", message };
  }

  confirm(state?: EntityState) {
    if (!state || ["unknown", "unavailable"].includes(state.state) || this.#state.phase === "idle") return false;
    const { field, value } = this.#state.request;
    if ((field === "hvac_mode" ? state.state : state.attributes[field]) !== value) return false;
    this.reset();
    return true;
  }

  async send(request: Request, timeoutMs: number, dispatch: () => Promise<unknown>, changed: () => void) {
    if (this.busy) return;
    const sending = { phase: "sending", request } as const;
    this.#state = sending;
    this.#timer = window.setTimeout(() => {
      if (this.#state.phase === "idle" || this.#state.request !== request) return;
      this.reset("Command outcome unknown: Home Assistant has not reported the requested state. No automatic retry was made.");
      changed();
    }, timeoutMs);
    changed();
    try {
      await dispatch();
    } catch (error) {
      if (this.#state !== sending) return;
      this.reset(`Command failed: ${error instanceof Error ? error.message : String((error as { message?: string } | null)?.message ?? "unknown error")}`);
      changed();
      return;
    }
    if (this.#state !== sending) return;
    this.#state = { phase: "awaiting_report", request };
    changed();
  }
}
