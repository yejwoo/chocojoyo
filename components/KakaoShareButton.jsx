import React, { useEffect } from "react";
import Image from "next/image";
import kakaoLogo from "@/public/icons/share/share-kakao.svg";
import { SLOGAN } from "@/utils/constants";

const KakaoShareButton = () => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

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
    // console.log(Kakao);

    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "초코조요!",
        description: `나만의 초콜릿으로 달콤한 마음을 전해줘요`,
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
