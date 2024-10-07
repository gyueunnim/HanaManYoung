import { ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import HalfDoughnutChart from "./HalfDoughnutChart";
import { monthsRemaining } from "../../../../js/monthsRemaining";

export default function SavingAccount({
  setIsSavingGiveUp,
  savingChallenge,
  savingAccount,
}) {
  const handleSavePoint = () => {
    if (
      savingChallenge.challenge_saving_target_amount ===
      savingAccount.acc_balance
    ) {
      // console.log("하나머니 챌린지 포인트 적립");
      // axios 로직 추가
    }
    // else {
    //   console.log("진행중입니다...");
    // }
  };

  return (
    <>
      <ModalHeader>
        <div className="font-bold flex items-center">
          <div className="flex items-center">
            <img
              src={process.env.PUBLIC_URL + "/images/challenge/account.png"}
              alt=""
              className="w-7 p-[0.2rem]"
            />
            <p className="ml-2">챌린지 적금</p>
          </div>
        </div>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <div className="ml-3 font-basic">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold">
              {savingChallenge.challenge_saving_name + " "}
              <span className="ml-2 text-gray-400 text-xs font-normal">
                {savingChallenge.challenge_saving_start_date} ~{" "}
                {savingChallenge.challenge_saving_end_date}
              </span>
            </h3>
            <div
              className="px-2 py-1 text-sm rounded-md bg-red-400 transform hover:opacity-85 duration-300 cursor-pointer"
              // onClick={() => onOpen()}
            >
              포기하기
            </div>
          </div>
          <div className="pr-3 overflow-y-auto">
            <HalfDoughnutChart
              savingChallenge={savingChallenge}
              savingAccount={savingAccount}
            />
            <div className="flex justify-between">
              <div className="w-[45%] flex justify-between items-center">
                <p className="text-gray-400 text-sm">목표 금액</p>
                <p className="font-bold">
                  {savingChallenge.challenge_saving_target_amount.toLocaleString(
                    "ko-KR"
                  )}
                  원
                </p>
              </div>
              <div className="border"></div>
              <div className="w-[45%] flex justify-between items-center">
                <p className="text-gray-400 text-sm">남은 기간</p>
                <p className="font-bold">
                  {monthsRemaining(savingChallenge.challenge_saving_end_date)}달
                </p>
              </div>
            </div>
            <div className="my-2 flex justify-between">
              <div className="w-[45%] flex justify-between items-center">
                <p className="text-gray-400 text-sm">현재 금액</p>
                <p className="font-bold">
                  {savingAccount.acc_balance.toLocaleString("ko-KR")}원
                </p>
              </div>
              <div className="border"></div>
              <div className="w-[45%] flex justify-between items-center">
                <p className="text-gray-400 text-sm">남은 금액</p>
                <p className="font-bold">
                  {(
                    savingChallenge.challenge_saving_target_amount -
                    savingAccount.acc_balance
                  ).toLocaleString("ko-KR")}
                  원
                </p>
              </div>
            </div>
            <div className="my-2 flex justify-between">
              <div className="w-[45%] flex justify-between items-center">
                <p className="text-gray-400 text-sm">월납입액</p>
                <p className="font-bold">
                  {savingChallenge.challenge_saving_monthly_amount.toLocaleString(
                    "ko-KR"
                  )}
                  원
                </p>
              </div>
              <div className="border"></div>
              <div className="w-[45%] flex justify-between items-center">
                <p className="text-gray-400 text-sm">적립 포인트</p>
                <p className="font-bold">200P</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`my-3 px-2 py-3 text-lg text-center rounded-md bg-gradient-to-r from-indigo-200 to-fuchsia-200 transform flex justify-center ${
            savingChallenge.challenge_saving_target_amount ===
            savingAccount.acc_balance
              ? "hover:opacity-85 duration-300 cursor-pointer"
              : ""
          }`}
          onClick={() => handleSavePoint()}
        >
          <div className="flex items-center">
            <img
              src={
                process.env.PUBLIC_URL + "/images/hana/hana_money_rounded.png"
              }
              alt=""
              className="w-6 mr-2"
            />
            {savingChallenge.challenge_saving_target_amount ===
            savingAccount.acc_balance ? (
              <p>하나머니 챌린지 포인트 적립</p>
            ) : (
              <p>진행중입니다...</p>
            )}
          </div>
        </div>
      </ModalBody>
    </>
  );
}
