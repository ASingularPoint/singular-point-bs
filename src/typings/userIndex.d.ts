// ******* UserIndex ******
interface GetUserListRawParams {
  userName: string;
}

interface GetUserListParams
  extends CommonPaginationParams,
    GetUserListRawParams {}

interface GetUserListData {
  id: string;
  userName: string;
  account: string;
  sex: string;
  age: number | null;
  email: string | null;
  phone: string | null;
  avatar: string | null;
  role: string | null;
  userStatus: number;
  isDelete: boolean;
  createTime: string;
  updateTime: string;
}

interface QueryUserParams {
  id: number;
}

interface AddUserParams {
  account: string;
  password: string;
  role: string;
}

interface EditUserParams {
  id: number | null;
  account: string;
  password: string;
  role: string;
}

interface DeleteUserRecordParams {
  id: string;
}

interface BatchDeleteUserRecordParams {
  ids: string[];
}
