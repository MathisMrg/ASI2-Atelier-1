package com.cpe.springboot.asi2_backendmarket_ms_text_gen;

import com.cpe.springboot.common.TextGenerationRequestDTO;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.core.JmsTemplate;

import java.util.UUID;

@SpringBootApplication
@EnableJms
public class Asi2BackendmarketMsTextGenApplication {

	public static void main(String[] args) {
		SpringApplication.run(Asi2BackendmarketMsTextGenApplication.class, args);
	}

}
