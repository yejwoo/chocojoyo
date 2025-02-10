import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import KakaoShareButton from "@/components/KakaoShareButton";
import { chocoBox, chocoWithCard, giftBox, shareLink } from "@/public/icons/share";
import Modal from "@/components/Modal";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { DOMAIN } from "@/utils/constants";
import html2canvas from "html2canvas";
import CustomLoading from "./CustomLoading";
import CardLayout from "./layout/CardLayout";
import download from "downloadjs";

export default function ShareLayout() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const receiver = searchParams.get("receiver") ? true : false;
  const url = DOMAIN + `/share?id=${id}`;
  const [cardData, setCardData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isBoxOpened, setIsBoxOpened] = useState(false);
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
    setIsTooltipVisible(false);
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
      {receiver && !isBoxOpened && (
        <div className={`transition-opacity duration-700 ease-in-out ${receiver && !isBoxOpened ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
          <div className="flex flex-col items-center justify-center h-screen">
            <p className="cafe24-surround text-2xl text-center mb-5 text-default font-semibold">선물 박스를 열어보세요!</p>
            <Image className="mt-3 cursor-pointer animate-heartbeat-sm" onClick={() => setIsBoxOpened(true)} src={giftBox} alt="링크 복사" />
          </div>
        </div>
      )}
      <div className={`transition-opacity duration-1000 ease-in-out ${isBoxOpened ? "opacity-100" : "opacity-0 h-0 overflow-hidden pointer-events-none"}`}>
        <CardLayout chocolateInfo={cardData} mode="share" id={searchParams.get("id")} onOpen={handleOpenModal} ref={cardLayoutRef} isReceiver={receiver} isBoxOpened={isBoxOpened} />
      </div>
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
                <span>초콜릿+배경</span>
              </button>
              <button className="rounded-md text-sm flex flex-col gap-2 items-center w-[80px]" type="button" onClick={handleDownloadBox}>
                <div className={`w-14 h-14 bg-gray-warm-50 rounded-full flex justify-center items-center ${btnSytle}`}>
                  <Image src={chocoBox} alt="초콜릿 저장" />
                </div>
                <span>초콜릿 박스</span>
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
