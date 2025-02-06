"use client";

import Main from "@/components/Main";
import GameFlow from "@/components/GameFlow";
import { useEffect, useState } from "react";

export default function Home() {
  const [isStarted, setIsStarted] = useState(null);
  const [currentStep, setCurrentStep] = useState("stage");

  useEffect(() => {
    const storedIsStarted = sessionStorage.getItem("isStarted") === "true";
    const storedCurrentStep = sessionStorage.getItem("currentStep") || "stage";

    setIsStarted(storedIsStarted);
    setCurrentStep(storedCurrentStep);
  }, []);

  useEffect(() => {
    if (isStarted !== null) {
      sessionStorage.setItem("isStarted", isStarted);
    }
  }, [isStarted]);

  useEffect(() => {
    sessionStorage.setItem("currentStep", currentStep);
  }, [currentStep]);

  if (isStarted === null) return null; 

  return (
    <>
      {!isStarted && <Main onStart={() => setIsStarted(true)} />}
      {isStarted && <GameFlow currentStep={currentStep} setCurrentStep={setCurrentStep} />}
    </>
  );
}
