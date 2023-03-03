//  ********** RoleIndex *********

interface GetRoleListRawParams {
  search: string;
}
interface GetRoleListParams
  extends CommonPaginationParams,
    GetRoleListRawParams {}

interface GetRoleListData {
  roleId: string | number;
  name: string;
  createTime: string;
  children?: Record[];
}
