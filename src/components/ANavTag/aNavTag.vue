<template>
  <el-tag
    v-for="tag in dynamicTags"
    :key="tag"
    class="mx-1"
    :class="tag.detail === Route.fullPath ? 'el-tag-active' : ''"
    :closable="dynamicTags.length > 1"
    size="large"
    :disable-transitions="false"
    @click="onClickTag(tag)"
    @close="handleClose(tag)"
  >
    <span>{{ tag.name }}</span>
  </el-tag>
</template>

<script setup lang="ts">
import { useTagStore } from "@/store/modules/tag";
import { useRoute, useRouter } from "vue-router";

const Route = useRoute();
const Router = useRouter();

const tagStore = useTagStore();

const dynamicTags = tagStore.getToolData;

const onClickTag = (tag: ToolBarData) => {
  Router.push({
    path: tag.detail,
  });
};

const handleClose = (tag: ToolBarData) => {
  tagStore.clearToolData(tag.detail);
  tagStore.clearCacheView(tag.componentName);
};
</script>

<style lang="scss" scoped>
.el-tag {
  height: 40px;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: none;
  color: #000;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;

  span {
    opacity: 0.7;
  }

  &:hover {
    span {
      opacity: 1;
    }
  }

  ::v-deep .el-tag__close {
    color: #000;

    &:hover {
      background-color: #3f6ad8;
      color: #dcdfe6;
    }
  }
}

.el-tag-active {
  background-color: #fff;
  @include divInitialization();
}
</style>
