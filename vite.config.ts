import { defineConfig } from "vite";
import { readFileSync } from "node:fs";

export default defineConfig({
  build: {
    target: "es2022",
    lib: { entry: "src/index.ts", formats: ["es"], fileName: () => "gleam-card.js" },
    rolldownOptions: {
      output: {
        banner: `/*! Gleam Card | Original code: Unlicense\n${readFileSync("THIRD_PARTY_NOTICES.md", "utf8")}\n*/`,
      },
    },
  },
  plugins: [{
    name: "reload-custom-elements",
    handleHotUpdate({ file, server }) {
      if (file.replaceAll("\\", "/").includes("/src/")) {
        server.ws.send({ type: "full-reload" });
        return [];
      }
    },
  }, {
    name: "distribution-licenses",
    generateBundle() {
      for (const fileName of ["LICENSE", "THIRD_PARTY_NOTICES.md"]) {
        this.emitFile({ type: "asset", fileName, source: readFileSync(fileName, "utf8") });
      }
    },
  }],
});
