import { useEffect, useRef } from "react";
import ReceiveMessage from "./ReceiveMessage";
import SendMessage from "./SendMessage";
import { FiSend } from "react-icons/fi";

export default function ChatRoom({
  selectFriend,
  messages,
  user,
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleKeyDown,
}) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    // 스크롤을 최하단으로 이동, DOM이 완전히 렌더링된 후에 스크롤 수행
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    // 메시지가 업데이트될 때마다 스크롤이 최하단으로 이동하도록 설정
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative w-full h-full flex flex-col border">
      <div className="flex-1 overflow-y-auto p-4 mb-16 mt-12">
        {Object.keys(selectFriend).length === 0 ? (
          <div className="h-full flex items-center justify-center">
            메시지가 없어요
          </div>
        ) : (
          <div className="animate__animated animate__fadeIn font-basic">
            {messages.map((message, index) => {
              return message.user_id === user.user_login_id ? (
                <SendMessage
                  key={index}
                  message={message}
                  type={message.chat_message_type}
                />
              ) : (
                <ReceiveMessage
                  key={index}
                  message={message}
                  type={message.chat_message_type}
                />
              );
            })}
            {/* 스크롤 기준점 */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-white border-t border-gray-200">
        <div className="relative">
          <input
            type="text"
            className="w-full h-12 border rounded-3xl text-xl px-5 font-basic"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)} // 입력 필드 업데이트
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요..."
          />
          <div className="absolute h-12 top-0 right-1 flex items-center">
            <div
              className="p-3 rounded-full bg-blue-50 h-10 cursor-pointer"
              onClick={handleSendMessage} // 메시지 전송
            >
              <FiSend size="20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
