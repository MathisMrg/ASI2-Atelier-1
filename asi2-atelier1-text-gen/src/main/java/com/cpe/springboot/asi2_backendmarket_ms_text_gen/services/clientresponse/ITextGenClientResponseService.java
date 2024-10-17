package com.cpe.springboot.asi2_backendmarket_ms_text_gen.services.clientresponse;

import com.cpe.springboot.common.TextGenerationResponseDTO;

public interface ITextGenClientResponseService {
    void sendResponseToClient(TextGenerationResponseDTO response, String callbackUrl);
}
