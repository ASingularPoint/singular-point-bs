<template>
  <div class="a-pagination">
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]"
      :small="small"
      :disabled="disabled"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentPage = ref(4);

const pageSize = ref(100);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
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
