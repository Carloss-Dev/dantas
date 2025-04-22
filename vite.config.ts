import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/dantas/",

  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@screens": path.resolve(__dirname, "src/screens"),
      "@service": path.resolve(__dirname, "src/service"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@schemas": path.resolve(__dirname, "src/schemas"),
    },
  },
});
