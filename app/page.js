"use client";

import Main from "@/components/Main";
import GameFlow from "@/components/GameFlow";
import { useState, useEffect } from "react";
import CustomLoading from "@/components/CustomLoading";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [currentStep, setCurrentStep] = useState("stage");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    setIsLoading(true);  
    setTimeout(() => {
      setIsLoading(false);
      setIsStarted(true);
    }, 1000);
  };

  return (
    <>
      {isLoading && <CustomLoading />}  {/* 로딩 화면 */}
      {!isLoading && !isStarted && <Main onStart={handleStart} />}  {/* 시작 전 메인 화면 */}
      {!isLoading && isStarted && <GameFlow currentStep={currentStep} setCurrentStep={setCurrentStep} />}  {/* 게임 진행 */}
    </>
  );
}
