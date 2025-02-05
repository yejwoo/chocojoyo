"use client";

import Main from "@/components/Main";
import Stage from "@/components/GameFlow";
import { useState } from "react";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <>
      {!isStarted && <Main onStart={() => setIsStarted(true)} />}
      {isStarted  && <Stage />}
    </>
  );
}
