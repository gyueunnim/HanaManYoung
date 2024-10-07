import { ModalBody, ModalCloseButton, ModalHeader } from "@chakra-ui/react";

export default function ChallengeDone() {
  return (
    <>
      <ModalHeader>
        <div className="flex items-center">챌린지 참여</div>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <div className="text-xl w-full flex flex-col items-center">
          <p>이미 완료한 챌린지입니다👍</p>
          <img
            src={process.env.PUBLIC_URL + "/images/hana/done.gif"}
            alt=""
            className="w-[40%]"
          />
          <p className="mb-6">내일도 참여해요!</p>
        </div>
      </ModalBody>
    </>
  );
}
