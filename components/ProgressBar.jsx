import { heart } from "@/public/images/common";
import Image from "next/image";
import { useState } from "react";

export default function ProgressBar({ gameState }) {
  const progressRatio = Math.min((gameState.stirCount / 10) * 100, 100);
  const progressBarWidth = 224; 
  const heartSize = 42; 
  const heartPositionX = (progressRatio / 100) * (progressBarWidth - heartSize); 

  return (
    <div className="absolute w-56 h-5">
      <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 w-56 h-5 bg-gray-200 border-4 border-default rounded-full">
        <div
          className="h-full bg-brand-100 rounded-full transition-all"
          style={{ width: `${progressRatio}%` }}
        />
      </div>
      {/* 하트 이미지 */}
      <Image
        src={heart}
        alt="하트"
        className={`absolute bottom-[-34px] transition-all duration-500 ${progressRatio === 100 ? 'animate-heartbeat-fast' : '' }`}
        style={{ left: `${heartPositionX}px` }} // 하트 위치 조정
      />
    </div>
  );
}
