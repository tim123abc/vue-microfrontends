import { microfrontends } from "@vercel/microfrontends/experimental/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [microfrontends(), vue()],
});
