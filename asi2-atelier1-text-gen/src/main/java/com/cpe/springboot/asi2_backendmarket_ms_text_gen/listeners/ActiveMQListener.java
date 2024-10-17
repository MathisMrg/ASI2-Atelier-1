package com.cpe.springboot.asi2_backendmarket_ms_text_gen.listeners;

import com.cpe.springboot.asi2_backendmarket_ms_text_gen.services.clientresponse.ITextGenClientResponseService;
import com.cpe.springboot.asi2_backendmarket_ms_text_gen.services.textgen.ITextGenService;
import com.cpe.springboot.asi2_backendmarket_ms_text_gen.services.textgen.exceptions.TextGenerationException;
import com.cpe.springboot.common.TextGenerationRequestDTO;
import com.cpe.springboot.common.TextGenerationResponseDTO;
import jakarta.jms.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ActiveMQListener {

    ITextGenService textGenService;
    ITextGenClientResponseService clientResponseService;

    public ActiveMQListener(ITextGenService textGenService, ITextGenClientResponseService clientResponseService) {
        this.textGenService = textGenService;
        this.clientResponseService = clientResponseService;
    }

    @JmsListener(destination = "textgen", containerFactory = "queueConnectionFactory")
    public void onTextGenRequest(TextGenerationRequestDTO req) {
        log.info("request received : {}", req);

        try {
            clientResponseService.sendResponseToClient(
                    stringToTextGenerationResponseDTO(req, textGenService.generateText(req)),
                    req.callbackUrl());
        } catch (TextGenerationException e) {
            clientResponseService.sendResponseToClient(imageGenerationExceptionToDTO(req, e), req.callbackUrl());
        }
    }

    private TextGenerationResponseDTO imageGenerationExceptionToDTO(TextGenerationRequestDTO req, TextGenerationException e) {
        return new TextGenerationResponseDTO(req.transaction_id(),
                false,
                "request to LLM failed : " + e.getMessage(),
                ""
        );
    }

    private TextGenerationResponseDTO stringToTextGenerationResponseDTO(TextGenerationRequestDTO req, String result) {
        return new TextGenerationResponseDTO(req.transaction_id(), true, "", result);
    }

}
