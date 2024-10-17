package com.cpe.springboot.asi2_atelier1_prop_gen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jms.annotation.EnableJms;

@SpringBootApplication
@EnableJms
public class Asi2Atelier1PropGenApplication {
	public static void main(String[] args) {
		SpringApplication.run(Asi2Atelier1PropGenApplication.class, args);
	}

}
