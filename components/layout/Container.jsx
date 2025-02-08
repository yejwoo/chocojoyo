export default function Container({children, className}) {
  return <main className={`max-w-[400px] max-h-[800px] absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}>{children}</main>;
}
