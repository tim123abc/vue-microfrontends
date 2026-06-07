import { microfrontends } from "@vercel/microfrontends/experimental/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

function remoteHeader() {
  return {
    name: "analytics-remote-header",
    configureServer(server) {
      server.middlewares.use("/components/header", (_request, response) => {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end(`<!doctype html>
<html lang="en">
  <head>
    <style>
      :host {
        display: block;
      }

      * {
        box-sizing: border-box;
      }

      a {
        color: inherit;
      }

      .topbar {
        align-items: center;
        background: rgba(255, 255, 255, 0.78);
        border-bottom: 1px solid rgba(17, 24, 39, 0.08);
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        padding: 1.25rem max(1.25rem, calc((100vw - 1100px) / 2 + 1.25rem));
      }

      .brand {
        font-weight: 800;
        text-decoration: none;
      }

      .links {
        display: flex;
        gap: 0.5rem;
      }

      .links a {
        border: 1px solid rgba(17, 24, 39, 0.14);
        border-radius: 8px;
        padding: 0.65rem 0.9rem;
        text-decoration: none;
      }

      .links a[aria-current="page"] {
        background: #111827;
        color: #fff;
      }

      .badge {
        color: #b54736;
        font-size: 0.74rem;
        font-weight: 800;
        margin-left: 0.5rem;
        text-transform: uppercase;
      }

      @media (max-width: 720px) {
        .topbar {
          align-items: flex-start;
          flex-direction: column;
        }
      }
    </style>
  </head>
  <body>
    <remote-component name="__REMOTE_COMPONENT__">
      <nav class="topbar" aria-label="Primary">
        <a class="brand" href="/">Vue MFEs <span class="badge">remote</span></a>
        <div class="links">
          <a aria-current="page" href="/">Shell</a>
          <a href="/analytics/">Analytics</a>
        </div>
      </nav>
    </remote-component>
  </body>
</html>`);
      });
    },
  };
}

export default defineConfig({
  plugins: [remoteHeader(), microfrontends({ basePath: "/analytics" }), vue()],
});
