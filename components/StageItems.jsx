import Image from "next/image";

export default function StageItems ({ stage, currentData }) {
    return (
      <div className="absolute bottom-[132px] left-1/2 w-[296px] -translate-x-1/2 flex justify-center gap-6 flex-wrap animate-bounce-up-once">
        {currentData?.items?.map((item, index) => (
          <div key={index} className="relative w-20 h-20 flex items-center justify-center cursor-pointer">
            <Image src={item.imgSrc} width={80} height={80} alt={item.alt} />
          </div>
        ))}
      </div>
    );
  };
  