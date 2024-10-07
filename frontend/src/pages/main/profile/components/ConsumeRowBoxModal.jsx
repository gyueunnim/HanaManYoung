import { ModalBody, ModalCloseButton, ModalHeader } from "@chakra-ui/react";
import ConsumeRowBox from "../../../common/ConsumeRowBox";
import { date, month } from "../../../../js/getDateInfo";

export default function ConsumeRowBoxModal({ accountTransactions }) {
  return (
    <>
      <ModalHeader>
        <div className="font-bold flex items-center">
          <div className="flex items-center">
            <img
              src={process.env.PUBLIC_URL + "/images/hana/logo.png"}
              alt=""
              className="w-5"
            />
            <p className="ml-2">영하나 계좌</p>
          </div>
        </div>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <div className="h-auto pb-3 overflow-y-auto">
          <div className="text-sm font-bold border-b">
            오늘의 이용 내역 {month + "." + date}
          </div>
          <ConsumeRowBox accountTransactions={accountTransactions} />
        </div>
      </ModalBody>
    </>
  );
}
