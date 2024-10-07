package com.hana.manYoung.controller;

import com.hana.manYoung.dto.ChatRoomUserDTO;
import com.hana.manYoung.model.ChatMessage;
import com.hana.manYoung.model.ChatRoom;
import com.hana.manYoung.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatRoomController {
    private final ChatService chatService;
    @PostMapping("/chat/getRoomId")
    public List<ChatRoom> getRoomId(@RequestBody ChatRoomUserDTO chatRoomUserDTO) {
        List<ChatRoom> chatRooms = new ArrayList<>();
        if (chatRoomUserDTO.getFriend_login_id() == null) {
            return chatRooms;
        }
        chatRooms = chatService.getRoomId(chatRoomUserDTO);
        return chatRooms;
    }

    @GetMapping("/chat/getMessages/{chat_room_id}")
    public List<ChatMessage> getMessages(@PathVariable int chat_room_id) {
        return chatService.getMessages(chat_room_id);
    }
}
