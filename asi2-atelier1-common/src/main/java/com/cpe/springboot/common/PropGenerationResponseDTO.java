package com.cpe.springboot.common;

import java.util.UUID;

public record PropGenerationResponseDTO(UUID transactionId, boolean success, String message, PropGenerationValues properties) {
}

