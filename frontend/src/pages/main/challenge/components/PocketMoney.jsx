import { ModalBody } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BANK_CARD_URL, MAN_YOUNG_URL } from "../../../../etc/url";
import { useSelector } from "react-redux";
import { getKoreanNumber } from "../../../../js/getKoreanNumber";
import LoadingModal from "../../../common/LoadingModal";

export default function PocketMoney() {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [relation, setRelation] = useState([]);
  const [pocketMoney, setPocketMoney] = useState([]);
  const [amount, setAmount] = useState(0);
  const [modalIndex, setModalIndex] = useState(0);
  const [currentPocket, setCurrentPocket] = useState([]);
  const [pocketSuccess, setPocketSuccess] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        const [relationResponse, pocketMoneyResponse, pocketSuccessResponse] =
          await Promise.all([
            axios.get(
              `${MAN_YOUNG_URL}/user/relation/getParent/${user.user_login_id}`
            ),
            axios.get(
              `${MAN_YOUNG_URL}/challenge/get/pocketChild/${user.user_login_id}`
            ),
            axios.get(
              `${MAN_YOUNG_URL}/challenge/get/pocketSuccess/${user.user_login_id}`
            ),
          ]);

        setRelation(relationResponse.data);
        setCurrentPocket(pocketMoneyResponse.data);
        setPocketSuccess(pocketSuccessResponse.data);
        if (pocketMoneyResponse.data === "") {
          setCurrentPocket([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // 로딩 끝
      }
    };

    fetchData();
  }, [user.user_login_id]);

  useEffect(() => {
    setPocketMoney({
      pocket_money_amount: amount,
      pocket_money_child: user.user_login_id,
      pocket_money_parent: relation.relation_user_target,
    });
  }, [amount, user.user_login_id, relation.relation_user_target]);

  const handlePocketRegister = () => {
    try {
      axios.post(`${MAN_YOUNG_URL}/challenge/register/pocket`, pocketMoney);
      setModalIndex(1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSavePoint = async () => {
    try {
      // 두 개의 요청을 병렬로 실행
      await Promise.all([
        axios.post(
          `${BANK_CARD_URL}/api/challenge/reward/${user.user_login_id}`,
          {
            acc_t_target: "용돈 조르기",
            acc_t_amount: 50,
          }
        ),
        pocketSuccess &&
        pocketSuccess.length > 0 &&
        pocketSuccess[0].pocket_money_id
          ? axios.get(
              `${MAN_YOUNG_URL}/challenge/savePoint/pocketMoney/${pocketSuccess[0].pocket_money_id}`
            )
          : Promise.reject(
              "pocketSuccess 배열에 값이 없거나 pocket_money_id가 없습니다."
            ),
      ]);
    } catch (error) {
      console.error("요청 에러:", error);
    }
    window.location.reload();
  };

  if (isLoading) return <LoadingModal />;

  return (
    <ModalBody>
      {modalIndex === 0 ? (
        <div className="font-basic">
          <div className="text-lg">
            {Object.keys(relation).length === 0 ? (
              <p>가족을 등록해주세요!</p>
            ) : (
              <div>
                <p className="ml-2 font-bold">등록된 가족</p>
                <div className="mt-2 pb-2 border-gray-300 border rounded-xl">
                  <div className="mt-2 w-full py-1 text-sm text-center flex">
                    <p className="w-[25%] ">아이디</p>
                    <p className="w-[25%] ">이름</p>
                    <p className="w-[25%] ">관계</p>
                    <p className="w-[25%] ">등록일</p>
                  </div>
                  <div className="w-full py-1 text-sm text-center font-bold flex">
                    <p className="w-[25%]">{relation.relation_user_target}</p>
                    <p className="w-[25%]">{relation.relation_user_name}</p>
                    <p className="w-[25%]">
                      {relation.relation_user_type_name}
                    </p>
                    <p className="w-[25%]">{relation.relation_date}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-5">
            <h2 className="ml-2 text-lg font-bold">금액</h2>
            <div className="relative">
              <input
                type="number"
                className="w-full h-14 mt-2 pl-5 text-lg border-2 rounded-2xl border-gray-300"
                placeholder="금액 입력"
                value={
                  Object.keys(currentPocket).length === 0
                    ? null
                    : currentPocket.pocket_money_amount
                }
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="absolute top-6 right-3 text-gray-400">
                {Object.keys(currentPocket).length === 0
                  ? getKoreanNumber(amount)
                  : getKoreanNumber(currentPocket.pocket_money_amount)}
              </p>
            </div>
          </div>
          <div
            className={`my-5 py-3 text-center text-white text-xl btn-hana-blue rounded-lg  ${
              Object.keys(currentPocket).length === 0
                ? "hover:opacity-85 cursor-pointer transition-all duration-300"
                : "opacity-70"
            }`}
            onClick={() => {
              handlePocketRegister();
            }}
          >
            {Object.keys(currentPocket).length === 0 ? (
              "용돈 조르기"
            ) : (
              <>{currentPocket.code_name}...</>
            )}
          </div>
          <div className="px-2">
            <h2 className="text-lg font-bold">받은 미션</h2>
            <div className="my-12 font-basic text-center">
              {pocketSuccess.length !== 0 ? (
                <p className="text-gray-400 text-xs">
                  {pocketSuccess[0].pocket_money_title}{" "}
                  {pocketSuccess[0].code_name}
                  <br />
                  <span className="">
                    용돈을 받았다면 포인트를 적립해주세요
                  </span>
                </p>
              ) : (
                ""
              )}
              {currentPocket.length === 0 ? (
                <>용돈 조르기를 추가해보세요!</>
              ) : currentPocket.pocket_money_status === "PS_03" ? (
                "아직 받은 미션이 없어요!"
              ) : currentPocket.pocket_money_status === "PS_01" ? (
                <>
                  <img
                    src={process.env.PUBLIC_URL + "/images/hana/monthly.gif"}
                    alt=""
                    className="mx-auto"
                  />
                  <p className="mt-2 font-bold text-center">
                    챌린지: {currentPocket.pocket_money_title}
                  </p>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            className={`my-3 px-2 py-3 text-lg text-center rounded-md bg-gradient-to-r from-indigo-200 to-fuchsia-200 transform flex justify-center ${
              Object.keys(currentPocket).length !== 0 &&
              currentPocket.code_name === "완료"
                ? "hover:opacity-85 duration-300 cursor-pointer"
                : ""
            } ${
              pocketSuccess.length !== 0 &&
              pocketSuccess[0].pocket_money_status === "PS_02"
                ? "opacity-100 hover:opacity-85 duration-300 cursor-pointer"
                : ""
            }`}
            onClick={() => {
              handleSavePoint();
            }}
          >
            <div className="flex items-center">
              <img
                src={
                  process.env.PUBLIC_URL + "/images/hana/hana_money_rounded.png"
                }
                alt=""
                className="w-6 mr-2"
              />
              <p>
                {currentPocket.length === 0
                  ? "하나머니 챌린지 포인트 적립"
                  : currentPocket.pocket_money_status === "PS_03"
                  ? "아직 받은 미션이 없어요!"
                  : currentPocket.pocket_money_status === "PS_01"
                  ? "챌린지를 완료해보세요!"
                  : ""}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Success />
      )}
    </ModalBody>
  );
}

function Success() {
  return (
    <>
      <p className="my-3 text-center text-lg font-basic">
        용돈 조르기 요청이 완료되었어요!
      </p>
      <div className="w-full flex justify-center">
        <img
          src={process.env.PUBLIC_URL + "/images/hana/monthly.gif"}
          alt=""
          className="w-[35%]"
        />
      </div>
      <div
        className="my-3 py-2 text-xl text-center text-white btn-hana-blue rounded-xl cursor-pointer hover:opacity-80 duration-300"
        onClick={() => {
          window.location.reload();
        }}
      >
        확인
      </div>
    </>
  );
}
