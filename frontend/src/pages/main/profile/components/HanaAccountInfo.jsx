import { IoIosArrowForward } from "react-icons/io";
export default function HanaAccountInfo({ account, handleClick }) {
  return (
    <div
      class="h-20 mt-4 pl-6 pr-4 py-3 text-white font-basic bg-gradient-to-r from-teal-500 to-emerald-400 rounded-xl cursor-pointer shadow-md shadow-gray-200 hover:opacity-80 transition-all duration-300 ease-in-out flex justify-between items-center group"
      onClick={() => handleClick(3)}
    >
      <div className="flex items-center">
        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
          <img
            src={process.env.PUBLIC_URL + "/images/hana/logo.png"}
            alt=""
            className="p-1"
          />
        </div>
        <div>
          <p className="ml-2 text-lg">영하나 플러스 통장</p>
          <p className="ml-2 text-xs">{account.acc_num}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-5 text-xl">
          {account.acc_balance.toLocaleString("ko-KR")}원
        </div>
        <IoIosArrowForward
          size="25"
          className="mr-1 duration-300 group-hover:translate-x-2"
        />
      </div>
    </div>
  );
}
