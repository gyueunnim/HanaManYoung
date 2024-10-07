import React from "react";

export default function SendMessage({ message, type }) {
  let temp = "";
  if (type === "CMT_03") {
    temp = message.chat_message_content.split(", ").slice();
  }
  if (type === "CMT_01")
    return (
      <div className="my-4">
        <p className="text-right ml-1 text-xs text-gray-400">
          {message.chat_message_time}
        </p>
        <p className="mt-4 text-right">
          <span className="p-3 rounded-xl bg-gradient-to-t from-lime-50 to-yellow-100">
            {message.chat_message_content}
          </span>
        </p>
      </div>
    );
  else if (type === "CMT_02")
    return (
      <div className="my-2 flex flex-col items-end">
        <p className="ml-1 text-xs text-gray-400">
          {message.chat_message_time}
        </p>
        <div className="mt-1 rounded-xl bg-gradient-to-t from-lime-50 to-yellow-100 p-3 max-w-[35%]">
          <span className="">
            <img
              src={process.env.PUBLIC_URL + "/images/icons/money_chat.png"}
              alt=""
              className="mx-auto"
            />
            <span>{message.user_id}님이</span>
            <br />
            <span className="text-lg">
              <span className="font-bold">
                {parseInt(message.chat_message_content).toLocaleString()}원
              </span>
              을 보냈어요!
            </span>
          </span>
        </div>
      </div>
    );
  else
    return (
      <div className="my-2 flex flex-col items-end">
        <p className="ml-1 text-xs text-gray-400">
          {message.chat_message_time}
        </p>
        <span className="mt-1 rounded-xl bg-gradient-to-t from-lime-50 to-yellow-100 p-3">
          <img
            src={process.env.PUBLIC_URL + "/images/icons/challenge_chat.png"}
            alt=""
            className="mx-auto"
          />
          {message.user_id}님이
          <br />
          <span className="text-lg font-bold">챌린지</span>
          <span>를 공유했어요!</span>
          <br />
          <span>- 오늘의 성공 {temp[0]}/ 5</span>
          <br />
          <span>목록</span>
          <br />
          <span>
            {temp.map((data, index) => {
              if (index === 0) return null; // 첫 번째 요소는 무시
              return (
                <React.Fragment key={index}>
                  {"- " + data}
                  <br />
                </React.Fragment>
              );
            })}
          </span>
        </span>
      </div>
    );
}
