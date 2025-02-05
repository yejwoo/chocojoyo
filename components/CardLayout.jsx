import { useEffect, useRef, useState } from "react";
import box from "@/public/images/stage5/box.svg";
import { Shapes } from "@/public/icons/shapes";
import { bgPatterns } from "@/public/images/card";
import Button from "./Button";
import Image from "next/image";

export default function CardLayout({ chocolateInfo, formState, setFormState, onComplete }) {
  const [formData, setFormData] = useState({ message: "" });
  const [selectedIcon, setSelectedIcon] = useState("heart");
  const [isCompleted, setIsCompleted] = useState(false);
  const chocolateInfoRef = useRef(chocolateInfo); 


  // 아이콘별 배경색 설정
  const backgroundColors = {
    heart: "bg-cards-heart",
    clover: "bg-cards-clover",
    cake: "bg-cards-cake",
    flower: "bg-cards-flower",
    smile: "bg-cards-smile",
    fire: "bg-cards-fire",
  };

  useEffect(() => {
    chocolateInfoRef.current = chocolateInfo; // 정보가 바뀔 때만 업데이트
    console.log(chocolateInfo)
  }, [chocolateInfo]);

  useEffect(() => {
    setIsCompleted(formData.message.length > 0);
  }, [formData.message]);

  const handleInputChange = (e) => {
    const value = e.target.value;

    // **50자 제한 & 3줄 이상 입력 방지**
    const lines = value.split("\n");
    if (lines.length > 3) return;

    setFormData({ ...formData, message: value.slice(0, 50) });
  };

  return (
    <main
      className={`max-w-[400px] max-h-[800px] fixed w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
        backgroundColors[selectedIcon] || "bg-pink-100"
      } flex flex-col items-center justify-between px-6 relative`}
    >
      {/* 💌 배경 패턴 */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-6 gap-4 pointer-events-none z-0">
        {selectedIcon &&
          [...Array(24)].map((_, index) => (
            <div key={index} className="flex justify-center items-center">
              <Image src={bgPatterns[selectedIcon]} alt="패턴 아이콘" width={40} height={40} className="opacity-90" />
            </div>
          ))}
      </div>

      {/* ✉️ 편지 & 초콜릿 박스 */}
      <div className="absolute top-1/2 -translate-y-1/2 flex flex-col w-[343px]">
        <div className="bg-white w-full px-6 pt-8 pb-6 rounded-tl-lg rounded-tr-lg">
          {/* 🍫 초콜릿 틀 */}
          <div className="relative z-10 w-[280px] h-[180px] flex justify-center items-center">
            <Image src={box} alt="초콜릿 틀" width={280} height={280} className="absolute bottom-0" draggable={false} />

            {/* 초콜릿들 */}
            <div className="w-full flex justify-center items-center flex-wrap gap-x-2 gap-y-2">
              {chocolateInfo.shapes.map((shape, index) => {
                // console.log("chocolateInfo:", chocolateInfo);
                const ShapeComponent = Shapes[shape.charAt(0).toUpperCase() + shape.slice(1)];
                const drawing = chocolateInfo.drawings[index]; 
                const topping = chocolateInfo.toppings[index]; 

                return ShapeComponent ? (
                  <div key={index} className="relative w-[80px] h-[76px] bg-gray-warm-300 rounded-xl flex items-center justify-center">
                    {/* 초콜릿 기본 형태 */}
                    <ShapeComponent width={64} height={56} />

                    {/* 🖌️ 드로잉 (사용자가 그린 그림) */}
                    {drawing && (
                      <canvas
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        width={64}
                        height={56}
                        style={{ background: `url(${drawing}) no-repeat center/cover` }}
                      />
                    )}

                    {/* 🍓 토핑 */}
                    {topping && (
                      <Image
                        className="absolute"
                        src={`/images/stage5/toppings/topping-${topping.name}.svg`}
                        alt="토핑"
                        width={32}
                        height={32}
                        style={{
                          position: "absolute",
                          left: `${topping.x}px`,
                          top: `${topping.y}px`,
                        }}
                        draggable
                      />
                    )}
                  </div>
                ) : null;
              })}
            </div>
          </div>

          {/* ✉️ 편지 입력 */}
          <div className="relative z-10 w-full">
            <textarea
              name="message"
              maxLength={50}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full h-44 bg-white border border-gray-300 px-4 py-8 rounded-lg text-center text-[28px] leading-9 resize-none flex overflow-hidden whitespace-pre-wrap"
              placeholder="편지 내용을 입력하세요."
            />
            {/* 현재 글자 수 표시 */}
            <span className="absolute bottom-[-16px] right-[-12px] text-sm text-gray-500">{formData.message.length}/50</span>
          </div>
        </div>

        {/* 🎨 아이콘 선택 네비 */}
        <div className="relative mb-4 z-10 w-full flex justify-center gap-3 px-2 py-3 bg-popup-100 rounded-bl-lg rounded-br-lg">
          {Object.keys(bgPatterns).map((icon) => (
            <button key={icon} className={`p-1 rounded-sm ${selectedIcon === icon ? "ring-4 ring-brand-200" : ""}`} onClick={() => setSelectedIcon(icon)}>
              <Image src={bgPatterns[icon]} alt="아이콘" width={30} height={30} />
            </button>
          ))}
        </div>

        {/* ✅ 완료 버튼 */}
        <Button size="md" onClick={() => isCompleted && onComplete(formData)} disabled={!isCompleted} message="완성" />
      </div>
    </main>
  );
}
