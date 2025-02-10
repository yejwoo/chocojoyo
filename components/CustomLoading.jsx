import { loading } from "@/public/images/common";
import Image from "next/image";

export default function CustomLoading() {
  return (
    <main className="max-w-[400px] max-h-[800px] absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 justify-center items-center">
      {/* <div className="w-24 h-24 bg-gray-warm-100 rounded-lg flex justify-center items-center"> */}
      <Image src={loading} className="w-16 h-16" alt="로딩" priority unoptimized />
      {/* </div> */}
      <div className="gap-1">
        {/* <p className="text-center text-2xl">로딩 중...</p> */}
        <p className="text-center text-lg">조금만 기다려조요!</p>
      </div>
    </main>
  );
}
