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

export function AddUser(data: AddUserParams): Promise<string> {
  return request({
    url: "/system-user/add",
    method: "post",
    data,
  });
}

export function DeleteUser(data: DeleteUserRecordParams): Promise<string> {
  return request({
    url: "/system-user/delete",
    method: "delete",
    params: data,
  });
}

export function BatchDeleteUser(
  data: BatchDeleteUserRecordParams
): Promise<string> {
  return request({
    url: "/system-user/batchDelete",
    method: "delete",
    data,
  });
}
