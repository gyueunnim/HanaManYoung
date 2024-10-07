package com.hana.manYoung.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatParticipant {
    private int chat_participant_id;
    private int chat_room_id;
    private String user_id;
    private String chat_participant_date;
}
