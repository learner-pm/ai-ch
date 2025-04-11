import { View, Text, Input } from "@tarojs/components";
import "./index.scss";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  return (
    <View className="text-input">
      <Input
        className="input"
        placeholder="请输入消费内容，例如：今天买咖啡花了18元"
        value={value}
        onInput={(e) => onChange(e.detail.value)}
        focus
      />
    </View>
  );
};

export default TextInput;
