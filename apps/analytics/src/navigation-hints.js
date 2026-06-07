const hintedHrefs = new Set();

function appendLink(attributes) {
  const key = `${attributes.rel}:${attributes.href}`;

  if (hintedHrefs.has(key) || document.head.querySelector(`link[rel="${attributes.rel}"][href="${attributes.href}"]`)) {
    return;
  }

  hintedHrefs.add(key);

  const link = document.createElement("link");
  for (const [name, value] of Object.entries(attributes)) {
    link.setAttribute(name, value);
  }

  document.head.append(link);
}

export function installNavigationHints() {
  if (!HTMLScriptElement.supports?.("speculationrules")) {
    appendLink({ rel: "prefetch", href: "/" });
  }

  if (import.meta.env.DEV) {
    appendLink({ rel: "modulepreload", href: "/src/main.js" });
    appendLink({ rel: "preload", href: "/src/styles.css", as: "style" });
  }
}
