import { getTodaysTips } from "../../../../data/tip";
import MonthlyLineChart from "../components/MonthlyLineChart";

export default function Section3({ data }) {
  const [tip1, tip2] = getTodaysTips();
  return (
    <div className="w-full mt-10 px-8 py-8 rounded-xl bg-gradient-to-r from-red-100 to-pink-100 shadow-md">
      <div className="flex gap-5">
        <div className="w-[60%]">
          <h1 className="text-2xl text-gray-600 ">
            <span className="font-bold">월별 가계부 추이 </span>
            <span className="text-xs">(최근 6개월)</span>
          </h1>
          <div className="relative mt-5 pt-8 pb-4 font-basic bg-white rounded-xl flex items-center justify-center">
            <img
              src={process.env.PUBLIC_URL + "/images/hana/monthly.gif"}
              alt=""
              className="absolute w-20 bottom-0 left-2"
            />
            <MonthlyLineChart data={data} />
          </div>
        </div>
        <div className="w-[40%]">
          <h1 className="text-2xl text-gray-600">
            <span className="font-bold">오늘의 저축 습관 TIP</span>
          </h1>
          <div className="w-full mt-5 px-4 py-2 h-32 bg-white font-basic rounded-xl">
            <p className="text-center text-xs text-gray-500 ">
              {"< " + tip1.category + " >"}
            </p>
            <p className="my-1 text-center text-sm font-bold">{tip1.tip}</p>
            <p className="text-xs">{tip1.explain}</p>
          </div>
          <div className="w-full mt-5 px-4 py-2 h-32 bg-white font-basic rounded-xl">
            <p className="text-center text-xs text-gray-500 ">
              {"< " + tip2.category + " >"}
            </p>
            <p className="my-1 text-center text-sm font-bold">{tip2.tip}</p>
            <p className="text-xs">{tip2.explain}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
