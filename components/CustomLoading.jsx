import { loading } from "@/public/images/common";
import Image from "next/image";

export default function CustomLoading() {
  return (
    <main className="max-w-[400px] max-h-[800px] absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 justify-center items-center">
      {/* <div className="w-24 h-24 bg-gray-warm-100 rounded-lg flex justify-center items-center"> */}
        <Image src={loading} className="w-16 h-16" alt="로딩" priority />
      {/* </div> */}
      {/* <p className="text-center text-lg">데이터를 불러오고 있어요.<br/>조금만 기다려조요!</p> */}
    </main>
  );
}
