import Image from "next/image";
import mold from "@/public/images/stage4/chocolate-mold.svg";

export default function Stage4Items({ currentData, selectionState, handleChocolateClick }) {
  // 초콜릿이 100% 채워지면 다음 초콜릿으로 이동
  // useEffect(() => {
  //   if (stage.main !== "stage4") return;

  //   if (chocolateInfo.sizes[currentChocolateIndex] >= 100 && !hasMovedRef.current.has(currentChocolateIndex)) {
  //     hasMovedRef.current.add(currentChocolateIndex); // 현재 인덱스 저장 (중복 실행 방지)

  //     setTimeout(() => {
  //       if (currentChocolateIndex < chocolatePositions.length - 1) {
  //         setCurrentChocolateIndex((prev) => prev + 1);
  //       }
  //     }, 300); // 0.3초 후 이동
  //   }
  // }, [chocolateInfo.sizes, currentChocolateIndex]);

  // // 짤주머니 위치 업데이트
  // useEffect(() => {
  //   setPastryBagPosition(chocolatePositions[currentChocolateIndex]);
  // }, [currentChocolateIndex]);

  // useEffect(() => {
  //   if (chocolateInfo.sizes.every((size) => size >= 100)) {
  //     setIsCompleteEvent(true); // Next 버튼 활성화
  //     setIsPastryBagHidden(true); // 짤주머니 숨김
  //   }
  // }, [chocolateInfo.sizes]);

  // useEffect(() => {
  //   debug("current chocolate index", currentChocolateIndex);
  // }, [currentChocolateIndex]);

  // useEffect(() => {
  //   debug("current tab index", currentTabIndex);
  // }, [currentTabIndex]);

  return (
    <div className="relative w-72 h-48">
      <Image src={mold} alt="초콜릿 틀" width={280} height={280} className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
      {/* <div className="w-full flex justify-center items-center flex-wrap absolute gap-6 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          {currentData.shapes.map((item, index) => (
            <div key={index} onClick={() => handleChocolateClick(index)} className="flex-shrink-0 cursor-pointer relative w-16 h-14">
              <Image src={item.imgSrc} alt={item.alt} />
            </div>
          ))}
        </div> */}
    </div>
  );
}
