import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { BANK_CARD_URL, MAN_YOUNG_URL } from "../../../../etc/url";
import { Stomp } from "@stomp/stompjs";
import axios from "axios";
import { useSelector } from "react-redux";

export default function useChat(chatRoomId, setAccount) {
  const [messages, setMessages] = useState([]);
  const stompClient = useRef(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!chatRoomId || stompClient.current) return; // 이미 연결되어 있으면 아무 작업도 하지 않음

    const socket = new SockJS(`${MAN_YOUNG_URL}/ws/chat`);
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, () => {
      stompClient.current.subscribe(`/topic/${chatRoomId}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        // console.log("Received message: ", receivedMessage);

        if (receivedMessage.chat_message_type === "CMT_02") {
          // 송금 메시지를 수신한 경우 받는 사람의 계좌 정보 업데이트
          fetchReceiverAccountInfo();
        }

        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    });

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${MAN_YOUNG_URL}/chat/getMessages/${chatRoomId}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
        stompClient.current = null; // 연결 해제 후 stompClient 초기화
      }
    };
  }, [chatRoomId]); // chatRoomId가 변경될 때만 실행

  const sendMessage = (message) => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(
        `/app/chat.sendMessage/${chatRoomId}`,
        {},
        JSON.stringify(message)
      );
    }
  };

  const fetchReceiverAccountInfo = async () => {
    try {
      const response = await axios.get(
        `${BANK_CARD_URL}/api/profile/${user.user_login_id}`
      );
      // console.log("Updated receiver's account info: ", response.data);
      setAccount(response.data.accountList[0]);
      // 필요한 경우 이 정보를 다른 컴포넌트에 전달하거나 상태로 관리
    } catch (error) {
      console.error("Error fetching receiver's account info: ", error);
    }
  };
  return { messages, sendMessage };
}
