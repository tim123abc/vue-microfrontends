import "remote-components/host/html";
import { createApp } from "vue";
import App from "./App.vue";
import { installNavigationHints } from "./navigation-hints.js";
import "./styles.css";

installNavigationHints();
createApp(App).mount("#app");
