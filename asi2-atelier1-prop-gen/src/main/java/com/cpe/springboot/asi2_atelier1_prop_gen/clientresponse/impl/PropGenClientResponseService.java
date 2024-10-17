package com.cpe.springboot.asi2_atelier1_prop_gen.clientresponse.impl;

import com.cpe.springboot.asi2_atelier1_prop_gen.clientresponse.IPropGenClientResponseService;
import com.cpe.springboot.common.PropGenerationResponseDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.net.MalformedURLException;
import java.net.URL;

@Service
@Slf4j
public class PropGenClientResponseService implements IPropGenClientResponseService {
    @Override
    public void sendResponse(PropGenerationResponseDTO response, String callbackUrl) {
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
                .baseUrl(url.getProtocol() + "://" + url.getHost())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        try {
            responseJson = om.writeValueAsString(response);
        } catch (JsonProcessingException e) {
            // TODO : better error handling
            response = new PropGenerationResponseDTO(
                    response.transactionId(),
                    false,
                    "cannot convert response to JSON : " + e.getMessage(),
                    null
            );
            try {
                responseJson = om.writeValueAsString(response);
            } catch (JsonProcessingException ex) {
                throw new RuntimeException(ex);
            }
        }

        client.post()
                .uri(url.getPath())
                .body(responseJson)
                .retrieve()
                .onStatus(HttpStatusCode::isError,
                        (req, resp) -> log.debug("failed to send the response to client (status {}): {}",
                                resp.getStatusCode(),
                                resp.getBody()
                        )
                );
    }
}
