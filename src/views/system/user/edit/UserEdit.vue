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
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="model.userName" placeholder="请输入" />
      </el-form-item>

      <el-form-item label="账号" prop="account">
        <el-input v-model="model.account" placeholder="请输入" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="model.password"
          type="password"
          placeholder="请输入 (留空则默认不修改)"
        />
      </el-form-item>

      <el-form-item label="角色" prop="role">
        <el-select v-model="model.role" placeholder="请选择">
          <el-option
            v-for="(item, index) in roleListData"
            :key="index"
            :label="item.name"
            :value="item.id"
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

import { getUserQuery, EditUser } from "@/api/system/user";
import { getRoleSelectTree } from "@/api/system/role";

interface Props {
  id: string;
}

interface Model extends EditUserParams {}

const props = defineProps<Props>();

const emit = defineEmits(["submit"]);

const title = "编辑用户";

const modelValue = ref<boolean>(true);

const model = reactive<Model>({
  id: "",
  userName: "",
  account: "",
  password: "",
  role: "",
});

const rules = reactive<FormRules>({
  userName: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 1, max: 11, message: "长度应为1到11", trigger: "blur" },
  ],
  account: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 3, max: 11, message: "长度应为3到11", trigger: "blur" },
  ],
  password: [
    { required: false, message: "密码不能为空", trigger: "blur" },
    { min: 3, max: 36, message: "长度应为3到36", trigger: "blur" },
  ],
  role: [{ required: true, message: "角色不能为空", trigger: "change" }],
});

// 角色列表
const roleListData = ref<GetRoleListData[]>([]);

onMounted(() => {
  getData();
  getRoleSelectTreeData();
});

// 获取用户信息
const getData = () => {
  getUserQuery({ id: props.id }).then((res) => {
    model.id = res.id;
    model.userName = res.userName;
    model.account = res.account;
    model.role = res.role;
  });
};

// 获取角色树
const getRoleSelectTreeData = () => {
  getRoleSelectTree().then((res) => {
    roleListData.value = res;
  });
};

const onSubmit = () => {
  const { password, ...form } = model;
  EditUser({
    ...form,
    password: password ? md5(password).toString().toUpperCase() : "",
  }).then((res) => {
    modelValue.value = false;
    ElMessage({
      showClose: true,
      message: "修改成功!",
      type: "success",
    });
    emit("submit");
  });
};
</script>

<style lang="scss" scoped>
.a-dialog-form {
  .el-select {
    :deep(.el-input__validateIcon) {
      display: none !important;
    }
  }
}
</style>
