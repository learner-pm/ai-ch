import { View, Text } from "@tarojs/components";
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import WaveCanvas from "./WaveCanvas";
import "./index.scss";

interface Props {
  onClose: () => void;
  onRecordComplete: (tempFilePath: string) => void;
}

export default function RecordingModal({ onClose, onRecordComplete }: Props) {
  const [status, setStatus] = useState<
    "ready" | "recording" | "processing" | "completed"
  >("ready");
  const [recordedText, setRecordedText] = useState("");
  const [recorderManager] = useState(() => Taro.getRecorderManager());
  const [audioFilePath, setAudioFilePath] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [innerAudioContext, setInnerAudioContext] = useState<any>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  useEffect(() => {
    // 设置录音监听器
    recorderManager.onStop(async (res) => {
      setAudioFilePath(res.tempFilePath);
      setStatus("processing");
      setIsTranscribing(true);

      try {
        // 上传文件到本地语音转文本接口
        const uploadTask = Taro.uploadFile({
          url: "http://192.168.2.20:5000/transcribe",
          filePath: res.tempFilePath,
          name: "audio",
          success: (uploadRes) => {
            try {
              const result = JSON.parse(uploadRes.data);
              if (result.text) {
                setRecordedText(result.text);
              } else {
                setRecordedText("未能识别语音内容");
              }
            } catch (err) {
              console.error("Parse response error:", err);
              setRecordedText("语音识别失败");
            }
          },
          fail: (err) => {
            console.error("Upload error:", err);
            setRecordedText("上传文件失败");
          },
          complete: () => {
            setIsTranscribing(false);
            setStatus("completed");
          },
        });
      } catch (err) {
        console.error("Speech recognition error:", err);
        setRecordedText("语音识别失败");
        setIsTranscribing(false);
        setStatus("completed");
      }

      onRecordComplete(res.tempFilePath);
    });

    recorderManager.onError((err) => {
      console.error("Recording error:", err);
      Taro.showToast({ title: "录音失败", icon: "error" });
      setStatus("ready");
    });

    // 初始化音频上下文
    const audioContext = Taro.createInnerAudioContext();
    setInnerAudioContext(audioContext);

    audioContext.onPlay(() => {
      setIsPlaying(true);
    });

    audioContext.onStop(() => {
      setIsPlaying(false);
    });

    audioContext.onEnded(() => {
      setIsPlaying(false);
    });

    return () => {
      // 清理录音状态
      if (status === "recording") {
        recorderManager.stop();
      }
      // 清理音频上下文
      if (audioContext) {
        audioContext.destroy();
      }
    };
  }, []);

  // 开始录音
  const handleStartRecording = async () => {
    try {
      // 请求录音权限
      const { authSetting } = await Taro.getSetting();
      if (!authSetting["scope.record"]) {
        await Taro.authorize({ scope: "scope.record" });
      }

      // 开始录音
      recorderManager.start({
        duration: 60000, // 最长录制 60 秒
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192000,
        format: "mp3",
      });
      setStatus("recording");
      setRecordedText(""); // 清空之前的录音文本
      setAudioFilePath(""); // 清空之前的音频文件
    } catch (err) {
      console.error("Recording error:", err);
      Taro.showToast({ title: "录音失败", icon: "error" });
    }
  };

  // 停止录音
  const handleStopRecording = () => {
    setStatus("processing");
    recorderManager.stop();
  };

  // 重新录音
  const handleRestart = () => {
    setStatus("ready");
    setRecordedText("");
    setAudioFilePath("");
    if (innerAudioContext) {
      innerAudioContext.stop();
      setIsPlaying(false);
    }
  };

  // 播放录音
  const handlePlayAudio = () => {
    if (!audioFilePath) return;

    if (isPlaying) {
      innerAudioContext.stop();
    } else {
      innerAudioContext.src = audioFilePath;
      innerAudioContext.play();
    }
  };

  return (
    <View className="recording-mask" onClick={(e) => e.stopPropagation()}>
      {/* 波形动画 */}
      {status === "recording" && (
        <View className="wave-container">
          <WaveCanvas isRecording={status === "recording"} />
        </View>
      )}

      {/* 处理中状态 */}
      {isTranscribing && (
        <View className="processing-container">
          <View className="loading-spinner"></View>
          <Text className="processing-text">正在转换语音...</Text>
        </View>
      )}

      {/* 录音结果显示 */}
      {recordedText && (
        <View className="result-text">
          <Text>{recordedText}</Text>
        </View>
      )}

      {/* 音频文件展示和播放控制 */}
      {status === "completed" && audioFilePath && (
        <View className="audio-control">
          <View className="audio-info">
            <Text className="audio-icon">🎵</Text>
            <Text className="audio-text">录音文件</Text>
          </View>
          <View className="play-btn" onClick={handlePlayAudio}>
            <Text className="play-icon">{isPlaying ? "⏹️" : "▶️"}</Text>
          </View>
        </View>
      )}

      {/* 底部按钮 */}
      {status !== "processing" && status !== "completed" && (
        <View className="bottom-btn">
          {status === "ready" ? (
            <View className="bottom-buttons">
              <View className="start-btn" onClick={handleStartRecording}>
                <Text className="mic-icon">🎤</Text>
              </View>
              <View className="close-btn" onClick={onClose}>
                <Text className="icon">×</Text>
              </View>
            </View>
          ) : (
            <View className="stop-btn" onClick={handleStopRecording}>
              <Text className="icon">×</Text>
            </View>
          )}
        </View>
      )}

      {/* 完成状态的操作按钮 */}
      {status === "completed" && (
        <View className="action-buttons">
          <View className="action-btn restart" onClick={handleRestart}>
            <Text className="icon">↻</Text>
          </View>
          <View className="action-btn close" onClick={onClose}>
            <Text className="icon">×</Text>
          </View>
        </View>
      )}
    </View>
  );
}
