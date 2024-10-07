import { useEffect, useState } from "react";

export default function ChallengeCurrent({
  challengeToday,
  challengeInfo,
  setSelectModal,
  onOpen,
}) {
  const [comment, setComment] = useState("");
  useEffect(() => {
    if (challengeToday.length >= challengeInfo.length) {
      setComment("😃");
    } else if (2 <= challengeToday.length && challengeToday.length <= 4) {
      setComment("😐");
    } else {
      setComment("😭");
    }
  }, [challengeToday, challengeInfo]);
  return (
    <div
      className="h-[25%] bg-gradient-to-r from-indigo-100 to-fuchsia-100 rounded-xl px-5 py-3 text-gray-500 font-basic"
      onClick={() => setSelectModal(0)}
    >
      <div className="font-bold font-hana text-lg flex gap-2">
        <p>오늘의 챌린지 현황</p>
        <p className="text-xl">{comment}</p>
      </div>
      <div className="flex justify-between items-center">
        <p>챌린지 성공 횟수</p>
        <p className="text-lg">
          {challengeToday.length}
          <span className="font-bold">/{challengeInfo.length}</span>
        </p>
      </div>
      <div
        className="mt-2 text-center bg-white py-2 font-bold rounded-xl hover:opacity-80 duration-300 cursor-pointer"
        onClick={() => onOpen()}
      >
        공유하기
      </div>
    </div>
  );
}
