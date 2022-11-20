<template>
  <div class="aside-bar" :style="isCollapse ? 'width:64px' : 'width:260px'">
    <div class="layout-logo">
      <div class="logo" v-show="!isCollapse">ASP</div>
      <div v-show="!isCollapse" style="flex: 1"></div>
      <div class="is-collapse-icon" @click="isCollapse = !isCollapse">
        <mdicon
          name="format-indent-decrease"
          size="20"
          style="color: #409eff"
          v-show="!isCollapse"
        />
        <mdicon
          name="format-indent-increase"
          size="20"
          style="color: #409eff"
          v-show="isCollapse"
        />
      </div>
    </div>
    <el-menu
      :default-active="Route.fullPath"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
      text-color="rgb(48, 49, 51)"
    >
      <template v-for="(item, index) in menuList" :key="index">
        <el-sub-menu
          v-if="Array.isArray(item.children) && item.children.length > 0"
          :index="item.fullPath"
        >
          <template #title>
            <mdicon :name="item.icon" size="18" />
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(children, index) in item.children"
              :key="index"
              :index="children.fullPath"
            >
              <mdicon :name="children.icon" size="18" />
              <template #title>{{ children.title }}</template>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-menu-item v-else :index="item.fullPath">
          <mdicon :name="item.icon" size="18" />
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
  .mdi {
    margin-right: 10px;
  }
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
      display: none;
    }
  }
  .el-menu-item:hover {
    background-color: rgb(204, 204, 204) !important;
  }
}
</style>
