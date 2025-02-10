import React, { useEffect } from "react";
import Image from "next/image";
import kakaoLogo from "@/public/icons/share/share-kakao.svg";

const KakaoShareButton = ({name}) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href + '&receiver=1'  : "";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { Kakao } = window;

      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }
  }, []);

  const handleShare = () => {
    const { Kakao } = window;
    const trimmedName = name?.trim();
    const description = trimmedName ? `${trimmedName}님이 달콤한 선물을 준비했어요!` : "달콤한 선물이 도착했어요!";
    // const description = `${displayName}이 달콤한 선물을 준비했어요!`;

    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "초코조요!",
        description: description,
        imageUrl: "https://i.imgur.com/udyP5Ge.png",
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
    });
  };


  return (
    <button
      className="rounded-md flex flex-col items-center text-sm gap-2 transform transition-all duration-150 ease-in-out hover:brightness-90 focus:brightness-90 focus:scale-95 active:brightness-75 active:scale-95"
      onClick={handleShare}
    >
      <Image src={kakaoLogo} alt="카카오톡 공유 이미지" width={48} height={48} />
      <span>카카오톡</span>
    </button>
  );
};

export default KakaoShareButton;
