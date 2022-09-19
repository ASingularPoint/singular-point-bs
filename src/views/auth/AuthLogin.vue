<template>
  <div class="login">
    <el-card class="box-card">
      <img class="login-header" src="@/assets/img/login-header.png" />
      <div class="content">
        <img class="login-avatar" src="@/assets/img/login-avatar.png" />
        <!--  -->
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          class="demo-ruleForm"
          @keydown.enter="submitForm(ruleFormRef)"
        >
          <el-form-item label="" prop="accountName">
            <el-input
              v-model="ruleForm.accountName"
              type="text"
              size="large"
              autocomplete="off"
              prefix-icon="User"
            />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              size="large"
              autocomplete="off"
              prefix-icon="Unlock"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-btn"
              type="primary"
              size="large"
              round
              @click="submitForm(ruleFormRef)"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
        <!--  -->
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { UserLogin } from "@/api/auth/login";
import md5 from "crypto-js/md5";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/modules/user";
import { useRouter } from "vue-router";

const store = useUserStore();
const Router = useRouter();

const ruleFormRef = ref<FormInstance>();

const validateAccountName = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else {
    callback();
  }
};
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  accountName: "",
  password: "",
});

const rules = reactive({
  accountName: [{ validator: validateAccountName, trigger: "blur" }],
  password: [{ validator: validatePassword, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      UserLogin({
        accountName: ruleForm.accountName,
        password: md5(ruleForm.password).toString().toUpperCase(),
      }).then((res) => {
        store.authLogin(res).then(() => {
          Router.replace({
            path: "/",
          });
        });
        ElMessage({
          showClose: true,
          message: "登录成功",
          type: "success",
        });
      });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background: url("~@/assets/img/bg-login.jpg");
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .box-card {
    width: 430px;
    height: auto;
    border: none;
    margin-top: 130px;

    ::v-deep .el-card__body {
      padding: 0;
    }
    .login-header {
      width: 100%;
      background-color: #ccccff;
    }
    .content {
      padding: 100px 40px 40px;
      position: relative;

      .login-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 4px solid #fff;
        box-sizing: border-box;
        position: absolute;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}

.demo-ruleForm {
  .el-form-item {
    margin-bottom: 22px;
  }
}

.login-btn {
  width: 100%;
  margin-top: 15px;
  // border-radius: 20px;
}
</style>
