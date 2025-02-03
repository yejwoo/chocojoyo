import { talkBubbleBodySm, talkBubbleTail } from "@/public/images/common";
import Image from "next/image";

export default function TalkBubble({ dialogue }) {
  return (
    <div id="talk-bubble">
      <div className="absolute bottom-[420px] right-3 w-48">
        <Image src={talkBubbleBodySm} alt="말풍선" />
        <p
          className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl"
          dangerouslySetInnerHTML={{ __html: dialogue }}
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
        />
      </div>
      <div className="absolute bottom-[428px] right-[196px] w-7">
        <Image src={talkBubbleTail} alt="말풍선" />
      </div>
    </div>
  );
}
