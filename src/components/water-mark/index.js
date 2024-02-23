import { WaterMark } from "@nutui/nutui-react-taro";

const Index = (props) => {
  return (
    <WaterMark
      zIndex={0}
      content="龙腾虎跃"
      fontColor="#e6e6e6"
      fontSize="14"
      // gapX={48}
      // gapY={96}
      {...props}
    ></WaterMark>
  );
};

export default Index;
