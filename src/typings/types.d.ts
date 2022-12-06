interface CommonTable<Record> {
  /**
   * 记录
   */
  records: Record[];
  /**
   * 总条数
   */
  totalCount: number;
}

interface CommonPaginationParams {
  /**
   * 当前页
   */
  currentPage: number;
  /**
   * 每页条数
   */
  pageSize: number;
  /**
   * 总条数
   */
  totalCount?: number;
}

// router
interface MenuRecord {
  component: string;
  createTime: string;
  fullPath: string;
  icon: string;
  id: number;
  keepAlive: boolean;
  name: string;
  parent: number;
  path: string;
  title: string;
  redirect: string;
  children?: MenuRecord[];
  orderIndex: number;
}

// user
interface UserData {
  userId: string;
  userName: string;
}

// tab
interface ToolBarData {
  name: string;
  detail: string;
  componentName: string;
}

// ******************** auth ************************

interface LoginData {
  accessToken: string;
  userInfo: UserData | null;
  /**
   * 登录菜单
   */
  menus: MenuRecord[];
}

interface UserLoginParams {
  accountName: string;
  password: string;
}

// ******* aTable ******
interface Itabledata {
  [x: string]: any;
}

interface HeaderCellStyle {
  [x: string]: any;
}

interface Columns {
  type?: string;
  prop?: string;
  label?: string;
  width?: string;
  align?: string;
  slot?: string;
}

// ***** pagination ******
interface IPagination {
  currentPage: number;
  pageSize: number;
  pageSizes: number[];
  total: number;
  small?: boolean;
  background?: boolean;
  disabled?: boolean;
}

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

//  ********** RoleIndex *********

interface GetRoleListData {
  roleId: string | number;
  name: string;
  contextMenu: string;
  createTime: string;
}
