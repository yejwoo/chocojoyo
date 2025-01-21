import Image from "next/image"

export default function Navi() {
    return (
        <nav className="fixed left-0 right-0 top-6">
            <ul className="flex items-center justify-center gap-4">
                {/* 단계 완료될 때마다 hideen 클래스 탈부착 */}
                <li className="relative">
                    <Image className="" src="/images/common/navi-stage1-off.png" width={"40"} height={"40"} alt="1단계" />
                    <Image className="hidden absolute top-0" src="/images/common/navi-stage1-on.png" width={"40"} height={"40"} alt="1단계" />
                    <Image className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src="/images/common/check-sm.png" width={"40"} height={"40"} alt="완료" />
                </li>
                <li className="relative">
                    <Image className="" src="/images/common/navi-stage2-off.png" width={"40"} height={"40"} alt="2단계" />
                    <Image className="hidden absolute top-0" src="/images/common/navi-stage2-on.png" width={"40"} height={"40"} alt="2단계" />
                    <Image className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src="/images/common/check-sm.png" width={"40"} height={"40"} alt="완료" />
                </li>
                <li className="relative">
                    <Image className="" src="/images/common/navi-stage3-off.png" width={"40"} height={"40"} alt="3단계" />
                    <Image className="hidden absolute top-0" src="/images/common/navi-stage3-on.png" width={"40"} height={"40"} alt="3단계" />
                    <Image className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src="/images/common/check-sm.png" width={"40"} height={"40"} alt="완료" />
                </li>
                <li className="relative">
                    <Image className="" src="/images/common/navi-stage4-off.png" width={"40"} height={"40"} alt="4단계" />
                    <Image className="hidden absolute top-0" src="/images/common/navi-stage4-on.png" width={"40"} height={"40"} alt="4단계" />
                    <Image className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src="/images/common/check-sm.png" width={"40"} height={"40"} alt="완료" />
                </li>
                <li className="relative">
                    <Image className="" src="/images/common/navi-stage5-off.png" width={"40"} height={"40"} alt="5단계" />
                    <Image className="hidden absolute top-0" src="/images/common/navi-stage5-on.png" width={"40"} height={"40"} alt="5단계" />
                    <Image className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src="/images/common/check-sm.png" width={"40"} height={"40"} alt="완료" />
                </li>
                <li className="relative">
                    <Image className="" src="/images/common/navi-stage6-off.png" width={"40"} height={"40"} alt="6단계" />
                    <Image className="hidden absolute top-0" src="/images/common/navi-stage6-on.png" width={"40"} height={"40"} alt="6단계" />
                    <Image className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src="/images/common/check-sm.png" width={"40"} height={"40"} alt="완료" />
                </li>
            </ul>
        </nav>
    )
} 