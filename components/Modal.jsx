import Button from "./Button";

export default function Modal({ size = "sm", title, type = "card", value = "", maxLength = 50, onChange, onConfirm, onCancel, children }) {
  const handleInputChange = (e) => {
    const newValue = e.target.value;

    // 3줄까지만 입력 가능
    const lines = newValue.split("\n");
    if (lines.length > 3) return;

    onChange(e);
  };

  return (
    <div className="fixed inset-0 z-[900] flex items-center justify-center bg-black bg-opacity-50">
      <div className="fixed z-[999] flex flex-col justify-center items-center gap-3">
        <div className="relative w-[343px] bg-popup-100 px-4 py-6 border-4 border-default rounded-lg overflow-hidden">
          {/* 제목 */}
          <h1 className="text-4xl text-center">{title}</h1>

          <div className="relative mt-3 h-40">
            {/* ✅ 카드 작성 모드 */}
            {type === "card" && (
              <>
                <textarea
                  name="message"
                  maxLength={maxLength}
                  value={value}
                  onChange={handleInputChange}
                  className="w-full h-36 text-3xl leading-normal bg-popup-100 absolute overflow-hidden"
                  placeholder="내용을 입력하세요."
                />
                <div className="absolute top-0 left-0 right-0 pointer-events-none">
                  <hr className="my-10 border-b-2 border-default" />
                  <hr className="mb-10 border-b-2 border-default" />
                  <hr className="border-b-2 border-default" />
                </div>
                <div className="absolute bottom-[-8px] right-0">
                  <span>{value.length}/{maxLength}</span>
                </div>
              </>
            )}

            {/* ✅ 한 줄 입력 모드 */}
            {type === "single" && (
              <div className="relative">
                <input
                  type="text"
                  maxLength={maxLength}
                  value={value}
                  onChange={onChange}
                  className="text-center w-full h-10 text-3xl  absolute top-1/2 transform -translate-y-10"
                />
                <hr className="border-b-2 border-default absolute left-0 right-0 top-1/2 transform -translate-y-30" />
                <div className="absolute bottom-0 right-0">
                  <span>
                    {value.length}/{maxLength}
                  </span>
                </div>
              </div>
            )}

            {/* ✅ 확인 모드 */}
            {type === "confirm" && <div className="text-center text-2xl mt-6">그린 그림과 토핑이 사라져요.<br/>처음부터 다시 꾸밀까요?</div>}

            {/* ✅ 버튼 */}
            {type === "confirm" && (
              <div className="flex gap-3 absolute bottom-0 w-full">
                <Button color="secondary" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded" size="half" message={"아니오"} />
                <Button color="secondary" onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded" size="half" message={"네"} />
              </div>
            )}
          </div>
          {/* 그림자 */}
          <div className="w-full bg-popup-200 h-2 absolute left-0 right-0 bottom-0"></div>
        </div>
        {children}
      </div>
    </div>
  );
}
