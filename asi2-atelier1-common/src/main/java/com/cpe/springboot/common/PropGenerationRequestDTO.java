package com.cpe.springboot.common;

import java.io.Serializable;
import java.util.UUID;

public record PropGenerationRequestDTO(UUID transactionId, String imgUrl, String callbackUrl) implements Serializable {
}
