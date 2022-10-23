import request from "@/utils/request";

export function GetUserList(
  data: GetUserListParams
): Promise<CommonTable<GetUserListData>> {
  return request({
    url: "/system-user/list",
    method: "get",
    params: data,
  });
}
