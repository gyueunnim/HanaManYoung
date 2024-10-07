package com.hana.manYoung.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic"); // 메시지가 브로커를 통해 클라이언트로 전송되는 경로
        config.setApplicationDestinationPrefixes("/app"); // 클라이언트가 서버로 메시지를 보낼 때 사용하는 경로
    }
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        registry.addEndpoint("/ws/chat").setAllowedOrigins("*").withSockJS();
//        registry.addEndpoint("/ws/chat").setAllowedOrigins("http://localhost:3000") .withSockJS();
        registry.addEndpoint("/ws/chat")
                .setAllowedOriginPatterns("http://34.64.41.86", "http://localhost:3000", "http://34.64.150.163", "http://hanamanyoung.life", "http://www.hanamanyoung.life")  // 명시적으로 도메인 허용
                .withSockJS();
    }


}
