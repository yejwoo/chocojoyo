import Image from "next/image";
import mold from "@/public/images/stage4/chocolate-mold.svg";
import { Shapes } from "@/public/icons/shapes";
import { PastryBag } from "@/public/images/stage4";
import { bottomNaviConfig } from "@/data/Stage";

export default function Stage4Items({ currentData, selectionState, uiState, handleChocolateClick, chocolateInfo }) {
  const bottomNaviData = bottomNaviConfig[4][0].data;
  // console.log(bottomNaviConfig);
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
    <>
      <div className="relative w-72 h-[182px]">
        <Image
          src={mold}
          alt="초콜릿 틀"
          width={280}
          height={280}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
          style={{
            pointerEvents: "none",
            WebkitTouchCallout: "none",
            TouchAction: "none",
          }}
        />
        {/* 초콜릿들 */}
        <div className="w-full flex justify-center items-center flex-wrap absolute gap-6 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          {chocolateInfo.shapes.map((item, index) => {
            const name = item[0].toUpperCase() + item.slice(1);
            const ShapeComponent = Shapes[name];
            const color = chocolateInfo.colors[index];

            return ShapeComponent ? (
              <div
                key={index}
                // onClick={() => handleChocolateClick(index)}
                // onMouseDown={() => handleChocolatePress(index)}
                // onTouchStart={() => handleChocolatePress(index)}
                // onDragStart={(e) => e.preventDefault()}
                draggable={false}
                className="flex-shrink-0 cursor-pointer relative w-16 h-14"
                style={{
                  pointerEvents: "none",
                  WebkitTouchCallout: "none",
                  TouchAction: "none",
                }}
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/* 틀 */}
                  <ShapeComponent
                    style={{
                      pointerEvents: "none",
                      WebkitTouchCallout: "none",
                      TouchAction: "none",
                    }}
                    fillColor="#A9A9A9"
                    strokeColor="#9E9C9D"
                    width={64}
                    height={56}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/* 실제 초콜릿 */}
                  <ShapeComponent
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    // width={64}
                    // height={56}
                    // fillColor={
                    //   bottomNaviData.data[color].fill
                    // }
                    // strokeColor={
                    //   bottomNaviData.data[color].border
                    // }
                    width={
                      (64 * (chocolateInfo.sizes[index] || 0)) / 100
                    }
                    height={
                      (56 * (chocolateInfo.sizes[index] || 0)) / 100
                    }
                  />
                </div>
              </div>
            ) : (
              console.warn(`${name} 컴포넌트 없음`) || null
            );
          })}
        </div>
      </div>
      {/* <div className="w-[343px] h-96 bottom-[-20px] pastry-bag-area absolute border border-red-600" style={{ pointerEvents: "none" }}>
        <PastryBag
          // fillColor={bottomNaviData.data[currentColor].fill}
          className={`${uiState.isPastryBagHidden ? "hidden" : ""} border border-red-400`} // 모든 초콜릿 채우면 숨김
          style={{
            position: "absolute",
            cursor: "grab",
            // left: `${pastryBagPosition.x}px`,
            // top: `${pastryBagPosition.y}px`,
            left: 0,
            top: 0,
            WebkitTouchCallout: "none",
            TouchAction: "none",
            pointerEvents: "auto",
            userSelect: "none",
          }}
          // onClick={() => handleChocolateClick(currentChocolateIndex)}
          // onMouseDown={() =>
          //   handleChocolatePress(currentChocolateIndex)
          // }
          // onTouchStart={() =>
          //   handleChocolatePress(currentChocolateIndex)
          // }
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      </div> */}
    </>
  );
}
