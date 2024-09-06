import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 用https要用的憑證
import mkcert from "vite-plugin-mkcert";
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";
// vite5不支援require 要這樣處理
import { createRequire } from "module";
const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [
    vue(),
    mkcert(),
    ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
  ],
  server: {
    https: {},
    host: true, // 監聽所有地址，包括局域網和公網地址
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
