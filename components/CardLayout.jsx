import { useState, useEffect } from "react";
import Button from "./Button";
import Image from "next/image";
import { bgPatterns } from "@/public/images/card";

export default function CardLayout({ chocolateInfo, onComplete }) {
  const [formData, setFormData] = useState({
    message: "",
  });

  const [selectedIcons, setSelectedIcons] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // 글자가 1자 이상 입력되면 완료 버튼 활성화
  useEffect(() => {
    setIsCompleted(formData.message.length > 0);
  }, [formData.message]);

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    setFormData({ ...formData, message: e.target.value });
  };

  // 아이콘 선택/해제
  const toggleIconSelection = (icon) => {
    setSelectedIcons((prev) =>
      prev.includes(icon) ? prev.filter((item) => item !== icon) : [...prev, icon]
    );
  };

  // 편지 완성 시 공유 페이지로 이동
  const handleSubmit = () => {
    if (!isCompleted) return;
    onComplete(formData);
  };

  return (
    <main className="relative bg-pink-100 w-full h-full flex flex-col items-center justify-between p-4">
      {/* 💌 배경 패턴 (선택한 아이콘 애니메이션) */}
      <div className="absolute inset-0 pointer-events-none animate-fall">
        {selectedIcons.map((icon, index) => (
          <Image
            key={index}
            src={bgPatterns[icon]}
            alt="배경 패턴"
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: "30px",
              height: "30px",
              opacity: Math.random() * 0.5 + 0.5,
            }}
          />
        ))}
      </div>

      {/* 🍫 초콜릿 박스 */}
      <div className="relative w-64 h-40 bg-brown-700 rounded-lg flex flex-wrap p-2">
        {chocolateInfo.shapes.map((shape, index) => (
          <div key={index} className="w-1/3 p-1">
            <div className="bg-brown-500 w-full h-full flex items-center justify-center rounded-md">
              {shape === "heart" ? "❤️" : "🍫"}
            </div>
          </div>
        ))}
      </div>

      {/* ✉️ 편지 입력 */}
      <textarea
        name="message"
        maxLength={50}
        value={formData.message}
        onChange={handleInputChange}
        className="w-72 h-32 bg-white border border-gray-300 p-2 rounded-lg text-center text-lg leading-6"
        placeholder="편지 내용을 입력하세요."
      />

      {/* 🎨 아이콘 선택 네비 */}
      <div className="w-full flex justify-center gap-2 p-2 border border-yellow-500 bg-white rounded-lg">
        {Object.keys(bgPatterns).map((icon) => (
          <button
            key={icon}
            className={`p-2 rounded-full ${
              selectedIcons.includes(icon) ? "bg-yellow-300" : "bg-gray-100"
            }`}
            onClick={() => toggleIconSelection(icon)}
          >
            <Image src={bgPatterns[icon]} alt="아이콘" width={30} height={30} />
          </button>
        ))}
      </div>

      {/* ✅ 완료 버튼 */}
      <Button onClick={handleSubmit} disabled={!isCompleted} message="완성" className="w-72 bg-red-400 text-white py-2 rounded-lg" />
    </main>
  );
}
