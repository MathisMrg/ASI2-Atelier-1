package com.cpe.springboot.services;


import com.cpe.springboot.configurations.WebSocketConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final SimpMessagingTemplate template;

    private final WebSocketConfig webSocketConfig;


    public void sendNotification(String message) {
        log.info("Sending notification on topic: {}: {},", webSocketConfig.getNotificationTopic(), message);
        template.convertAndSend(webSocketConfig.getNotificationTopic(), message);
    }

}
