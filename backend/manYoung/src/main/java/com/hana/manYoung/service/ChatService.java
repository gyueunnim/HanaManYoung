package com.hana.manYoung.service;

import com.hana.manYoung.dto.ChatRoomUserDTO;
import com.hana.manYoung.model.ChatMessage;
import com.hana.manYoung.model.ChatRoom;
import com.hana.manYoung.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository repository;

    public void saveMessage(ChatMessage message) {
        repository.saveMessage(message);
    }

    public List<ChatRoom> getRoomId(ChatRoomUserDTO chatRoomUserDTO) {
        return repository.getRoomId(chatRoomUserDTO);
    }

    public List<ChatMessage> getMessages(int chatRoomId) {
        return repository.getMessages(chatRoomId);
    }
}
