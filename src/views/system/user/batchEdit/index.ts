import DynamicRender from "@/utils/DynamicRender";
import UserBatchEdit from "./UserBatchEdit.vue";

export default function (options: object) {
  return new DynamicRender({
    component: UserBatchEdit,
    ...options,
  });
}
