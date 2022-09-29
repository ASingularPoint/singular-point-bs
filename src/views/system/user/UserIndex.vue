<template>
  <div>user</div>
</template>

<script setup lang="ts">
import { onActivated, onUnmounted } from "vue";

onActivated(() => {
  console.log("缓存页打开");
});
onUnmounted(() => {
  console.log("被销毁");
});
</script>

<style scoped></style>
