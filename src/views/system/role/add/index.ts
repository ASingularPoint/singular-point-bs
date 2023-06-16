import DynamicRender from "@/utils/DynamicRender";
import RoleAdd from "./RoleAdd.vue";

export default function (options: object) {
  return new DynamicRender({
    component: RoleAdd,
    ...options,
  });
}
