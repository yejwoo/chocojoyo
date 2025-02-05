"use client";

import CardLayout from "@/components/CardLayout";
import Main from "@/components/Main";
import Stage from "@/components/Stage";
import { useState } from "react";
import { useStageState } from "./hooks/useStateState";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  // const [currentStep, setCurrentStep] = useState("stage");
  const [currentStep, setCurrentStep] = useState("card");
  const { state } = useStageState();
  const { chocolateInfo } = state;

  const handleStageComplete = () => {
    setCurrentStep("card");
  };

  const handleCardComplete = (formData) => {
    console.log("🎉 저장된 편지 데이터:", formData);
    setCurrentStep("share");
  };

  return (
    <>
      {!isStarted && <Main onStart={() => setIsStarted(true)} />}
      {isStarted && currentStep === "stage" && <Stage onComplete={() => setCurrentStep("card")} />}
      {currentStep === "card" && <CardLayout chocolateInfo={chocolateInfo} onComplete={(formData) => setCurrentStep("share")} />}
      {currentStep === "share" && <div>공유 구현 예정</div>}
    </>
  );
}
