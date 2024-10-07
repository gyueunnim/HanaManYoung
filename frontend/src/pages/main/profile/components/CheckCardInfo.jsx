import { IoIosArrowForward } from "react-icons/io";

export default function CheckCardInfo({ handleClick, card }) {
  return (
    <div
      class="h-20 mt-4 pl-6 pr-4 py-3 text-gray-500 font-basic bg-gradient-to-r from-indigo-200 to-teal-200 rounded-xl cursor-pointer shadow-md shadow-gray-200 hover:opacity-70 transition-all duration-300 ease-in-out flex justify-between items-center group"
      onClick={() => handleClick(4)}
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
          <p className="ml-2 text-lg">영하나 플러스 체크카드</p>
          <p className="ml-2 text-xs">{card.card_num}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-5 text-lg">사용내역</div>
        <IoIosArrowForward
          size="25"
          className="mr-1 duration-300 group-hover:translate-x-2"
        />
      </div>
    </div>
  );
}
