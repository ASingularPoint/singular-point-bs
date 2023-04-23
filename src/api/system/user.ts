import request from "@/plugins/request";

// 获取用户列表
export function GetUserList(
  data: GetUserListParams
): Promise<CommonTable<GetUserListData>> {
  return request({
    url: "/users",
    method: "get",
    params: data,
  });
}

// 通过id获取用户信息
export function getUserQuery(data: QueryUserParams): Promise<GetUserListData> {
  return request({
    url: "/users",
    method: "get",
    params: data,
  });
}

// 添加用户
export function AddUser(data: AddUserParams): Promise<string> {
  return request({
    url: "/users",
    method: "post",
    data,
  });
}

// 编辑用户
export function EditUser(data: EditUserParams): Promise<string> {
  return request({
    url: "/users",
    method: "patch",
    data,
  });
}

// 删除用户
export function DeleteUser(data: DeleteUserRecordParams): Promise<string> {
  return request({
    url: "/users/" + data.id,
    method: "delete",
  });
}

// 批量删除用户
export function BatchDeleteUser(
  data: BatchDeleteUserRecordParams
): Promise<string> {
  return request({
    url: "/users",
    method: "delete",
    data,
  });
}
