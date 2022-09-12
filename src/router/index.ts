import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
