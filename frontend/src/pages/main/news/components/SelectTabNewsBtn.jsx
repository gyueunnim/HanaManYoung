import { hours } from "../../../../js/getDateInfo";

export default function SelectTabNewsBtn({ selectNews, setSelectNews }) {
  return (
    <div className="flex justify-between items-end">
      <div className="w-[50%] mt-4 text-gray-300 text-center text-xl font-basic flex gap-5">
        <div
          className={
            "w-[15%] py-2 rounded-md cursor-pointer hover:bg-emerald-600 hover:text-white transition-all duration-300 " +
            (selectNews === 0 ? " text-black" : "")
          }
          onClick={() => setSelectNews(0)}
        >
          금융
        </div>
        <div
          className={
            "w-[15%] py-2 rounded-md cursor-pointer hover:bg-emerald-600 hover:text-white transition-all duration-300 " +
            (selectNews === 1 ? "text-black" : "")
          }
          onClick={() => setSelectNews(1)}
        >
          경제
        </div>
        <div
          className={
            "w-[15%] py-2 rounded-md cursor-pointer hover:bg-emerald-600 hover:text-white transition-all duration-300 " +
            (selectNews === 2 ? "text-black" : "")
          }
          onClick={() => setSelectNews(2)}
        >
          증권
        </div>
      </div>
      <p className="mr-5 font-bold font-basic text-xs text-gray-400">
        현재 뉴스는 {hours}시 기준이에요
      </p>
    </div>
  );
}
