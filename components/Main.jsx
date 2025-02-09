import Image from "next/image";
import Button from "./Button";
import { logo, yanto, heart, choco1, choco2, choco3, cloud1, cloud2 } from "@/public/images/main";
import Container from "./layout/Container";

export default function Main({ onStart }) {
  return (
    <Container>
      <div className="absolute w-full h-full">
        <div className="bg-main w-full h-full"></div>

        {/* 구름 */}
        <div className="absolute w-full h-72 bottom-[10%] left-1/2 -translate-x-1/2">
          <Image style={{ width: "200px", height: "160px" }} src={cloud1} className="absolute bottom-0 left-[-48px] animate-cloud-left-right" alt="구름" />
          <Image
            style={{ width: "160px", height: "160px" }}
            src={cloud2}
            width={160}
            height={160}
            className="absolute right-[-48px] animate-cloud-left-right"
            alt="구름"
          />
        </div>
        {/* 하트 & 로고 */}
        <div className="flex flex-col justify-center items-center absolute top-[5%] max-h-sm:top-1 w-full h-64">
          <div className="flex justify-center items-center">
            {/* 하트 */}
            <Image src={heart} className="w-[240px] max-h-sm:w-[228px]" alt="하트" />
            {/* 로고 */}
            <Image priority src={logo} className="absolute w-[324px] max-h-sm:w-[300px]" alt="초코조요" />
          </div>
          {/* 슬로건 */}
          {/* <p className="w-full text-center text-xl max-h-sm:hidden">{SLOGAN}</p> */}
        </div>
        {/* 오브젝트들 */}
        <div className="absolute w-full h-56 bottom-[25%] max-h-sm:bottom-[20%]">
          {/* 초콜릿 오브젝트 */}
          <Image style={{ width: "44", height: "44" }} src={choco1} className="absolute left-6 rotate-6 animate-choco-left-right" alt="초콜릿" />
          <Image
            style={{ width: "48", height: "48" }}
            src={choco2}
            className="absolute right-4 bottom-1/2 -translate-y-1/2 animate-choco-right-left"
            alt="초콜릿"
          />
          <Image style={{ width: "40", height: "40" }} src={choco3} className="absolute left-4 bottom-0 animate-choco-left-right" alt="초콜릿" />
          {/* 얀토 */}
          <Image style={{ width: "200px", height: "auto" }} src={yanto} className="absolute -translate-x-1/2 left-1/2 animate-bounce-up-middle" alt="얀토" />
        </div>
        {/* <p className="absolute bottom-24 w-full text-center text-gray-warm-200 text-xl">벌써 0명이 만들었어요!</p> */}
        {/* 버튼 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <Button message={"초콜릿 만들기"} size="md" onClick={onStart} />
        </div>
      </div>
    </Container>
  );
}
