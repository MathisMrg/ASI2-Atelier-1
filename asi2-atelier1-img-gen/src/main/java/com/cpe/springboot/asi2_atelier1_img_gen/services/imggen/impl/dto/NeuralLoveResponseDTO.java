package com.cpe.springboot.asi2_atelier1_img_gen.services.imggen.impl.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
public class NeuralLoveResponseDTO {
    private String url;

    private String base64;
}
