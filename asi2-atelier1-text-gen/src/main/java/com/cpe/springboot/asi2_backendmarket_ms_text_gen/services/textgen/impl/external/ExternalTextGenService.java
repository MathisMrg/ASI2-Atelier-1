package com.cpe.springboot.asi2_backendmarket_ms_text_gen.services.textgen.impl.external;

import com.cpe.springboot.asi2_backendmarket_ms_text_gen.services.textgen.ITextGenService;
import com.cpe.springboot.asi2_backendmarket_ms_text_gen.services.textgen.exceptions.TextGenerationException;
import com.cpe.springboot.asi2_backendmarket_ms_text_gen.services.textgen.impl.external.dto.OllamaResponseDto;
import com.cpe.springboot.asi2_backendmarket_ms_text_gen.services.textgen.impl.external.exceptions.OllamaRequestFailedException;
import com.cpe.springboot.common.TextGenerationRequestDTO;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

import java.util.Objects;

public class ExternalTextGenService implements ITextGenService {

    private static final Logger log = LoggerFactory.getLogger(ExternalTextGenService.class);
    public static String MODEL = "qwen2:0.5b";
    public static String OLLAMA_URL = "http://localhost:11434";
    public static String OLLAMA_API_PATH = "/api/generate";
    private String response;

    @Override
    public String generateText(TextGenerationRequestDTO req) throws TextGenerationException {
        log.debug("Generating response for prompt : {}", req.prompt());
        try {
            return queryOllamaApiForResponse(req.prompt());
        } catch (OllamaRequestFailedException e) {
            throw new TextGenerationException(e.getMessage());
        }
    }

    private String queryOllamaApiForResponse(String prompt) throws OllamaRequestFailedException {
        RestClient client = RestClient.builder()
                .baseUrl(OLLAMA_URL)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        OllamaResponseDto ollamaResponse = client.post()
                .uri(OLLAMA_API_PATH)
                .accept(MediaType.APPLICATION_JSON)
                .body(getOllamaRequestJson(prompt).toString())
                .retrieve()
                .onStatus(HttpStatusCode::isError, (req, resp) -> {
                            throw new OllamaRequestFailedException(
                                    "failed to query ollama api (status " + resp.getStatusCode() + ") : "
                                            + resp.getBody()
                            );
                        }
                )
                .body(OllamaResponseDto.class);

        return Objects.requireNonNull(ollamaResponse).getResponse();
    }

    private JSONObject getOllamaRequestJson(String prompt) {
        JSONObject json = new JSONObject();

        json.put("model", MODEL);
        json.put("prompt", prompt);
        json.put("stream", false);

        return json;
    }


}
