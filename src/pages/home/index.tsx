import { Text, View } from "@tarojs/components";
import "./index.scss";

const prefix = "home";

const Home: React.FC = () => {
  return (
    <View className={prefix}>
      <View className={`${prefix}-box`}>
        <View className={`${prefix}-box-title`}>星座运势</View>
        <View className={`${prefix}-box-desc`}>每日、每周、每月运势预测</View>
      </View>
    </View>
  );
};

export default Home;
