package com.cpe.springboot.asi2_atelier1_img_gen.services.clientresponse;

import com.cpe.springboot.common.ImageGenerationResponseDTO;

public interface IImgGenClientResponseService {
    void callbackClient(ImageGenerationResponseDTO response, String callbackUrl);
}
