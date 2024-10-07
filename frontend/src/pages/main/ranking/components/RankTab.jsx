import RankBar from "./RankBar";

export default function RankTab({
  selectedRank,
  rankSchools,
  rankRegions,
  rankAges,
}) {
  let rankBarBgColor = [
    "bg-gradient-to-t from-cyan-500 to-teal-300",
    "bg-gradient-to-t from-green-300 to-lime-200",
    "bg-gradient-to-t from-indigo-200 to-fuchsia-200",
  ];

  return (
    <div className="mt-2 text-center font-basic flex justify-evenly items-end gap-10 animate__animated animate__fadeIn">
      {
        [
          <>
            <RankBar
              rank={2}
              rankBarColor={rankBarBgColor[0]}
              rankData={rankSchools[1]}
            />
            <RankBar
              rank={1}
              rankBarColor={rankBarBgColor[0]}
              rankData={rankSchools[0]}
            />
            <RankBar
              rank={3}
              rankBarColor={rankBarBgColor[0]}
              rankData={rankSchools[2]}
            />
          </>,
          <>
            <RankBar
              rank={2}
              rankData={rankRegions[1]}
              rankBarColor={rankBarBgColor[1]}
            />
            <RankBar
              rank={1}
              rankData={rankRegions[0]}
              rankBarColor={rankBarBgColor[1]}
            />
            <RankBar
              rank={3}
              rankData={rankRegions[2]}
              rankBarColor={rankBarBgColor[1]}
            />
          </>,
          <>
            <RankBar
              rank={2}
              rankData={rankAges[1]}
              rankBarColor={rankBarBgColor[2]}
            />
            <RankBar
              rank={1}
              rankData={rankAges[0]}
              rankBarColor={rankBarBgColor[2]}
            />
            <RankBar
              rank={3}
              rankData={rankAges[2]}
              rankBarColor={rankBarBgColor[2]}
            />
          </>,
        ][selectedRank]
      }
    </div>
  );
}
