package com.cpe.springboot.common;

import java.util.UUID;

public record ImageGenerationResponseDTO(UUID transactionId, boolean success, String message, String base64image) {
}