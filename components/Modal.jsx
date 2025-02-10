import Button from "./Button";

export default function Modal({ size = "sm", title, type = "info", onConfirm, onCancel, children }) {
  return (
    <div className="fixed inset-0 z-[900] flex items-center justify-center bg-black bg-opacity-50">
      <div className={`fixed ${type !== "card" ? "mt-12" : ""} z-[999] flex flex-col justify-center items-center gap-3`}>
        <div className="relative w-[343px] bg-popup-100 px-4 py-6 border-4 border-default rounded-lg overflow-hidden">
          {/* 제목 */}
          <h1 className="text-4xl text-center">{title}</h1>

          {/* 확인 모드 */}
          {type === "confirm" && (
            <div className="relative">
              {children}
              <div className="flex gap-2 mt-4">
                <Button onClick={onCancel} size="half" message={"아니오"} />
                <Button onClick={onConfirm} size="half" message={"네"} />
              </div>
            </div>
          )}

          {/* 공유 모드 */}
          {(type === "share" || type === "download") && (
            <div className="relative h-24">
              <div className="flex gap-2 mt-6">{children}</div>
            </div>
          )}

          {/* 기본 모달 */}
          {type === "info" && <div className="text-xl my-4">{children}</div>}

          {/* 그림자 */}
          <div className="w-full bg-popup-200 h-2 absolute left-0 right-0 bottom-0"></div>

          {/* 닫기 버튼 */}
        </div>
        {type !== "confirm" && <Button type="close" shape="circle" onClick={onCancel} />}
      </div>
    </div>
  );
}
