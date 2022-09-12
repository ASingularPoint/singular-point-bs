import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./styles/reset.css";
// element icon
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

// element icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(store).use(router).mount("#app");
