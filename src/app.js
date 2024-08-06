import { useEffect } from "react";
import Taro, { useDidShow, useDidHide } from "@tarojs/taro";
import { AppProvider } from "@/store";
import "./app.less";


export default function App(props) {
  useEffect(() => {
    // 打开调试
    Taro.setEnableDebug({
      // 开发模式打开调试
      enableDebug: process.env.NODE_ENV === "development",
    });

    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log("hasUpdate=", res.hasUpdate);
    });
    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    });
  }, []);

  // 对应 onShow
  useDidShow(() => {});

  // 对应 onHide
  useDidHide(() => {});

  return <AppProvider>{props.children}</AppProvider>;
}
