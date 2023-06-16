<template>
  <div class="content">
    <TableHeader
      :isSelection="isSelection"
      placeholderValue="角色名"
      @add="onRoleAdd"
      @edit="onUserBatchEdit"
      @remove="onUserBatchRemove"
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
      @handleSizeChange="getData"
      @handleCurrentChange="getData"
    ></APagination>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import TableHeader from "@/components/ATableHeader/aTableHeader.vue";
import ATable from "@/components/ATable/aTable.vue";
import APagination from "@/components/APagination/aPagination.vue";
import APopconfirm from "@/components/APopconfirm/aPopconfirm.vue";
import { elmBtnBlur } from "@/utils/func";

import AddRoleDialog from "./add/index";
// import EditUserDialog from "./edit/index";
// import BatchEditUserDialog from "./batchEdit/index";

import { getRoleList } from "@/api/system/role";
import { TimeFormat } from "@/utils/dataFormat";

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
    prop: "id",
    label: "ID",
    width: "80",
    align: "left",
    showOverflowTooltip: true,
  },
  {
    prop: "name",
    label: "角色名",
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
const tableData = ref<GetRoleListData[]>([]);
const multipleSelectionIds = ref<string[]>([]);
const isSelection = ref<boolean>(true);

const loading = ref<boolean>(false);
const searchForm = reactive<GetRoleListRawParams>({
  name: "",
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
});

// 获取数据
const getData = () => {
  loading.value = true;
  getRoleList({
    ...searchForm,
    currentPage: pageInfo.currentPage,
    pageSize: pageInfo.pageSize,
  })
    .then((res) => new TimeFormat(["createTime", "updateTime"]).pipe(res))
    .then((res) => {
      tableData.value = res.records;
      pageInfo.total = res.total;
      loading.value = false;
    });
};

// 刷新数据
const refresh = () => {
  searchForm.name = "";
  tableData.value = [];
  getData();
};

// 添加
const onRoleAdd = () => {
  AddRoleDialog({
    props: {
      onSubmit: () => {
        getData();
      },
    },
  });
};

// 编辑
const onUserEdit = (val: string) => {
  // EditUserDialog({
  //   props: {
  //     userId: val,
  //     onSubmit: () => {
  //       getData();
  //     },
  //   },
  // });
};

// 批量修改
const onUserBatchEdit = () => {
  // BatchEditUserDialog({
  //   props: {
  //     userIds: multipleSelectionIds.value,
  //     onSubmit: () => {
  //       getData();
  //     },
  //   },
  // });
};

// 批量删除
const onUserBatchRemove = () => {
  // BatchDeleteUser({
  //   userId: multipleSelectionIds.value,
  // }).then((res) => {
  //   getData();
  //   ElMessage({
  //     showClose: true,
  //     message: res,
  //     type: "success",
  //   });
  // });
};

// 搜索回调
const search = (val: string) => {
  searchForm.name = val;
  getData();
};

// 每条数据的修改按钮
const handleEdit = (event: Event, row: GetRoleListData) => {
  elmBtnBlur(event);
  onUserEdit(row.id);
};

// 每条数据的删除按钮
const handleDelete = (row: GetRoleListData) => {
  // DeleteUser({
  //   userId: row.userId,
  // }).then((res) => {
  //   getData();
  //   ElMessage({
  //     showClose: true,
  //     message: res,
  //     type: "success",
  //   });
  // });
};

// 删除按钮失焦
const btnRestore = (event: Event) => {
  elmBtnBlur(event);
};

// 表格多选
const handleSelectionChange = (val: GetRoleListData[]) => {
  let data: string[] = [];
  val.forEach((item) => {
    data.push(item.id);
  });
  multipleSelectionIds.value = data;
  isSelection.value = val.length > 0 ? false : true;
};
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
}
</style>
