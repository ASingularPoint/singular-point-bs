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
      :default-active="Route.fullPath"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
      text-color="rgb(48, 49, 51)"
    >
      <template v-for="(item, index) in menuList" :key="index">
        <el-sub-menu v-if="item.children.length > 0" :index="item.fullPath">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(children, index) in item.children"
              :key="index"
              :index="children.fullPath"
              >{{ children.title }}</el-menu-item
            >
          </el-menu-item-group>
        </el-sub-menu>

        <el-menu-item v-else :index="item.fullPath">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getRouterList } from "@/permission";
import { useUserStore } from "@/store/modules/user";
import { useRoute } from "vue-router";

const Route = useRoute();

const store = useUserStore();

const menuList = ref<MenuRecord[]>([]);

menuList.value = [...getRouterList(store.menuPerms)];

const isCollapse = ref(false);
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
      // padding: 0;
      display: none;
    }
  }
  .el-menu-item:hover {
    background-color: rgb(204, 204, 204) !important;
  }
}
</style>
