import {
  Modal,
  ModalContent,
  ModalOverlay,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import CheckCardInfo from "../components/CheckCardInfo";
import HanaAccountInfo from "../components/HanaAccountInfo";
import SavingAccount from "../../challenge/components/SavingAccount";
import HanaMoneyPoint from "../../challenge/components/HanaMoneyPoint";
import { useEffect, useState } from "react";
import SavingCard from "../../../common/SavingCard";
import HanaMoneyCard from "../../../common/HanaMoneyCard";
import ConsumeRowBoxModal from "../components/ConsumeRowBoxModal";
import CheckCardModal from "../components/CheckCardModal";
import axios from "axios";
import { useSelector } from "react-redux";
import { BANK_CARD_URL, MAN_YOUNG_URL } from "../../../../etc/url";
export default function Section2() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalId, setModalId] = useState(0);
  const [modalSize, setModalSize] = useState("lg");
  const [isSavingGiveUp, setIsSavingGiveUp] = useState(false);

  const [account, setAccount] = useState("");
  const [challengeAccount, setChallengeAccount] = useState("");
  const [card, setCard] = useState("");
  const [cardTransaction, setCardTransaction] = useState([]);
  const [accountTransactions, setAccountTransactions] = useState([]);
  const [accountChallengeTransactions, setAccountChallengeTransactions] =
    useState([]);

  const [savingAccount, setSavingAccount] = useState({});
  const [savingChallenge, setSavingChallenge] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getProfileInfo = async () => {
      if (!user || !user.user_login_id) return; // user 정보가 없으면 요청하지 않음

      setIsLoading(true);
      try {
        // 두 개의 요청을 동시에 실행
        const [profileResponse, challengeResult] = await Promise.all([
          axios.get(`${BANK_CARD_URL}/api/profile/${user.user_login_id}`),
          axios.get(
            `${MAN_YOUNG_URL}/challenge/get/total/${user.user_login_id}`
          ),
        ]);

        // API 응답 데이터 설정
        setAccount(profileResponse.data.accountList[0]);
        setChallengeAccount(profileResponse.data.accountList[2]);
        setCard(profileResponse.data.card);
        setCardTransaction(profileResponse.data.cardTransactions);
        setAccountTransactions(profileResponse.data.accountTransactions);
        setAccountChallengeTransactions(
          profileResponse.data.accountChallengeTransactions
        );
        setSavingAccount(profileResponse.data.accountList[1]);
        setSavingChallenge(challengeResult.data.challengeSaving);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProfileInfo();
  }, [user]); // user가 변경될 때마다 실행

  useEffect(() => {
    if (modalId === 1) {
      setModalSize("lg");
    } else {
      setModalSize("sm");
    }
  }, [modalId]);

  const handleClick = (id) => {
    setModalId(id);
    onOpen();
  };

  if (isLoading || !user || !user.user_login_id)
    return <Skeleton height="375px" width="100%" className="mx-auto my-3" />;

  return (
    <div className="mt-8 py-6 bg-gradient-to-t from-slate-100 to-gray-200 rounded-xl shadow-md">
      <div className="ml-4 flex items-center">
        <img
          src={process.env.PUBLIC_URL + "/images/hana/asset.png"}
          alt=""
          className="w-7 h-7"
        />
        <h1 className="ml-2 text-2xl text-gray-600 font-bold">내 자산</h1>
      </div>
      <div className="w-[95%] mx-auto mt-3 px-4 pb-4 bg-white rounded-xl">
        <div className="w-full flex justify-between gap-4">
          <div className="w-[50%]">
            <SavingCard
              savingAccount={savingAccount}
              savingChallenge={savingChallenge}
              handleClick={handleClick}
            />
          </div>
          <div className="w-[50%]">
            <HanaMoneyCard
              challengeAccount={challengeAccount}
              handleClick={handleClick}
            />
          </div>
        </div>
        <div className="mt-2 w-full flex justify-between gap-4">
          <div className="w-[50%]">
            <HanaAccountInfo account={account} handleClick={handleClick} />
          </div>
          <div className="w-[50%]">
            <CheckCardInfo handleClick={handleClick} card={card} />
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize} isCentered>
        <ModalOverlay />
        <ModalContent>
          {modalId === 1 ? (
            <SavingAccount
              savingAccount={savingAccount}
              savingChallenge={savingChallenge}
              setIsSavingGiveUp={setIsSavingGiveUp}
            />
          ) : modalId === 2 ? (
            <HanaMoneyPoint pointData={accountChallengeTransactions} />
          ) : modalId === 3 ? (
            <ConsumeRowBoxModal accountTransactions={accountTransactions} />
          ) : (
            <CheckCardModal cardTransaction={cardTransaction} />
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
