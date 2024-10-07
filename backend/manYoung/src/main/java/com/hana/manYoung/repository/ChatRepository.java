package com.hana.manYoung.repository;

import com.hana.manYoung.dto.ChatRoomUserDTO;
import com.hana.manYoung.model.ChatMessage;
import com.hana.manYoung.model.ChatRoom;
import com.hana.manYoung.util.DateInfo;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class ChatRepository {
    private final SqlSessionTemplate sql;

    public void saveMessage(ChatMessage message) {
        sql.insert("Chat.saveMessage", message);
    }

    public List<ChatRoom> getRoomId(ChatRoomUserDTO chatRoomUserDTO) {
        List<ChatRoom> chatRooms = sql.selectList("Chat.getRoomId", chatRoomUserDTO);
        if(chatRooms.isEmpty()) {
            String date = DateInfo.getToday();
            ChatRoom chatRoom = new ChatRoom();
            chatRoom.setChat_room_date(date);
            sql.insert("Chat.createChatRoom", chatRoom);
            Map<String, Object> params = new HashMap<>();
            params.put("chat_room_id", chatRoom.getChat_room_id());
            params.put("user_id", chatRoomUserDTO.getUser_login_id());
            params.put("date", date);
            sql.insert("Chat.participateChatUser", params);
            params.put("user_id", chatRoomUserDTO.getFriend_login_id());
            sql.insert("Chat.participateChatUser", params);
            return sql.selectList("Chat.getRoomId", chatRoomUserDTO);
        }
        return chatRooms;
    }

    public List<ChatMessage> getMessages(int chat_room_id) {
        return sql.selectList("Chat.getMessages", chat_room_id);
    }
}
