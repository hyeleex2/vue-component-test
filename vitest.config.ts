import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    root: fileURLToPath(new URL("./", import.meta.url)),
  },
});
