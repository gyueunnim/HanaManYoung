import { IoIosArrowForward } from "react-icons/io";
import LoadingSpinner from "./LoadingSpinner";
export default function HanaMoneyCard({ challengeAccount, handleClick }) {
  if (Object.keys(challengeAccount).length === 0) return <LoadingSpinner />;
  return (
    <div
      className="h-20 mt-4 pl-6 pr-4 py-3 font-basic bg-gradient-to-r from-green-200 to-lime-100 rounded-xl cursor-pointer shadow-md shadow-gray-200 hover:opacity-70 transition-all duration-300 ease-in-out flex justify-between items-center group"
      onClick={() => handleClick(2)}
    >
      <div className="flex items-center">
        <img
          src={process.env.PUBLIC_URL + "/images/hana/hana_money_rounded.png"}
          alt=""
          className="w-6"
        />
        <p className="ml-2 text-lg text-gray-600">하나머니 챌린지 포인트</p>
      </div>
      <div className="flex items-center">
        <div className="mr-5 text-xl text-gray-500 font-bold">
          {challengeAccount.acc_balance.toLocaleString("ko-KR")}P
        </div>
        <IoIosArrowForward
          size="25"
          className="mr-1 text-gray-500 duration-300 group-hover:translate-x-2"
        />
      </div>
    </div>
  );
}
