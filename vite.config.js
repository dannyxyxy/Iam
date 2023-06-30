import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: { chunkSizeWarningLimit: 1600 },
  alias: {
    "~": path.resolve(__dirname, "node_modules"),
    "@": path.resolve(__dirname, "src"),
  },
});
