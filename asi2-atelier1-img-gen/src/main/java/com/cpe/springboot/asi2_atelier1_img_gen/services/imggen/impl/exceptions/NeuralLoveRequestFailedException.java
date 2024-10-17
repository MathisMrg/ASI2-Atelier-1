package com.cpe.springboot.asi2_atelier1_img_gen.services.imggen.impl.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatusCode;

import java.io.InputStream;
import java.io.Serial;

@Getter
public class NeuralLoveRequestFailedException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 3108728921195287222L;

    private final HttpStatusCode statusCode;

    private final String body;

    public NeuralLoveRequestFailedException(String message, HttpStatusCode statusCode, InputStream body) {
        super(message);
        this.statusCode = statusCode;
        this.body = body.toString();
    }
}
