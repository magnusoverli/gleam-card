import type { GraphConfig, GraphSeries } from "../../types.ts";

export const palette = ["#22e4ef", "#ff883f", "#64f9a5", "#b48aff"];
export const graphDefaults = {
  title: "", hours_to_show: 24, refresh_interval: 60, dataset_spacing: 5, use_server_time: false,
  show_dataset_buttons: true, show_camera_buttons: true, starting_view: "isometric", lock_navigation: false,
  now_marker_color: "#ff647c", point_light_intensity: 48, readout_value_size: 100,
} as const;
export const seriesDefaults = {
  name: "", plot: "line", opacity: 100, line_width: 100, shift_minutes: 0, visible: true, show_readout: true,
  interval_minutes: 60, aggregate: "mean",
} as const;
export function resolveGraph(config: GraphConfig) {
  const check = (ok: boolean, message: string) => { if (!ok) throw Error(message); };
  const range = (value: number, field: string, min: number, max: number, whole = false) =>
    check(Number.isFinite(value) && value >= min && value <= max && (!whole || Number.isInteger(value)),
      `${field} must be ${whole ? "a whole number " : ""}between ${min} and ${max}.`);
  const colour = (v: string) => check(typeof v === "string" && /^#[0-9a-f]{6}$/i.test(v), "Use a six-digit hex colour.");
  check(Array.isArray(config?.series) && config.series.length > 0 && config.series.length <= 4, "Choose one to four sensor series.");
  const g = { ...graphDefaults, ...config };
  range(g.hours_to_show, "Hours to show", 1 / 60, 168);
  range(g.refresh_interval, "Refresh seconds", 5, 86400);
  range(g.dataset_spacing, "Dataset spacing", 0, 10, true);
  range(g.point_light_intensity, "Point light intensity", 0, 200);
  range(g.readout_value_size, "Readout size", 50, 200);
  colour(g.now_marker_color);
  check(typeof g.title === "string" && ["isometric", "front", "top"].includes(g.starting_view), "Invalid graph title or starting view.");
  check([g.use_server_time, g.show_camera_buttons, g.show_dataset_buttons, g.lock_navigation].every(v => typeof v === "boolean"), "Graph switches must be true or false.");
  const seen = new Set<string>();
  const series = config.series.map((raw: GraphSeries, i) => {
    check(typeof raw?.entity === "string" && /^sensor\.[a-z0-9_]+$/.test(raw.entity), `Choose a sensor for series ${i + 1}.`);
    check(!seen.has(raw.entity), `Sensor ${raw.entity} is already on the graph.`);
    seen.add(raw.entity);
    const s = { ...seriesDefaults, color: palette[i], ...raw };
    check(typeof s.name === "string" && typeof s.visible === "boolean" && typeof s.show_readout === "boolean", "Invalid series name or switch.");
    check(["line", "step", "bar"].includes(s.plot), "Choose Line, Step or Bar.");
    check(["mean", "min", "max", "last"].includes(s.aggregate), "Unknown bar aggregation.");
    colour(s.color);
    range(s.opacity, "Opacity", 0, 100);
    range(s.line_width, "Line width", 25, 300);
    range(s.shift_minutes, "Time shift (minutes)", -30, 30, true);
    range(s.interval_minutes, "Bar interval (minutes)", 1, 10080, true);
    if (s.plot === "bar") check(Math.ceil(g.hours_to_show * 60 / s.interval_minutes) <= 336, "Increase the bar interval to fit at most 336 intervals per series.");
    check([s.min, s.max].every(v => v === undefined || Number.isFinite(v)) &&
      (s.min === undefined || s.max === undefined || s.min < s.max), "Axis bounds must be numbers with minimum below maximum.");
    return s;
  });
  return { ...g, series };
}
export type GraphSettings = ReturnType<typeof resolveGraph>;
export type Series = GraphSettings["series"][number];
