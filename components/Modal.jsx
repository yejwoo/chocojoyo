import { close } from "@/public/icons/buttons";
import Image from "next/image";
import Button from "./Button";

export default function Modal({ size = "sm", title, type = "card", value = "", maxLength = 50, onChange, onConfirm, onCancel, children }) {
  return (
    <div className="fixed inset-0 z-[900] flex items-center justify-center bg-black bg-opacity-50">
      <div className="fixed z-[999] flex flex-col justify-center items-center gap-3">
        <div className="relative w-[343px] bg-popup-100 px-4 py-6 border-4 border-default rounded-lg overflow-hidden">
          {/* 제목 */}
          <h1 className="text-4xl text-center">{title}</h1>

          <div className="relative h-24">
            {/* 확인 모드 */}
            {type === "confirm" && (
              <div className="text-center text-2xl mt-6">
                그린 그림과 토핑이 사라져요.
                <br />
                처음부터 다시 꾸밀까요?
              </div>
            )}

            {/* 공유 모드 */}
            {type === "share" && <div className="flex gap-2 mt-6">{children}</div>}

            {/* 다운로드 모드 */}
            {type === "download" && <div className="flex gap-2 mt-6">{children}</div>}
          </div>

          {/* 그림자 */}
          <div className="w-full bg-popup-200 h-2 absolute left-0 right-0 bottom-0"></div>

          {/* 닫기 버튼 */}
        </div>
        {(type !== "confirm") && <Button type="close" shape="circle" onClick={onCancel} />}
      </div>
    </div>
  );
}
