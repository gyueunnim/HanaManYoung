import { Skeleton } from "@chakra-ui/react";
import LoadingSpinner from "../../../common/LoadingSpinner";
import ChallengeCard from "../components/ChallengeCard";

export default function Section2({
  savingAccount,
  challengeInfo,
  todayChallenge,
  savingChallenge,
  pocketMoneyStatus,
}) {
  if (Object.keys(savingChallenge).length === 0)
    return <Skeleton height="375px" width="90%" className="mx-auto my-3" />;
  const alreadyDone = (data) => {
    return todayChallenge.some((item) => data.code_id === item.code_id);
  };
  return (
    <div className="mt-8 flex-1">
      <h1 className="text-2xl font-bold flex items-center">
        금주의 챌린지
        <img
          src={process.env.PUBLIC_URL + "/images/icons/flame.png"}
          width="35px"
          className="ml-1"
          alt=""
        />
      </h1>
      <div className="mt-4 flex gap-5">
        <ChallengeCard
          data={challengeInfo[0]}
          bg={"bg-blue-50"}
          imgUrl={process.env.PUBLIC_URL + "/images/challenge/quiz.png"}
          done={alreadyDone(challengeInfo[0])}
          id={0}
        />
        <ChallengeCard
          data={challengeInfo[1]}
          bg={"bg-red-50"}
          imgUrl={process.env.PUBLIC_URL + "/images/challenge/plan.png"}
          done={alreadyDone(challengeInfo[1])}
          id={1}
        />
      </div>
      <div className="mt-4 flex gap-5">
        <ChallengeCard
          data={challengeInfo[2]}
          bg={"bg-amber-50"}
          imgUrl={process.env.PUBLIC_URL + "/images/challenge/account.png"}
          done={savingChallenge.acc_num !== null}
          id={2}
          savingAccount={savingAccount}
        />
        <ChallengeCard
          data={challengeInfo[3]}
          bg={"bg-purple-50"}
          imgUrl={process.env.PUBLIC_URL + "/images/challenge/tarot.png"}
          done={alreadyDone(challengeInfo[3])}
          id={3}
        />
      </div>
      <div className="mt-6">
        <h1 className="text-lg font-bold flex items-center">
          이런 챌린지는 어때요? 부모님과 함께해요😊
        </h1>
        <div className="mt-4">
          <ChallengeCard
            data={challengeInfo[4]}
            bg={"bg-stone-100"}
            imgUrl={process.env.PUBLIC_URL + "/images/challenge/parent.png"}
            done={alreadyDone(challengeInfo[4])}
            id={4}
            pocketMoneyStatus={pocketMoneyStatus}
          />
        </div>
      </div>
    </div>
  );
}
