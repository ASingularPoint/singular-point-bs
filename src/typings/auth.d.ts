// ******************** auth ************************

interface LoginData {
  accessToken: string;
  user: UserData | null;
  /**
   * 登录菜单
   */
  associatedMenuList: MenuRecord[];
}

interface UserLoginParams {
  account: string;
  password: string;
}
