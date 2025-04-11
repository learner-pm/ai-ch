export default defineAppConfig({
  pages: ["pages/index/index", "pages/record/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "AI记账",
    navigationBarTextStyle: "black",
  },
  plugins: {
    WechatSI: {
      version: "0.3.6",
      provider: "wx069ba97219f66d99",
    },
  },
});
