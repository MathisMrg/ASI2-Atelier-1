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
		ConfigurableApplicationContext ctx = SpringApplication.run(Asi2BackendmarketMsTextGenApplication.class, args);

		JmsTemplate jmsTemplate = ctx.getBean(JmsTemplate.class);

		jmsTemplate.setPubSubDomain(false);

		// Send a message with a POJO - the template reuse the message converter
		System.out.println("Sending a new text generation prompt");
		jmsTemplate.convertAndSend("textgen", new TextGenerationRequestDTO(
				UUID.randomUUID(),
				"https://callback.deez/textgen/callback",
				"Mathis tout nu"
			)
		);

	}

}
