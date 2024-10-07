import { FaRankingStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { MAN_YOUNG_URL } from "../../../etc/url";

import axios from "axios";

import Loading from "../../common/Loading";
import RankTab from "./components/RankTab";
import SelectTabBtn from "./components/SelectTabBtn";
import MyRankTab from "./components/MyRankTab";
import TopRankTab from "./components/TopRankTab";
import { date, koreanDay, month, week } from "../../../js/getDateInfo";
import { useSelector } from "react-redux";

export default function Ranking() {
  const [selectedRank, setSelectedRank] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [rankAges, setRankAges] = useState([]);
  const [rankSchools, setRankSchools] = useState([]);
  const [rankRegions, setRankRegions] = useState([]);
  const [rankMyRegion, setRankMyRegion] = useState([]);
  const [rankMySchool, setRankMySchool] = useState([]);
  const [rankMyAge, setRankMyAge] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getRank = async () => {
      try {
        const result = await axios.get(
          `${MAN_YOUNG_URL}/rank/get/${user.user_login_id}`
        );
        setRankAges(result.data.rankAges);
        setRankSchools(result.data.rankSchools);
        setRankRegions(result.data.rankRegions);
        setRankMyRegion(result.data.rankRegion[0]);
        setRankMySchool(result.data.rankSchool[0]);
        setRankMyAge(result.data.rankAge[0]);
        console.log(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    getRank();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="w-[90%] mt-4 mx-auto animate__animated animate__fadeIn">
      <div className="text-3xl flex">
        <div className="flex items-center">
          <FaRankingStar size="30" className="mr-3 text-emerald-700" />
          <h1>
            <span className="font-bold">랭킹</span>
            <span className="ml-3 font-bold text-base text-gray-400">
              {month}월 {week}주차
            </span>
            <span className="ml-2 text-xs text-gray-400">
              ({month}월 {date}일 {koreanDay}요일)
            </span>
          </h1>
        </div>
      </div>

      <RankTab
        selectedRank={selectedRank}
        rankSchools={rankSchools}
        rankRegions={rankRegions}
        rankAges={rankAges}
      />
      <SelectTabBtn
        selectedRank={selectedRank}
        setSelectedRank={setSelectedRank}
      />
      <MyRankTab
        selectedRank={selectedRank}
        rankMyRegion={rankMyRegion}
        rankMySchool={rankMySchool}
        rankMyAge={rankMyAge}
      />
      <TopRankTab
        selectedRank={selectedRank}
        rankSchools={rankSchools}
        rankRegions={rankRegions}
        rankAges={rankAges}
        rankMyRegion={rankMyRegion}
        rankMySchool={rankMySchool}
        rankMyAge={rankMyAge}
      />
    </div>
  );
}
