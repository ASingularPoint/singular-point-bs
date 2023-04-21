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
  userId: string;
  userName: string;
}

// tab
interface ToolBarData {
  name: string;
  detail: string;
  componentName: string;
}
