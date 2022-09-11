<template>
  <div class="aside-bar" :style="isCollapse ? 'width:64px' : 'width:260px'">
    <div class="layout-logo">
      <div class="logo" v-show="!isCollapse">ASP</div>
      <div v-show="!isCollapse" style="flex: 1"></div>
      <el-icon
        class="is-collapse-icon"
        :size="18"
        color="#409eff"
        @click="isCollapse = !isCollapse"
      >
        <Fold v-show="!isCollapse" />
        <Expand v-show="isCollapse" />
      </el-icon>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      text-color="rgb(48, 49, 51)"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Menu as IconMenu,
  Location,
  Fold,
  Expand,
} from "@element-plus/icons-vue";
import { getRouterList } from "@/permission";

const menuList = ref<MenuRecord[]>([]);

menuList.value = [...getRouterList()];

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
.aside-bar {
  margin: 16px 16px 16px 16px;
  background-color: #fff;
  height: calc(100vh - 32px);
  @include divInitialization();
  transition: all 0.3s;
}

.layout-logo {
  height: 50px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    font-size: 24px;
    font-weight: bold;
    color: #409eff;
  }

  .is-collapse-icon {
    cursor: pointer;
  }
}

.el-menu {
  border: none;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 260px;
    height: 100vh;
  }

  .el-sub-menu {
    ::v-deep .el-sub-menu__title:hover {
      background-color: transparent;
    }
  }

  .el-menu-item-group {
    ::v-deep .el-menu-item-group__title {
      padding: 0;
    }
  }
  .el-menu-item:hover {
    background-color: rgb(204, 204, 204) !important;
  }
}
</style>
