"use client";

import Main from "@/components/Main";
import GameFlow from "@/components/GameFlow";
import { useState } from "react";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState("stage");

  return (
    <>
      {!isStarted && <Main onStart={() => setIsStarted(true)} />}
      {isStarted && <GameFlow currentStep={currentStep} setCurrentStep={setCurrentStep} />}
    </>
  );
}
