package com.cpe.springboot.asi2_backendmarket_ms_text_gen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jms.annotation.EnableJms;

@SpringBootApplication
@EnableJms
public class Asi2BackendmarketMsTextGenApplication {

	public static void main(String[] args) {
		SpringApplication.run(Asi2BackendmarketMsTextGenApplication.class, args);
	}

}
