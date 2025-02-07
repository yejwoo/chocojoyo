import Image from "next/image";
import { bgCounterTop } from "@/public/images/common";
import Container from "./Container";

export default function StageLayout({ backgroundSrc, characterSrc, children, modalContent }) {
  return (
    <Container>
      <>
        <div className="w-full h-full">
          {/* 배경 */}
          <Image src={backgroundSrc} alt="배경" draggable={false} />
          {/* 캐릭터 */}
          <div className="absolute bottom-[288px] w-[40%] cursor-pointer ">
            <Image className="" src={characterSrc} alt="얀토" draggable={false} />
          </div>

          {/* 카운터 */}
          <Image className="absolute bottom-0 left-1/2 -translate-x-1/2" src={bgCounterTop} alt="카운터" draggable={false} />
          {children}
        </div>
        {/* 모달 영역 */}
        {modalContent && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">{modalContent}</div>}
      </>
    </Container>
  );
}
