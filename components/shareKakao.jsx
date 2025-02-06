export const shareToKakao = (cardData) => {
    if (window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "나만의 초콜릿",
          description: "내가 만든 초콜릿을 확인해 보세요!",
          imageUrl: cardData.imageUrl,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      });
    }
  };
  