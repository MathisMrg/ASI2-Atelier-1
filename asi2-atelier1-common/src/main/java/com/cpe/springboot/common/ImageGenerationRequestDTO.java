package com.cpe.springboot.common;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

import com.cpe.springboot.IMessageLoggerDTO;

public record ImageGenerationRequestDTO(UUID transactionId, String prompt, String negativePrompt, String callbackUrl) implements Serializable,IMessageLoggerDTO {

    @Override
    public String getProperties() {
       return LocalDateTime.now() + " - Queue : propgen - "
        + "Transaction ID: " + this.transactionId + " - " 
        + "Callback URL: " + this.callbackUrl + " - " 
        + "Properties: " + this.prompt;
    }
}
