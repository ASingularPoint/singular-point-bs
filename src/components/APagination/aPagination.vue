<template>
  <div class="a-pagination">
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

interface Props {
  pageInfo: IPagination;
}

const props = withDefaults(defineProps<Props>(), {
  pageInfo: () => ({
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30],
    total: 0,
    small: false,
    background: true,
    disabled: false,
  }),
});

const emit = defineEmits(["handleSizeChange", "handleCurrentChange"]);

const { currentPage, pageSize, pageSizes, total, small, background, disabled } =
  toRefs(props.pageInfo);

// 每页展示数据条数的方法
const handleSizeChange = (val: number) => {
  emit("handleSizeChange", val);
};

// 当前页码的方法
const handleCurrentChange = (val: number) => {
  emit("handleCurrentChange", val);
};
</script>

<style lang="scss" scoped>
.a-pagination {
  padding: 10px;

  .el-pagination {
    ::v-deep .el-pagination__total {
      // 总数
      order: 1;
    }
    ::v-deep .el-pagination__sizes {
      // select 行数选择器
      order: 0;
    }
    ::v-deep .btn-prev {
      // 上一页按钮
      order: 2;
      margin-left: auto;
    }
    ::v-deep .el-pager {
      // 页码按钮
      order: 3;
    }
    ::v-deep .btn-next {
      // 下一页按钮
      order: 4;
    }
    ::v-deep .el-pagination__jump {
      // 跳转页面按钮
      order: 5;
    }
  }
}
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
