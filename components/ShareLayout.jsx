import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import KakaoShareButton from "@/components/KakaoShareButton";
import { chocoBox, chocoPng, chocoWithCard, shareLink, tooltip } from "@/public/icons/share";
import Modal from "@/components/Modal";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { DOMAIN } from "@/utils/constants";
import html2canvas from "html2canvas";
import CustomLoading from "./CustomLoading";
import CardLayout from "./layout/CardLayout";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

export default function ShareLayout() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const receiver = searchParams.get("receiver") ? true : false;
  const url = DOMAIN + `/share?id=${id}`;
  const [cardData, setCardData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const cardLayoutRef = useRef(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const btnSytle =
    "transform transition-all duration-150 ease-in-out hover:brightness-90 focus:brightness-90 focus:scale-95 active:brightness-75 active:scale-95";

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
    setIsTooltipVisible(false); // 모달 닫을 때 툴팁도 닫기
  };

  
  const downloadWithHtml2Canvas = async (element, filename) => {
    try {
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        useCORS: true,
        ignoreElements: (el) => el.classList.contains("no-capture"),
      });

      const dataUrl = canvas.toDataURL("image/png");
      const timestamp = new Date().getTime();
      const fullFilename = `${filename}_${timestamp}.png`;

      download(dataUrl, fullFilename, "image/png");
    } catch (error) {
      console.error("html2canvas 실패:", error);
    }
  };
  const handleDownloadCard = () => {
    const cardElement = cardLayoutRef.current?.getCardElement();
    if (cardElement) downloadWithHtml2Canvas(cardElement, "card_with_choco");
  };

  const handleDownloadBox = () => {
    const boxElement = cardLayoutRef.current?.getBoxElement();
    if (boxElement) downloadWithHtml2Canvas(boxElement, "choco_box");
  };

  if (!cardData) return <CustomLoading />;

  return (
    <>
      <div onClick={() => setIsTooltipVisible(false)}>
        {/* 다른 곳 클릭 시 툴팁 닫기 */}
        <CardLayout chocolateInfo={cardData} mode="share" id={searchParams.get("id")} onOpen={handleOpenModal} ref={cardLayoutRef} isReceiver={receiver} />
        {isModalOpen && (
          <Modal title={modalType === "share" ? "공유하기" : "사진 저장"} onCancel={handleCloseModal} type={modalType}>
            {modalType === "share" && (
              <div className="flex gap-8 w-full justify-center">
                <KakaoShareButton name={cardData.name} />
                <button
                  className={`text-sm flex flex-col gap-2 items-center ${btnSytle}`}
                  type="button"
                  onClick={() => {
                    copyToClipboard(url);
                  }}
                >
                  <div className="w-12 h-12 bg-gray-warm-50 rounded-full flex justify-center items-center">
                    <Image src={shareLink} alt="링크 복사" />
                  </div>
                  <span>링크 복사</span>
                </button>
              </div>
            )}
            {modalType === "download" && (
              <div className="flex gap-5 w-full justify-center">
                <button className="rounded-md text-sm flex flex-col gap-2 items-center w-[80px]" type="button" onClick={handleDownloadCard}>
                  <div className={`w-14 h-14 bg-gray-warm-50 rounded-full flex justify-center items-center ${btnSytle}`}>
                    <Image src={chocoWithCard} alt="편지 저장" />
                  </div>
                  <span>초콜릿+편지</span>
                </button>
                <button className="rounded-md text-sm flex flex-col gap-2 items-center w-[80px]" type="button" onClick={handleDownloadBox}>
                  <div className={`w-14 h-14 bg-gray-warm-50 rounded-full flex justify-center items-center ${btnSytle}`}>
                    <Image src={chocoBox} alt="초콜릿 저장" />
                  </div>
                  <span>초콜릿 박스</span>
                </button>
              </div>
            )}
            {isTooltipVisible && (
              <div className="w-40 absolute top-5 right-8 bg-white border border-gray-warm-300 shadow-md rounded-lg p-2 ">
                앨범에서 꾹 눌러 스티커로 사용해보세요!
              </div>
            )}
          </Modal>
        )}
      </div>
    </>
  );
}
