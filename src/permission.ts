import router from "@/router/index";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import getPageTitle from "@/utils/getPageTitle";
import constantsRoutes from "@/router/constantsRoutes";
import { useUserStore } from "@/store/modules/user";
import { useTagStore } from "@/store/modules/tag";

NProgress.configure({
  showSpinner: false,
  minimum: 0.3,
  speed: 1000,
});

export const mainRouteName = "AppMain";

export function routerBeforeEach() {
  const store = useUserStore();
  const tagStore = useTagStore();

  router.beforeEach((to, from, next) => {
    NProgress.start();

    // page title
    document.title = getPageTitle(to.meta);

    const accessToken = store.accessToken;

    if (accessToken) {
      if (to.name === "login") {
        next({ path: "/" });
        NProgress.done();
      } else {
        if (!router.hasRoute(to.name || "")) {
          addRoutes(getRoutes(store.menuPerms), mainRouteName).then(
            ({ flat }) => {
              const toMenu = flat.find((item) => item.fullPath === to.fullPath);
              if (toMenu) next({ name: toMenu.name });
              else next({ name: mainRouteName });
            }
          );
        } else {
          next();
        }
      }
    } else {
      if (to.meta.bypassLogin !== true) {
        next(`/login?redirect=${to.path}`);
      } else {
        next();
      }
      NProgress.done();
    }
  });

  router.afterEach((to, from, failure) => {
    if (to.fullPath === "/login") return NProgress.done();
    if (to.meta.parentName !== mainRouteName) {
      const data: ToolBarData = {
        name: to.meta.parentName as string,
        detail: to.meta.parentName as string,
        componentName: to.meta.parentName as string,
      };
      tagStore.setCacheView(data);
    }
    const data: ToolBarData = {
      name: to.meta.title as string,
      detail: to.fullPath as string,
      componentName: to.name as string,
    };
    tagStore.setToolData(data);
    tagStore.setCacheView(data);
    NProgress.done();
  });
}

export function getRoutes(menu: MenuRecord[]): MenuRecord[] {
  return constantsRoutes.concat(menu);
}

/**
 * See: https://segmentfault.com/a/1190000040631051 // v4.x 时的解决方法
 */
export function addRoutes(_routes: MenuRecord[], _parentName = "") {
  const flatMenuList: MenuRecord[] = [];
  function recursion(routes: MenuRecord[], parentName = "") {
    routes.forEach((item) => {
      if (item.path && item.component) {
        const componentString = item.component.replace(/^\/+/, ""); // 过滤字符串前面所有 '/' 字符
        const componentPath = componentString.replace(/\.\w+$/, ""); // 过滤掉后缀名，为了让 import 加入 .vue ，不然会有警告提示...

        const route = {
          path: item.path,
          redirect: item.redirect,
          name: item.name,
          component: () => import("@/" + componentPath + ".vue"),
          meta: {
            title: item.title,
            keepAlive: item.keepAlive,
            icon: item.icon,
            parentName,
          },
        };
        parentName
          ? router.addRoute(parentName, route)
          : router.addRoute(route);

        if (item.children && item.children.length) {
          recursion(item.children, item.name);
        }
      }
    });
  }
  recursion(_routes, _parentName);
  return Promise.resolve({ tree: _routes, flat: flatMenuList });
}

export const getRouterList = getRoutes;
