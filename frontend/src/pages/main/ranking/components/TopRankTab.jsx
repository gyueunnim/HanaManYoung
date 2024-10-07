import { FaCrown } from "react-icons/fa6";

import RankCard from "./RankCard";

export default function TopRankTab({
  selectedRank,
  rankSchools,
  rankRegions,
  rankAges,
  rankMySchool,
  rankMyRegion,
}) {
  const getYearByAge = (age) => {
    age = parseInt(age);
    const currentYear = new Date().getFullYear();
    return currentYear - age + 1 + "년생";
  };
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold flex items-center">
        <FaCrown size="30" className="text-yellow-500 mr-4" /> TOP 5 둘러보기
      </h2>
      <div className="w-full px-6 py-4 mt-2 text-xl font-basic rounded-xl flex justify-between gap-5">
        <div className="w-[50%] flex flex-col gap-5">
          {
            [
              <>
                <RankCard
                  bgColor={"bg-blue-100"}
                  rank={"1위"}
                  name={rankSchools[0].name}
                  score={rankSchools[0].count}
                />
                <RankCard
                  bgColor={"bg-red-100"}
                  rank={"2위"}
                  name={rankSchools[1].name}
                  score={rankSchools[1].count}
                />
                <RankCard
                  bgColor={"bg-green-100"}
                  rank={"3위"}
                  name={rankSchools[2].name}
                  score={rankSchools[1].count}
                />
              </>,
              <>
                <RankCard
                  bgColor={"bg-blue-100"}
                  rank={"1위"}
                  name={rankRegions[0].name}
                  score={rankRegions[0].count}
                />
                <RankCard
                  bgColor={"bg-red-100"}
                  rank={"2위"}
                  name={rankRegions[1].name}
                  score={rankRegions[1].count}
                />
                <RankCard
                  bgColor={"bg-green-100"}
                  rank={"3위"}
                  name={rankRegions[2].name}
                  score={rankRegions[2].count}
                />
              </>,
              <>
                <RankCard
                  bgColor={"bg-blue-100"}
                  rank={"1위"}
                  name={rankAges[0].name}
                  score={rankAges[0].count}
                  age={getYearByAge(rankAges[0].name.replace("살", ""))}
                />
                <RankCard
                  bgColor={"bg-red-100"}
                  rank={"2위"}
                  name={rankAges[1].name}
                  score={rankAges[1].count}
                  age={getYearByAge(rankAges[1].name.replace("살", ""))}
                />
                <RankCard
                  bgColor={"bg-green-100"}
                  rank={"3위"}
                  name={rankAges[2].name}
                  score={rankAges[2].count}
                  age={getYearByAge(rankAges[2].name.replace("살", ""))}
                />
              </>,
            ][selectedRank]
          }
        </div>
        <div className="w-[50%] flex flex-col gap-5">
          {
            [
              <>
                <RankCard
                  bgColor={"bg-slate-200"}
                  rank={"4위"}
                  name={rankSchools[3].name}
                  score={rankSchools[3].count}
                />
                <RankCard
                  bgColor={"bg-slate-200"}
                  rank={"5위"}
                  name={rankSchools[4].name}
                  score={rankSchools[4].count}
                />
                <RankCard
                  bgColor={"bg-yellow-100"}
                  rank={"🏫"}
                  name={"우리 학교 ( " + rankMySchool.name + " )"}
                  score={rankMySchool.count}
                />
              </>,
              <>
                <RankCard
                  bgColor={"bg-slate-200"}
                  rank={"4위"}
                  name={rankRegions[3].name}
                  score={rankRegions[3].count}
                />
                <RankCard
                  bgColor={"bg-slate-200"}
                  rank={"5위"}
                  name={rankRegions[4].name}
                  score={rankRegions[4].count}
                />
                <RankCard
                  bgColor={"bg-yellow-100"}
                  rank={"🏠"}
                  name={"우리 지역 ( " + rankMyRegion.name + " )"}
                  score={rankMyRegion.count}
                />
              </>,
              <>
                <RankCard
                  bgColor={"bg-orange-200"}
                  rank={"4위"}
                  name={rankAges[3].name}
                  score={rankAges[3].count}
                  age={getYearByAge(rankAges[3].name.replace("살", ""))}
                />
                <RankCard
                  bgColor={"bg-purple-100"}
                  rank={"5위"}
                  name={rankAges[4].name}
                  score={rankAges[4].count}
                  age={getYearByAge(rankAges[4].name.replace("살", ""))}
                />
                <RankCard
                  bgColor={"bg-yellow-100"}
                  rank={"6위"}
                  name={rankAges[5].name}
                  score={rankAges[5].count}
                  age={getYearByAge(rankAges[5].name.replace("살", ""))}
                />
              </>,
            ][selectedRank]
          }
        </div>
      </div>
    </div>
  );
}
