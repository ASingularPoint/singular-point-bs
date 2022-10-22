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
// 公共函数
import * as func from "@/utils/func";
//  @mdi/font mdi-vue/v3 @mdi/js
import MDIcon, { config as MDIconConfig } from "@/md-icon/index";

const app = createApp(App);

// 公共函数挂载全局函数
app.config.globalProperties.$func = func;

// element icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
//  @mdi/font mdi-vue/v3 @mdi/js
app.use(MDIcon, { icons: MDIconConfig });

app.use(store).use(router).mount("#app");
// auth
routerBeforeEach();
