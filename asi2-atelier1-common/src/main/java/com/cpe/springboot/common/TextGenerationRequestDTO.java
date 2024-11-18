package com.cpe.springboot.common;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

import com.cpe.springboot.IMessageLoggerDTO;

public record TextGenerationRequestDTO(UUID transaction_id, String callbackUrl, String prompt) implements Serializable, IMessageLoggerDTO {
    @Serial
    private static final long serialVersionUID = 1069270118228032176L;

    @Override
    public String getProperties() {
        return LocalDateTime.now() + " - Queue : propgen - "
        + "Transaction ID: " + this.transaction_id + " - " 
        + "Callback URL: " + this.callbackUrl + " - " 
        + "Properties: " + this.prompt;
    }
}
