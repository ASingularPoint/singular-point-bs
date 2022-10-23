<template>
  <div class="content">
    <TableHeader></TableHeader>
    <ATable
      :headerCellStyle="headerCellStyle"
      :columns="columns"
      :tableData="tableData"
    >
      <template #operation="scope">
        <el-button
          type="primary"
          size="small"
          @click="handleEdit($event, scope.row)"
        >
          <mdicon name="pencil" size="18" />
        </el-button>

        <el-button
          type="danger"
          size="small"
          @click="handleDelete($event, scope.row)"
        >
          <mdicon name="trash-can" size="18" />
        </el-button>
      </template>
    </ATable>
    <APagination></APagination>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ComponentInternalInstance, AppContext } from "vue";
import TableHeader from "@/components/ATableHeader/aTableHeader.vue";
import ATable from "@/components/ATable/aTable.vue";
import APagination from "@/components/APagination/aPagination.vue";

interface IAppContext {
  appContext: AppContext;
}

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
    prop: "role",
    label: "角色",
    width: "180",
    align: "left",
  },
  {
    prop: "create_time",
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
const tableData: UserListData[] = [
  {
    id: 1,
    accountName: "wangxiaohu",
    role: "wangxiaohu",
    create_time: "2016-05-02",
  },
  {
    id: 2,
    accountName: "wangxiaohu",
    role: "wangxiaohu",
    create_time: "2016-05-02",
  },
];

const handleEdit = (event: any, row: UserListData) => {
  appContext.config.globalProperties.$func.elmBtnBlur(event);
  console.log(row);
};

const handleDelete = (event: any, row: UserListData) => {
  appContext.config.globalProperties.$func.elmBtnBlur(event);
  console.log(row);
};
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  min-width: $view-min-width;
}
</style>
