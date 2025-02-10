import Image from "next/image";
import Button from "./Button";
import { logo, yanto, heart, choco1, choco2, choco3, cloud1, cloud2 } from "@/public/images/main";
import Container from "./layout/Container";
import { useAudio } from "@/app/context/AudioContext";
import { Volume2, VolumeX } from "lucide-react";
import { songPath } from "@/utils/constants";
import Modal from "./Modal";
import { useState } from "react";
import { copyToClipboard } from "@/utils/copyToClipboard";

export default function Main({ onStart }) {
  const { isPlaying, togglePlay, changeTrack } = useAudio();
  const [isShowModal, setIsShowModal] = useState(false);

  const handleStart = async () => {
    await onStart();
    changeTrack(songPath + "play-theme.mp3");
  };

  const handleModal = () => {
    setIsShowModal(!isShowModal);
  };

  const handleCloseModal = () => {
    setIsShowModal(!isShowModal);
  };

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
        <div className="flex flex-col justify-center items-center absolute top-[6%] max-h-sm:top-2 w-full h-64">
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
          <Button message={"초콜릿 만들기"} size="md" onClick={handleStart} />
        </div>

        {/* 오디오 버튼 */}
        <div className="absolute right-4 top-4">
          <button
            onClick={togglePlay}
            className={`p-2 rounded-full ${
              isPlaying ? "bg-brand-100" : "bg-chocolates-milk-100"
            } border-4 border-default text-white transition-all duration-150 ease-in-out transform hover:brightness-90 hover:scale-95 active:brightness-75 active:scale-95`}
          >
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
        <div className="absolute bottom-0 w-full flex justify-center items-center gap-2 h-8 font-sans text-center text-gray-warm-200 text-xs">
          <span className="cursor-pointer" onClick={() => handleModal("privacy")}>
            개인정보처리방침
          </span>
          <span>|</span>
          <span className="cursor-poiner">
            <a target="_blank" href="https://www.notion.so/yjwoo/195bdcdde583807985f5d4894f6626c0?pvs=4">
              이용약관
            </a>
          </span>
          <span>|</span>
          <span className="cursor-pointer" onClick={() => copyToClipboard("yejinwoo.me@gmail.com", 'email')}>연락처</span>
        </div>
      </div>
      {isShowModal && (
        <Modal title="개인정보 처리방침" onCancel={handleCloseModal}>
          본 서비스는 사용자의 이름과 편지 내용을 수집합니다. 이 정보는 공유 링크 생성 및 서비스 제공을 위해 사용되며, 제3자에게 제공되지 않습니다.
          <br />
          <br />
          수집된 정보는 사용자가 삭제를 요청하거나 서비스 종료 시 안전하게 삭제됩니다.
        </Modal>
      )}
    </Container>
  );
}
