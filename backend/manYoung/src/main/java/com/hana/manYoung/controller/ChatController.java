    package com.hana.manYoung.controller;

    import com.hana.manYoung.model.ChatMessage;
    import com.hana.manYoung.service.ChatService;
    import com.hana.manYoung.util.DateInfo;
    import lombok.RequiredArgsConstructor;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    import org.springframework.messaging.handler.annotation.DestinationVariable;
    import org.springframework.messaging.handler.annotation.MessageMapping;
    import org.springframework.messaging.handler.annotation.SendTo;
    import org.springframework.stereotype.Controller;


    @Controller
    @RequiredArgsConstructor
    public class ChatController {

        private final ChatService chatService;

        private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

        @MessageMapping("/chat.sendMessage/{chat_room_id}")
        @SendTo("/topic/{chat_room_id}")
        public ChatMessage sendMessage(@DestinationVariable int chat_room_id, ChatMessage message) {
            message.setChat_message_time(DateInfo.getHours());
            logger.info("Message: " + message.toString());
            chatService.saveMessage(message);
            return message;
        }
    }
