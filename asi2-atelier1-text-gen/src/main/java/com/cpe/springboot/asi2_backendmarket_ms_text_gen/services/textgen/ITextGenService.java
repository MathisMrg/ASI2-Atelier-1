package com.cpe.springboot.asi2_backendmarket_ms_text_gen.services.textgen;

import com.cpe.springboot.asi2_backendmarket_ms_text_gen.services.textgen.exceptions.TextGenerationException;
import com.cpe.springboot.common.TextGenerationRequestDTO;

public interface ITextGenService {
    public String generateText(TextGenerationRequestDTO req) throws TextGenerationException;
}
