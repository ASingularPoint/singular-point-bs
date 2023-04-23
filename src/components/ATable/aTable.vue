<template>
  <div class="a-table">
    <el-table
      ref="multipleTableRef"
      v-loading="props.loading"
      :data="props.tableData"
      style="width: 100%"
      :header-cell-style="props.headerCellStyle"
      :row-key="props.rowKey"
      border
      default-expand-all
      @selection-change="handleSelectionChange"
      @select-all="handleSelectAll"
    >
      <el-table-column
        v-for="(item, index) in props.columns"
        :key="index"
        :type="item.type"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        :show-overflow-tooltip="item.showOverflowTooltip"
      >
        <template #default="scope">
          <slot v-if="item.slot" :name="item.slot" :row="scope.row"> </slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElTable as ElTableType } from "element-plus";

interface Props {
  columns: Columns[];
  tableData: Itabledata[];
  headerCellStyle?: HeaderCellStyle;
  loading?: boolean;
  rowKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  tableData: () => [],
  loading: false,
  rowKey: "id",
});

const emit = defineEmits(["handleSelectionChange"]);

const multipleTableRef = ref<InstanceType<typeof ElTableType>>();
const multipleSelection = ref<Itabledata[]>([]);

const handleSelectionChange = (val: Itabledata[]) => {
  multipleSelection.value = val;
  emit("handleSelectionChange", val);
};

const handleSelectAll = (selection: Itabledata[]) => {
  console.log(selection);
};
</script>

<style lang="scss" scoped>
.a-table {
  :deep(.el-table__placeholder) {
    width: 0;
  }
}
</style>
