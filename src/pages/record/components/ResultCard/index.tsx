import { View, Text } from "@tarojs/components";
import "./index.scss";

interface ParsedResult {
  amount: string;
  category: string;
  time: string;
  note: string;
}

interface ResultCardProps {
  result: ParsedResult;
  onEdit: (field: string) => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onEdit }) => {
  return (
    <View className="result-card">
      <View className="result-item">
        <View className="item-left">
          <Text className="icon">💰</Text>
          <Text className="label">金额：</Text>
          <Text className="value">
            {result.amount ? `¥${result.amount}` : "-"}
          </Text>
        </View>
        <Text className="edit-btn" onClick={() => onEdit("金额")}>
          ⏺️ 编辑
        </Text>
      </View>
      <View className="result-item">
        <View className="item-left">
          <Text className="icon">📂</Text>
          <Text className="label">分类：</Text>
          <Text className="value">{result.category || "-"}</Text>
        </View>
        <Text className="edit-btn" onClick={() => onEdit("分类")}>
          ⏺️ 编辑
        </Text>
      </View>
      <View className="result-item">
        <View className="item-left">
          <Text className="icon">📅</Text>
          <Text className="label">时间：</Text>
          <Text className="value">{result.time || "-"}</Text>
        </View>
        <Text className="edit-btn" onClick={() => onEdit("时间")}>
          ⏺️ 编辑
        </Text>
      </View>
      <View className="result-item">
        <View className="item-left">
          <Text className="icon">📝</Text>
          <Text className="label">备注：</Text>
          <Text className="value">{result.note || "-"}</Text>
        </View>
        <Text className="edit-btn" onClick={() => onEdit("备注")}>
          ⏺️ 编辑
        </Text>
      </View>
    </View>
  );
};

export default ResultCard;
