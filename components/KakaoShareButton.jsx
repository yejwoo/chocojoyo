import React, { useEffect } from "react";
import Image from "next/image";
import kakaoLogo from "@/public/icons/share/share-kakao.svg";

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
      objectType: 'feed',
      content: {
        title: '초코조요!',
        description: '아메리카노, 빵, 케익',
        imageUrl:
          'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
    });
  };

  return (
    <button className="rounded-md flex flex-col items-center text-sm gap-2" type="button" onClick={handleShare}>
      <Image src={kakaoLogo} alt="카카오톡 공유 이미지" width={48} height={48}/>
      <span>카카오톡</span>
    </button>
  );
};

export default KakaoShareButton;
