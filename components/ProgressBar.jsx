import { heart } from "@/public/images/common";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export default function ProgressBar({ chocolateInfo, gameState, totalItems, stageId }) {
  const progressBarRef = useRef(null);
  const heartRef = useRef(null);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [heartSize, setHeartSize] = useState(0);

  useEffect(() => {
    if (progressBarRef.current && heartRef.current) {
      setProgressBarWidth(progressBarRef.current.getBoundingClientRect().width);
      setHeartSize(heartRef.current.getBoundingClientRect().width);
    }
  }, []); // 최초 렌더링 시 실행

  let progressRatio = 0;
  const completecount = 6;

  if (stageId === 2) {
    progressRatio = Math.min((gameState.currentItemIndex / (totalItems - 1)) * 100, 100);
  } else if (stageId === 3) {
    progressRatio = Math.min((gameState.stirCount / completecount) * 100, 100);
  } else if (stageId === 4 && chocolateInfo) {
    const currentTotalSize = chocolateInfo.sizes.reduce((acc, size) => acc + size, 0);
    const maxTotalSize = 100 * chocolateInfo.sizes.length;
    progressRatio = Math.min((currentTotalSize / maxTotalSize) * 100, 100);
  }

  // const progressBarWidth = document.getElementById('progress-bar').getBoundingClientRect().width;
  // const heartSize = document.getElementById('progress-heart').getBoundingClientRect().width;
  const heartPositionX = (progressRatio / 100) * (progressBarWidth - heartSize);

  return (
    <div className="w-[320px] h-4" id="progress-bar">
      <div ref={progressBarRef} className="absolute bottom-[-28px] left-1/2 -translate-x-1/2 w-full h-4 bg-gray-200 border-4 border-default rounded-full">
        <div className="h-full bg-brand-100 rounded-full transition-all duration-500" style={{ width: `${progressRatio}%` }} />
      </div>
      {/* 하트 이미지 */}
      <Image
        ref={heartRef}
        id="progress-heart"
        src={heart}
        alt="하트"
        className={`absolute w-8 bottom-[-34px] transition-all duration-500 ${progressRatio === 100 ? "animate-heartbeat-fast" : ""}`}
        style={{ left: `${heartPositionX}px` }}
      />
    </div>
  );
}
