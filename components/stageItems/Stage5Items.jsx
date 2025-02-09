import Image from "next/image";
import box from "@/public/images/stage5/box.svg";
import Chocolates from "../Chocolates";

export default function Stage5Items(props) {
  const { chocolateInfo, selectionState, uiState, setUIState, handleEvent } = props;
  const isToppingMode = selectionState.currentTabIndex === 1;
  const isZoomMode = uiState.isZoomMode;

  return (
    <>
      <div className="absolute bottom-[82px] max-h-sm:bottom-[54px] w-[280px] h-[180px] flex justify-center items-center">
        <Image
          src={box}
          alt="초콜릿 틀"
          width={280}
          height={280}
          className="absolute bottom-0"
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
          style={{
            pointerEvents: "none",
            TouchAction: "none",
          }}
        />
        <div className="w-full flex justify-center items-center flex-wrap gap-x-2 gap-y-2">
          <Chocolates {...props} isToppingMode={isToppingMode} isZoomMode={isZoomMode} />
        </div>
      </div>
    </>
  );
}
