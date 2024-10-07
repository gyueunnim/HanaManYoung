import {
  Modal,
  ModalContent,
  ModalOverlay,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import SavingAccount from "../components/SavingAccount";
import HanaMoneyPoint from "../components/HanaMoneyPoint";
import SavingCard from "../../../common/SavingCard";
import HanaMoneyCard from "../../../common/HanaMoneyCard";
import LoadingSpinner from "../../../common/LoadingSpinner";

export default function Section1({
  challengeAccount,
  accountChallengeTransactions,
  savingChallenge,
  savingAccount,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalId, setModalId] = useState(0);
  const [modalSize, setModalSize] = useState("lg");
  const [isSavingGiveUp, setIsSavingGiveUp] = useState(false);

  useEffect(() => {
    if (isSavingGiveUp) {
      // 챌린지 포기
      setModalId(3);
    }
    // onClose();
  }, [isSavingGiveUp]);

  useEffect(() => {
    if (modalId === 2) {
      setModalSize("sm");
    } else {
      setModalSize("lg");
    }
  }, [modalId]);

  const handleClick = (id) => {
    setModalId(id);
    onOpen();
  };

  return (
    <div className="flex-1">
      <div className="mt-4 w-full flex gap-5">
        <div className="w-[50%]">
          <h2 className="text-2xl font-bold">챌린지 적금</h2>
          <SavingCard
            handleClick={handleClick}
            savingChallenge={savingChallenge}
            savingAccount={savingAccount}
          />
        </div>
        <div className="w-[50%]">
          <h2 className="text-2xl font-bold">나의 하나머니</h2>
          <HanaMoneyCard
            challengeAccount={challengeAccount}
            handleClick={handleClick}
          />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize} isCentered>
        <ModalOverlay />
        <ModalContent>
          {modalId === 1 ? (
            <SavingAccount
              setIsSavingGiveUp={setIsSavingGiveUp}
              savingChallenge={savingChallenge}
              savingAccount={savingAccount}
            />
          ) : (
            <HanaMoneyPoint pointData={accountChallengeTransactions} />
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
