<template>
  <div class="table-header">
    <div class="action-set-left">
      <!-- 刷新按钮 -->
      <el-tooltip class="box-item" effect="dark" content="刷新" placement="top">
        <el-button
          size="default"
          color="#40485b"
          type="primary"
          @click="refresh($event)"
        >
          <mdicon name="cached" size="18" />
        </el-button>
      </el-tooltip>

      <!-- 添加按钮 -->
      <el-tooltip class="box-item" effect="dark" content="添加" placement="top">
        <el-button size="default" type="primary" @click="add($event)">
          <mdicon name="plus" size="18" />
          <span>添加</span>
        </el-button>
      </el-tooltip>

      <!-- 编辑按钮 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        content="编辑"
        placement="top"
        :disabled="props.isSelection"
      >
        <el-button
          size="default"
          type="primary"
          :disabled="props.isSelection"
          @click="edit($event)"
        >
          <mdicon name="pencil" size="18" />
          <span>编辑</span>
        </el-button>
      </el-tooltip>

      <!-- 删除按钮 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        content="删除"
        placement="top"
        :disabled="props.isSelection"
      >
        <APopconfirm style="margin-left: 12px" @confirm="handleDelete">
          <el-button
            size="default"
            type="danger"
            :disabled="props.isSelection"
            @click="btnRestore($event)"
          >
            <mdicon name="trash-can" size="18" />
            <span>删除</span>
          </el-button>
        </APopconfirm>
      </el-tooltip>
    </div>

    <div class="action-set-right">
      <el-input
        v-model="searchValue"
        class="w-50 m-2"
        size="default"
        :placeholder="`通过${props.placeholderValue}模糊搜索`"
      />
      <el-button class="search" @click="search">
        <mdicon name="magnify" size="18" />
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import APopconfirm from "@/components/APopconfirm/aPopconfirm.vue";
import { elmBtnBlur } from "@/utils/func";

interface Props {
  isSelection: boolean;
  placeholderValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isSelection: true,
  placeholderValue: "",
});

const emit = defineEmits(["refresh", "add", "edit", "remove", "search"]);

const searchValue = ref<string>("");

// 刷新按钮
const refresh = (event: Event) => {
  elmBtnBlur(event);
  emit("refresh");
};

// 添加按钮
const add = (event: Event) => {
  elmBtnBlur(event);
  emit("add");
};

// 修改按钮
const edit = (event: Event) => {
  elmBtnBlur(event);
  emit("edit");
};

// 删除按钮
const handleDelete = () => {
  emit("remove");
};
const btnRestore = (event: Event) => {
  elmBtnBlur(event);
};

// 搜索按钮
const search = (event: Event) => {
  elmBtnBlur(event);
  emit("search", searchValue);
};
</script>

<style lang="scss" scoped>
.table-header {
  padding: 13px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // .action-set-left {
  // }
  .action-set-right {
    display: flex;

    .search {
      margin-left: 10px;
    }
  }
}
</style>
