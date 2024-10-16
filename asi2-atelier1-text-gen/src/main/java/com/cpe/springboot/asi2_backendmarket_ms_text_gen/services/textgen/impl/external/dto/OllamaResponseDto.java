package com.cpe.springboot.asi2_backendmarket_ms_text_gen.services.textgen.impl.external.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
public class OllamaResponseDto {
    @JsonProperty("response")
    private String response;
}
