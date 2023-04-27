// ******************** auth ************************

interface LoginData {
  accessToken: string;
  user: UserData | null;
}

interface UserLoginParams {
  account: string;
  password: string;
}
