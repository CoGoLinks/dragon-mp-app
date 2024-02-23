export default {
  // 主包
  pages: ["pages/login/index", "pages/home/index", "pages/member/index"],
  // 分包
  subpackages: [
    {
      root: "package",
      pages: ["detail/index", "setting/index"],
    },
  ],
  tabBar: {
    list: [
      {
        text: "主页",
        iconPath: "images/chat_off.png",
        selectedIconPath: "images/chat_on.png", // 81px * 81px
        pagePath: "pages/home/index",
      },
      {
        text: "个人中心",
        iconPath: "images/my_off.png",
        selectedIconPath: "images/my_on.png", // 81px * 81px
        pagePath: "pages/member/index",
      },
    ],
    color: "#666666",
    selectedColor: "#E53B4F",
    backgroundColor: "#fff",
    borderStyle: "black",
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  networkTimeout: {
    request: 60000,
    connectSocket: 60000,
    uploadFile: 120000,
    downloadFile: 120000,
  },
};
