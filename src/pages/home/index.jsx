import { useCallback } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { useEnv, useModal } from "taro-hooks";
import { getToken, toLogin } from "@/common";

import "./index.less";

const Index = () => {
  const env = useEnv();

  const [show] = useModal({
    title: "提示",
    showCancel: true,
    confirmText: "确定",
    mask: true,
  });

  const onUserLogout = useCallback(() => {
    show({ content: "确定要退出登录吗？" }).then((result) => {
      const { confirm = false } = result || {};
      console.log("result ===", result);
      if (confirm) {
        toLogin();
      }
    });
  }, [show]);

  const onNavigateTo = useCallback((url) => {
    Taro.navigateTo({
      url: url,
      events: {
        navigateBack: (data) => {
          // 返回带回来的参数
          console.log("navigateBack", data);
        },
      },
      success: (res) => {
        // 传参数
        res.eventChannel.emit("navigateTo", {
          menu: { userName: "我是一个参数" },
        });
      },
    });
  }, []);

  return (
    <View className="wrapper">
      <View className="list">
        <Text className="label">运行环境</Text>
        <Text className="note">{env}</Text>
      </View>
      <View className="list">
        <Text className="label">Token</Text>
        <Text className="note">{getToken()}</Text>
      </View>
      <Button
        className="button"
        onClick={() => onNavigateTo("/package/detail/index")}
      >
        分包详情页面
      </Button>
      <Button
        className="button"
        onClick={() => onNavigateTo("/package/setting/index")}
      >
        分包设置页面
      </Button>
      <Button className="button" onClick={onUserLogout}>
        退出登录
      </Button>
    </View>
  );
};

export default Index;
