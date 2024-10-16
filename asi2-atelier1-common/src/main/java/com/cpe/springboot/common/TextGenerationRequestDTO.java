package com.cpe.springboot.common;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record TextGenerationRequestDTO(UUID transaction_id, String callbackUrl, String prompt) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1069270118228032176L;
}
