import Image from "next/image";
import { bgCounterTop } from "@/public/images/common";

export default function StageLayout({ backgroundSrc, characterSrc, children, modalContent }) {
  return (
    <main className="max-w-[400px] max-h-[800px] fixed w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-full h-full">
        {/* 배경 */}
        <Image src={backgroundSrc} alt="배경" />
        {/* 캐릭터 */}
        <div className="absolute bottom-[316px] w-40 cursor-pointer">
          <Image className="" src={characterSrc} alt="얀토" draggable={false} />
        </div>
        {/* 카운터 */}
        <Image className="absolute bottom-0 left-1/2 -translate-x-1/2" src={bgCounterTop} alt="카운터" />
        {children}
      </div>
      {/* 모달 영역 */}
      {modalContent && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">{modalContent}</div>}
    </main>
  );
}
