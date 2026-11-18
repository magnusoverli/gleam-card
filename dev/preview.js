if (import.meta.env.MODE === "test") await import("/dist/gleam-card.js");
else await import("/src/index.ts");
await import("./demo.js");
