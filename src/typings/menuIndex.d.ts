//  ********** MenuIndex *********

interface GetMenuListRawParams {
  title: string;
}
interface GetMenuListParams
  extends CommonPaginationParams,
    GetMenuListRawParams {}

interface GetMenuListData {
  id: string;
  component: string;
  fullPath: string;
  icon: string;
  keepAlive: boolean;
  name: string;
  parent: string;
  path: string;
  title: string;
  redirect: string;
  orderIndex: number;
  createTime: string;
}
