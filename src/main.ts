import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./styles/reset.css";
// element icon
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// el-message
import "element-plus/theme-chalk/el-message.css";
// auth
import { routerBeforeEach } from "./permission";

const app = createApp(App);

// element icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(store).use(router).mount("#app");
// auth
routerBeforeEach();
