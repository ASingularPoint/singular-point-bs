import request from "@/plugins/request";

export function UserLogin(data: UserLoginParams): Promise<LoginData> {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}
