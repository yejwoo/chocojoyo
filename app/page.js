'use client';

import Main from "@/components/Main";
import Navi from "@/components/Navi";
import Stage1 from "@/components/Stage1";
import { useState } from "react";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [chocolates, setChocolates] = useState([]);

  return (
    <>
      <Main onStart={() => setIsStarted(true)}/>
      {isStarted && <Stage1 />}
      {/* {isStarted && <Navi />} */}
    </>    
  );
}
