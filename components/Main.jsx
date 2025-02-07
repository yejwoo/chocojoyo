import Image from "next/image";
import Button from "./Button";
import { logo, yanto, heart, choco1, choco2, choco3, cloud1, cloud2 } from "@/public/images/main";
import Loading from "./CustomLoading";
export default function Main({ onStart }) {
  return (
    <main className=" bg-white max-w-[400px] max-h-[800px] absolute w-full h-[100dvh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
      <div className="absolute w-full h-full">
        <div className="bg-main w-full h-full"></div>

        {/* 구름 */}
        <div className="absolute border w-full h-72 bottom-[10%] left-1/2 -translate-x-1/2">
          <Image src={cloud1} width={200} height={160} className="absolute bottom-0 left-[-48px] animate-cloud-left-right" alt="구름" />
          <Image src={cloud2} width={160} height={160} className="absolute right-[-48px] animate-cloud-left-right" alt="구름" />
        </div>
        <div className="absolute w-full h-56 bottom-[25%] max-h-sm:bottom-[20%]">
          {/* 초콜릿 오브젝트 */}
          <Image src={choco1} width={44} height={44} className="absolute left-6 rotate-6 animate-choco-left-right" alt="초콜릿" />
          <Image src={choco2} width={48} height={48} className="absolute right-4 bottom-1/2 -translate-y-1/2 animate-choco-right-left" alt="초콜릿" />
          <Image src={choco3} width={40} height={40} className="absolute left-4 bottom-0 animate-choco-left-right" alt="초콜릿" />
          {/* 얀토 */}
          <Image src={yanto} width={200} height={200} className="absolute -translate-x-1/2 left-1/2 animate-bounce-up-middle" alt="얀토" />
        </div>
        <div className="flex flex-col justify-center items-center absolute top-[5%] max-h-sm:top-[0] w-full h-64">
          <div className="flex justify-center items-center">
            {/* 하트 */}
            <Image src={heart} className="w-[240px] max-h-sm:hidden" alt="하트" />
            {/* 로고 */}
            <Image src={logo} className="absolute w-[324px]" alt="초코조요" />
          </div>
          {/* 슬로건 */}
          <p className="w-full text-center text-xl max-h-sm:hidden">내 손으로 꾸미는 달콤한 초콜릿을 만들어줘요</p>
        </div>
        {/* <p className="absolute bottom-24 w-full text-center text-gray-warm-200 text-xl">벌써 0명이 만들었어요!</p> */}
        {/* 버튼 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <Button message={"초콜릿 만들기"} size="md" onClick={onStart} />
        </div>
      </div>
    </main>
  );
}
