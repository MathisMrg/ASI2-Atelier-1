package com.cpe.springboot.common;

import java.util.UUID;

public record TextGenerationResponseDTO(UUID transaction_id, String description) {
}
