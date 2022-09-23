import { defineStore } from "pinia";
import { addRoutes, getRoutes, mainRouteName } from "@/permission";
import router from "@/router/index";

interface State {
  accessToken: string;
  userInfo: UserData | null;
  menuPerms: MenuRecord[];
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    accessToken: "",
    userInfo: {
      userId: "",
      userName: "",
    },
    menuPerms: [],
  }),
  getters: {
    isLogin: (state) => state.accessToken,
  },
  actions: {
    async authLogin(res: LoginData): Promise<void> {
      this.accessToken = res.accessToken;
      this.userInfo = res.userInfo;
      this.menuPerms = res.menus;

      await addRoutes(getRoutes(this.menuPerms), mainRouteName);
      return Promise.resolve();
    },
    logout() {
      this.accessToken = "";
      this.userInfo = {
        userId: "",
        userName: "",
      };
      this.menuPerms = [];

      router.replace("/login");
    },
  },
  persist: true,
});
