import { defineStore } from "pinia";
import { addRoutes, getRoutes, mainRouteName } from "@/permission";
import router from "@/plugins/router/index";
import { useTagStore } from "./tag";

interface State {
  accessToken: string;
  user: UserData | null;
  associatedMenuList: MenuRecord[];
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    accessToken: "",
    user: {
      userId: "",
      userName: "",
    },
    associatedMenuList: [],
  }),
  getters: {
    isLogin: (state) => state.accessToken,
  },
  actions: {
    async authLogin(res: LoginData): Promise<void> {
      this.accessToken = res.accessToken;
      this.user = res.user;
      this.associatedMenuList = res.associatedMenuList;

      await addRoutes(getRoutes(this.associatedMenuList), mainRouteName);
      return Promise.resolve();
    },
    logout() {
      this.accessToken = "";
      this.user = {
        userId: "",
        userName: "",
      };
      this.associatedMenuList = [];
      // 初始化tag
      useTagStore().$reset();
      router.replace("/login");
    },
  },
  persist: true,
});
