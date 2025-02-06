import Image from "next/image";

export default function Button({ shape = "rectangle", message, color = "main", type = "arrow", size = "default", onClick, disabled = false }) {
  const buttonShape = shape === "circle" ? "w-16 h-16 rounded-full" : "rounded-lg overflow-hidden";
  const buttonSizeClass =
    {
      half: "w-1/2",
      full: "w-full",
      default: "min-w-48",
      md: "w-[343px]",
      sm: "w-24",
    }[size] || "min-w-48";

  const buttonColorClass =
    {
      main: "bg-button-100",
      secondary: "bg-chocolates-ruby-100",
      tertiary: "bg-gray-cool-50",
      brown: "bg-chocolates-milk-100",
    }[color] || "bg-button-100";

  const buttonShadowClass =
    {
      main: "bg-button-200",
      secondary: "bg-chocolates-ruby-200",
      tertiary: "bg-gray-cool-100",
    }[color] || "bg-button-200";

  const buttonIcon = {
    arrow: <Image src="/icons/buttons/arrow.svg" width={32} height={32} alt="다음" />,
    close: <Image src="/icons/buttons/close.svg" width={32} height={32} alt="닫기" />,
  }[type] || <Image src="/icons/buttons/arrow.svg" width={32} height={32} alt="다음" />;

  const disabledStyle = "disabled:bg-gray-cool-50 disabled:cursor-not-allowed";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        ${buttonColorClass} 
        ${buttonShape} 
        ${shape === "rectangle" ? buttonSizeClass : ""} 
        text-white text-2xl border-4 border-default 
        ${disabled ? disabledStyle : ""}
        focus:outline-none
      `}
    >
      {shape === "circle" ? (
        <div className="h-14 flex-shrink-0 flex justify-center items-center">{buttonIcon}</div>
      ) : (
        <>
          <p className="h-12 text-shadow flex justify-center items-center">{message}</p>
          <div 
            className={`
              ${disabled ? "bg-gray-cool-100" : buttonShadowClass} 
              w-full h-1
              transition-all duration-200
            `}>
          </div>
        </>
      )}
    </button>
  );
}
