import request from "@/plugins/request";

export function getMenuList(
  data: GetMenuListParams
): Promise<CommonTable<GetMenuListData>> {
  return request({
    url: "/menu",
    method: "get",
    params: data,
  });
}
