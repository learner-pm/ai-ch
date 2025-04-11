import { useEffect, useRef } from "react";
import Taro from "@tarojs/taro";
import { Canvas } from "@tarojs/components";
import "./WaveCanvas.scss";

interface Props {
  isRecording: boolean;
}

export default function WaveCanvas({ isRecording }: Props) {
  const canvasRef = useRef<any>(null);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef<number>(0);

  // 定义波形高度数据
  const leftHeights = [
    10, 14, 10, 11, 13, 12, 14, 13, 20, 18, 34, 24, 50, 44, 70, 100,
  ];
  const rightHeights = [...leftHeights].reverse();
  const waveHeights = [...leftHeights, 140, ...rightHeights];

  useEffect(() => {
    if (!isRecording) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const query = Taro.createSelectorQuery();
    query
      .select(".wave-canvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext("2d");
        const dpr = Taro.getSystemInfoSync().pixelRatio;
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);

        const drawBars = () => {
          const width = res[0].width;
          const height = res[0].height;
          const barCount = waveHeights.length;
          const barWidth = width / (barCount * 2.8);
          const maxHeight = Math.max(...waveHeights);
          const heightScale = (height * 0.7) / maxHeight; // 使最高点达到画布高度的70%

          // 清除画布
          ctx.clearRect(0, 0, width, height);

          // 绘制条形
          for (let i = 0; i < barCount; i++) {
            const x =
              i * (barWidth * 2.2) + (width - barCount * barWidth * 2.2) / 2;

            // 获取基础高度
            let baseHeight = waveHeights[i] * heightScale;

            // 添加轻微的动态效果
            const position = i / barCount;
            const distanceFromCenter = Math.abs(position - 0.5) * 2;
            const waveScale = Math.pow(1 - distanceFromCenter, 2) * 0.1; // 减小波动幅度
            const wave =
              Math.sin(timeRef.current * 2 + position * Math.PI * 2) *
              waveScale;

            // 计算最终高度
            const barHeight = baseHeight * (1 + wave);
            const y = (height - barHeight) / 2 - height * 0.1; // 整体上移10%

            // 设置渐变颜色
            const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
            gradient.addColorStop(0, "#00DC82"); // 顶部绿色
            gradient.addColorStop(1, "#00DC82"); // 底部绿色

            // 绘制圆角矩形
            const radius = barWidth / 2;
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + barWidth - radius, y);
            ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
            ctx.lineTo(x + barWidth, y + barHeight - radius);
            ctx.quadraticCurveTo(
              x + barWidth,
              y + barHeight,
              x + barWidth - radius,
              y + barHeight
            );
            ctx.lineTo(x + radius, y + barHeight);
            ctx.quadraticCurveTo(x, y + barHeight, x, y + barHeight - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();
          }

          // 更新时间
          timeRef.current += 0.03;

          // 继续动画
          animationFrameRef.current = requestAnimationFrame(drawBars);
        };

        drawBars();
      });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRecording]);

  return (
    <Canvas
      type="2d"
      id="waveCanvas"
      className="wave-canvas"
      canvasId="waveCanvas"
    />
  );
}
