package com.cpe.springboot.asi2_backendmarket_ms_text_gen.listeners;

import com.cpe.springboot.common.TextGenerationRequestDTO;
import jakarta.jms.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ActiveMQListener {
    @JmsListener(destination = "textgen", containerFactory = "queueConnectionFactory")
    public void onTextGenRequest(TextGenerationRequestDTO req, Message message) {
        System.out.println("request received : " + req);
    }
}
