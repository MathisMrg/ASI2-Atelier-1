package com.cpe.springboot.asi2_backendmarket_ms_text_gen.listeners;

import com.cpe.springboot.asi2_backendmarket_ms_text_gen.services.textgen.ITextGenService;
import com.cpe.springboot.common.TextGenerationRequestDTO;
import jakarta.jms.Message;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

@Component
public class ActiveMQListener {

    ITextGenService textGenService;

    public ActiveMQListener(ITextGenService textGenService) {
        this.textGenService = textGenService;
    }

    @SneakyThrows
    @JmsListener(destination = "textgen", containerFactory = "queueConnectionFactory")
    public void onTextGenRequest(TextGenerationRequestDTO req, Message message) {
        System.out.println("request received : " + req);
        System.out.println(textGenService.generateText(req));
    }
}
