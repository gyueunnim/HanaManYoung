import { FaSchoolFlag } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { NumberCounter } from "../../../common/NumberCounter";

export default function MyRankTab({
  selectedRank,
  rankMySchool,
  rankMyRegion,
  rankMyAge,
}) {
  const title = ["우리 학교는?", "우리 지역은?", "내 나이대는?"];
  return (
    <div className="w-[full] mt-6 text-2xl font-bold">
      {
        [
          <div className="w-[50%] mx-auto flex justify-evenly items-end">
            <h3 className="flex">
              <FaSchoolFlag className="mr-4 text-cyan-500" size="30" />
              {title[selectedRank]}
            </h3>
            <p className="mr-3 text-3xl">
              <NumberCounter max={rankMySchool.count} delay={50} />점
              <span className="ml-3 text-sm text-gray-400">
                {rankMySchool.name}
              </span>
            </p>
          </div>,
          <div className="w-[50%] mx-auto flex justify-evenly items-end">
            <h3 className="flex">
              <FaMapMarkedAlt className="mr-4 text-green-400" size="30" />
              {title[selectedRank]}
            </h3>
            <p className="mr-3 text-3xl">
              <NumberCounter max={rankMyRegion.count} delay={50} />점
              <span className="ml-3 text-sm text-gray-400">
                {rankMyRegion.name}
              </span>
            </p>
          </div>,
          <div className="w-[50%] mx-auto flex justify-evenly items-end">
            <h3 className="flex">
              <FaShoppingCart className="mr-4 text-indigo-300" size="30" />
              {title[selectedRank]}
            </h3>
            <p className="mr-3 text-3xl">
              <NumberCounter max={rankMyAge.count} delay={50} />점
              <span className="ml-3 text-sm text-gray-400">
                {rankMyAge.name}
              </span>
            </p>
          </div>,
        ][selectedRank]
      }
    </div>
  );
}
