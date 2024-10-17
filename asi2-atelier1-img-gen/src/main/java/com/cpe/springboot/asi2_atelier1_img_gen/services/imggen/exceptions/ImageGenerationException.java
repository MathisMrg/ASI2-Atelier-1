package com.cpe.springboot.asi2_atelier1_img_gen.services.imggen.exceptions;

import java.io.Serial;

public class ImageGenerationException extends Exception {
    @Serial
    private static final long serialVersionUID = -3602899097432401614L;

    public ImageGenerationException(String message) {
        super(message);
    }
}
