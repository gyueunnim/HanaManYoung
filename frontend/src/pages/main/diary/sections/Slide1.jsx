import { useEffect, useState } from "react";
import {
  getCategoryBgColor,
  getCategoryKor,
} from "../../../../js/getCategoryKor";
import ConsumePieChart from "../components/ConsumePieChart";
import { IoMdSquare } from "react-icons/io";
import { extractTime } from "../../../../js/extractTime";
import {
  getIncomeAmount,
  getExpenseAmount,
} from "../../../../js/getTotalAmount";

export default function Slide1({
  categorySums,
  handleSelectChange,
  accountTransactions,
  account,
}) {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const transformedData = Object.keys(categorySums).map((key) => ({
      name: key,
      value: categorySums[key] < 0 ? -categorySums[key] : categorySums[key],
    }));
    setChartData(transformedData);
  }, [categorySums]);
  return (
    <>
      {accountTransactions.length === 0 ? (
        <NoData />
      ) : (
        <>
          <div className="w-full h-[300px] mt-5 font-basic overflow-y-auto">
            <div className="py-2 text-center font-bold flex border-b">
              <p className="w-[10%]">시간</p>
              <p className="w-[20%]">거래유형</p>
              <p className="w-[40%]">항목명</p>
              <p className="w-[15%]">금액</p>
              <p className="w-[15%]">카테고리</p>
            </div>
            {accountTransactions.map((data, index) => (
              <div className="py-2 text-center border-t flex" key={index}>
                <p className="w-[10%] px-3 border-r">
                  {extractTime(data.acc_t_date)}
                </p>
                <p className="w-[20%] px-3 border-r">{data.code_name}</p>
                <p className="w-[40%] px-10 border-r text-left">
                  {data.acc_t_target}
                </p>
                <p
                  className={
                    "w-[15%] px-5 border-r text-right " +
                    (data.acc_t_amount > 0 ? "text-hana" : "text-orange-500")
                  }
                >
                  {data.acc_t_amount > 0 ? "+" : ""}
                  {parseInt(data.acc_t_amount).toLocaleString("ko-KR")} 원
                </p>
                <select
                  name=""
                  id=""
                  value={data.consume_type || "none"}
                  onChange={(e) => handleSelectChange(index, e.target.value)}
                  className="w-[15%] text-sm text-center cursor-pointer"
                >
                  <option value="none">카테고리</option>
                  <option value="CT_FOOD">식비/간식</option>
                  <option value="CT_BEAUTY">미용/패션</option>
                  <option value="CT_TRAFFIC">교통비</option>
                  <option value="CT_HOBBY">문화/취미</option>
                  <option value="CT_EDU">교육/학습</option>
                  <option value="CT_SHOP">디지털 콘텐츠/쇼핑</option>
                  <option value="CT_ETC">기타/예비/용돈</option>
                </select>
              </div>
            ))}
          </div>
          <div className="mt-2 text-2xl flex justify-end">
            <div className="flex mx-2">
              <h2 className="mr-2">오늘 총 거래 금액</h2>
              <p className="text-orange-500">
                {(
                  getIncomeAmount(accountTransactions) +
                  getExpenseAmount(accountTransactions)
                ).toLocaleString("ko-KR")}{" "}
                원
              </p>
            </div>
            <div className="flex mx-2">
              <h2 className="mr-2">잔고</h2>
              <p className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-transparent bg-clip-text">
                {parseInt(account.acc_balance).toLocaleString("ko-KR")} 원
              </p>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-bold">
              오늘의 지출
              <span className="ml-3 text-sm text-gray-400">소비항목별</span>
            </h2>
            <div className="flex justify-center">
              {Object.values(categorySums).every((value) => value === 0) ? (
                <NoCategory />
              ) : (
                <>
                  <div className="w-[40%]">
                    <ConsumePieChart data={chartData} />
                  </div>
                  <div className="h-[250px] text-lg font-basic flex flex-wrap flex-col gap-5">
                    {Object.keys(categorySums).map(
                      (key, index) =>
                        categorySums[key] !== 0 && (
                          <div
                            key={index}
                            className="w-[235px] flex items-center animate__animated animate__fadeInDown"
                          >
                            <IoMdSquare
                              size="25"
                              color={getCategoryBgColor(key)}
                              className="mr-1 w-[10%]"
                            />
                            <p className="w-[50%]">{getCategoryKor(key)}</p>
                            <p className="w-[40%] text-right">
                              {categorySums[key] > 0
                                ? "+" +
                                  categorySums[key].toLocaleString("ko-KR")
                                : (-categorySums[key]).toLocaleString("ko-KR")}
                              원
                            </p>
                          </div>
                        )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

function NoData() {
  return (
    <div className="w-full h-[600px] text-3xl flex flex-col items-center justify-center">
      <img
        src={process.env.PUBLIC_URL + "/images/hana/category.gif"}
        alt="카테고리 추가"
        className="w-40 my-2"
      />
      <p className="my-4">금일 소비 내역이 없습니다</p>
    </div>
  );
}

function NoCategory() {
  return (
    <div className="h-[250px] flex-1 flex flex-col justify-center items-center animate__animated animate__fadeIn">
      <p className="text-2xl">카테고리를 추가해주세요!</p>
      <img
        src={process.env.PUBLIC_URL + "/images/hana/category.gif"}
        alt="카테고리 추가"
        className="w-32 my-2"
      />
    </div>
  );
}
