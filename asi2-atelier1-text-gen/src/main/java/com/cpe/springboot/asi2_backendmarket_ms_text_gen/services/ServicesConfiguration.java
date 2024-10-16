package com.cpe.springboot.asi2_backendmarket_ms_text_gen.services;

import com.cpe.springboot.asi2_backendmarket_ms_text_gen.services.textgen.ITextGenService;
import com.cpe.springboot.asi2_backendmarket_ms_text_gen.services.textgen.impl.external.ExternalTextGenService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class ServicesConfiguration {
    @Bean
    public ITextGenService getTextGenService() {
        return new ExternalTextGenService();
    }

}
