<script setup>
const metrics = [
  { label: "Revenue", value: "$84.2k", change: "+12.4%" },
  { label: "Trials", value: "1,284", change: "+8.7%" },
  { label: "Activation", value: "63%", change: "+4.1%" },
];

const rows = [
  ["Direct", "42%", "18,240"],
  ["Search", "31%", "13,410"],
  ["Partners", "17%", "7,350"],
  ["Social", "10%", "4,325"],
];
</script>

<template>
  <main class="page">
    <nav class="topbar" aria-label="Primary">
      <a class="brand" href="/">Vue MFEs</a>
      <div class="links">
        <a href="/">Shell</a>
        <a aria-current="page" href="/analytics/">Analytics</a>
      </div>
    </nav>

    <section class="heading">
      <p class="eyebrow">Independent Vue app</p>
      <h1>Analytics</h1>
      <p>
        This app runs on its own Vite server, but `/analytics` is routed here by
        the Vercel microfrontends proxy.
      </p>
    </section>

    <section class="metrics" aria-label="Analytics metrics">
      <article v-for="metric in metrics" :key="metric.label" class="metric">
        <span>{{ metric.label }}</span>
        <strong>{{ metric.value }}</strong>
        <em>{{ metric.change }}</em>
      </article>
    </section>

    <section class="table-wrap" aria-label="Traffic sources">
      <div class="table-title">
        <h2>Traffic mix</h2>
        <a href="/">Back to shell</a>
      </div>
      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Share</th>
            <th>Visits</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row[0]">
            <td>{{ row[0] }}</td>
            <td>{{ row[1] }}</td>
            <td>{{ row[2] }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>
