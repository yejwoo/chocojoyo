import Image from "next/image";
import { bg } from "@/public/images/common";
import Container from "./Container";

export default function StageLayout({ children, modalContent }) {
  return (
    <Container>
      <>
        <div className="w-full h-full">
          {/* 배경 */}
          <Image src={bg} alt="배경" draggable={false} />
            {children}
        </div>
        {/* 모달 영역 */}
        {modalContent && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">{modalContent}</div>}
      </>
    </Container>
  );
}
