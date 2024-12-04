import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/theme/variables.scss";`,
      },
    },
  },
});
