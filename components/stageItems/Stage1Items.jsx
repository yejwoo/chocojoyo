import { Shapes } from "@/public/icons/shapes";
import { arrowDown, check } from "@/public/images/common";
import Image from "next/image";

export default function Stage1Items({ currentData, handleEvent, chocolateInfo, uiState, setUIState }) {
  const handleItemClick = (variant, index) => {
    if (!uiState.isClicked) {
      setUIState((prev) => ({...prev, isClicked: true}))
    }
    handleEvent("select", variant, index);
  };

  return (
    <div id="stage1-items" className="flex flex-wrap w-72 h-48 justify-between items-center">
      {/* {!uiState.isClicked && (
        <Image
          src={arrowDown}
          alt="화살표"
          className="absolute z-10 top-0 left-1/2 animate-float-y-center transition-opacity duration-300"
          style={{ width: "48px", height: "48px" }}
        />
      )} */}

      {currentData.items.map((item, index) => {
        const ShapeComponent = Shapes[item.imgKey];

        return (
          <div onClick={() => handleItemClick(item.variant, index)} className="relative w-20 h-20 flex items-center justify-center cursor-pointer" key={index}>
            {ShapeComponent && <ShapeComponent width={80} height={80} />}
            <Image
              className={`${
                chocolateInfo.shapes.includes(item.variant) ? "opacity-100 visible" : "opacity-0"
              } w-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
              src={check}
              alt="완료"
            />
          </div>
        );
      })}
    </div>
  );
}
