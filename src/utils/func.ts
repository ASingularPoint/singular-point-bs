// 公共函数

// 解决element plus按钮点击后不失焦
export const elmBtnBlur = function (event: any) {
  event.target.blur();
  if (event.target.nodeName === "BUTTON") {
    event.target.parentNode.blur();
  }
  if (event.target.nodeName === "SPAN" || event.target.nodeName === "svg") {
    event.path.forEach((element: any) => {
      if (element.nodeName === "BUTTON") {
        element.blur();
      }
    });
  }
};
