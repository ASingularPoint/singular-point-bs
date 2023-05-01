import { defineStore } from "pinia";
import { addRoutes, getRoutes, mainRouteName } from "@/permission";
import router from "@/plugins/router/index";
import { useTagStore } from "./tag";

interface State {
  accessToken: string;
  userInfo: UserData | null;
  menus: MenuRecord[];
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    accessToken: "",
    userInfo: {
      id: "",
      userName: "",
      account: "",
      sex: "",
      age: 0,
      email: "",
      phone: "",
      avatar: "",
      role: "",
      userStatus: 1,
      isDelete: false,
      createTime: "",
      updateTime: "",
    },
    menus: [],
  }),
  getters: {
    isLogin: (state) => state.accessToken,
  },
  actions: {
    async authLogin(res: LoginData) {
      this.accessToken = res.accessToken;
      this.userInfo = res.userInfo;
      router.replace("/");
    },
    async index(res: IndexData) {
      this.userInfo = res.userInfo;
      this.menus = res.menus;
      await addRoutes(getRoutes(this.menus), mainRouteName);
      return Promise.resolve();
    },
    logout() {
      this.accessToken = "";
      this.userInfo = {
        id: "",
        userName: "",
        account: "",
        sex: "",
        age: 0,
        email: "",
        phone: "",
        avatar: "",
        role: "",
        userStatus: 1,
        isDelete: false,
        createTime: "",
        updateTime: "",
      };
      this.menus = [];
      // 初始化tag
      useTagStore().$reset();
      router.replace("/login");
    },
  },
  persist: true,
});
