package com.cpe.springboot.controllers;

import com.cpe.springboot.common.TextGenerationResponseDTO;
import com.cpe.springboot.dto.GenerateCardDTO;
import com.cpe.springboot.services.CardGeneratorService;
import com.cpe.springboot.services.CardModelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController()
@RequestMapping("/generator")
public class CardGeneratorController {


    private final CardModelService cardModelService;
    private final CardGeneratorService cardGeneratorService;

    public CardGeneratorController(CardModelService cardModelService, CardGeneratorService cardGeneratorService) {
        this.cardModelService = cardModelService;
        this.cardGeneratorService = cardGeneratorService;
    }


    @PostMapping(value = "/card")
    public ResponseEntity<String> generateCard(GenerateCardDTO generateCardDTO) {
        cardModelService.generateCard(generateCardDTO);
        return ResponseEntity.ok().build();
    }


    @PostMapping(value = "/finish/image/{id}")
    public ResponseEntity<Void> finishImageGeneration() {
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/finish/description")
    public ResponseEntity<Void> finishTextGeneration(TextGenerationResponseDTO textGenerationResponseDTO) {
        cardGeneratorService.finishDescriptionGeneration(textGenerationResponseDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/finish/stats/{id}")
    public ResponseEntity<Void> finishStatsGeneration() {
        cardGeneratorService.finishStatsGeneration();
        return ResponseEntity.ok().build();
    }


}
