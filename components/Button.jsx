import Image from "next/image";

export default function Button({shape = "rectangle", message, color = "main", type = "arrow", size = "default"}) {
    const buttonShape = shape === "circle" ? "w-16 rounded-full" : "rounded-lg overflow-hidden";
    const buttonSize = size === "half" ? "w-1/2" : "min-w-48";
    const buttonColors = {
      main: "bg-brand-100",
      secondary: "bg-popup-100",
      tertiary: "bg-gray-cool-50"
    };
    const buttonShadowColors = {
      main: "bg-brand-200",
      secondary: "bg-popup-200",
      tertiary: "bg-gray-cool-100"
    };
    const buttonIcons = {
      arrow: <Image src="/icons/buttons/arrow.svg" width={32} height={32} alt="다음" />,
      close: <Image src="/icons/buttons/close.svg" width={32} height={32} alt="닫기" />
    };

    return (
      <button type="button" className={`${color in buttonColors ? buttonColors[color] : buttonColors.main} ${buttonShape} ${shape === "rectangle" && buttonSize} text-3xl border-4 border-default focus:scale-95`}>
        {
          shape === "circle" && (
            <div className="h-14 flex-shrink-0 flex justify-center">{type in buttonIcons ? buttonIcons[type] : buttonIcons.arrow}</div>
          )
        }
        {
          shape === "rectangle" && (
            <>
              <p className="h-12 flex justify-center items-center">{message}</p>
              <div className={`${color in buttonShadowColors ? buttonShadowColors[color] : buttonShadowColors.main} w-full h-2`}></div>
            </>
          )
        }
      </button>    
    );
  }
  