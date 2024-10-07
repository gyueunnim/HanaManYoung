import axios from "axios";
import { IoMdRefresh } from "react-icons/io";
import { useSelector } from "react-redux";
import { BANK_CARD_URL } from "../../../../etc/url";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";

export default function AccountInfo({
  data,
  setSelectModal,
  onOpen,
  setAccount,
}) {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const getAccountBalance = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BANK_CARD_URL}/api/profile/${user.user_login_id}`
      );
      setAccount(response.data.accountList[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (Object.keys(data).length === 0) data.acc_balance = 0;

  return (
    <div
      className="h-[25%] bg-gradient-to-r text-white  from-teal-600 to-emerald-600 rounded-xl px-5 py-3 font-basic"
      onClick={() => setSelectModal(1)}
    >
      <div className="flex justify-between">
        <div className="flex items-center">
          <h2 className="text-lg font-hana font-bold">간편 송금</h2>
          <div className="ml-2 bg-white rounded-full p-1">
            <img
              src={process.env.PUBLIC_URL + "/images/hana/logo.png"}
              alt=""
              className="w-4"
            />
          </div>
        </div>
        <IoMdRefresh
          size="30"
          className="cursor-pointer hover:rotate-[120deg] duration-500"
          onClick={() => {
            getAccountBalance();
          }}
        />
      </div>
      {isLoading ? (
        <div className="w-full h-[100px] flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div>
          <div className="pt-1 text-xs flex justify-between">
            <p>계좌번호</p>
            <p>{data.acc_num}</p>
          </div>
          <div className="pt-1 text-lg flex justify-between">
            <p>잔액</p>
            <p>{data.acc_balance.toLocaleString("ko-KR")}원</p>
          </div>
          <div
            className="mt-2 py-2 bg-white font-bold cursor-pointer hover:opacity-80 duration-300 rounded-lg text-center text-hana"
            onClick={() => onOpen()}
          >
            송금하기
          </div>
        </div>
      )}
    </div>
  );
}
