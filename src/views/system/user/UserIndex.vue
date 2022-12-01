<template>
  <div class="content">
    <TableHeader
      :isSelection="isSelection"
      @add="onUserAdd"
      @remove="onUserRemove"
      @refresh="refresh"
      @search="search"
    ></TableHeader>
    <ATable
      :headerCellStyle="headerCellStyle"
      :columns="columns"
      :tableData="tableData"
      :loading="loading"
      rowKey="userId"
      @handleSelectionChange="handleSelectionChange"
    >
      <template #operation="scope">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="编辑"
          placement="top"
        >
          <el-button
            type="primary"
            size="small"
            @click="handleEdit($event, scope.row)"
          >
            <mdicon name="pencil" size="18" />
          </el-button>
        </el-tooltip>

        <el-tooltip
          class="box-item"
          effect="dark"
          content="删除"
          placement="top"
        >
          <APopconfirm
            style="margin-left: 12px"
            @confirm="handleDelete(scope.row)"
          >
            <el-button type="danger" size="small" @click="btnRestore($event)">
              <mdicon name="trash-can" size="18" />
            </el-button>
          </APopconfirm>
        </el-tooltip>
      </template>
    </ATable>
    <APagination
      :pageInfo="pageInfo"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></APagination>
  </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  ComponentInternalInstance,
  AppContext,
  reactive,
  ref,
  onMounted,
} from "vue";
import { ElMessage } from "element-plus";
import TableHeader from "@/components/ATableHeader/aTableHeader.vue";
import ATable from "@/components/ATable/aTable.vue";
import APagination from "@/components/APagination/aPagination.vue";
import APopconfirm from "@/components/APopconfirm/aPopconfirm.vue";

import AddUserDialog from "./add/index";

import { GetUserList, DeleteUser } from "@/api/system/user";
import { GetRoleList } from "@/api/system/role";
import { TimeFormat } from "@/utils/dataFormat";

interface IAppContext {
  appContext: AppContext;
}

// 获取全局上下文
const { appContext }: IAppContext =
  getCurrentInstance() as ComponentInternalInstance;

// 表头样式
const headerCellStyle: HeaderCellStyle = {
  color: "#000",
  fontWeight: "bold",
};

// 自定义表头
const columns: Columns[] = [
  {
    type: "selection",
    width: "50",
  },
  {
    prop: "accountName",
    label: "用户名",
    width: "180",
    align: "left",
  },
  {
    prop: "role.name",
    label: "角色",
    width: "180",
    align: "left",
  },
  {
    prop: "createTime",
    width: "180",
    label: "创建时间",
    align: "left",
  },
  {
    prop: "",
    label: "操作",
    slot: "operation",
    align: "left",
  },
];

// 表格内容
const tableData = ref<GetUserListData[]>([]);
const multipleSelectionIds = ref<number[]>([]);
const isSelection = ref<boolean>(true);

// 角色列表
const roleListData = ref<GetRoleListData[]>([]);

const loading = ref<boolean>(false);
const searchForm = reactive<GetUserListRawParams>({
  search: "",
});

// 分页信息
const pageInfo: IPagination = reactive({
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 30],
  total: 0,
  small: false,
  background: true,
  disabled: false,
});

onMounted(() => {
  getData();
  GetRoleListData();
});

// 获取数据
const getData = () => {
  loading.value = true;
  GetUserList({
    ...searchForm,
    currentPage: pageInfo.currentPage,
    pageSize: pageInfo.pageSize,
  })
    .then((res) => new TimeFormat(["createTime", "updateTime"]).pipe(res))
    .then((res) => {
      tableData.value = res.records;
      pageInfo.total = res.totalCount;
      loading.value = false;
    });
};

// 获取角色列表
const GetRoleListData = () => {
  GetRoleList()
    .then((res) => new TimeFormat("createTime").pipe(res))
    .then((res) => {
      roleListData.value = res.records;
    });
};

// 刷新数据
const refresh = () => {
  searchForm.search = "";
  tableData.value = [];
  getData();
};

// 添加
const onUserAdd = () => {
  AddUserDialog({
    props: {
      onSubmit: () => {
        getData();
        GetRoleListData();
      },
    },
  });
};

// 批量删除
const onUserRemove = () => {
  DeleteUser({
    userId: multipleSelectionIds.value,
  }).then((res) => {
    getData();
    ElMessage({
      showClose: true,
      message: res,
      type: "success",
    });
  });
};

// 搜索回调
const search = (val: string) => {
  searchForm.search = val;
  getData();
};

// 每条数据的修改按钮
const handleEdit = (event: any, row: GetUserListData) => {
  appContext.config.globalProperties.$func.elmBtnBlur(event);
  console.log(row);
};

// 每条数据的删除按钮
const handleDelete = (row: GetUserListData) => {
  DeleteUser({
    userId: row.userId,
  }).then((res) => {
    getData();
    ElMessage({
      showClose: true,
      message: res,
      type: "success",
    });
  });
};

// 删除按钮失焦
const btnRestore = (event: any) => {
  appContext.config.globalProperties.$func.elmBtnBlur(event);
};

// 每页展示数据的条数回调
const handleSizeChange = (val: number) => {
  getData();
};

// 当前页码的回调
const handleCurrentChange = (val: number) => {
  getData();
};

// 表格多选
const handleSelectionChange = (val: GetUserListData[]) => {
  val.forEach((item) => {
    multipleSelectionIds.value.push(item.userId);
  });
  isSelection.value = val.length > 0 ? false : true;
};
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  min-width: $view-min-width;
}
</style>
