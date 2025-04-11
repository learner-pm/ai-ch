import { View, Text, Button } from "@tarojs/components";
import { useState } from "react";
import Taro from "@tarojs/taro";
import InputTabs from "./components/InputTabs";
import VoiceInput from "./components/VoiceInput";
import TextInput from "./components/TextInput";
import HandwriteInput from "./components/HandwriteInput";
import ResultCard from "./components/ResultCard";
import RecentRecords from "./components/RecentRecords";
import "./index.scss";

const Record: React.FC = () => {
  const [activeTab, setActiveTab] = useState("voice");
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [parsedResult, setParsedResult] = useState({
    amount: "",
    category: "",
    time: "",
    note: "",
  });

  const handleVoiceResult = (text: string) => {
    setInputValue(text);
    // 模拟AI解析
    setTimeout(() => {
      const mockParsedResult = {
        amount: "18.00",
        category: "餐饮",
        time: "今天",
        note: "买咖啡",
      };
      setParsedResult(mockParsedResult);
    }, 500);
  };

  const handleTextInput = (value: string) => {
    setInputValue(value);
    if (value.trim()) {
      setTimeout(() => {
        const mockParsedResult = {
          amount: "18.00",
          category: "餐饮",
          time: "今天",
          note: "买咖啡",
        };
        setParsedResult(mockParsedResult);
      }, 500);
    }
  };

  const handleEdit = (field: string) => {
    Taro.showToast({
      title: `编辑${field}`,
      icon: "none",
    });
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      Taro.showToast({
        title: "请输入消费内容",
        icon: "none",
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      Taro.showModal({
        title: "记账成功",
        content: "✅ 记账成功",
        confirmText: "继续记账",
        cancelText: "查看历史",
        success: (res) => {
          if (res.confirm) {
            setInputValue("");
            setParsedResult({
              amount: "",
              category: "",
              time: "",
              note: "",
            });
          } else {
            Taro.navigateBack();
          }
        },
      });
    }, 1000);
  };

  const renderInputArea = () => {
    switch (activeTab) {
      case "voice":
        return <VoiceInput onResult={handleVoiceResult} />;
      case "handwrite":
        return <HandwriteInput />;
      case "input":
      default:
        return <TextInput value={inputValue} onChange={handleTextInput} />;
    }
  };

  return (
    <View className="record">
      <View className="header">
        <Text className="title">记一笔</Text>
        <Text className="icon">🧾</Text>
      </View>

      <InputTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <View className="input-section">{renderInputArea()}</View>

      <ResultCard result={parsedResult} onEdit={handleEdit} />

      <View className="action-section">
        <Button
          className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
          onClick={handleSubmit}
          disabled={isSubmitting || !parsedResult.amount}
        >
          {isSubmitting ? "记账中..." : "立即记账"}
        </Button>
      </View>

      <RecentRecords />
    </View>
  );
};

export default Record;
