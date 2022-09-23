<template>
  <div class="nav-bar">
    <div class="nav-bar__tag">
      <ANavTag></ANavTag>
    </div>
    <div class="nav-bar__tool">
      <div class="tool-item" @click="fullScreen">
        <el-icon size="20"><FullScreen /></el-icon>
      </div>
      <AToolPopover>
        <div class="tool-item">
          <el-avatar :size="24" :icon="UserFilled" />
          <div class="admin-name">{{ userStore.userInfo?.userName }}</div>
        </div>
      </AToolPopover>
    </div>
  </div>
</template>

<script setup lang="ts">
import ANavTag from "@/components/ANavTag/aNavTag.vue";
import AToolPopover from "@/components/AToolPopover/aToolPopover.vue";
import { UserFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useUserStore } from "@/store/modules/user";

const userStore = useUserStore();

const isFullScreen = ref(false);

const fullScreen = () => {
  let element = document.documentElement;
  if (isFullScreen.value) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  }
  isFullScreen.value = !isFullScreen.value;
};
</script>

<style lang="scss" scoped>
.nav-bar {
  min-width: 780px;
  height: 50px;
  margin: 16px 16px 16px 0;
  display: flex;

  &__tag {
    flex: 1;
  }
  &__tool {
    background-color: #fff;
    display: flex;
    // align-items: center;
    @include divInitialization();

    .tool-item {
      height: 100%;
      padding: 0 10px;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover {
        .el-icon {
          animation: twinkle-animation 0.3s ease-in-out;
        }
        background-color: #f5f5f5;
      }

      .admin-name {
        font-size: 14px;
        padding-left: 5px;
      }
    }
  }
}

@keyframes twinkle-animation {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
}
</style>
