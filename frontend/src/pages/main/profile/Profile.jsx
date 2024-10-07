import { useEffect, useState } from "react";
import Section1 from "./sections/Section1";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";
import LoadingSkeleton from "../../common/LoadingSkeleton";
import { SERVER_URL } from "../../../etc/url";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Profile() {
  const [savingData, setSavingData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setIsLoading(true);
    const getChallenge = async () => {
      try {
        const result = await axios.get(SERVER_URL + "challenge.json");
        setSavingData(result.data.data.saving);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    getChallenge();
  }, [user.user_login_id]);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="w-[90%] mx-auto flex flex-col animate__animated animate__fadeIn">
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
}
