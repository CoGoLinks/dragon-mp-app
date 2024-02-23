import Taro from "@tarojs/taro";

/**
 * 消息提示
 * @param {*} title
 * @param {*} icon
 */
export default function showToast(title = "", icon = "none", duration = 2000) {
  Taro.showToast({
    title: title,
    icon: icon,
    duration: duration,
  });
}
