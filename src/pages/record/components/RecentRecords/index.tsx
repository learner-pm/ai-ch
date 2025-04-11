import { View, Text } from "@tarojs/components";
import "./index.scss";

const RecentRecords: React.FC = () => {
  return (
    <View className="recent-records">
      <View className="section-title">
        <Text className="icon">📜</Text>
        <Text>最近记录</Text>
      </View>
      <View className="record-list">
        <View className="record-item">
          <View className="record-info">
            <Text className="time">今天中午</Text>
            <Text className="category">吃饭</Text>
          </View>
          <View className="record-amount">
            <Text className="amount">¥28</Text>
            <Text className="category-tag">（餐饮）</Text>
          </View>
        </View>
        <View className="record-item">
          <View className="record-info">
            <Text className="time">昨晚</Text>
            <Text className="category">滴滴</Text>
          </View>
          <View className="record-amount">
            <Text className="amount">¥16</Text>
            <Text className="category-tag">（出行）</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecentRecords;
