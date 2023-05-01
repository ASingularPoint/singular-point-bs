interface CommonTable<Record> {
  /**
   * 记录
   */
  records: Record[];
  /**
   * 总条数
   */
  total: number;
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
  total?: number;
}

// user
interface UserData {
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

// tab
interface ToolBarData {
  name: string;
  detail: string;
  componentName: string;
}
