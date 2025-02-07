import Image from "next/image";
import Button from "./Button";
import { logo, yanto, bg, startBtn } from "@/public/images/main";

export default function Main({ onStart }) {
  return (
    <main className="bg-white max-w-[400px] max-h-[800px] absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="absolute w-full h-full">
        <div className="bg-chocolates-ruby-100 w-full h-full"></div>
        <Image src={logo} className="absolute w-[360px] top-20 left-1/2 -translate-x-1/2" alt="로고" />
        <p className="absolute top-64 w-full text-center text-xl">소중한 사람에게 초콜릿을 선물해요</p>
        {/* <Image src={yanto} className="absolute top-[45%] left-1/2 animate-bounce-up" alt="얀토" /> */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <Button message={"초콜릿 만들기"} size="md" onClick={onStart} />
        </div>
        {/* <Image src={startBtn} alt="초콜릿 만들기"/> */}
        {/* </button> */}
      </div>
    </main>
  );
}
