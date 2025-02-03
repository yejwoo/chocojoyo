import { Shapes } from "@/public/icons/shapes";
import { check } from "@/public/images/common";
import Image from "next/image";

export default function Stage1Items({ currentData, handleEvent, selectionState, chocolateInfo }) {
  return (
    <div id="stage1-items" style={{ display: "contents" }}>
      {currentData.items.map((item, index) => {
        const ShapeComponent = Shapes[item.imgKey];

        return (
          <div
            onClick={() => handleEvent("select", item.variant, index)}
            className="relative w-20 h-20 flex items-center justify-center cursor-pointer"
            key={index}
          >
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
