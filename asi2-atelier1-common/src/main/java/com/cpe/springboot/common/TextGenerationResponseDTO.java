package com.cpe.springboot.common;

import java.util.UUID;

public record TextGenerationResponseDTO(UUID transaction_id, boolean success, String message, String description) {
}
