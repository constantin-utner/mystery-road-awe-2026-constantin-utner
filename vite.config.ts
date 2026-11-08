import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const base = "/mystery-road-awe-2026-constantin-utner/";

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    proxy: {
      [`${base}api`]: {
        target: "http://127.0.0.1:3001",
        rewrite: (path) => `/${path.slice(base.length)}`,
      },
    },
  },
  build: {
    rolldownOptions: {
      input: {
        vanilla: fileURLToPath(new URL("./index.html", import.meta.url)),
        react: fileURLToPath(new URL("./react.html", import.meta.url)),
      },
    },
  },
});
