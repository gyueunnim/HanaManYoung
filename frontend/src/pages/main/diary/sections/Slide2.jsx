import { IoMdSquare } from "react-icons/io";
import {
  getCategoryBgColor,
  getCategoryKor,
} from "../../../../js/getCategoryKor";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Loading from "../../../common/Loading";
import {
  getExpenseAmount,
  getIncomeAmount,
} from "../../../../js/getTotalAmount";
import { MAN_YOUNG_URL } from "../../../../etc/url";

export default function Slide2({ categorySums, accountTransactions }) {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [plannerItems, setPlannerItems] = useState([]);
  const [planner, setPlanner] = useState([]);
  const amount =
    getIncomeAmount(accountTransactions) +
    getExpenseAmount(accountTransactions);

  useEffect(() => {
    const getPlanner = async () => {
      try {
        const result = await axios.get(
          `${MAN_YOUNG_URL}/diary/getPlanner/${user.user_login_id}`
        );
        setPlannerItems(result.data.plannerItems);
        setPlanner(result.data.planner);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    getPlanner();
  }, [user.user_login_id]);

  const sortedPlannerItems = [...plannerItems].sort((a, b) =>
    a.code_name.localeCompare(b.code_name)
  );

  const plannerItemsSums = sortedPlannerItems.reduce((acc, item) => {
    acc[item.code_id] = (acc[item.code_id] || 0) + item.planner_item_amount;
    return acc;
  }, {});

  // Sort categorySums by category name
  const sortedCategorySums = Object.keys(categorySums)
    .sort((a, b) => getCategoryKor(a).localeCompare(getCategoryKor(b)))
    .reduce((obj, key) => {
      obj[key] = categorySums[key];
      return obj;
    }, {});

  if (isLoading) return <Loading />;

  return (
    <div className="mt-6">
      <div className="flex gap-20">
        <div className="w-[40%]">
          <h2 className="text-lg text-gray-600 my-2 font-basic font-bold">
            내가 작성한 소비계획
          </h2>
          <div className="w-full py-2 font-bold border-y-2 flex">
            <div className="w-[60%] text-center">카테고리</div>
            <div className="w-[40%] text-center">금액</div>
          </div>
          {sortedPlannerItems.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full py-2 font-basic border-b flex animate__animated animate__fadeInDown"
              >
                <div className="w-[60%] px-3 border-r flex">
                  <IoMdSquare
                    size="25"
                    color={getCategoryBgColor(item.code_id)}
                    className="mr-2"
                  />
                  <p>{item.code_name}</p>
                </div>
                <div className="w-[40%] px-3 text-right">
                  {item.planner_item_amount === 0
                    ? 0
                    : item.planner_item_amount > 0
                    ? "+" + item.planner_item_amount.toLocaleString("ko-KR")
                    : (-item.planner_item_amount).toLocaleString("ko-KR")}
                  원
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-[60%]">
          <h2 className="text-lg text-gray-600 my-2 font-basic font-bold">
            실제 거래한 금액 (가계부)
          </h2>
          <div className="w-full py-2 font-bold border-y-2 flex">
            <div className="w-[40%] text-center">카테고리</div>
            <div className="w-[35%] text-center">금액</div>
            <div className="w-[25%] text-center">차이</div>
          </div>
          {Object.keys(sortedCategorySums).map((key, index) => {
            const plannerAmount = plannerItemsSums[key] || 0;
            const categorySum = sortedCategorySums[key];
            const difference = categorySum - plannerAmount;
            return (
              <div
                key={index}
                className="w-full py-2 border-b border-t-0 font-basic flex items-center animate__animated animate__fadeInDown"
              >
                <div className="w-[40%] px-3 border-r flex">
                  <IoMdSquare
                    size="25"
                    color={getCategoryBgColor(key)}
                    className="mr-2"
                  />
                  <p>{getCategoryKor(key)}</p>
                </div>
                <p className="w-[35%] px-3 border-r text-right">
                  {categorySum === 0
                    ? 0
                    : (-categorySum).toLocaleString("ko-KR")}
                  원
                </p>
                <p
                  className={`w-[25%] px-3 text-right ${
                    difference === 0
                      ? "text-black"
                      : difference > 0
                      ? "text-hana"
                      : "text-orange-500"
                  }`}
                >
                  {difference === 0
                    ? 0
                    : difference > 0
                    ? "+ " + difference.toLocaleString("ko-KR")
                    : difference.toLocaleString("ko-KR")}
                  원
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full h-64 px-12 text-center font-basic flex items-center">
        <div className="w-[35%]">
          <p className="py-1 text-xl">
            <span className="text-gray-600">예상 거래 금액 </span>
            <span className="mx-2 text-pink-400 text-3xl">
              {planner.planner_amount.toLocaleString("ko-KR")}
            </span>
            원
          </p>
          <p className="py-1 text-xl">
            <span className="text-gray-600">실제 거래 금액 </span>
            <span className="mx-2 text-orange-500 text-3xl">
              {(
                -getIncomeAmount(accountTransactions) -
                getExpenseAmount(accountTransactions)
              ).toLocaleString("ko-KR")}
            </span>
            원
          </p>
        </div>
        <FaLongArrowAltLeft className="rotate-180" size="75" />
        <div className="w-[55%] text-2xl">
          <img
            src={process.env.PUBLIC_URL + "/images/hana/planner.gif"}
            alt=""
            className="mx-auto my-2"
          />
          <p className="py-1">{comment(amount, -planner.planner_amount)}</p>
        </div>
      </div>
    </div>
  );
}

function comment(diary, planner) {
  diary = Math.abs(diary);
  planner = Math.abs(planner);
  if (diary < planner * 0.8) {
    return "예상 금액보다 적게 소비했어요!";
  } else if (planner * 0.8 <= diary && diary <= planner * 1.2) {
    return "예상 금액과 비슷하게 소비했어요!";
  } else {
    return "좀 더 신중한 소비를 해보는건 어떨까요?";
  }
}
