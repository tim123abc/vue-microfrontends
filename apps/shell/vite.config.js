import { microfrontends } from "@vercel/microfrontends/experimental/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env.NEXT_PUBLIC_MFE_CURRENT_APPLICATION": JSON.stringify("shell"),
  },
  plugins: [
    microfrontends(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === "remote-component",
        },
      },
    }),
  ],
});
