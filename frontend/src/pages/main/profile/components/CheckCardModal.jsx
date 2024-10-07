import { ModalBody, ModalCloseButton, ModalHeader } from "@chakra-ui/react";
import { date, month } from "../../../../js/getDateInfo";
import { extractTime } from "../../../../js/extractTime";

export default function CheckCardModal({ cardTransaction }) {
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
            <p className="ml-2">영하나 플러스 체크카드</p>
          </div>
        </div>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <div className="h-auto pb-3 overflow-y-auto">
          <div className="text-sm font-bold border-b">
            오늘의 이용 내역 {month + "." + date}
          </div>
          {cardTransaction.map((data, index) => {
            return <CheckCardRow key={index} data={data} />;
          })}
        </div>
        {!cardTransaction.length && (
          <div className="h-96 text-lg flex justify-center items-center">
            이용 내역이 없어요
          </div>
        )}
      </ModalBody>
    </>
  );
}

function CheckCardRow({ data, index }) {
  return (
    <div
      key={index}
      className="h-[84px] py-2 font-basic border-b flex justify-between items-center"
    >
      <div>
        <div className="text-[0.7rem] py-1 text-gray-400">
          {extractTime(data.card_t_date)} <span className="mx-2">|</span> 본인
        </div>
        <div className="text-sm font-bold">{data.card_t_target}</div>
      </div>
      <div className="text-lg bg-gradient-to-l from-green-700 to-emerald-700 font-bold text-transparent bg-clip-text">
        {(-parseInt(data.card_t_amount)).toLocaleString("ko-KR")}원
      </div>
    </div>
  );
}
