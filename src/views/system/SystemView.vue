<template>
  <router-view v-slot="{ Component }">
    <KeepAlive :include="tagStore.cacheView">
      <component :is="Component" />
    </KeepAlive>
  </router-view>
</template>

<script setup lang="ts">
import { useTagStore } from "@/store/modules/tag";

const tagStore = useTagStore();
</script>
