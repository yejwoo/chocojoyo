import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import KakaoShareButton from "@/components/KakaoShareButton";
import { chocoBox, chocoWithCard, giftBox, shareLink, shine } from "@/public/icons/share";
import Modal from "@/components/Modal";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { DOMAIN } from "@/utils/constants";
import html2canvas from "html2canvas";
import CustomLoading from "./CustomLoading";
import CardLayout from "./layout/CardLayout";
// import download from "downloadjs";
import Button from "./Button";
// import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

export default function ShareLayout() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const receiver = searchParams.get("receiver");
  const isReceiver = Number(receiver) === 1;
  const url = DOMAIN + `/share?id=${id}`;
  const [cardData, setCardData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isBoxOpened, setIsBoxOpened] = useState(false);
  const cardLayoutRef = useRef(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  let isDownloading = false;

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
        ignoreElements: (el) => el.classList.contains("no-capture"),
      });

      // 캡처한 이미지를 Blob으로 변환
      canvas.toBlob((blob) => {
        if (blob !== null) {
          const timestamp = new Date().getTime();
          const fullFilename = `${filename}_${timestamp}.png`;

          // file-saver를 사용해서 다운로드
          saveAs(blob, fullFilename);
        }
      }, "image/png"); // Blob 타입 명시
    } catch (error) {
      console.error("html2canvas 실패:", error);
    }
  };

  // const downloadBoxImage = async (boxElement, filename) => {
  //   if (!boxElement) return;

  //   try {
  //     const dataUrl = await toPng(boxElement, {
  //       // backgroundColor: null,  // 투명 배경
  //       cacheBust: true, // 캐시 문제 방지
  //       // pixelRatio: 2,          // 고해상도 캡처
  //     });

  //     const link = document.createElement("a");
  //     const timestamp = new Date().getTime();
  //     link.download = `${filename}_${timestamp}.png`;
  //     link.href = dataUrl;
  //     link.click();
  //   } catch (error) {
  //     console.error("html-to-image 캡처 실패:", error);
  //   }
  // };

  const handleDownloadCard = () => {
    if (isDownloading) return;
    isDownloading = true;

    const cardElement = cardLayoutRef.current?.getCardElement();
    if (cardElement) {
      downloadWithHtml2Canvas(cardElement, "card_with_choco").finally(() => {
        isDownloading = false;
      });
    }
  };

  // const handleDownloadBox = () => {
  //   const boxElement = cardLayoutRef.current?.getBoxElement();
  //   if (boxElement) downloadBoxImage(boxElement, "choco_box");
  // };

  if (!cardData) return <CustomLoading />;

  return (
    <>
      {receiver && !isBoxOpened && (
        <div
          className={`pb-10 pt-20 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center max-w-[400px] max-h-[800px] h-full transition-opacity duration-700 ease-in-out ${
            receiver && !isBoxOpened ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          <Image className="mt-20 w-8 absolute top-72 left-0 z-10 animate-heartbeat-fast" src={shine} alt="링크 복사" />
          <Image className="mt-20 w-6 absolute top-32 right-5 z-10 animate-heartbeat-fast-md" src={shine} alt="링크 복사" />
          <div className="flex flex-col items-center h-full">
            {/* <p className="text-xl text-center text-default mt-10 ">친구가 보내준 선물 </p> */}
            <p className="text-3xl text-center text-default mt-2">달콤한 선물이 도착했어요!</p>
            <Image className="mt-20 animate-heartbeat-sm w-80" src={giftBox} alt="링크 복사" />
          </div>
          <div>
            <Button
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 전파 방지
                setIsBoxOpened(true);
              }}
              size="md"
              message="선물 상자 열기"
            />
          </div>
        </div>
      )}
      {/* 공유 모드에서 박스열엇을 때. / 리시버 모드(isReceiver) */}
      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          !isReceiver || (isReceiver && isBoxOpened) ? "opacity-100" : "opacity-0 h-0 overflow-hidden pointer-events-none"
        }`}
      >
        <CardLayout
          chocolateInfo={cardData}
          mode="share"
          id={searchParams.get("id")}
          onOpen={handleOpenModal}
          onDownload={handleDownloadCard}
          ref={cardLayoutRef}
          isReceiver={isReceiver}
          isBoxOpened={isBoxOpened}
        />
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
