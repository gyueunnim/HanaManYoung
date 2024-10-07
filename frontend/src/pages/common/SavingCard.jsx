import { IoIosArrowForward } from "react-icons/io";
import { monthsRemaining } from "../../js/monthsRemaining";
import LoadingSpinner from "./LoadingSpinner";
export default function SavingCard({
  handleClick,
  savingChallenge,
  savingAccount,
}) {
  if (Object.keys(savingChallenge).length === 0) return <LoadingSpinner />;
  const handle = () => {
    if (savingChallenge.acc_num === null) return;
    else handleClick(1);
  };
  return (
    <div
      className="h-20 mt-4 pl-6 pr-4 py-3 font-basic bg-gradient-to-r from-indigo-100 to-fuchsia-100 rounded-xl cursor-pointer shadow-md shadow-gray-200 hover:opacity-70 transition-all duration-300 ease-in-out flex justify-between items-center group"
      onClick={() => handle()}
    >
      {savingChallenge.acc_num === null ? (
        <div className="text-lg text-gray-500 flex items-center">
          <div className="bg-white rounded-full">
            <img
              src={process.env.PUBLIC_URL + "/images/challenge/account.png"}
              alt=""
              className="w-7 p-[0.2rem]"
            />
          </div>
          <p className="ml-2">챌린지 적금을 시작해주세요!</p>
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <div>
              <div className="bg-white rounded-full">
                <img
                  src={process.env.PUBLIC_URL + "/images/challenge/account.png"}
                  alt=""
                  className="w-7 p-[0.2rem]"
                />
              </div>
            </div>
            <div className="ml-2 text-gray-500">
              <h2 className="text-lg">
                {savingChallenge.challenge_saving_name}
              </h2>
              <div className="text-center text-[0.55rem]">
                월{" "}
                {savingChallenge.challenge_saving_monthly_amount.toLocaleString(
                  "ko-KR"
                )}
                원 ({monthsRemaining(savingChallenge.challenge_saving_end_date)}
                달 남음)
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-5 text-lg">
              <span className="text-gray-400">
                {savingAccount.acc_balance.toLocaleString("ko-KR")}원{" "}
              </span>
              <span className="black text-gray-500 font-bold">
                /{" "}
                {savingChallenge.challenge_saving_target_amount.toLocaleString(
                  "ko-KR"
                )}
                원
              </span>
            </div>
            <IoIosArrowForward
              size="25"
              className="mr-1 text-gray-500 duration-300 group-hover:translate-x-2"
            />
          </div>
        </>
      )}
    </div>
  );
}
