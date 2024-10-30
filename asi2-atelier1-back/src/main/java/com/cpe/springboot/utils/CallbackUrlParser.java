package com.cpe.springboot.utils;
import lombok.experimental.UtilityClass;

@UtilityClass
public class CallbackUrlParser {
    public String parseCallbackUrl(String callbackUrl, String transactionId) {
        return callbackUrl.replace("{id}", transactionId);
    }
}
