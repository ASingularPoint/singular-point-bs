import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "AppMain",
    redirect: "/dashboard",
    component: () => import("@/layouts/AppMain.vue"),
    children: [],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/AuthLogin.vue"),
    meta: {
      title: "登录",
      bypassLogin: true,
    },
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("@/views/error/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
