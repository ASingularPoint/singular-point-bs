//  ********** RoleIndex *********

interface GetRoleListRawParams {
  search: string;
}
interface GetRoleListParams
  extends CommonPaginationParams,
    GetRoleListRawParams {}

interface GetRoleListData {
  id: string;
  name: string;
  createTime: string;
}
