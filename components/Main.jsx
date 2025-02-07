import Image from "next/image";
import Button from "./Button";
import { logo, yanto, bg, startBtn, heart, choco1, choco2, choco3, cloud1, cloud2 } from "@/public/images/main";
export default function Main({ onStart }) {
  return (
    <main className="bg-white max-w-[400px] max-h-[800px] absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
      <div className="absolute w-full h-full">
        <div className="bg-main w-full h-full"></div>
        <Image src={heart} className="absolute w-[240px] top-20 left-1/2 -translate-x-1/2" alt="하트" />
        <Image src={cloud1} width={200} height={160} className="absolute bottom-32 left-[-48px] animate-cloud-left-right" alt="구름" />
        <Image src={cloud2} width={160} height={160} className="absolute bottom-64 right-[-48px] animate-cloud-left-right" alt="구름" />
        <p className="absolute top-64 w-full text-center text-xl">내 손으로 꾸미는 달콤한 초콜릿을 만들어줘요</p>
        <Image src={yanto} width={200} height={200} className="absolute top-[45%] -translate-x-1/2 left-1/2 animate-bounce-up-middle" alt="얀토" />
        <Image src={choco1} width={44} height={44} className="absolute top-[360px] left-12 rotate-6 animate-choco-left-right" alt="초콜릿" />
        <Image src={choco2} width={48} height={48} className="absolute bottom-72 right-8 animate-choco-right-left" alt="초콜릿" />
        <Image src={choco3} width={40} height={40} className="absolute bottom-[216px] left-16 animate-choco-left-right" alt="초콜릿" />
        <Image src={logo} className="absolute w-[360px] top-20 left-1/2 -translate-x-1/2 " alt="초코조요" />
        {/* <p className="absolute bottom-24 w-full text-center text-gray-warm-200 text-xl">벌써 0명이 만들었어요!</p> */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <Button message={"초콜릿 만들기"} size="md" onClick={onStart} />
        </div>
      </div>
    </main>
  );
}
