package com.cpe.springboot.asi2_atelier1_img_gen.services.clientresponse.impl;

import com.cpe.springboot.asi2_atelier1_img_gen.services.clientresponse.IImgGenClientResponseService;
import com.cpe.springboot.common.ImageGenerationResponseDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.net.MalformedURLException;
import java.net.URL;

@Service
@Primary
public class ImgGenClientResponseService implements IImgGenClientResponseService {

    private static final Logger log = LoggerFactory.getLogger(ImgGenClientResponseService.class);
    @Override
    public void callbackClient(ImageGenerationResponseDTO response, String callbackUrl) {
        ObjectMapper om = new ObjectMapper();
        String responseJson;
        URL url;

        try {
            url = new URL(callbackUrl);
        } catch (MalformedURLException e) {
            log.debug("callback url is invalid : {}", e.getMessage());
            return;
        }

        String urlStr = url.getProtocol() + "://" + url.getHost() + ":" + url.getPort();

        log.info("sending callback to url {}", urlStr + url.getPath());

        RestClient client = RestClient.builder()
                .baseUrl(url.getProtocol() + "://" + url.getHost() + ":" + url.getPort())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        try {
            responseJson = om.writeValueAsString(response);
        } catch (JsonProcessingException e) {
            // TODO : better error handling
            response = new ImageGenerationResponseDTO(response.transactionId(), false,
                    "cannot convert response to JSON : " + e.getMessage(),
                    "");
            try {
                responseJson = om.writeValueAsString(response);
            } catch (JsonProcessingException ex) {
                throw new RuntimeException(ex);
            }
        }

        String result = client.post()
                .uri(url.toString().replaceAll("/$", ""))
                .contentType(MediaType.APPLICATION_JSON)
                .body(responseJson)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (req, resp) -> log.debug("failed to send the response to client (status {}): {}", resp.getStatusCode(), resp.getBody()))
                .body(String.class);
        log.info("result : {}", result);
    }
}
