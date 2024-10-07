import { FaTrophy } from "react-icons/fa";
import { NumberCounter } from "../../../common/NumberCounter";

export default function RankBar({ rank, rankBarColor, rankData }) {
  let barHeight;
  let trophyColor;
  if (rank === 1) {
    barHeight = "h-96 ";
    trophyColor = "text-yellow-500";
  } else if (rank === 2) {
    barHeight = "h-80 ";
    trophyColor = "text-gray-400";
  } else {
    barHeight = "h-64 ";
    trophyColor = "text-amber-700";
  }
  return (
    <div className="w-[15%]">
      <div className="flex flex-col justify-center items-center">
        <div className="text-sm font-bold">
          <NumberCounter max={rankData.count} delay={50} />
        </div>

        <FaTrophy size="35" className={trophyColor} />
      </div>
      <div className={`rounded-lg  ${barHeight} ${rankBarColor}`}></div>
      <div className="text-lg font-bold">{rank}위</div>
      <div className="text-lg">{rankData.name}</div>
    </div>
  );
}
