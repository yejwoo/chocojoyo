import { useEffect, useRef, useState } from "react";
import box from "@/public/images/stage5/box.svg";
import { Shapes } from "@/public/icons/shapes";
import { bgPatterns } from "@/public/images/card";
import Button from "./Button";
import Image from "next/image";

export default function CardLayout({ chocolateInfo, onComplete }) {
  const [formData, setFormData] = useState({ message: "", name: "" });
  const [selectedIcon, setSelectedIcon] = useState("heart");
  const [isCompleted, setIsCompleted] = useState(false);
  const chocolateInfoRef = useRef(chocolateInfo);
  const MAX_LENTH = 60;

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
    chocolateInfoRef.current = chocolateInfo;
    console.log("💌card: ", chocolateInfo);
  }, [chocolateInfo]);

  useEffect(() => {
    setIsCompleted(formData.message.length > 0 && formData.name.length > 0);
  }, [formData]);

  const handleInputChange = (e, type) => {
    const value = e.target.value;

    if (type === "message") {
      // 세 줄까지만 입력 가능하도록 설정
      const lines = value.split("\n");
      if (lines.length > 3) return;
      setFormData({ ...formData, message: value.slice(0, MAX_LENTH) });
    } else {
      setFormData({ ...formData, name: value });
    }
  };



  return (
    <main
      className={`max-w-[400px] max-h-[800px] fixed w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
        backgroundColors[selectedIcon] || "bg-pink-100"
      } flex flex-col items-center justify-between relative`}
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
        <div className="mb-4 rounded-lg shadow-lg">
          <div className="bg-white w-full px-6 pt-8 pb-6 rounded-tl-lg rounded-tr-lg flex flex-col gap-3 justify-center items-center">
            {/* 🍫 초콜릿 틀 */}
            <div className="relative z-10 w-[280px] h-[182px] flex justify-center items-center mx-auto">
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
                maxLength={MAX_LENTH}
                value={formData.message}
                onChange={(e) => handleInputChange(e, "message")}
                className="w-[280px] bg-white mx-auto h-[108px] text-left text-2xl leading-9 flex"
                placeholder="편지는 세 줄까지 쓸 수 있어요."
              />
            </div>

            {/* 보내는이 */}
            <div className="border-b-2 border-default">
              <span className="text-lg">from. </span>
              <input onChange={(e) => handleInputChange(e, "name")}  className="text-left " type="text" placeholder="이름은 열 글자까지!" maxLength={10} />
            </div>
          </div>

          {/* 🎨 아이콘 선택 네비 */}
          <div className="relative z-10 w-full flex justify-center gap-3 px-2 py-3 bg-popup-100 rounded-bl-lg rounded-br-lg">
            {Object.keys(bgPatterns).map((icon) => (
              <button key={icon} className={`p-1 rounded-sm ${selectedIcon === icon ? "ring-4 ring-brand-200" : ""}`} onClick={() => setSelectedIcon(icon)}>
                <Image src={bgPatterns[icon]} alt="아이콘" width={30} height={30} />
              </button>
            ))}
          </div>
        </div>

        {/* ✅ 완료 버튼 */}
        <Button size="md" onClick={() => isCompleted && onComplete(formData)} disabled={!isCompleted} message="완성" />
      </div>
    </main>
  );
}
