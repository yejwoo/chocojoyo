import Button from "./Button"

export default function Modal({size = "sm", title, type = "card", children}) {
    const modalSize = size === "lg" ? "h-80" : "h-54";
    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
            {/* <div className="w-full h-full bg-black"></div> */}
            <div className="flex flex-col justify-center items-center gap-3">
                <div className="border-4 border-default rounded-lg overflow-hidden">
                    <div className={`w-[343px] bg-popup-100 p-4 ${modalSize}`}>
                        <h1 className="text-4xl text-center">{title}</h1>
                        <div className="relative mt-3 h-40">
                            {/* 카드 작성 */}
                            {
                                type === "card" && (
                                    <>
                                    <textarea
                                        className="w-full h-36 text-3xl leading-normal bg-popup-100 absolute"
                                        placeholder="내용을 입력하세요."
                                    />
                                    <div className="absolute top-0 left-0 right-0 pointer-events-none">
                                        <hr className="my-10 border-b-2 border-default" />
                                        <hr className="mb-10 border-b-2 border-default" />
                                        <hr className="border-b-2 border-default" />
                                    </div>
                                    <div className="absolute bottom-0 right-0">
                                        <span>0/50</span>
                                    </div>
                                </>
                                )
                            }
                            {/* 한 줄 작성  */}
                            {
                                type === "single" && (
                                    <>
                                        <div className="absolute bottom-0 right-0">
                                            <span>0/10</span>
                                        </div>
                                        <input type="text" name="" id="" className="w-full h-10 text-3xl bg-popup-100 absolute top-1/2 transform -translate-y-10" />
                                        <hr className="border-b-2 border-default absolute left-0 right-0 top-1/2 transform -translate-y-30" />
                                    </>
                                )
                            }
                            {/* 초콜릿 이름 작성 */}
                            {
                                type === "chocoName" && (
                                    <>
                                        <div className="absolute bottom-0 right-0">
                                            <span>0/6</span>
                                        </div>
                                        <div className="text-3xl absolute top-1/2 left-1/2 transform -translate-x-28 -translate-y-10 w-64">
                                            <input type="text" name="" id="" placeholder="정성 가득한" className="w-36 h-10 bg-popup-100 mr-3" />
                                            <span>초콜릿</span>
                                        </div>
                                        <hr className="border-b-2 border-default absolute left-10 w-36 top-1/2 transform -translate-y-30" />
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <div className="w-[343px] bg-popup-200 h-2"></div>
                </div>
                {/* 버튼 */}
                {children}
            </div>
        </div>
    )    
}
  