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
  age: number;
  email: string;
  phone: string;
  avatar: string;
  role: string;
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
