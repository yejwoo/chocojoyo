import Image from "next/image";

export default function Stage5Items({ currentData, selectionState, handleChocolateClick }) {
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (!isZoomMode && moldRef.current && !moldRef.current.contains(event.target)) {
  //       setCurrentChocolateIndex(null); // 초콜릿 영역 외 클릭 시 원상복귀
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   document.addEventListener("touchstart", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //     document.removeEventListener("touchstart", handleClickOutside);
  //   };
  // }, [isZoomMode]);

  return (
    <div className="relative w-72 h-56">
      <Image src={box} alt="초콜릿 틀" width={280} height={280} />
      <div className="w-full flex justify-center items-center flex-wrap absolute gap-x-2 gap-y-2">
        {currentData.shapes.map((item, index) => (
          <div key={index} onClick={() => handleChocolateClick(index)} className="relative w-[80px] h-[76px]">
            <Image src={item.imgSrc} alt={item.alt} />
            <Canvas isSelected={selectionState.currentChocolateIndex === index} strokeColor={selectionState.currentColor} />
          </div>
        ))}
      </div>
    </div>
  );
}
