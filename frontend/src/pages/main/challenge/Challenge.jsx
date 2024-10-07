import { useEffect, useState } from "react";
import axios from "axios";
import { BANK_CARD_URL, MAN_YOUNG_URL } from "../../../etc/url";

import Loading from "../../common/Loading";
import Section1 from "./sections/Section1";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";
import { useSelector } from "react-redux";
import { Skeleton } from "@chakra-ui/react";

export default function Challenge() {
  const [challengeInfo, setChallengeInfo] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [todayChallenge, setTodayChallenge] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [challengeAccount, setChallengeAccount] = useState({});
  const [accountChallengeTransactions, setAccountChallengeTransactions] =
    useState([]);
  const [savingAccount, setSavingAccount] = useState({});
  const [savingChallenge, setSavingChallenge] = useState({});
  const [pocketMoneyStatus, setPocketMoneyStatus] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.user_login_id) {
      const getChallengeData = async () => {
        try {
          const [challengeResult, profileResult] = await Promise.all([
            axios.get(
              `${MAN_YOUNG_URL}/challenge/get/total/${user.user_login_id}`
            ),
            axios.get(`${BANK_CARD_URL}/api/profile/${user.user_login_id}`),
          ]);

          setChallengeInfo(challengeResult.data.challengeInfo);
          setCalendarData(challengeResult.data.calendarData);
          setTodayChallenge(challengeResult.data.todayChallenge);
          setSavingAccount(profileResult.data.accountList[1]);
          setChallengeAccount(profileResult.data.accountList[2]);
          setAccountChallengeTransactions(
            profileResult.data.accountChallengeTransactions
          );
          setSavingAccount(profileResult.data.accountList[1]);
          setSavingChallenge(challengeResult.data.challengeSaving);
          setPocketMoneyStatus(challengeResult.data.pocketMoneyList);
        } catch (error) {
          console.error(error);
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
        }
      };

      getChallengeData();
    } else {
      setIsLoading(false);
    }
  }, [user.user_login_id]);

  if (isLoading) return <Loading />;

  return (
    <div className="w-[90%] mx-auto flex flex-col animate__animated animate__fadeIn">
      <Section1
        challengeAccount={challengeAccount}
        accountChallengeTransactions={accountChallengeTransactions}
        savingChallenge={savingChallenge}
        savingAccount={savingAccount}
      />
      <Section2
        savingAccount={savingAccount}
        challengeInfo={challengeInfo}
        todayChallenge={todayChallenge}
        savingChallenge={savingChallenge}
        pocketMoneyStatus={pocketMoneyStatus}
      />
      <Section3 calendarData={calendarData} />
    </div>
  );
}
