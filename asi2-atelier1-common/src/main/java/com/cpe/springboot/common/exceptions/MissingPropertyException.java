package com.cpe.springboot.common.exceptions;

import java.io.Serial;

public class MissingPropertyException extends Exception {
    @Serial
    private static final long serialVersionUID = -4942143880240163278L;

    public MissingPropertyException(String message) {
        super(message);
    }
}
