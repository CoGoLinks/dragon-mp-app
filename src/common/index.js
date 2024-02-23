import Taro from "@tarojs/taro";
import { getLocalState, setLocalState } from "@/store/helper";
import pkg from "package";

/**
 * 获取登录token
 * @returns token
 */
export function getToken() {
  const data = getLocalState(pkg.name);
  const { authInfo = {} } = data || {};
  return authInfo.token || "";
}
/**
 * 去登录
 */
export function toLogin() {
  setTimeout(() => {
    // 登录成功，设置登录状态
    setLocalState({});
    // 跳转到主页面
    Taro.reLaunch({ url: "/pages/login/index" });
  });
}
