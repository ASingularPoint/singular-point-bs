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
  role: string;
  userStatus: number;
  isDelete: boolean;
  createTime: string;
  updateTime: string;
}

interface QueryUserParams {
  id: string;
}

interface AddUserParams {
  userName: string;
  account: string;
  password: string;
  role: string;
}

interface EditUserParams extends AddUserParams {
  id: string;
}

interface DeleteUserRecordParams {
  id: string;
}

interface BatchDeleteUserRecordParams {
  ids: string[];
}
