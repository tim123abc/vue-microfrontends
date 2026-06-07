import { microfrontends } from "@vercel/microfrontends/experimental/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const sharedStyles = `
      :host {
        display: block;
      }

      * {
        box-sizing: border-box;
      }

      a {
        color: inherit;
      }
`;

function remoteComponentDocument(markup) {
  return `<!doctype html>
<html lang="en">
  <head>
    <style>
${sharedStyles}
      .topbar,
      .footer {
        align-items: center;
        background: rgba(255, 255, 255, 0.78);
        border-color: rgba(17, 24, 39, 0.08);
        border-style: solid;
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        padding: 1.25rem max(1.25rem, calc((100vw - 1100px) / 2 + 1.25rem));
      }

      .topbar {
        border-width: 0 0 1px;
      }

      .footer {
        border-width: 1px 0 0;
        color: #4b5563;
        font-size: 0.95rem;
      }

      .brand {
        color: #111827;
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

      .footer strong {
        color: #111827;
      }

      @media (max-width: 720px) {
        .topbar,
        .footer {
          align-items: flex-start;
          flex-direction: column;
        }
      }
    </style>
  </head>
  <body>
    <remote-component name="__REMOTE_COMPONENT__">
${markup}
    </remote-component>
  </body>
</html>`;
}

function analyticsRemoteComponents() {
  const components = {
    "/components/header": `
      <nav class="topbar" aria-label="Primary">
        <a class="brand" href="/">Vue MFEs <span class="badge">remote</span></a>
        <div class="links">
          <a aria-current="page" href="/">Shell</a>
          <a href="/analytics/">Analytics</a>
        </div>
      </nav>`,
    "/components/footer": `
      <footer class="footer">
        <span><strong>Remote footer</strong> from the analytics app</span>
        <span>Served by the analytics Vite plugin at /components/footer</span>
      </footer>`,
  };

  return {
    name: "analytics-remote-components",
    configureServer(server) {
      for (const [path, markup] of Object.entries(components)) {
        server.middlewares.use(path, (_request, response) => {
          response.setHeader("Content-Type", "text/html; charset=utf-8");
          response.end(remoteComponentDocument(markup));
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [
    analyticsRemoteComponents(),
    microfrontends({ basePath: "/analytics" }),
    vue(),
  ],
});
