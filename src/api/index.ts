import request from "@/plugins/request";

export function UserLogin(data: UserLoginParams): Promise<LoginData> {
  return request({
    url: "/auth/login",
    method: "post",
    data,
  });
}

export function index(): Promise<IndexData> {
  return request({
    url: "/auth/index",
    method: "get",
  });
}
