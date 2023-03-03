// ******* UserIndex ******
interface GetUserListRawParams {
  search: string;
}

interface GetUserListParams
  extends CommonPaginationParams,
    GetUserListRawParams {}

interface GetUserListData {
  userId: number;
  accountName: string;
  role: string | number | GetRoleListData;
  createTime: string;
  updateTime: string;
  children?: Record[];
}

interface QueryUserParams {
  userId: number;
}

interface AddUserParams {
  accountName: string;
  passwd: string;
  role: string | number;
}

interface EditUserParams {
  userId: number | null;
  accountName: string;
  passwd: string;
  role: string | number;
}

interface DeleteUserRecordParams {
  userId: number;
}

interface BatchDeleteUserRecordParams {
  userId: number[];
}
