import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { normalizePath } from "vite";
import path from "path";

const globalStyle = normalizePath(
  path.resolve("./src/assets/styles/global.less")
);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${globalStyle}";`,
      },
    },
    postcss: {
      plugins: [
      ],
    },
  },
});