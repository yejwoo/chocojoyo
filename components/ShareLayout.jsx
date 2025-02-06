import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ShareLayout() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const chocolateInfo = localStorage.getItem(id);
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    if (id) {
      const storedData = sessionStorage.getItem("card-data");

      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);

          // 🔥 저장된 카드 데이터 중에서 해당 ID와 일치하는 데이터 찾기
          if (parsedData.id === id) {
            setCardData(parsedData);
            console.log("data: ", parsedData)
          } else {
            console.warn("ID에 해당하는 카드 데이터를 찾을 수 없음.");
          }
        } catch (error) {
          console.error("세션스토리지 데이터 파싱 오류:", error);
        }
      }
    }
  }, [id]);

  return (
    <main className="bg-red-300 max-w-[400px] max-h-[800px] fixed w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-between">
      {cardData ? (
        <>
          <h1 className="text-2xl font-bold">초콜릿을 공유해 보세요!</h1>
          <img src={cardData.imageUrl} alt="초콜릿 카드" className="w-60 h-60" />
          <button onClick={() => shareToKakao(cardData)}>카카오톡 공유</button>
          <button onClick={() => copyToClipboard(window.location.href)}>링크 복사</button>
          <button onClick={() => downloadImage(cardData)}>이미지 저장</button>
        </>
      ) : (
        <p>초콜릿 데이터를 불러오는 중...</p>
      )}
    </main>
  );
}
