<template>
  <el-popover
    :width="300"
    trigger="click"
    popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
  >
    <template #reference>
      <slot></slot>
    </template>
    <template #default>
      <div
        class="demo-rich-conent"
        style="
          display: flex;
          gap: 16px;
          flex-direction: column;
          align-items: center;
          text-align: center;
        "
      >
        <el-avatar :size="80" :icon="UserFilled" />
        <div>
          <p
            class="demo-rich-content__name"
            style="font-size: 26px; font-weight: 500"
          >
            {{ userStore.userInfo?.userName }}
          </p>
          <p
            class="demo-rich-content__mention"
            style="margin: 0; font-size: 14px; color: var(--el-color-info)"
          >
            {{ times }}
          </p>
        </div>

        <div class="tool-operate">
          <el-button type="danger" @click="onClickLogout" plain>注销</el-button>
        </div>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { UserFilled } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/modules/user";
import { convertTime } from "@/utils/times";
import { ref } from "vue";

const userStore = useUserStore();

let times = ref(convertTime("yyyy-MM-dd hh:mm:ss", new Date().getTime()));
setInterval(() => {
  times.value = convertTime("yyyy-MM-dd hh:mm:ss", new Date().getTime());
}, 1000);

const onClickLogout = () => {
  userStore.logout();
};
</script>

<style scoped></style>
