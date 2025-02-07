import Image from "next/image";
import {
  naviStage1Off,
  naviStage1On,
  naviStage2Off,
  naviStage2On,
  naviStage3Off,
  naviStage3On,
  naviStage4Off,
  naviStage4On,
  naviStage5Off,
  naviStage5On,
  check,
} from "@/public/images/common";

const stages = [
  { id: 1, off: naviStage1Off, on: naviStage1On },
  { id: 2, off: naviStage2Off, on: naviStage2On },
  { id: 3, off: naviStage3Off, on: naviStage3On },
  { id: 4, off: naviStage4Off, on: naviStage4On },
  { id: 5, off: naviStage5Off, on: naviStage5On },
];

export default function Navi({ currentStage, completedStages }) {
  return (
    <nav className="fixed left-0 right-0 top-6 max-h-sm:top-3 flex justify-center">
      <ul className="flex items-center justify-center gap-4 rounded-lg w-[343px]">
        {stages.map((stage) => {
          const isCurrent = currentStage === stage.id;
          const isCompleted = completedStages.includes(stage.id);
          const showOff = !isCurrent && !isCompleted;
          const showOn = isCurrent || isCompleted;

          return (
            <li key={stage.id} className={`stage${stage.id} w-12 h-14 relative flex-shrink-0 flex items-center justify-center`}>
              {/* Off 상태 */}
              {showOff && <Image className="z-10" src={stage.off} alt={`${stage.id}단계`} />}
              {/* On 상태 */}
              {showOn && (
                <Image
                  src={stage.on}
                  alt={`${stage.id}단계`}
                  className={`${isCompleted && !isCurrent ? "opacity-70" : "opacity-100 animate-heartbeat"} z-10`}
                />
              )}
              {/* 완료 체크 */}
              <Image
                src={check}
                alt="완료"
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 ${
                  isCompleted ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
