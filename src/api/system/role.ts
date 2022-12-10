import request from "@/utils/request";

export function getRoleSelectTree(): Promise<GetRoleListData[]> {
  return request({
    url: "/system-role/selectTree",
    method: "get",
  });
}
