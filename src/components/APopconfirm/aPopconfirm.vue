<template>
  <div class="a-popconfirm">
    <el-popconfirm
      :confirm-button-text="props.confirmButtonText"
      :cancel-button-text="props.cancelButtonText"
      :icon="props.icon"
      :icon-color="props.iconColor"
      :title="props.title"
      :width="props.width"
      @confirm="confirmEvent"
      @cancel="cancelEvent"
    >
      <template #reference>
        <slot></slot>
      </template>
    </el-popconfirm>
  </div>
</template>

<script setup lang="ts">
import { InfoFilled } from "@element-plus/icons-vue";

interface Props {
  confirmButtonText?: string;
  cancelButtonText?: string;
  icon?: any;
  iconColor?: string;
  title?: string;
  width?: string;
}

const props = withDefaults(defineProps<Props>(), {
  confirmButtonText: "删除",
  cancelButtonText: "取消",
  icon: InfoFilled,
  iconColor: "#FF9900",
  title: "确定删除选中记录？",
  width: "150px",
});

const emit = defineEmits(["confirm", "cancel"]);

const confirmEvent = () => {
  emit("confirm");
};
const cancelEvent = () => {
  emit("cancel");
};
</script>

<style lang="scss" scoped>
.a-popconfirm {
  display: inline-block;
}
</style>
