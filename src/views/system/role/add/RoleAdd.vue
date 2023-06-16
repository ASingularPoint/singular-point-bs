<template>
  <ADialogForm
    class="a-dialog-form"
    :title="title"
    v-model:modelValue="modelValue"
    :model="model"
    :rules="rules"
    @submit="onSubmit"
  >
    <template #form>
      <el-form-item label="角色名" prop="name">
        <el-input v-model="model.name" placeholder="请输入" />
      </el-form-item>
    </template>
  </ADialogForm>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { FormRules } from "element-plus";

import ADialogForm from "@/components/ADialogForm/aDialogForm.vue";

interface Model extends AddRoleParams {}

const title = "添加角色";
const modelValue = ref<boolean>(true);
const model = reactive<Model>({
  name: "",
});
const rules = reactive<FormRules>({
  name: [{ required: true, message: "角色名不能为空", trigger: "blur" }],
});

const onSubmit = () => {
  console.log("提交");
};
</script>

<style scoped></style>
