<script setup>
const cards = [
  {
    label: "Routing source",
    value: "microfrontends.json",
    detail: "The proxy sends /analytics to the analytics app.",
  },
  {
    label: "Local app",
    value: "shell",
    detail: "This Vue app owns the default route.",
  },
  {
    label: "Proxy URL",
    value: "localhost:3124",
    detail: "Use the proxy to test cross-app navigation.",
  },
];
</script>

<template>
  <main class="page">
    <remote-component
      class="remote-header"
      src="/components/header"
      aria-label="Remote header"
    >
      <nav class="topbar" aria-label="Primary">
        <a class="brand" href="/">Vue MFEs</a>
        <div class="links">
          <a aria-current="page" href="/">Shell</a>
          <a href="/analytics/">Analytics</a>
        </div>
      </nav>
    </remote-component>

    <section class="hero">
      <p class="eyebrow">Vercel Microfrontends</p>
      <h1>Shell app</h1>
      <p>
        This is the default Vue application. The nav uses normal links so the
        local Vercel proxy can route between separately running apps.
      </p>
      <a class="button" href="/analytics/">Open analytics app</a>
    </section>

    <section class="grid" aria-label="Shell details">
      <article v-for="card in cards" :key="card.label" class="card">
        <span>{{ card.label }}</span>
        <strong>{{ card.value }}</strong>
        <p>{{ card.detail }}</p>
      </article>
    </section>
  </main>
</template>
