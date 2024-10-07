import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

import ChallengeContent from "./ChallengeContent";
import ChallengeDone from "./ChallengeDone";
import axios from "axios";
import { BANK_CARD_URL, MAN_YOUNG_URL } from "../../../../etc/url";
import { useSelector } from "react-redux";

export default function ChallengeCard({
  data,
  bg,
  imgUrl,
  done,
  savingAccount,
  id,
  pocketMoneyStatus,
}) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalSize, setModalSize] = useState("lg");

  const handleClick = () => {
    if (id === 2 && done) {
      return;
    }
    if (done) {
      onOpen();
      return;
    }

    if (data.challenge_id === "2") {
      navigate(process.env.PUBLIC_URL + "/challenge/diary");
    } else if (data.challenge_id === "1") {
      setModalSize("sm");
      onOpen();
    } else if (data.challenge_id === "4") {
      window.open("https://minjae-vincent.github.io/");
      registerChallengeTarotReword();
      window.location.href = process.env.PUBLIC_URL + "/challenge";
    } else {
      setModalSize("lg");
      onOpen();
    }
  };

  const registerChallengeTarotReword = () => {
    try {
      axios.post(
        `${MAN_YOUNG_URL}/challenge/register/tarot/${user.user_login_id}`
      );
      axios.post(
        `${BANK_CARD_URL}/api/challenge/reward/${user.user_login_id}`,
        {
          acc_t_target: "하나타로",
          acc_t_amount: 25,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`w-[50%] h-28 px-4 py-4 text-2xl font-basic rounded-lg flex items-center justify-between shadow-md shadow-gray-200 hover:opacity-70 transition-all duration-300 ease-in-out cursor-pointer group ${bg} ${
        done ? "opacity-70" : ""
      }`}
      onClick={() => handleClick()}
    >
      <div className="ml-2">
        <div className="flex items-center">
          <img src={imgUrl} alt="" className="mr-2 w-5" />
          <h1 className="text-xl">{data.code_name}</h1>
        </div>
        <p className="text-xs text-gray-500">{data.code_description}</p>
      </div>
      <div className="flex items-center">
        <div className="text-xl font-bold mr-5">
          {id === 4 && pocketMoneyStatus.length !== 0 ? (
            pocketMoneyStatus[0].code_name
          ) : done && id === 2 ? (
            "진행중"
          ) : done ? (
            "완료"
          ) : (
            <>{data.challenge_reword + "P"}</>
          )}
        </div>
        <IoIosArrowForward
          size="25"
          className="mr-1 text-gray-500 duration-300 group-hover:translate-x-2"
        />
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize} isCentered>
        <ModalOverlay />
        <ModalContent>
          {done ? (
            <ChallengeDone />
          ) : (
            <ChallengeContent
              data={data}
              imgUrl={imgUrl}
              savingAccount={savingAccount}
            />
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
