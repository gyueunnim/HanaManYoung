import { ModalBody } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getKoreanNumber } from "../../../../js/getKoreanNumber";
import { useSelector } from "react-redux";
import axios from "axios";
import { BANK_CARD_URL, MAN_YOUNG_URL } from "../../../../etc/url";

export default function Saving({ savingAccount }) {
  const [targetAmount, setTargetAmount] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [challengeSavingName, setChallengeSavingName] = useState("");
  const [challengeDuration, setChallengeDuration] = useState(1);
  const [challengeSaving, setChallengeSaving] = useState({});
  const [startSaving, setStartSaving] = useState(false);

  const user = useSelector((state) => state.user);

  const getEndDate = () => {
    const endDate = new Date(); // 종료 날짜

    // 종료 날짜 계산 (현재 날짜에 challengeDuration 개월을 더함)
    endDate.setMonth(endDate.getMonth() + parseInt(challengeDuration));

    // 종료 날짜 포맷팅 (YYYY-MM-DD)
    const formattedEndDate = `${endDate.getFullYear()}-${String(
      endDate.getMonth() + 1
    ).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;

    return formattedEndDate;
  };

  const getStartDate = () => {
    const startDate = new Date(); // 현재 날짜
    const formattedStartDate = `${startDate.getFullYear()}-${String(
      startDate.getMonth() + 1
    ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
    return formattedStartDate;
  };

  useEffect(() => {
    // monthlyAmount 먼저 계산
    const calculatedMonthlyAmount = targetAmount / challengeDuration;
    setMonthlyAmount(calculatedMonthlyAmount);
  }, [targetAmount, challengeDuration]);

  useEffect(() => {
    // monthlyAmount가 계산된 후에 challengeSaving 업데이트
    setChallengeSaving({
      challenge_saving_name: challengeSavingName,
      challenge_saving_monthly_amount: monthlyAmount, // 이 값이 정확히 계산된 후에 사용
      challenge_saving_target_amount: targetAmount,
      challenge_saving_start_date: getStartDate(), // 시작 날짜
      challenge_saving_end_date: getEndDate(), // 종료 날짜
      challenge_saving_duration: challengeDuration,
      user_id: user.user_login_id,
      acc_num: savingAccount.acc_num,
    });
  }, [
    monthlyAmount,
    challengeSavingName,
    targetAmount,
    challengeDuration,
    savingAccount.acc_num,
    user.user_login_id,
  ]);

  const handleChallengeSaving = () => {
    try {
      axios.post(`${MAN_YOUNG_URL}/challenge/register/saving`, challengeSaving);
    } catch (error) {
      console.error(error);
    }
    try {
      const amount = monthlyAmount;
      axios.post(
        `${BANK_CARD_URL}/api/challenge/saving/start/${user.user_login_id}`,
        { amount },
        {
          headers: {
            "Content-Type": "application/json", // Content-Type을 설정
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
    setStartSaving(true);
  };

  return (
    <ModalBody>
      {startSaving ? (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-xl">적금 등록이 완료되었습니다</div>
          <img
            src={process.env.PUBLIC_URL + "/images/hana/point.gif"}
            alt=""
            className="w-[35%] my-2"
          />
          <div
            className="w-full my-4 py-2 rounded-xl btn-hana-blue text-white text-center text-lg cursor-pointer hover:opacity-80 duration-300"
            onClick={() => {
              window.location.reload();
            }}
          >
            확인
          </div>
        </div>
      ) : (
        <>
          <div className="text-sm text-center text-gray-400">
            <div>시작하는 달은 당일</div>
            <div>다음달부턴 1일에 자동이체 됩니다</div>
          </div>
          <div className="w-full flex gap-5">
            <div className="w-[50%] mt-5">
              <h2 className="ml-2">챌린지 적금 이름</h2>
              <input
                type="text"
                className="w-full h-14 mt-2 pl-5 text-lg border-2 rounded-2xl border-gray-400"
                placeholder="적금명 입력"
                onChange={(e) => setChallengeSavingName(e.target.value)}
              />
            </div>
            <div className="w-[50%] mt-5">
              <h2 className="ml-2">기간</h2>
              <div className="relative">
                <input
                  type="number"
                  className="w-full h-14 mt-2 pl-5 text-lg border-2 rounded-2xl border-gray-400"
                  placeholder="입력"
                  onChange={(e) => setChallengeDuration(e.target.value)}
                />
                <div className="absolute top-6 right-3 text-right text-gray-400">
                  {challengeDuration}달
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h2 className="ml-2">목표금액</h2>
            <div className="relative">
              <input
                type="number"
                className="w-full h-14 mt-2 pl-5 text-lg border-2 rounded-2xl border-gray-400"
                placeholder="금액 입력"
                onChange={(e) => setTargetAmount(e.target.value)}
              />
              <div className="absolute top-6 right-3 text-right text-gray-400">
                {getKoreanNumber(targetAmount)}
              </div>
            </div>
          </div>
          <div className="w-full mt-3 py-3 bg-slate-50 flex flex-col justify-end items-center rounded-2xl">
            <p className="my-2 ml-2 text-2xl">
              월 납입액은
              <span className="mx-2 text-2xl text-orange-500">
                {getKoreanNumber(monthlyAmount)}
              </span>
              입니다
            </p>
            <p className="text-gray-500">
              목표금액:{" "}
              <span className="text-hana">{getKoreanNumber(targetAmount)}</span>{" "}
              = {getKoreanNumber(monthlyAmount)} x {challengeDuration}달
            </p>
          </div>
          <div
            className="my-8 py-3 text-center text-xl text-white btn-hana-blue rounded-lg hover:opacity-85 cursor-pointer transition-all duration-300"
            onClick={() => {
              handleChallengeSaving();
            }}
          >
            챌린지 적금 시작하기
          </div>
        </>
      )}
    </ModalBody>
  );
}
