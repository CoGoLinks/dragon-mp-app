import { useCallback, useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { useEnv, useModal } from "taro-hooks";
import { getToken, toLogin } from "@/common";
import { Tabs } from "@nutui/nutui-react-taro";

import logger from "@/common/log";
import ajax from "@/common/ajax";
import showToast from "@/common/toast";
import "./index.less";

const Index = () => {
  const [tab5value, setTab5value] = useState("0");
  const list5 = Array.from(new Array(20).keys());
  const state = {
    imgUrl:
      "https://img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg",
    title:
      "【活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水",
    price: "388",
    shopName: "阳澄湖大闸蟹自营店",
  };

  const [category, setCategory] = useState([]);

  const env = useEnv();

  const getData = () => {
    console.log("getData1");
    // https://storage.360buyimg.com/nutui/3x/new-categoryData.js
    // ajax
    //   .get('"https://storage.360buyimg.com/nutui/3x/new-categoryData.js"', {})
    //   .then((response) => {
    //     console.log("response", response);
    //     const { code: codeStatus = 0, data = {}, msg } = response;
    //     if (codeStatus === 200) {
    //       const { token = "", openid = "" } = data || {};
    //       // 这里可以存储接口返回的凭证信息
    //       logger.log("token ===", token);
    //       logger.log("openid ===", openid);
    //     } else {
    //       showToast(msg || "哎呀，出错了，请稍后再试");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   })
    //   .finally(() => {
    //     console.log("finally1");
    //   });
  };

  const onClassifyClick = (index) => {
    console.log("一级分类", index);
  };

  const onPanelThirdClick = (sku) => {
    console.log("三级分类跳转", sku);
  };

  useEffect(() => {
    console.log("useEffect1");
    getData();
    console.log("useEffect2");
  }, []);

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
      <Tabs
        style={{ height: "100vh" }}
        value={tab5value}
        onChange={(value) => {
          console.log(value);
          setTab5value(value);
        }}
        direction="vertical"
      >
        {list5.map((item) => (
          <Tabs.TabPane key={item} title={`Tab ${item}`}>
            Tab {item}
          </Tabs.TabPane>
        ))}
      </Tabs>

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
