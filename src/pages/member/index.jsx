import { useCallback, useState } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import { Cell, Video } from "@nutui/nutui-react-taro";

import logo from "@/images/hook.png";

import "./index.less";

const Index = () => {
  const [source, setSource] = useState({
    src: "https://storage.360buyimg.com/nutui/video/video_NutUI.mp4",
    type: "video/mp4",
  });
  const options = {
    controls: true,
  };
  const play = (elm) => console.log("play", elm);
  const pause = (elm) => console.log("pause", elm);
  const playend = (elm) => console.log("playend", elm);

  const env = useEnv();
  // eslint-disable-next-line no-unused-vars
  const [_, { setTitle }] = useNavigationBar({ title: "Taro Hooks" });
  const [show] = useModal({
    title: "Taro Hooks!",
    showCancel: false,
    confirmColor: "#8c2de9",
    confirmText: "支持一下",
    mask: true,
  });
  const [showToast] = useToast({ mask: true });

  const handleModal = useCallback(() => {
    show({ content: "不如给一个star⭐️!" }).then(() => {
      showToast({ title: "点击了支持!" });
    });
  }, [show, showToast]);

  return (
    <View className="wrapper">
      <Cell style={{ padding: "0" }}>
        <Video
          source={source}
          options={options}
          onPlay={play}
          onPause={pause}
          onPlayEnd={playend}
          style={{ height: "163px" }}
        />
      </Cell>

      <Image className="logo" src={logo} />
      <Text className="title">为Taro而设计的Hooks Library</Text>
      <Text className="desc">
        目前覆盖70%官方API. 抹平部分API在H5端短板. 提供近40+Hooks!
        并结合ahook适配Taro!
      </Text>
      <View className="list">
        <Text className="label">运行环境</Text>
        <Text className="note">{env}</Text>
      </View>
      <Button className="button" onClick={() => setTitle("Taro Hooks Nice!")}>
        设置标题
      </Button>
      <Button className="button" onClick={handleModal}>
        使用Modal
      </Button>
    </View>
  );
};

export default Index;
