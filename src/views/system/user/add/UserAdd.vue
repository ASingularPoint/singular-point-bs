<template>
  <ADialogForm
    :title="title"
    v-model:modelValue="modelValue"
    :model="model"
    :rules="rules"
    @submit="onFormSubmitHandler"
  >
    <template #form>
      <el-form-item label="用户名" prop="accountName">
        <el-input v-model="model.accountName" placeholder="请输入" />
      </el-form-item>

      <el-form-item label="密码" prop="passwd">
        <el-input v-model="model.passwd" type="password" placeholder="请输入" />
      </el-form-item>

      <el-form-item label="角色" prop="role">
        <el-select v-model="model.role" placeholder="请选择">
          <el-option
            v-for="(item, index) in roleListData"
            :key="index"
            :label="item.name"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
    </template>
  </ADialogForm>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ElMessage, FormRules } from "element-plus";
import md5 from "crypto-js/md5";

import ADialogForm from "@/components/ADialogForm/aDialogForm.vue";

import { TimeFormat } from "@/utils/dataFormat";

import { AddUser } from "@/api/system/user";
import { GetRoleList } from "@/api/system/role";

interface Model extends AddUserParams {}

const emit = defineEmits(["submit"]);

const title = "添加用户";

const modelValue = ref<boolean>(true);

const model = reactive<Model>({
  accountName: "",
  passwd: "",
  role: "",
});

const rules = reactive<FormRules>({
  accountName: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 3, max: 11, message: "长度应为3到11", trigger: "blur" },
  ],
  passwd: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 3, max: 36, message: "长度应为3到36", trigger: "blur" },
  ],
  role: [{ required: true, message: "角色不能为空", trigger: "change" }],
});

// 角色列表
const roleListData = ref<GetRoleListData[]>([]);

onMounted(() => {
  getRoleListData();
});

// 获取角色列表
const getRoleListData = () => {
  GetRoleList()
    .then((res) => new TimeFormat("createTime").pipe(res))
    .then((res) => {
      roleListData.value = res.records;
    });
};

const onFormSubmitHandler = () => {
  AddUser({
    accountName: model.accountName,
    passwd: md5(model.passwd).toString().toUpperCase(),
    role: model.role,
  }).then((res) => {
    modelValue.value = false;
    ElMessage({
      showClose: true,
      message: res,
      type: "success",
    });
    emit("submit");
  });
};
</script>

<style lang="scss" scoped></style>
