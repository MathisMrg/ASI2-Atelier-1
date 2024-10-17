package com.cpe.springboot.common;

import java.io.Serializable;
import java.util.UUID;

public record ImageGenerationRequestDTO(UUID transactionId, String prompt, String negativePrompt, String callbackUrl) implements Serializable {
}
