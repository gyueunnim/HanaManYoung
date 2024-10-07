import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BANK_CARD_URL, MAN_YOUNG_URL } from "../../../etc/url";
import axios from "axios";
import LoadingSkeleton from "../../common/LoadingSkeleton";

export default function Section1({
  selected,
  setSelected,
  user,
  relationList,
  relationRequestList,
}) {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [searchUser, setSearchUser] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [childAccountList, setChildAccountList] = useState([]);
  const [account, setAccount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pocketMoneyInfo, setPocketMoneyInfo] = useState([]);
  const [pocketList, setPocketList] = useState([]);
  const [pocketMoneyTitle, setPocketMoneyTitle] = useState("");

  const searchUserInfo = async () => {
    try {
      const response = await axios.post(
        `${MAN_YOUNG_URL}/user/search`,
        searchUser,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      setSearchResult(response.data);
    } catch (error) {
      setSearchResult({});
      console.error(error);
    }
  };

  const handleAccept = async (data) => {
    try {
      await axios.post(
        `${MAN_YOUNG_URL}/user/relation/accept/${data.relation_user_target}`,
        data.relation_user_request,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const getRelationAccountInfo = async (relationList) => {
    try {
      const response = await axios.post(
        `${BANK_CARD_URL}/api/parent/getChildInfo`,
        relationList
      );
      const accountList = response.data;

      const mergedList = relationList.map((relation) => {
        const matchingAccount = accountList.find(
          (account) => account.user_id === relation.relation_user_target
        );

        return {
          ...relation,
          ...matchingAccount, // account 데이터를 relation에 병합
        };
      });

      setChildAccountList(mergedList); // 병합된 리스트를 상태에 저장
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = (num) => {
    onOpen();
    setSelected(num);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        // 두 개의 비동기 함수를 동시에 실행
        const [accountResponse, pocketMoneyResponse, pocketMoneyList] =
          await Promise.all([
            axios.get(`${BANK_CARD_URL}/bank/accountNum/${user.user_login_id}`),
            axios.get(
              `${MAN_YOUNG_URL}/challenge/get/pocketParent/${user.user_login_id}`
            ),
            axios.get(
              `${MAN_YOUNG_URL}/challenge/get/pocketList/${user.user_login_id}`
            ),
          ]);

        setAccount(accountResponse.data[0]);
        setPocketMoneyInfo(pocketMoneyResponse.data);
        setPocketList(pocketMoneyList.data);

        if (pocketMoneyResponse.data === "") {
          setPocketMoneyInfo("");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // 로딩 상태를 해제
      }
    };

    getData();
  }, [user.user_login_id]);

  const acceptPocketMoney = async () => {
    try {
      await axios.post(
        `${MAN_YOUNG_URL}/challenge/accept/pocketMoney/${user.user_login_id}`,
        pocketMoneyTitle,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const sendPocketMoney = () => {
    const sendPocketData = {
      send_user: user.user_login_id,
      receive_user: childAccountList[selected].relation_user_target,
      send_user_name: user.user_name,
      receive_user_name: childAccountList[selected].relation_user_name,
      amount: pocketMoneyInfo.pocket_money_amount,
    };

    try {
      axios.post(`${BANK_CARD_URL}/api/send/pocketMoney`, sendPocketData);
      axios.get(
        `${MAN_YOUNG_URL}/challenge/send/pocketMoney/${pocketMoneyInfo.pocket_money_id}`
      );
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  useEffect(() => {
    getRelationAccountInfo(relationList);
  }, [relationList]);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <>
      <div className="text-xl font-bold">정보</div>
      <div className="mt-2 flex gap-4">
        <div className="w-[50%] text-hana rounded-md">
          <div className="h-40 mx-auto px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-50">
            <div className="h-full flex flex-col justify-between">
              <div className="flex justify-between items-end">
                <h1 className="text-2xl font-bold">
                  {user.user_name}님{" "}
                  <span className="text-lg text-gray-600">환영합니다</span>
                </h1>
                <p
                  className="text-black border-b border-black cursor-pointer"
                  onClick={() => {
                    handleOpen(0);
                  }}
                >
                  관계 추가하기
                </p>
              </div>
              <div className="mt-4 text-sm text-gray-600 font-basic font-bold">
                자녀 정보
              </div>
              {childAccountList.length === 0 ? (
                <div>등록된 자녀가 없습니다.</div>
              ) : (
                childAccountList.map((data, index) => {
                  return (
                    <ChildRow
                      key={index}
                      name={data.relation_user_name}
                      account={data.acc_num}
                      date={data.relation_date}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="w-[50%]">
          <div className="relative h-40 mx-auto px-6 py-4 text-white bg-gradient-to-l from-emerald-600 to-teal-700 overflow-hidden rounded-md">
            <img
              src={process.env.PUBLIC_URL + "/images/hana/logo.png"}
              alt=""
              className="absolute h-36 right-7 -bottom-8 opacity-50 filter-white"
            />
            <div className="h-full flex flex-col justify-between">
              <div className="flex justify-between items-end">
                <div className="text-xl flex items-end">
                  <div>하나만영 등록 계좌</div>
                  <div className="ml-4 text-base font-basic">
                    {account === undefined ? "대기중" : account.acc_num}
                  </div>
                </div>
                <div
                  className="text-sm border-b border-white cursor-pointer"
                  onClick={() => {
                    handleOpen(1);
                  }}
                >
                  이체 일자 변경
                </div>
              </div>
              <div>
                <div className="text-sm">자녀 용돈 이체일</div>
                <div className="font-basic">
                  매월 1일 {(500000).toLocaleString("ko-KR")}원
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 text-xl font-bold">용돈 관리</div>
      <div className="mt-2 flex">
        <div className="flex gap-5">
          {childAccountList.map((child, index) => {
            return (
              <div
                className={`px-4 py-2 rounded-3xl text-xl shadow-md cursor-pointer transition-all duration-300 hover:opacity-85 ${
                  selected === index
                    ? "btn-hana-green text-white"
                    : "bg-gray-100 text-black"
                }`}
                onClick={() => setSelected(index)}
              >
                {child.relation_user_name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full h-72 mt-4 flex gap-x-4">
        <div className="w-[50%] px-4 py-5 border rounded-lg">
          <div className="text-2xl text-gray-600 font-bold">
            {childAccountList[selected]?.relation_user_name || "정보 없음"}
          </div>
          {pocketMoneyInfo ? (
            <>
              <div className="mt-4 text-xl flex">
                <div className="text-hana font-bold">용돈 조르기 요청 금액</div>
                <div className="ml-4 text-gray-600 font-basic">
                  {pocketMoneyInfo.pocket_money_amount.toLocaleString("ko-KR")}
                  원
                </div>
              </div>
              <div className="mt-2">
                <div className="text-xl text-hana font-bold">챌린지 부여</div>
                <input
                  type="text"
                  className="w-full h-14 mt-2 pl-5 text-lg border-2 rounded-2xl border-gray-400"
                  placeholder="챌린지 입력"
                  value={
                    pocketMoneyInfo.pocket_money_title === "" ||
                    pocketMoneyInfo === null
                      ? ""
                      : pocketMoneyInfo.pocket_money_title
                  }
                  onChange={(e) => {
                    setPocketMoneyTitle(e.target.value);
                  }}
                />
              </div>
              <div className="w-full flex gap-3">
                <div
                  className={`w-[50%] mx-auto my-3 px-2 py-3 text-xl text-center rounded-md btn-hana-blue text-white transform ${
                    pocketMoneyInfo.pocket_money_status === "PS_01"
                      ? "opacity-60"
                      : "hover:opacity-85 duration-300 cursor-pointer"
                  }`}
                  onClick={() => {
                    acceptPocketMoney();
                  }}
                >
                  {pocketMoneyInfo.pocket_money_status === "PS_01"
                    ? pocketMoneyInfo.code_name
                    : "챌린지 부여하기"}
                </div>
                <div
                  className="w-[50%] mx-auto my-3 px-2 py-3 text-xl text-center rounded-md btn-hana-green text-white transform hover:opacity-85 duration-300 cursor-pointer"
                  onClick={() => {
                    sendPocketMoney();
                  }}
                >
                  용돈 보내기
                </div>
              </div>
            </>
          ) : (
            <div className="h-52 text-xl font-basic flex justify-center items-center">
              용돈 조르기 요청이 없습니다
            </div>
          )}
        </div>
        <div className="w-[50%] px-4 py-5 border rounded-lg">
          <h2 className="text-xl text-gray-500 font-bold">용돈 조르기 기록</h2>
          <div className="mt-2 px-2 py-2 h-52 border rounded-lg bg-white overflow-auto scroll-auto">
            <div className="w-full pb-2 text-center font-bold text-hana border-b flex">
              <div className="w-[25%]">등록 일자</div>
              <div className="w-[45%]">챌린지</div>
              <div className="w-[30%]">금액</div>
            </div>
            <div>
              {pocketList.length === 0 ? (
                <div className="h-36 font-basic font-bold flex justify-center items-center">
                  용돈 조르기 기록이 없습니다
                </div>
              ) : (
                <>
                  {pocketList.map((pocket, index) => {
                    return (
                      <div
                        className="w-full py-1 text-center border-b font-basic flex"
                        key={index}
                      >
                        <div className="w-[25%]">
                          {pocket.pocket_money_date}
                        </div>
                        <div className="w-[45%]">
                          {pocket.pocket_money_title}
                        </div>
                        <div className="w-[30%]">
                          {pocket.pocket_money_amount.toLocaleString("ko-KR")}원
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered="true">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selected === 0 ? <>관계 목록</> : <>용돈 이체 관리</>}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selected === 0 ? (
              <>
                <div className="font-basic">
                  <div>
                    <p className="ml-1 font-bold">받은 관계 요청</p>
                    <div className="w-full h-32 mt-2 overflow-y-auto border rounded-xl">
                      {relationRequestList.length !== 0 ? (
                        <div className="w-full py-1 border-b flex text-center">
                          <p className="w-[25%]">아이디</p>
                          <p className="w-[25%]">이름</p>
                          <p className="w-[25%]">일자</p>
                          <p className="w-[25%]">수락</p>
                        </div>
                      ) : (
                        <p className="w-full h-full flex justify-center items-center">
                          받은 요청이 없습니다
                        </p>
                      )}
                      {relationRequestList.map((data, index) => {
                        return (
                          <div className="w-full my-2 text-center flex items-center">
                            <p className="w-[25%]">
                              {data.relation_user_request}
                            </p>
                            <p className="w-[25%]">{data.relation_user_name}</p>
                            <p className="w-[25%]">{data.relation_date}</p>
                            <div className="w-[25%] text-white">
                              <p
                                className="w-[80%] py-1 mx-auto text-sm bg-blue-500 rounded-md hover:opacity-80 duration-300 cursor-pointer"
                                onClick={() => {
                                  handleAccept(data);
                                }}
                              >
                                수락
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="ml-1 font-bold">관계 등록</p>
                    <div>
                      <input
                        type="text"
                        placeholder="추가하실 아이디를 입력해주세요"
                        className="w-full h-12 mt-2 px-3 py-1 border rounded-xl"
                        onChange={(e) => {
                          setSearchUser(e.target.value);
                        }}
                      />
                    </div>
                    {searchResult === "" ? (
                      <></>
                    ) : Object.keys(searchResult).length !== 0 ? (
                      <>
                        <div className="w-full mt-3 mx-auto px-4 py-1 font-basic flex justify-between items-center">
                          <div className="w-[50%] flex gap-5">
                            <p className="text-gray-500">아이디</p>
                            <p className="font-bold">
                              {searchResult.user_login_id}
                            </p>
                          </div>
                          <div className="w-[50%] flex gap-5">
                            <p className="text-gray-500">성함</p>
                            <p className="font-bold">
                              {searchResult.user_name}
                            </p>
                          </div>
                        </div>
                        <div className="w-full mx-auto px-4 py-1 font-basic flex justify-between items-center">
                          <div className="w-full flex gap-5">
                            <p className="w-[12%] text-gray-500">학교</p>
                            <p className="font-bold">
                              {searchResult.user_school}
                            </p>
                          </div>
                        </div>
                        <div className="w-full mx-auto px-4 py-1 font-basic flex justify-between items-center">
                          <div className="w-full flex gap-5">
                            <p className="w-[12%] text-gray-500">주소</p>
                            <p className="font-bold">
                              {searchResult.user_address}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="mt-3 py-3 text-center text-red-500 text-sm">
                        해당하는 아이디가 없습니다.
                      </div>
                    )}
                    <div
                      className="mt-4 mb-5 py-2 text-white text-xl text-center rounded-xl btn-hana-blue cursor-pointer hover:opacity-80 duration-300"
                      onClick={() => {
                        searchUserInfo();
                      }}
                    >
                      {Object.keys(searchResult).length !== 0
                        ? "추가하기"
                        : "검색하기"}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="py-4 mb-4 text-center text-gray-500 bg-slate-50 text-xs">
                  용돈 이체 일자 변경 적용일은 다음달입니다.
                </div>
                {childAccountList.map((child, index) => {
                  return (
                    <p className="my-2 text-lg font-bold text-gray-600">
                      {child.relation_user_name}님
                    </p>
                  );
                })}
                <div>
                  <p className="ml-1">
                    현재 이체 일자{" "}
                    <span className="text-sm text-gray-400">1일</span>
                  </p>
                  <input
                    type="number"
                    placeholder="변경일자 입력"
                    className="border rounded-xl w-full border-gray-400 h-12 px-3 my-1"
                  />
                </div>
                <div className="mt-4">
                  <p className="ml-1">
                    현재 용돈{" "}
                    <span className="text-sm text-gray-400">
                      {(500000).toLocaleString("ko-KR")}원
                    </span>
                  </p>
                  <input
                    type="number"
                    placeholder="용돈 입력"
                    value={500000}
                    className="border rounded-xl w-full border-gray-400 h-12 px-3 my-1"
                  />
                </div>
                <div className="mt-5">
                  <div className="py-3 mb-3 text-center btn-hana-blue text-white font-bold rounded-lg cursor-pointer hover:opacity-80 duration-300">
                    변경하기
                  </div>
                </div>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function ChildRow({ name, account, date }) {
  return (
    <div className="w-full font-basic flex">
      <div className="w-[20%] font-bold">{name}님</div>
      <div className="w-[55%] flex">
        <p className="font-bold">계좌번호</p>
        <p className="ml-5 text-black">{account}</p>
      </div>
      <div className="w-[25%] flex justify-between">
        <p className="font-bold">등록일</p>
        <p className="text-black">{date ? date : "대기중"}</p>
      </div>
    </div>
  );
}
