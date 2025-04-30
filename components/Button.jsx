import { buttonIcons } from "@/public/icons/buttons";
import Image from "next/image";

export default function Button({ shape = "rectangle", message, color = "main", type = "arrow", size = "default", onClick, disabled = false }) {
  const buttonShape = shape === "circle" ? (size === "md" ? "w-12 h-12 rounded-full" : "w-16 h-16 rounded-full") : "rounded-lg overflow-hidden";
  const buttonIconSize = size === "md" ? 24 : 32

  const buttonSizeClass =
    {
      half: "w-1/2",
      full: "w-full",
      default: "min-w-48",
      md: "w-[320px]",
      sm: "w-24",
    }[size] || "min-w-48";

  const buttonColorClass =
    {
      main: "bg-button-100", // 갈색
      brand: "bg-brand-100", // 진한 핑크색
      secondary: "bg-chocolates-ruby-100", // 연한 핑크색
      tertiary: "bg-gray-cool-50",
    }[color] || "bg-button-100";

  const buttonShadowClass =
    {
      main: "bg-button-200",
      brand: "bg-brand-200",
      secondary: "bg-chocolates-ruby-200",
      tertiary: "bg-gray-cool-100",
    }[color] || "bg-button-200";

  const buttonIcon = {
    arrow: <Image src={buttonIcons.arrow} width={buttonIconSize} height={buttonIconSize} alt="다음" />,
    close: <Image src={buttonIcons.close} width={buttonIconSize} height={buttonIconSize} alt="닫기" />,
    replay: <Image src={buttonIcons.replay} width={buttonIconSize} height={buttonIconSize} alt="다시 시작" />,
    soundOn: <Image src={buttonIcons.soundOn} width={buttonIconSize} height={buttonIconSize} alt="음악 재생" />,
    soundOff: <Image src={buttonIcons.soundOn} width={buttonIconSize} height={buttonIconSize} alt="음악 끄기" />,
    home: <Image src={buttonIcons.home} width={buttonIconSize} height={buttonIconSize} alt="홈" />,
  }[type] || <Image src={buttonIcons.arrow} width={buttonIconSize} height={buttonIconSize} alt="다음" />;

  const shadowOverlayClass = "absolute bottom-0 h-[40%] w-full bg-black bg-opacity-10 rounded-b-sm";

  const disabledStyle = "disabled:bg-gray-cool-50 disabled:cursor-not-allowed disabled:pointer-events-none text-gray-cool-200";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        ${buttonColorClass} 
        ${buttonShape} 
        ${shape === "rectangle" ? buttonSizeClass : ""} 
        text-xl border-4 border-default
        ${disabled ? disabledStyle : "text-white"}
        transition-all duration-150 ease-in-out
        transform
        hover:brightness-90
        active:brightness-75 active:scale-95
      `}
    >
      {shape === "circle" ? (
        <div className="flex-shrink-0 flex justify-center items-center">{buttonIcon}</div>
      ) : (
        <>
          {!disabled && <div className={shadowOverlayClass}></div>}
          <p className={`h-12 ${disabled ? "" : "text-shadow"} flex justify-center items-center relative z-10`}>{message}</p>
          <div
            id="btn-shadow"
            className={`
              ${disabled ? "bg-gray-cool-100" : buttonShadowClass} 
              w-full h-1
              transition-all duration-100
            `}
          ></div>
        </>
      )}
    </button>
  );
}
