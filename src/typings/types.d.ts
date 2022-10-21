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
  slot?: string;
}

// ******* UserIndex ******
interface UserListData {
  id: number;
  accountName: string;
  role: string;
  create_time: string;
  // children?: User[];
}
