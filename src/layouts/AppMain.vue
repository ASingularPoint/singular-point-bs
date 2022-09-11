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
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import AsideBar from "./components/AsideBar.vue";
import NavBar from "./components/NavBar.vue";
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;

  .el-header {
    padding: 0;
  }
}
</style>
