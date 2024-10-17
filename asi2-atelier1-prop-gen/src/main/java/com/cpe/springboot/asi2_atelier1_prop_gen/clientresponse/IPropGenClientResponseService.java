package com.cpe.springboot.asi2_atelier1_prop_gen.clientresponse;

import com.cpe.springboot.common.PropGenerationResponseDTO;

public interface IPropGenClientResponseService {
    void sendResponse(PropGenerationResponseDTO response, String callbackUrl);
}
