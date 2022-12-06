import request from "@/utils/request";

// 获取用户列表
export function GetUserList(
  data: GetUserListParams
): Promise<CommonTable<GetUserListData>> {
  return request({
    url: "/system-user/list",
    method: "get",
    params: data,
  });
}

// 通过id获取用户信息
export function getUserQuery(data: QueryUserParams): Promise<GetUserListData> {
  return request({
    url: "/system-user/query",
    method: "get",
    params: data,
  });
}

// 添加用户
export function AddUser(data: AddUserParams): Promise<string> {
  return request({
    url: "/system-user/add",
    method: "post",
    data,
  });
}

// 编辑用户
export function EditUser(data: EditUserParams): Promise<string> {
  return request({
    url: "/system-user/edit",
    method: "post",
    data,
  });
}

// 删除用户
export function DeleteUser(data: DeleteUserRecordParams): Promise<string> {
  return request({
    url: "/system-user/delete",
    method: "delete",
    params: data,
  });
}

// 批量删除用户
export function BatchDeleteUser(
  data: BatchDeleteUserRecordParams
): Promise<string> {
  return request({
    url: "/system-user/batchDelete",
    method: "delete",
    data,
  });
}
