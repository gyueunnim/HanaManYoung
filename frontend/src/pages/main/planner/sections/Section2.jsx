import { IoMdSquare } from "react-icons/io";
import ConsumeRowBox from "../../../common/ConsumeRowBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../common/LoadingSpinner";
import { date, koreanDay, month, year } from "../../../../js/getDateInfo";
import { BANK_CARD_URL, MAN_YOUNG_URL } from "../../../../etc/url";
import {
  getCategoryBgColor,
  getCategoryKor,
} from "../../../../js/getCategoryKor";
import { Skeleton } from "@chakra-ui/react";
import NumberToLocale from "../../../common/NumberToLocale";

export default function Section2() {
  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [accountTransactions, setAccountTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [maxExpense, setMaxExpense] = useState(0);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getProfileInfo = async () => {
      setIsLoading(true);
      try {
        const [bankCardResponse, maxExpenseResponse] = await Promise.all([
          axios.get(`${BANK_CARD_URL}/api/profile/${user.user_login_id}`),
          axios.get(
            `${MAN_YOUNG_URL}/user/getDiaryItemMax/${user.user_login_id}`
          ),
        ]);

        // 첫 번째 요청 결과 처리
        setAccount(bankCardResponse.data.accountList[0]);
        setAccountTransactions(bankCardResponse.data.accountTransactions);
        if (bankCardResponse.data.accountTotalIncome === null) {
          setTotalIncome(0);
        } else {
          setTotalIncome(bankCardResponse.data.accountTotalIncome.total);
        }
        if (bankCardResponse.data.accountTotalExpense === null) {
          setTotalExpense(0);
        } else {
          setTotalExpense(bankCardResponse.data.accountTotalExpense.total);
        }

        // 두 번째 요청 결과 처리
        setMaxExpense(maxExpenseResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProfileInfo();
  }, [user.user_login_id]);

  if (isLoading)
    return <Skeleton height="375px" width="100%" className="mx-auto my-3" />;

  return (
    <div className="w-full mt-10 px-8 py-8 rounded-xl text-gray-500 bg-gradient-to-r from-blue-100 to-lime-100 shadow-md">
      <div className="text-black flex justify-between items-end">
        <h2 className="text-2xl text-gray-600 font-bold">
          이용내역{" "}
          <span className="text-sm text-gray-500">
            오늘의 가계부를 작성해주세요!
          </span>
        </h2>
        <a
          href="/challenge"
          className="mr-4 text-xs text-gray-600 border-b border-gray-600 cursor-pointer hover:opacity-80 duration-300"
        >
          가계부 / 소비계획 챌린지
        </a>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <div className="w-[39%] h-60 overflow-y-auto bg-white">
          <div className="w-[90%] py-2 mx-auto font-basic">
            <div className="pt-1 pb-2 border-b-2 flex justify-between items-center">
              <p className="text-xs ">
                {year + "." + month + "." + date} ({koreanDay})
              </p>
              <img
                src={process.env.PUBLIC_URL + "/images/hana/hana_1q.jpg"}
                alt=""
                className="h-5"
              />
            </div>
            {isLoading ? (
              <div className="mt-20">
                <LoadingSpinner />
              </div>
            ) : (
              <ConsumeRowBox accountTransactions={accountTransactions} />
            )}
          </div>
        </div>
        <div className="w-[59%] h-60 font-basic flex flex-col gap-5">
          <div className="bg-white py-4 rounded-xl flex-1 flex">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <div className="w-[50%] px-5">
                  <h3>이번달 수입</h3>
                  <p className="mt-2 text-2xl text-gray-600 font-bold flex justify-center items-center">
                    <NumberToLocale max={totalIncome} delay={50} />원
                  </p>
                </div>
                <div className="w-[50%] px-5">
                  <h3>잔고</h3>
                  <p className="mt-2 text-2xl font-bold bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-transparent bg-clip-text flex justify-center items-center">
                    <NumberToLocale max={account.acc_balance} delay={50} />원
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="bg-white py-4 rounded-xl flex-1 flex">
            <div className="w-[50%] px-5">
              <h3>이번달 지출</h3>
              <p className="mt-2 text-2xl text-gray-600 font-bold flex justify-center items-center">
                <NumberToLocale
                  max={totalExpense === 0 ? totalExpense : -totalExpense}
                  delay={50}
                />
                원
              </p>
            </div>
            <div className="w-[50%] px-5">
              <div className="flex justify-between items-end">
                <p className="text-sm">가장 많은 지출은?</p>
                <div className="flex justify-center">
                  <IoMdSquare
                    size="10"
                    color={getCategoryBgColor(maxExpense.diary_item_category)}
                  />
                  <span className="text-xs">
                    {getCategoryKor(maxExpense.diary_item_category)}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-2xl text-gray-600 flex justify-center items-center font-bold">
                <NumberToLocale max={maxExpense.max} delay={50} />원
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
