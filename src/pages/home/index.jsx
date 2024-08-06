import { useCallback, useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { Swiper, Grid, Image } from "@nutui/nutui-react-taro";
import { View, Text, Button } from "@tarojs/components";
import { useEnv, useModal } from "taro-hooks";
import { getToken, toLogin } from "@/common";

import "./index.less";

const list = [
  "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
  "https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg",
  "https://storage.360buyimg.com/jdc-article/welcomenutui.jpg",
  "https://storage.360buyimg.com/jdc-article/fristfabu.jpg",
];
const imgSrc =
  "https://m.360buyimg.com/babel/jfs/t1/36973/29/11270/120042/5cf1fe3cEac2b5898/10c2722d0cc0bfa7.png";
const Index = () => {
  const [asyncList, setAsyncList] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setAsyncList(list);
    }, 3000);
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
      <View className="text-[#acc855] text-[32px]">Hello world!</View>
      <Swiper defaultValue={0} indicator>
        {asyncList.map((item) => (
          <Swiper.Item key={item}>
            <img width="100%" height="100%" src={item} alt="" />
          </Swiper.Item>
        ))}
      </Swiper>
      <View className="list">
        <Text className="label">标题</Text>
      </View>
      <Grid columns={3} square>
        <Grid.Item>
          <Image src={imgSrc} width="100%" height="100%" />
        </Grid.Item>
        <Grid.Item>
          <Image src={imgSrc} width="100%" height="100%" />
        </Grid.Item>
        <Grid.Item>
          <Image src={imgSrc} width="100%" height="100%" />
        </Grid.Item>
        <Grid.Item>
          <Image src={imgSrc} width="100%" height="100%" />
        </Grid.Item>
        <Grid.Item>
          <Image src={imgSrc} width="100%" height="100%" />
        </Grid.Item>
        <Grid.Item>
          <Image src={imgSrc} width="100%" height="100%" />
        </Grid.Item>
      </Grid>
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
