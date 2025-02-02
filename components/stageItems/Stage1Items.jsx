import { checkLg } from "@/public/images/common";
import Image from "next/image";

export default function Stage1Items({ currentData, handleEvent, selectionState }) {
  return (
    <>
      {currentData.items.map((item, index) => (
        <div
          onClick={() => handleEvent("select", item.variant, index)}
          className="relative w-20 h-20 flex items-center justify-center cursor-pointer"
          key={index}
        >
          <Image src={item.imgSrc} width={80} height={80} alt={item.alt} />
          <Image
            className={`${
              selectionState.currentChocolateIndex === index ? "opacity-100 visible" : "opacity-0 hidden absolute"
            } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
            src={checkLg}
            alt="완료"
          />
        </div>
      ))}
    </>
  );
}
