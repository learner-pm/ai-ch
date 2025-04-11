import { View, Text } from "@tarojs/components";
import { useState } from "react";
import "./index.scss";
import RecordingModal from "../RecordingModal";

const VoiceInput = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View className="voice-input">
      <View className="voice-btn" onClick={() => setShowModal(true)}>
        <View className="mic-svg">🎙️</View>
        <View className="text">点击说话</View>
      </View>

      <Text className="tip">例如：今天买咖啡花了18元</Text>

      {showModal && <RecordingModal onClose={() => setShowModal(false)} />}
    </View>
  );
};

export default VoiceInput;
