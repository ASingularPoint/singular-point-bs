import DynamicRender from "@/utils/DynamicRender";
import UserEdit from "./UserEdit.vue";

export default function (options: object) {
  return new DynamicRender({
    component: UserEdit,
    ...options,
  });
}
