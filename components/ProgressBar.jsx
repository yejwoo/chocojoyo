import { heart } from "@/public/images/common";
import Image from "next/image";

export default function ProgressBar({ gameState, totalItems, stageId }) {
  let progressRatio = 0; 
  const completecount = 8;

  if (stageId === 2) {
    progressRatio = Math.min((gameState.currentItemIndex / (totalItems - 1)) * 100, 100);
  } else if (stageId === 3) {
    progressRatio = Math.min((gameState.stirCount / completecount) * 100, 100);
  }

  const progressBarWidth = 343; 
  const heartSize = 42; 
  const heartPositionX = (progressRatio / 100) * (progressBarWidth - heartSize);

  return (
    <div className="w-[343px] h-4">
      <div className="absolute bottom-[-28px] left-1/2 -translate-x-1/2 w-full h-4 bg-gray-200 border-4 border-default rounded-full">
        <div
          className="h-full bg-brand-100 rounded-full transition-all"
          style={{ width: `${progressRatio}%` }}
        />
      </div>
      {/* 하트 이미지 */}
      <Image
        src={heart}
        alt="하트"
        className={`absolute bottom-[-40px] transition-all duration-500 ${progressRatio === 100 ? 'animate-heartbeat-fast' : '' }`}
        style={{ left: `${heartPositionX}px` }}
      />
    </div>
  );
}
