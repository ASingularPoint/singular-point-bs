//  ********** RoleIndex *********

interface GetRoleListRawParams {
  name: string;
}
interface GetRoleListParams
  extends CommonPaginationParams,
    GetRoleListRawParams {}

interface GetRoleListData {
  id: string;
  name: string;
  createTime: string;
}

interface AddRoleParams {
  name: string;
}
