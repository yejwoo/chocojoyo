// import { talkBubbleBodySm, talkBubbleTail } from "@/public/images/common";
import { talkBubble } from "@/public/images/common";
import Image from "next/image";

export default function TalkBubble({ dialogue, uiState }) {
  return (
    <div id="talk-bubble" className={`${uiState.isTalkBubbleShow ? "opacity-100 visible" : "opacity-0 invisible"}`}>
      <div className="absolute bottom-[400px] max-h-sm:bottom-[350px] right-4 w-56 max-h-sm:w-[208px]">
        <Image src={talkBubble} alt="말풍선" />
        <p
          className="absolute left-10 top-1/2 -translate-y-1/2 text-2xl text-left"
          dangerouslySetInnerHTML={{ __html: dialogue }}
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
        />
      </div>
    </div>
  );
}
