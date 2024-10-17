package com.cpe.springboot.asi2_atelier1_img_gen.services.imggen.impl;

import com.cpe.springboot.asi2_atelier1_img_gen.services.imggen.IImgGenService;
import com.cpe.springboot.asi2_atelier1_img_gen.services.imggen.exceptions.ImageGenerationException;
import com.cpe.springboot.asi2_atelier1_img_gen.services.imggen.impl.dto.NeuralLoveResponseDTO;
import com.cpe.springboot.common.ImageGenerationRequestDTO;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import com.cpe.springboot.asi2_atelier1_img_gen.services.imggen.impl.exceptions.NeuralLoveRequestFailedException;

import java.util.Objects;

@Service
@Primary
public class ExternalImgGenService implements IImgGenService {

    private static final Logger log = LoggerFactory.getLogger(ExternalImgGenService.class);
    public static String IMG_URL = "http://localhost:8080";
    public static String IMG_API_PATH = "/prompt/req";

    @Override
    public String generateImage(ImageGenerationRequestDTO req) throws ImageGenerationException {
        log.debug("Generating image for req : {}", req.prompt());

        try {
            return generateImageFromApi(req);
        } catch (NeuralLoveRequestFailedException e) {
            throw new ImageGenerationException(e.getMessage());
        }
    }

    private String generateImageFromApi(ImageGenerationRequestDTO request) {
        RestClient client = RestClient.builder()
                .baseUrl(IMG_URL)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        NeuralLoveResponseDTO neuralResponse = client.post()
                .uri(IMG_API_PATH)
                .accept(MediaType.APPLICATION_JSON)
                .body(getNeuralLoveJson(request.prompt(), request.negativePrompt()).toString())
                .retrieve()
                .onStatus(HttpStatusCode::isError, (req, resp) -> {
                            throw new NeuralLoveRequestFailedException(
                                    "failed to query ollama api (status " + resp.getStatusCode() + ") : "
                                            + resp.getBody(),
                                    resp.getStatusCode(),
                                    resp.getBody()
                            );
                        }
                )
                .body(NeuralLoveResponseDTO.class);

        return Objects.requireNonNull(neuralResponse).getBase64();
    }

    private JSONObject getNeuralLoveJson(String prompt, String negative) {
        JSONObject json = new JSONObject();

        json.put("promptTxt", prompt);
        json.put("negativePromptTxt", negative);

        return json;
    }
}
