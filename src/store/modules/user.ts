import { defineStore } from "pinia";

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
    authLogin() {
      this.accessToken = "1";
    },
  },
});
