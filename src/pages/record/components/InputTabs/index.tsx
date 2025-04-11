import { View, Text } from "@tarojs/components";
import "./index.scss";

interface InputTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const InputTabs: React.FC<InputTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <View className="tabs">
      <View
        className={`tab ${activeTab === "voice" ? "active" : ""}`}
        onClick={() => onTabChange("voice")}
      >
        🗣️ 语音
      </View>
      <View
        className={`tab ${activeTab === "handwrite" ? "active" : ""}`}
        onClick={() => onTabChange("handwrite")}
      >
        ✍️ 手写
      </View>
      <View
        className={`tab ${activeTab === "input" ? "active" : ""}`}
        onClick={() => onTabChange("input")}
      >
        ⌨️ 输入
      </View>
    </View>
  );
};

export default InputTabs;
