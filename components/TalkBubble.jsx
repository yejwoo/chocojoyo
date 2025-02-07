// import { talkBubbleBodySm, talkBubbleTail } from "@/public/images/common";
import { talkBubble } from "@/public/images/common";
import Image from "next/image";

export default function TalkBubble({ dialogue, uiState }) {
  return (
    <div className={`absolute top-4 right-4 w-full ${uiState.isTalkBubbleShow ? "opacity-100 visible" : "opacity-0 invisible"}`}>
      <Image src={talkBubble} alt="말풍선" />
      <p
        className="absolute left-10 top-1/2 -translate-y-1/2 text-2xl max-h-sm:text-[22px] text-left"
        dangerouslySetInnerHTML={{ __html: dialogue }}
        onDragStart={(e) => e.preventDefault()}
        draggable={false}
      />
    </div>
  );
}
