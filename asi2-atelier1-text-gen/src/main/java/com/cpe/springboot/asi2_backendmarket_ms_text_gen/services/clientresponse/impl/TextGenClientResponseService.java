package com.cpe.springboot.asi2_backendmarket_ms_text_gen.services.clientresponse.impl;


import com.cpe.springboot.asi2_backendmarket_ms_text_gen.services.clientresponse.ITextGenClientResponseService;
import com.cpe.springboot.common.TextGenerationResponseDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.net.MalformedURLException;
import java.net.URL;

@Slf4j
@Service
@Primary
public class TextGenClientResponseService implements ITextGenClientResponseService {
    @Override
    public void sendResponseToClient(TextGenerationResponseDTO response, String callbackUrl) {
        ObjectMapper om = new ObjectMapper();
        String responseJson;
        URL url;

        try {
            url = new URL(callbackUrl);
        } catch (MalformedURLException e) {
            log.debug("callback url is invalid : {}", e.getMessage());
            return;
        }

        RestClient client = RestClient.builder()
                .baseUrl(url.getProtocol() + "://" + url.getHost() + ":" + url.getPort())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        try {
            responseJson = om.writeValueAsString(response);
        } catch (JsonProcessingException e) {
            // TODO : better error handling
            response = new TextGenerationResponseDTO(response.transaction_id(), false,
                    "cannot convert response to JSON : " + e.getMessage(),
                    "");
            try {
                responseJson = om.writeValueAsString(response);
            } catch (JsonProcessingException ex) {
                throw new RuntimeException(ex);
            }
        }

        String result = client.post()
                .uri(url.getPath())
                .body(responseJson)
                .retrieve()
                .onStatus(
                        HttpStatusCode::isError,
                        (req, resp) -> log.debug("failed to send the response to client (status {}): {}",
                                resp.getStatusCode(), resp.getBody()
                        )
                )
                .body(String.class);

        log.info("client responded : {}", result);

    }
}