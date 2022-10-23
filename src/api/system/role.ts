import request from "@/utils/request";

export function GetRoleList(): Promise<CommonTable<GetRoleListData>> {
  return request({
    url: "/system-role/list",
    method: "get",
  });
}
