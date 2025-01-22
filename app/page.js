'use client';

import Main from "@/components/Main";
import Stage from "@/components/Stage";
import { useState } from "react";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [chocolates, setChocolates] = useState([]);

  return (
    <>
      <Main onStart={() => setIsStarted(true)}/>
      {isStarted && <Stage />}
    </>    
  );
}
