import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BANK_CARD_URL, MAN_YOUNG_URL } from "../../../etc/url";
import axios from "axios";
import FriendCard from "./components/FriendCard";
import Loading from "../../common/Loading";
import AccountInfo from "./components/AccountInfo";
import { RiMessage2Line } from "react-icons/ri";
import ChallengeCurrent from "./components/ChallengeCurrent";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { getKoreanNumber } from "../../../js/getKoreanNumber";
import ChatRoom from "./components/ChatRoom";
import useChat from "./components/useChat";

export default function Chat() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const [relationList, setRelationList] = useState([]);
  const [account, setAccount] = useState({});
  const [challengeToday, setChallengeToday] = useState({});
  const [challengeInfo, setChallengeInfo] = useState([]);
  const [selectFriend, setSelectFriend] = useState({});
  const [selectModal, setSelectModal] = useState(0);
  const [chatRoomId, setChatRoomId] = useState("");

  const [amount, setAmount] = useState(0);

  const { onOpen, isOpen, onClose } = useDisclosure();
  const [newMessage, setNewMessage] = useState("");
  const [localChatRoomId, setLocalChatRoomId] = useState(null); // 로컬 상태로 chatRoomId 저장
  const { messages, sendMessage } = useChat(localChatRoomId, setAccount);

  const [challengeTodayString, setChallengeTodayString] = useState("");

  useEffect(() => {
    const getChatRoomID = async () => {
      try {
        const response = await axios.post(`${MAN_YOUNG_URL}/chat/getRoomId`, {
          user_login_id: user.user_login_id,
          friend_login_id: selectFriend.relation_user_target,
        });
        setChatRoomId(response.data[0].chat_room_id); // 부모 컴포넌트로 전달
        setLocalChatRoomId(response.data[0].chat_room_id); // 로컬 상태에도 저장
      } catch (error) {
        console.error(error);
      }
    };

    if (selectFriend.relation_user_target && user.user_login_id) {
      getChatRoomID();
    }
  }, [selectFriend.relation_user_target, user.user_login_id, setChatRoomId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [relationResponse, challengeResponse, bankResponse] =
          await Promise.all([
            axios.get(
              `${MAN_YOUNG_URL}/user/relation/get/${user.user_login_id}`
            ),
            axios.get(
              `${MAN_YOUNG_URL}/challenge/get/total/${user.user_login_id}`
            ),
            axios.get(`${BANK_CARD_URL}/api/profile/${user.user_login_id}`),
          ]);
        setRelationList(
          relationResponse.data.relationList.filter(
            (item) => item.relation_user_type === "RT_02"
          )
        );
        setAccount(bankResponse.data.accountList[0]);
        setChallengeToday(challengeResponse.data.todayChallenge);
        setChallengeInfo(challengeResponse.data.challengeInfo);

        const temp = challengeResponse.data.todayChallenge
          .map((challenge) => challenge.code_name) // code_name만 추출
          .join(", "); // ,로 구분된 문자열로 변환
        setChallengeTodayString(
          challengeResponse.data.todayChallenge.length + ", " + temp
        );
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, [user.user_login_id]);

  // 메시지 전송 함수
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage({
        chat_room_id: chatRoomId,
        user_id: user.user_login_id,
        chat_message_content: newMessage,
        chat_message_type: "CMT_01",
      });
      setNewMessage(""); // 메시지 전송 후 입력 필드 비우기
    }
  };

  const handleSendMoney = async () => {
    if (amount > 0) {
      sendMessage({
        chat_room_id: chatRoomId,
        user_id: user.user_login_id,
        chat_message_content: amount,
        chat_message_type: "CMT_02",
      });
      setAmount(""); // 메시지 전송 후 입력 필드 비우기
    }
    try {
      await axios.post(`${BANK_CARD_URL}/bank/sendMoney`, {
        amount: amount,
        sendId: user.user_login_id,
        sendName: user.user_name,
        targetId: selectFriend.relation_user_target,
        targetName: selectFriend.relation_user_name,
      });
      // await fetchAccountInfo(); // 송금 후 계좌 정보 최신화
    } catch (error) {
      console.error(error);
    }
    onClose();
  };

  const handleShareChallenge = () => {
    if (challengeTodayString !== "") {
      sendMessage({
        chat_room_id: chatRoomId,
        user_id: user.user_login_id,
        chat_message_content: challengeTodayString,
        chat_message_type: "CMT_03",
      });
    }
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 엔터 입력 시 기본 submit 방지
      handleSendMessage();
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-[90%] mx-auto animate__animated animate__fadeIn">
      <div className="mt-4 flex items-center gap-1">
        <h1 className="pt-1 text-3xl font-bold">채팅</h1>
        <RiMessage2Line size="30" />
      </div>
      <div className="mt-6 flex gap-5">
        <div className="w-[35%] flex flex-col gap-5">
          <div className="h-[50%] bg-gradient-to-r from-cyan-200 to-cyan-100 rounded-xl p-3">
            <div className="font-bold text-lg text-gray-500">친구 목록</div>
            <div className="mt-1 h-56 bg-white rounded-lg text-sm overflow-y-auto">
              {relationList.map((data, index) => {
                return (
                  <FriendCard
                    data={data}
                    key={index}
                    setSelectFriend={setSelectFriend}
                  />
                );
              })}
            </div>
          </div>
          <ChallengeCurrent
            challengeToday={challengeToday}
            challengeInfo={challengeInfo}
            setSelectModal={setSelectModal}
            onOpen={onOpen}
          />
          <AccountInfo
            data={account}
            setSelectModal={setSelectModal}
            onOpen={onOpen}
            setAccount={setAccount}
          />
        </div>
        <div className="w-[65%]">
          <div className="relative bg-blue-100 h-[600px] rounded-xl">
            <div className="absolute w-full top-0 px-5 py-2 font-bold bg-slate-700 text-white text-xl">
              {Object.keys(selectFriend).length === 0
                ? "대화 상대를 선택해주세요"
                : selectFriend.relation_user_name + "님"}
            </div>
            <ChatRoom
              selectFriend={selectFriend}
              messages={messages}
              user={user}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              handleKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered="true" size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectModal === 0 ? "챌린지 공유" : "간편 송금"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModalArray
              selectFriend={selectFriend}
              selectModal={selectModal}
              challengeToday={challengeToday}
              challengeInfo={challengeInfo}
              setAmount={setAmount}
              amount={amount}
              handleSendMoney={handleSendMoney}
              handleShareChallenge={handleShareChallenge}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

function ModalArray({
  selectFriend,
  selectModal,
  challengeToday,
  challengeInfo,
  setAmount,
  amount,
  handleSendMoney,
  handleShareChallenge,
}) {
  if (Object.keys(selectFriend).length === 0)
    return <div>친구를 선택해주세요</div>;

  return [
    <div>
      <div className="text-center">
        <p>오늘의 챌린지 성공 횟수</p>
        <p className="text-xl">
          {challengeToday.length}/{challengeInfo.length}
        </p>
      </div>
      <div className="mt-1 font-basic text-sm text-gray-500 flex justify-center gap-1">
        {challengeToday.length === 0 ? "" : "("}

        {challengeToday.map((challenge, index) => {
          return <p key={index}>{challenge.code_name}</p>;
        })}
        {challengeToday.length === 0 ? "" : ")"}
      </div>
      <p className="mt-4 text-center">
        <strong className="mx-1">{selectFriend.relation_user_name}</strong>님께
        오늘의 챌린지 현황을 공유할까요?
      </p>
      <div
        className="my-3 py-2 btn-hana-blue text-white rounded-lg text-center hover:opacity-80 duration-300 cursor-pointer"
        onClick={() => {
          handleShareChallenge();
        }}
      >
        공유하기
      </div>
    </div>,
    <div>
      <p className="mb-2">
        <strong>{selectFriend.relation_user_name}</strong>님께 송금할 금액을
        입력해주세요
      </p>
      <div className="relative font-basic">
        <input
          type="number"
          className="w-full px-3 h-12 border rounded-xl text-base"
          placeholder="금액 입력"
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="absolute top-3 right-2 text-right text-gray-400">
          {getKoreanNumber(amount)}
        </div>
      </div>
      <div
        className="mt-4 mb-4 py-2 text-center rounded-lg btn-hana-green text-white hover:opacity-80 duration-300 cursor-pointer"
        onClick={() => {
          handleSendMoney();
        }}
      >
        송금하기
      </div>
    </div>,
  ][selectModal];
}
