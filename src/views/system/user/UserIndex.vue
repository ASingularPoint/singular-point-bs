<template>
  <div class="content">
    <TableHeader @refresh="refresh" @search="search"></TableHeader>
    <ATable
      :headerCellStyle="headerCellStyle"
      :columns="columns"
      :tableData="tableData"
      :loading="loading"
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
          <el-button
            type="danger"
            size="small"
            @click="handleDelete($event, scope.row)"
          >
            <mdicon name="trash-can" size="18" />
          </el-button>
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
import TableHeader from "@/components/ATableHeader/aTableHeader.vue";
import ATable from "@/components/ATable/aTable.vue";
import APagination from "@/components/APagination/aPagination.vue";

import { GetUserList } from "@/api/system/user";
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
  let number = 0;
  let interval = setInterval(() => {
    number++;
  }, 1000); //1000毫秒加一次。
  GetUserList({
    ...searchForm,
    currentPage: pageInfo.currentPage,
    pageSize: pageInfo.pageSize,
  })
    .then((res) => new TimeFormat(["createTime", "updateTime"]).pipe(res))
    .then((res) => {
      if (number >= 2) {
        tableData.value = res.records;
        pageInfo.total = res.totalCount;
        loading.value = false;
      } else {
        setTimeout(() => {
          tableData.value = res.records;
          pageInfo.total = res.totalCount;
          loading.value = false;
        }, 1000);
      }
      clearInterval(interval);
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
const handleDelete = (event: any, row: GetUserListData) => {
  appContext.config.globalProperties.$func.elmBtnBlur(event);
  console.log(row);
};

// 每页展示数据的条数回调
const handleSizeChange = (val: number) => {
  getData();
};

// 当前页码的回调
const handleCurrentChange = (val: number) => {
  getData();
};
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  min-width: $view-min-width;
}
</style>
