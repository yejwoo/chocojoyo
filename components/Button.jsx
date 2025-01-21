import Image from "next/image";

export default function Button({shape = "rectangle", message, color = "main", type = "arrow", size = "default", onClick, disabled = false}) {
    const buttonShape = shape === "circle" ? "w-16 rounded-full" : "rounded-lg overflow-hidden";
    const buttonSizes = {
      half: "w-1/2",
      full: "w-full",
      default: "min-w-48"
    };
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
      <button type="button" onClick={onClick} disabled={disabled}
      className={`${color in buttonColors ? buttonColors[color] : buttonColors.main} ${buttonShape}
      ${shape === "rectangle" && size in buttonSizes ? buttonSizes[size] : buttonSizes.default}
      text-3xl border-4 border-default focus:scale-95  ${disabled ? "text-disabled-200 disabled:bg-disabled-100 disabled:cursor-not-allowed" : ""}
      `}>
        {
          shape === "circle" && (
            <div className="h-14 flex-shrink-0 flex justify-center">{type in buttonIcons ? buttonIcons[type] : buttonIcons.arrow}</div>
          )
        }
        {
          shape === "rectangle" && (
            <>
              <p className="h-12 flex justify-center items-center">{message}</p>
              <div className={`${disabled ? 'bg-disabled-200' : color in buttonShadowColors ? buttonShadowColors[color] : buttonShadowColors.main} w-full h-2`}></div>
            </>
          )
        }
      </button>    
    );
  }
  