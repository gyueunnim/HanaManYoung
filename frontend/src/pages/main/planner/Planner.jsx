import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../../../etc/url";

import Section1 from "./sections/Section1";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";
import LoadingSkeleton from "../../common/LoadingSkeleton";
import { useSelector } from "react-redux";

export default function Planner() {
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyChartData, setMonthlyChartData] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    setIsLoading(true);
    const getUseHistory = async () => {
      try {
        const result = await axios.get(SERVER_URL + "consume.json");
        setMonthlyChartData(result.data.data.monthlyChartData);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    getUseHistory();
  }, [user.user_login_id]);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="w-[90%] mx-auto">
      <Section1 />
      <Section2 />
      <Section3 data={monthlyChartData} />
    </div>
  );
}
