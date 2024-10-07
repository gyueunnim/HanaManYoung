package com.hana.manYoung.dto;

import com.hana.manYoung.model.ChatMessage;
import com.hana.manYoung.model.ChatRoom;
import com.hana.manYoung.model.Relation;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChatListDTO {
    private List<ChatRoom> chatRooms;
    private List<Relation> relations;
}
