<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <AsideBar></AsideBar>
      </el-aside>
      <el-container>
        <el-header>
          <NavBar></NavBar>
        </el-header>
        <el-main>
          <ElConfigProvider :locale="zhCn">
            <router-view v-slot="{ Component }">
              <KeepAlive :include="tagStore.cacheView">
                <component :is="Component" />
              </KeepAlive>
            </router-view>
          </ElConfigProvider>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import AsideBar from "./components/AsideBar.vue";
import NavBar from "./components/NavBar.vue";
import { useTagStore } from "@/plugins/store/modules/tag";
import { index } from "@/api/index";
import { onMounted } from "vue";

const tagStore = useTagStore();

onMounted(() => {
  init();
});

const init = () => {
  index().then((res) => {
    console.log(res);
  });
};
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;

  .el-header {
    padding: 0;
  }
  .el-main {
    padding-left: 0;
    padding-right: 15px;
  }
}
</style>
