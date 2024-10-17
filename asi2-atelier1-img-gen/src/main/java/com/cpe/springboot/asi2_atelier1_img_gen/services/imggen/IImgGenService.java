package com.cpe.springboot.asi2_atelier1_img_gen.services.imggen;

import com.cpe.springboot.asi2_atelier1_img_gen.services.imggen.exceptions.ImageGenerationException;
import com.cpe.springboot.common.ImageGenerationRequestDTO;

public interface IImgGenService {
    String generateImage(ImageGenerationRequestDTO req) throws ImageGenerationException;
}
