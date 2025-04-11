import { FC } from "react";
import { View, Text, Image } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";

const Index: FC = () => {
  // 模拟用户数据
  const userInfo = {
    avatar: "https://placeholder.com/150",
    name: "John Doe",
  };

  return (
    <View className="index">
      {/* 顶部用户信息 */}
      <View className="header">
        <View className="user-info">
          <Image className="avatar" src={userInfo.avatar} />
          <Text className="username">{userInfo.name}</Text>
        </View>
      </View>

      {/* 功能入口 */}
      <View className="functions">
        <View
          className="function-card record"
          onClick={() => Taro.navigateTo({ url: "/pages/record/index" })}
        >
          <View className="card-content">
            <Text className="card-title">记账</Text>
            <Text className="card-desc">说句话，写几个字，马上记账。</Text>
            <Text className="card-tip">
              🗣️ 语音 / ✍️ 手写 / ⌨️ 输入都支持。
            </Text>
          </View>
          <View className="card-icon">+</View>
        </View>

        <View
          className="function-card history"
          onClick={() => console.log("历史")}
        >
          <View className="card-content">
            <Text className="card-title">查询</Text>
            <Text className="card-desc">看看钱都花哪儿了。</Text>
            <Text className="card-tip">🔍 支持分类筛选，数据清晰明了。</Text>
          </View>
          <View className="card-icon">→</View>
        </View>
      </View>
    </View>
  );
};

export default Index;
