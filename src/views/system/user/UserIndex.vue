<template>
  <div class="content">
    <TableHeader
      :isSelection="isSelection"
      placeholderValue="用户名"
      @add="onUserAdd"
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
      rowKey="id"
      @handleSelectionChange="handleSelectionChange"
    >
      <template #role="scope">
        {{ judgeRole(scope.row.role) }}
      </template>
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

import AddUserDialog from "./add/index";
import EditUserDialog from "./edit/index";
import BatchEditUserDialog from "./batchEdit/index";

import { GetUserList, DeleteUser, BatchDeleteUser } from "@/api/system/user";
import { getRoleSelectTree } from "@/api/system/role";
import { TimeFormat } from "@/utils/dataFormat";
import { elmBtnBlur } from "@/utils/func";

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
    width: "100",
    align: "center",
    showOverflowTooltip: true,
  },
  {
    prop: "userName",
    label: "用户名",
    width: "100",
    align: "center",
    showOverflowTooltip: true,
  },
  {
    prop: "account",
    label: "账号",
    width: "100",
    align: "center",
    showOverflowTooltip: true,
  },
  {
    prop: "role",
    label: "角色",
    width: "100",
    slot: "role",
    align: "center",
  },
  {
    prop: "avatar",
    label: "头像",
    width: "100",
    slot: "avatar",
    align: "center",
  },
  {
    prop: "email",
    label: "邮箱",
    width: "100",
    align: "center",
  },
  {
    prop: "phone",
    label: "手机号",
    width: "100",
    align: "center",
  },
  {
    prop: "phone",
    label: "状态",
    width: "100",
    align: "center",
  },
  {
    prop: "createTime",
    width: "180",
    label: "创建时间",
    align: "center",
  },
  {
    prop: "",
    label: "操作",
    slot: "operation",
    align: "center",
  },
];

// 表格内容
const tableData = ref<GetUserListData[]>([]);
const multipleSelectionIds = ref<string[]>([]);
const isSelection = ref<boolean>(true);

// 角色列表
const roleListData = ref<GetRoleListData[]>([]);

const loading = ref<boolean>(false);
const searchForm = reactive<GetUserListRawParams>({
  userName: "",
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
  const { currentPage, pageSize } = pageInfo;
  loading.value = true;

  // 获取用户列表
  GetUserList({
    ...searchForm,
    currentPage,
    pageSize,
  })
    .then((res) => new TimeFormat(["createTime", "updateTime"]).pipe(res))
    .then((res) => {
      tableData.value = res.records;
      pageInfo.total = res.total;
      loading.value = false;
    });

  // 获取角色树
  getRoleSelectTree().then((res) => {
    roleListData.value = res;
  });
};

// 刷新数据
const refresh = () => {
  searchForm.userName = "";
  tableData.value = [];
  getData();
};

// 添加
const onUserAdd = () => {
  AddUserDialog({
    props: {
      onSubmit: () => {
        getData();
      },
    },
  });
};

// 批量修改
const onUserBatchEdit = () => {
  BatchEditUserDialog({
    props: {
      ids: multipleSelectionIds.value,
      onSubmit: () => {
        getData();
      },
    },
  });
};

// 批量删除
const onUserBatchRemove = () => {
  BatchDeleteUser({
    ids: multipleSelectionIds.value,
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
  searchForm.userName = val;
  getData();
};

// 每条数据的修改按钮
const handleEdit = (event: Event, row: GetUserListData) => {
  elmBtnBlur(event);
  EditUserDialog({
    props: {
      id: row.id,
      onSubmit: () => {
        getData();
      },
    },
  });
};

// 每条数据的删除按钮
const handleDelete = (row: GetUserListData) => {
  DeleteUser({
    id: row.id,
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
const btnRestore = (event: Event) => {
  elmBtnBlur(event);
};

// 表格多选
const handleSelectionChange = (val: GetUserListData[]) => {
  let data: string[] = val.reduce<string[]>(
    (pre, cur) => pre.concat(cur.id),
    []
  );
  multipleSelectionIds.value = data;
  isSelection.value = val.length > 0 ? false : true;
};

// 处理角色
const judgeRole = (id: string) => {
  const role = roleListData.value.find((item) => item.id === id);
  return role?.name;
};
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
}
</style>
