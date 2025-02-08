import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import KakaoShareButton from "@/components/KakaoShareButton";
import { chocoBox, chocoPng, chocoWithCard, shareLink } from "@/public/icons/share";
import Modal from "@/components/Modal";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { DOMAIN, chocolateColors } from "@/utils/constants";
import html2canvas from "html2canvas";
import CustomLoading from "./CustomLoading";
import CardLayout from "./layout/CardLayout";

export default function ShareLayout() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const url = DOMAIN + `/share?id=${id}`;
  const [cardData, setCardData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const cardLayoutRef = useRef(null);
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
  };

  const downloadImage = async (element, filename) => {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
      allowTaint: true,
      ignoreElements: (el) => el.classList.contains("no-capture"),
    });

    // 타임스탬프 추가
    const timestamp = new Date().getTime(); 
    const fullFilename = `${filename}_${timestamp}.png`;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = fullFilename;
    link.click();
  };

  const handleDownloadCard = () => {
    const cardElement = cardLayoutRef.current?.getCardElement();
    if (cardElement) downloadImage(cardElement, "card_with_choco");
  };

  const handleDownloadBox = () => {
    const boxElement = cardLayoutRef.current?.getBoxElement();
    if (boxElement) downloadImage(boxElement, "choco_box");
  };

  const handleDownloadIndividualChoco = async () => {
    const chocoElements = cardLayoutRef.current?.getChocoElements();
    if (!chocoElements) return;

    // 배경 숨기기
    chocoElements.forEach((ref) => {
      if (ref) {
        const bgElement = ref.querySelector(".choco-bg");
        if (bgElement) {
          bgElement.style.display = "none";
        }
      }
    });

    // 저장을 위한 컨테이너 생성
    const chocoContainer = document.createElement("div");
    chocoContainer.style.position = "fixed";
    chocoContainer.style.top = "100vh";
    chocoContainer.style.left = "100vw";
    chocoContainer.style.display = "flex";
    chocoContainer.style.flexWrap = "wrap";
    chocoContainer.style.justifyContent = "center";
    chocoContainer.style.alignItems = "center";
    chocoContainer.style.gap = "4px";
    chocoContainer.style.width = "640px";
    chocoContainer.style.height = "440px";
    chocoContainer.style.backgroundColor = "transparent";
    chocoContainer.style.padding = "20px";

    // 초콜릿 요소 복제 및 추가
    chocoElements.forEach((ref) => {
      if (ref) {
        const clone = ref.cloneNode(true);
        clone.style.width = "160px";
        clone.style.height = "152px";
        chocoContainer.appendChild(clone);
      }
    });

    document.body.appendChild(chocoContainer);
    await downloadImage(chocoContainer, "individual_chocos");
    document.body.removeChild(chocoContainer);

    // 저장 후 배경 다시 표시
    chocoElements.forEach((ref) => {
      if (ref) {
        const bgElement = ref.querySelector(".choco-bg");
        if (bgElement) {
          bgElement.style.display = "block";
        }
      }
    });
  };

  if (!cardData) return <CustomLoading />;

  return (
    <>
      <CardLayout chocolateInfo={cardData} mode="share" id={searchParams.get("id")} onOpen={handleOpenModal} ref={cardLayoutRef} />

      {/* 모달 */}
      {isModalOpen && (
        <Modal title={modalType === "share" ? "공유하기" : "사진 저장"} onCancel={handleCloseModal} type={modalType}>
          {modalType === "share" && (
            <div className="flex gap-8 w-full justify-center">
              <KakaoShareButton />
              <button
                className={`text-sm flex flex-col gap-2 items-center ${btnSytle}`}
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
              <button className="p-2 rounded-md text-sm flex flex-col gap-2 items-center " type="button" onClick={handleDownloadCard}>
                <div className={`w-12 h-12 bg-gray-warm-50 rounded-full flex justify-center items-center ${btnSytle}`}>
                  <Image className="" src={chocoWithCard} alt="편지 저장" />
                </div>
                <span>초콜릿 + 편지</span>
              </button>
              <button className="p-2 rounded-md text-sm flex flex-col gap-2 items-center " type="button" onClick={handleDownloadBox}>
                <div className={`w-12 h-12 bg-gray-warm-50 rounded-full flex justify-center items-center ${btnSytle}`}>
                  <Image className="" src={chocoBox} alt="초콜릿 저장" />
                </div>
                <span>초콜릿 박스</span>
              </button>
              <button className="p-2 rounded-md text-sm flex flex-col gap-2 items-center " type="button" onClick={handleDownloadIndividualChoco}>
                <div className={`w-12 h-12 bg-gray-warm-50 rounded-full flex justify-center items-center ${btnSytle}`}>
                  <Image className="" src={chocoPng} alt="초콜릿 저장" />
                </div>
                <span>개별 초콜릿</span>
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
