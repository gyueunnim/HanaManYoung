package com.hana.manYoung.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatMessage {
    private int chat_message_id;
    private int chat_room_id;
    private String user_id; // sender
    private String chat_message_content;
    private String chat_message_time;
    private String chat_message_type;
}
