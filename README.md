# Vue + Vercel Microfrontends

Local playground with two independent Vue/Vite apps routed by Vercel's microfrontends proxy.

- `shell` runs on port `3100` and owns `/`.
- `analytics` runs on port `3101` and owns `/analytics`.
- The Vercel microfrontends proxy runs on port `3124`.

## Run it

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3124` and use the nav links to move between apps through the proxy. `/analytics` redirects to `/analytics/` so Vite serves the analytics app with the right asset base.

You can also run the pieces separately:

```bash
pnpm --filter shell dev
pnpm --filter analytics dev
pnpm proxy
```

## Why the proxy?

The local proxy reads `microfrontends.json` and routes each path to the matching local application. In production, Vercel uses that same configuration to route requests between independently deployed apps.
