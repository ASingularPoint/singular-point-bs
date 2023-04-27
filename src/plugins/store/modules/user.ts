import { defineStore } from "pinia";
import { addRoutes, getRoutes, mainRouteName } from "@/permission";
import router from "@/plugins/router/index";
import { useTagStore } from "./tag";

interface State {
  accessToken: string;
  user: UserData | null;
  menus: MenuRecord[];
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    accessToken: "",
    user: {
      userId: "",
      userName: "",
    },
    menus: [],
  }),
  getters: {
    isLogin: (state) => state.accessToken,
  },
  actions: {
    async authLogin(res: LoginData) {
      this.accessToken = res.accessToken;
      this.user = res.user;
      router.replace("/");
    },
    async index() {
      await addRoutes(getRoutes(this.menus), mainRouteName);
      return Promise.resolve();
    },
    logout() {
      this.accessToken = "";
      this.user = {
        userId: "",
        userName: "",
      };
      this.menus = [];
      // 初始化tag
      useTagStore().$reset();
      router.replace("/login");
    },
  },
  persist: true,
});
