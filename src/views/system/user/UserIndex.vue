<template>
  <div class="content">
    <TableHeader></TableHeader>
    <ATable
      :headerCellStyle="headerCellStyle"
      :columns="columns"
      :tableData="tableData"
    >
      <template v-slot:operation>
        <el-button type="primary" size="small" circle>
          <el-icon :size="16"><Edit /></el-icon>
        </el-button>

        <el-button type="danger" size="small" circle>
          <el-icon :size="16"><Delete /></el-icon>
        </el-button>
      </template>
    </ATable>
  </div>
</template>

<script setup lang="ts">
import TableHeader from "@/components/ATableHeader/aTableHeader.vue";
import ATable from "@/components/ATable/aTable.vue";

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
  },
  {
    prop: "role",
    label: "角色",
    width: "180",
  },
  {
    prop: "create_time",
    width: "180",
    label: "创建时间",
  },
  {
    prop: "",
    label: "操作",
    slot: "operation",
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
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  min-width: $view-min-width;
}
</style>
