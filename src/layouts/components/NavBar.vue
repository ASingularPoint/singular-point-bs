<template>
  <div class="nav-bar">
    <ABreadcrumb></ABreadcrumb>
  </div>
</template>

<script setup lang="ts">
import ABreadcrumb from "@/components/ABreadcrumb/aBreadcrumb.vue";
</script>

<style lang="scss" scoped>
.nav-bar {
  height: 50px;
  margin: 16px 16px 16px 0;
  background-color: #fff;
  @include divInitialization();
}
</style>
