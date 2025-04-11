import { View, Text } from "@tarojs/components";
import "./index.scss";

const HandwriteInput: React.FC = () => {
  return (
    <View className="handwrite-input">
      <Text>请写下您的消费内容</Text>
      <Text className="tip">例如：今天买咖啡花了18元</Text>
    </View>
  );
};

export default HandwriteInput;
