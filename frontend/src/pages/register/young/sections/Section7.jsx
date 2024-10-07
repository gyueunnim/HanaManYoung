import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { checkCards } from "../../../../data/checkCards";
import { useState } from "react";
import CheckCardInfo from "../components/CheckCardInfo";
import PwModal from "../components/PwModal";
export default function Section7({
  selectCard,
  setSelectCard,
  cardCheck,
  setCardCheck,
  cardPw,
  setCardPw,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentModal, setCurrentModal] = useState();

  const handleModal = (i) => () => {
    setCurrentModal(i);
    onOpen();
  };

  return (
    <div className="w-full">
      <p className="text-xl">디자인을 선택해주세요</p>
      <div className="mt-14 flex justify-evenly">
        {checkCards.map((card, i) => (
          <div
            key={i}
            className={
              "w-[22.5%] flex flex-col items-center hover:scale-125 hover:opacity-100 transition-transform duration-500 ease-in-out cursor-pointer" +
              (selectCard === i ? " opacity-100 scale-125" : " opacity-50")
            }
            onClick={() => {
              setSelectCard(i);
            }}
          >
            <img
              src={process.env.PUBLIC_URL + card.image}
              className="shadow-md shadow-gray-700 rounded-md"
              alt=""
            />
            <div className="mt-6">{card.name}</div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12" onClick={handleModal(1)}>
        <span className="text-xl border-b-black border-b px-3 cursor-pointer">
          상품 정보 확인하기
        </span>
      </div>
      <div className="mt-4 text-center" onClick={handleModal(2)}>
        <span className="px-3 text-gray-500 text-sm cursor-pointer">
          비밀번호 설정하기
        </span>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent maxH="80vh" overflowY="auto">
          {currentModal === 1 ? (
            <CheckCardInfo cardCheck={cardCheck} setCardCheck={setCardCheck} />
          ) : (
            <PwModal onClose={onClose} pw={cardPw} setPw={setCardPw} />
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
