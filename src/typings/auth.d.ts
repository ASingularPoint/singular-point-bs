// ******************** auth ************************

interface LoginData {
  accessToken: string;
  userInfo: UserData | null;
}

interface UserLoginParams {
  account: string;
  password: string;
}

interface IndexData {
  userInfo: UserData | null;
  menus: MenuRecord[];
}
