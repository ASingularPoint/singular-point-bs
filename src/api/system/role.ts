import request from "@/plugins/request";

export function getRoleList(
  data: GetRoleListParams
): Promise<CommonTable<GetRoleListData>> {
  return request({
    url: "/system-role/list",
    method: "get",
    params: data,
  });
}

export function getRoleSelectTree(): Promise<GetRoleListData[]> {
  return request({
    url: "/role/select/by-tree",
    method: "get",
  });
}
