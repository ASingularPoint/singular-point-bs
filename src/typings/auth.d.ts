// ******************** auth ************************

interface LoginData {
  accessToken: string;
  userInfo: UserData | null;
  /**
   * 登录菜单
   */
  menus: MenuRecord[];
}

interface UserLoginParams {
  account: string;
  password: string;
}
