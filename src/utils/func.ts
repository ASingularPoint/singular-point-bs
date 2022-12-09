// 公共函数

// 解决element plus按钮点击后不失焦
export const elmBtnBlur = function (event: Event) {
  const target = event.target as HTMLInputElement;
  const parentNode = target.parentNode as HTMLInputElement;
  target.blur();
  if (target.nodeName === "BUTTON") {
    parentNode.blur();
  }
  if (
    target.nodeName === "SPAN" ||
    target.nodeName === "svg" ||
    target.nodeName === "path"
  ) {
    event.composedPath().forEach((element: EventTarget) => {
      if (element instanceof HTMLInputElement) {
        if (element.nodeName === "BUTTON") {
          element.blur();
        }
      }
    });
  }
};
