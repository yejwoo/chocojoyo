import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import box from "@/public/images/stage5/box.svg";
import { Shapes } from "@/public/icons/shapes";
import { bgPatterns } from "@/public/images/card";
import { supabase } from "@/lib/supabaseClient";
import KakaoShareButton from "@/components/KakaoShareButton";
import { chocoBox, chocoPng, chocoWithCard, shareLink } from "@/public/icons/share";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { DOMAIN } from "@/constants";
import html2canvas from "html2canvas";

export default function ShareLayout() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const url = DOMAIN + `/share?id=${id}`;
  const [cardData, setCardData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const router = useRouter();
  const cardRef = useRef(null);
  const boxRef = useRef(null);
  const chocoRefs = useRef([]);

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

  const downloadImage = async (element, filename) => {
    const canvas = await html2canvas(element, { backgroundColor: null, scale: 2 });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = filename;
    link.click();
  };

  const handleDownloadCard = () => {
    if (cardRef.current) {
      downloadImage(cardRef.current, "card_with_choco.png");
    }
  };

  const handleDownloadBox = () => {
    if (boxRef.current) {
      downloadImage(boxRef.current, "choco_box.png");
    }
  };

  const handleDownloadIndividualChoco = async () => {
    const chocoContainer = document.createElement("div");
    // 화면에 보이지 않도록 고정
    chocoContainer.style.position = "fixed";
    chocoContainer.style.top = "100vh"; // 화면 바깥 아래쪽으로 이동
    chocoContainer.style.left = "100vw"; // 화면 바깥 오른쪽으로 이동

    chocoContainer.style.display = "flex";
    chocoContainer.style.flexWrap = "wrap"; // 줄바꿈 활성화
    chocoContainer.style.justifyContent = "center"; // 가운데 정렬
    chocoContainer.style.alignItems = "center";
    chocoContainer.style.gap = "4px";

    chocoContainer.style.width = "640px"; // 캔버스 크기 설정
    chocoContainer.style.height = "440px";
    chocoContainer.style.backgroundColor = "transparent";
    chocoContainer.style.padding = "20px";

    chocoRefs.current.forEach((ref) => {
      if (ref) {
        const clone = ref.cloneNode(true);
        clone.querySelector(".bg-gray-warm-300").style.display = "none";

        clone.style.width = "160px";
        clone.style.height = "152px";
        chocoContainer.appendChild(clone);
      }
    });

    document.body.appendChild(chocoContainer);
    await downloadImage(chocoContainer, "individual_chocos.png");
    document.body.removeChild(chocoContainer);
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
        <div className="absolute top-1/2 -translate-y-1/2 flex flex-col w-[320px]">
          <div ref={cardRef} className="mb-4 rounded-lg shadow-lg">
            <div className="bg-white w-full p-6 rounded-lg flex flex-col gap-3 justify-center items-center">
              {/* 🍫 초콜릿 틀 */}
              <div ref={boxRef} className="relative z-10 w-[280px] h-[182px] flex justify-center items-center mx-auto">
                <Image src={box} alt="초콜릿 틀" width={280} height={280} className="absolute bottom-0" draggable={false} />

                {/* 초콜릿들 */}
                <div className="w-full flex justify-center items-center flex-wrap gap-x-2 gap-y-2">
                  {cardData.shapes.map((shape, index) => {
                    const ShapeComponent = Shapes[shape.charAt(0).toUpperCase() + shape.slice(1)];
                    const drawing = cardData.drawings[index];
                    const topping = cardData.toppings[index];

                    return ShapeComponent ? (
                      <div key={index} ref={(el) => (chocoRefs.current[index] = el)} className="relative w-[80px] h-[76px] flex items-center justify-center">
                        <div className="absolute w-full h-full bg-gray-warm-300 rounded-xl"></div>
                        {/* 초콜릿 기본 형태 */}
                        <div className="relative w-full h-full flex justify-center items-center">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <ShapeComponent width={64} height={56} />
                          </div>
                          {/* 🖌️ 드로잉 (사용자가 그린 그림) */}
                          {drawing && (
                            <canvas className="absolute z-10" width={64} height={56} style={{ background: `url(${drawing}) no-repeat center/cover` }} />
                          )}

                          {/* 🍓 토핑 */}
                          {topping && (
                            <Image
                            className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                            src={`/images/stage5/toppings/topping-${topping}.svg`}
                              alt="토핑"
                              width={32}
                              height={32}
                              draggable
                            />
                          )}
                        </div>
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
            <Button size="half" color="main" message={"공유하기"} onClick={() => handleOpenModal("share")} />
            <Button size="half" color="main" message={"사진 저장"} onClick={() => handleOpenModal("download")} />
          </div>
        </div>
        {/* 모달 */}
        {isModalOpen && (
          <Modal title={modalType === "share" ? "공유하기" : "사진 저장"} onCancel={handleCloseModal} type={modalType}>
            {modalType === "share" && (
              <div className="flex gap-8 w-full justify-center">
                <KakaoShareButton />
                <button
                  className="text-sm flex flex-col gap-2 items-center"
                  type="button"
                  onClick={() => {
                    copyToClipboard(url);
                  }}
                >
                  <div className="w-12 h-12 bg-gray-warm-50 rounded-full flex justify-center items-center">
                    <Image className="" src={shareLink} alt="링크 복사" />
                  </div>
                  <span>링크 복사</span>
                </button>
              </div>
            )}
            {modalType === "download" && (
              <div className="flex gap-2 w-full justify-center">
                <button className="p-2 rounded-md text-sm flex flex-col gap-2 items-center" type="button" onClick={handleDownloadCard}>
                  <div className="w-12 h-12 bg-gray-warm-50 rounded-full flex justify-center items-center">
                    <Image className="" src={chocoWithCard} alt="편지 저장" />
                  </div>
                  <span>초콜릿 + 편지</span>
                </button>
                <button className="p-2 rounded-md text-sm flex flex-col gap-2 items-center" type="button" onClick={handleDownloadBox}>
                  <div className="w-12 h-12 bg-gray-warm-50 rounded-full flex justify-center items-center">
                    <Image className="" src={chocoBox} alt="초콜릿 저장" />
                  </div>
                  <span>초콜릿 박스</span>
                </button>
                <button className="p-2 rounded-md text-sm flex flex-col gap-2 items-center" type="button" onClick={handleDownloadIndividualChoco}>
                  <div className="w-12 h-12 bg-gray-warm-50 rounded-full flex justify-center items-center">
                    <Image className="" src={chocoPng} alt="초콜릿 저장" />
                  </div>
                  <span>개별 초콜릿</span>
                </button>
              </div>
            )}
          </Modal>
        )}
        <div className="absolute right-6 bottom-6">
          <Button type="replay" shape="circle" color="brand" onClick={() => router.push("/")} />
        </div>
      </main>
    
  );
}
