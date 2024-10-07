import { ModalBody, ModalCloseButton, ModalHeader } from "@chakra-ui/react";

import PointRow from "./PointRow";

export default function HanaMoneyPoint({ pointData }) {
  return (
    <>
      <ModalHeader>
        <div className="font-bold flex items-center">
          <div className="flex items-center">
            <img
              src={
                process.env.PUBLIC_URL + "/images/hana/hana_money_rounded.png"
              }
              alt=""
              className="w-5"
            />
            <p className="ml-2">하나머니 챌린지 포인트</p>
          </div>
        </div>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <div className="h-96 ml-3 pr-3 overflow-y-auto">
          {pointData.length === 0 ? (
            <div className="h-96 text-lg flex justify-center items-center">
              포인트 적립 내역이 없어요
            </div>
          ) : (
            pointData.map((data, index) => (
              <PointRow key={index} data={data} type={"point"} />
            ))
          )}
        </div>
      </ModalBody>
    </>
  );
}
