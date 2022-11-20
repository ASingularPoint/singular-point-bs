import { createVNode, Component, VNode, render } from "vue";
import App from "@/main";

declare type Data = Record<string, any>;

interface DynamicRenderOptions {
  component: Component;
  props?: Data | null;
}

class DynamicRender {
  component: Component;
  props?: Data | null;
  vnode: VNode;
  container: Element;
  appendTo: HTMLElement;

  constructor(options: DynamicRenderOptions) {
    this.component = options.component;
    this.props = options.props;
    this.appendTo = document.body;
    this.container = this.createAppContainer();
    this.vnode = this.createVnodes();
  }

  // 创建容器
  private createAppContainer() {
    const container = document.createElement("div");
    const randomContainerId = this.getRandomArbitrary(1, 9999).toFixed(0);
    container.setAttribute("id", `dynamic-render-${randomContainerId}`);
    return container;
  }

  // 创建 VM （虚拟节点）
  private createVnodes() {
    const vm = createVNode(this.component, this.props);
    // 调用createApp创建的上下文
    vm.appContext = App._context;
    // 清除通知元素，防止mem泄漏
    vm.props = this.props || {};
    // 销毁 render 渲染的 vm
    vm.props!.onDestroy = () => {
      render(null, this.container);
    };
    // render 渲染 vm
    render(vm, this.container);
    // ! 非空断言 ( this.container.firstElementChild 一定有值)
    this.appendTo.appendChild(this.container.firstElementChild!);
    return vm;
  }

  /**
   * 获取任意随机值
   * @param min 最小值
   * @param max 最大值
   * @returns
   */
  private getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}

export default DynamicRender;
