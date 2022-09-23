import { defineStore } from "pinia";
import router from "@/router/index";

interface State {
  toolBarData: ToolBarData[];
  cacheView: string[];
}

export const useTagStore = defineStore("tag", {
  state: (): State => ({
    toolBarData: [], // 保存标签button的数组
    cacheView: [], // 保存需要缓存的数组
  }),
  getters: {
    getToolData: (state) => state.toolBarData,
    getCacheView: (state) => state.cacheView,
  },
  actions: {
    setToolData(data: ToolBarData) {
      // 添加标签按钮，如果当前路由已经打开，则不再重复添加
      const inToolbar = this.toolBarData.find(
        (item) => item.detail === data.detail
      );
      !inToolbar &&
        this.toolBarData.push({
          ...data,
        });
    },
    setCacheView(data: ToolBarData) {
      // 与setToolData类似
      if (this.cacheView.includes(data.componentName)) return;
      this.cacheView.push(data.componentName);
    },
    clearToolData(detail: string) {
      const index = this.toolBarData.findIndex(
        (item) => item.detail === detail
      );

      const isActive =
        router.currentRoute.value.fullPath == this.toolBarData[index]["detail"];
      const len = this.toolBarData.length - 1;
      this.toolBarData.splice(index, 1);
      (index == len || isActive) &&
        router.push({
          path: this.toolBarData[this.toolBarData.length - 1]["detail"],
        });
    },
    clearCacheView(viewName: string) {
      const index = this.cacheView.findIndex((item) => item == viewName);
      this.cacheView.splice(index, 1);
    },
  },
  // persist: true,
});
