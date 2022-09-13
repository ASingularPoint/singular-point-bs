import request from "@/utils/request";

export function UserLogin(data: UserLoginParams) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}
