import DynamicRender from "@/utils/DynamicRender";
import UserAdd from "./UserAdd.vue";

export default function (options: object) {
  return new DynamicRender({
    component: UserAdd,
    ...options,
  });
}
