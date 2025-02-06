"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import box from "@/public/images/stage5/box.svg";
import { Shapes } from "@/public/icons/shapes";
import { bgPatterns } from "@/public/images/card";
import { supabase } from "@/lib/supabaseClient";
import KakaoShareButton from "@/components/KakaoShareButton";
import { shareLink, shareReplay } from "@/public/icons/share";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { DOMAIN } from "@/constants";

export default function ShareLayout() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const url = DOMAIN + `/share?id=${id}`;
  const [cardData, setCardData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchCard = async () => {
        const { data, error } = await supabase.from("cards").select("*").eq("id", id).single();

        if (error) {
          console.error("Error fetching card:", error);
        } else {
          setCardData(data);
        }
      };

      fetchCard();
    }
  }, [id]);

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };

  if (!cardData) return <p>초콜릿 데이터를 불러오는 중...</p>;

  return (
    <main
      className={`max-w-[400px] max-h-[800px] fixed w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
        bgPatterns[cardData.theme] || "bg-pink-100"
      } flex flex-col items-center justify-between relative`}
    >
      {/* 💌 배경 패턴 */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-6 gap-4 pointer-events-none z-0">
        {cardData.theme &&
          [...Array(24)].map((_, index) => (
            <div key={index} className="flex justify-center items-center">
              <Image src={bgPatterns[cardData.theme]} alt="패턴 아이콘" width={40} height={40} className="opacity-90" />
            </div>
          ))}
      </div>

      {/* ✉️ 편지 & 초콜릿 박스 */}
      <div className="absolute top-1/2 -translate-y-1/2 flex flex-col w-[343px]">
        <div className="mb-4 rounded-lg shadow-lg">
          <div className="bg-white w-full px-6 pt-8 pb-6 rounded-lg flex flex-col gap-3 justify-center items-center">
            {/* 🍫 초콜릿 틀 */}
            <div className="relative z-10 w-[280px] h-[182px] flex justify-center items-center mx-auto">
              <Image src={box} alt="초콜릿 틀" width={280} height={280} className="absolute bottom-0" draggable={false} />

              {/* 초콜릿들 */}
              <div className="w-full flex justify-center items-center flex-wrap gap-x-2 gap-y-2">
                {cardData.shapes.map((shape, index) => {
                  const ShapeComponent = Shapes[shape.charAt(0).toUpperCase() + shape.slice(1)];
                  const drawing = cardData.drawings[index];
                  const topping = cardData.toppings[index];

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
                          className="absolute  left-6 top-[22px]"
                          src={`/images/stage5/toppings/topping-${topping}.svg`}
                          alt="토핑"
                          width={32}
                          height={32}
                          draggable
                        />
                      )}
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* ✉️ 편지 내용 */}
            <div className="relative z-10 w-full">
              <p className="w-[280px] bg-white mx-auto h-[108px] text-left text-2xl leading-9 flex whitespace-pre-line">{cardData.message}</p>
            </div>

            {/* 보내는이 */}
            <div>
              <span className="text-lg">from. </span>
              <span className="text-left">{cardData.name}</span>
            </div>
          </div>
        </div>
        {/* 공유 버튼 */}
        <div className="flex justify-center items-center gap-2">
          <Button size="half" color="" message={"공유하기"} onClick={() => handleOpenModal("share")} />
          <Button size="half" color="" message={"초코 저장"} onClick={() => handleOpenModal("download")} />
        </div>
      </div>
      {/* 모달 */}
      {isModalOpen && (
        <Modal title={modalType === "share" ? "공유하기" : "다운로드"} onCancel={handleCloseModal} type={modalType}>
          {modalType === "share" && (
            <div className="flex gap-8 w-full justify-center">
              <KakaoShareButton />
              <button className="text-sm flex flex-col gap-2 items-center justify-normal" type="button"  onClick={()=>{copyToClipboard(url)}}>
                <div className="w-12 h-12 bg-gray-300 rounded-full flex justify-center items-center">
                  <Image className="" src={shareLink} alt="링크 복사" />
                </div>
                <span>링크 복사</span>
              </button>
            </div>
          )}
          {modalType === "download" && (
            <div className="flex gap-2">
              <button className="bg-white p-2 rounded-md shadow-md" type="button">
                <span>편지 + 초콜릿 저장</span>
              </button>
              <button className="bg-white p-2 rounded-md shadow-md" type="button">
                <span>개별 초콜릿 저장</span>
              </button>
            </div>
          )}
        </Modal>
      )}
      {/* 다시하기 */}
      <button className="bg-white p-2 rounded-md shadow-md absolute bottom-4 right-4" type="button" onClick={() => router.push("/")}>
        <Image src={shareReplay} alt="다시 하기" />
      </button>
    </main>
  );
}
