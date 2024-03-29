<template>
  <el-dialog
    v-model="privatemodelValue"
    :title="props.title"
    :width="props.width"
    @closed="onDialogClose"
  >
    <el-form
      ref="ruleFormRef"
      :model="privatemodel"
      :rules="props.rules"
      :label-width="formOptions.labelWidth"
      :status-icon="formOptions.statusIcon"
      v-loading="loading"
    >
      <slot name="form"></slot>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="privatemodelValue = false">
          {{ props.cancelText }}
        </el-button>
        <el-button type="primary" @click="onDialogSubmit($event, ruleFormRef)">
          {{ props.submitText }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { FormRules, FormInstance } from "element-plus";
import { elmBtnBlur } from "@/utils/func";

interface AcceptFormProps {
  labelWidth?: string | number;
  statusIcon?: boolean;
}

interface Props {
  title: string;
  cancelText?: string;
  submitText?: string;
  width?: string;
  rules?: FormRules;
  model: object;
  formOptions?: AcceptFormProps;
  modelValue?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Dialog Title",
  cancelText: "取消",
  submitText: "保存",
  width: "600px",
  modelValue: false,
  loading: false,
  formOptions: () => ({
    labelWidth: "120px",
    statusIcon: true,
  }),
});

const emit = defineEmits([
  "submit",
  "cancel",
  "reject",
  "destroy",
  "update:model",
  "update:modelValue",
]);

const ruleFormRef = ref<FormInstance>();

const privatemodel = computed({
  get: () => props.model,
  set: (val) => {
    emit("update:model", val);
  },
});

const privatemodelValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit("update:modelValue", val);
  },
});

const onDialogSubmit = async (
  event: Event,
  formEl: FormInstance | undefined
) => {
  elmBtnBlur(event);
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit("submit");
    } else {
      emit("reject", fields);
    }
  });
};

// dialog 动画关闭时
const onDialogClose = () => {
  emit("cancel");
  emit("destroy");
};
</script>

<style lang="scss" scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
