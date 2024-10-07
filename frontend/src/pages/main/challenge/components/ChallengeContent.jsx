import { ModalCloseButton, ModalHeader } from "@chakra-ui/react";
import Saving from "./Saving";
import PocketMoney from "./PocketMoney";
import Quiz from "./Quiz";

export default function ChallengeContent({ data, imgUrl, savingAccount }) {
  return [
    <>
      <ModalHeader>
        <div className="flex items-center">
          <img src={imgUrl} alt="" className="mr-2 w-5" />
          <h1 className="text-xl">{data.code_name}</h1>
        </div>
      </ModalHeader>
      <ModalCloseButton />
      <Quiz />
    </>,
    <></>,
    <>
      <ModalHeader>
        <div className="flex items-center">
          <img src={imgUrl} alt="" className="mr-2 w-5" />
          <h1 className="text-xl">{data.code_name}</h1>
        </div>
      </ModalHeader>
      <ModalCloseButton />
      <Saving savingAccount={savingAccount} />
    </>,
    <></>,
    <>
      <ModalHeader>
        <div className="flex items-center">
          <img src={imgUrl} alt="" className="mr-2 w-5" />
          <h1 className="text-xl">{data.code_name}</h1>
        </div>
      </ModalHeader>
      <ModalCloseButton />
      <PocketMoney />
    </>,
  ][parseInt(data.challenge_id) - 1];
}
