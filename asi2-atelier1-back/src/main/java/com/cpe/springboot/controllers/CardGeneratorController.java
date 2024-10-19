package com.cpe.springboot.controllers;

import com.cpe.springboot.common.ImageGenerationResponseDTO;
import com.cpe.springboot.common.PropGenerationResponseDTO;
import com.cpe.springboot.common.TextGenerationResponseDTO;
import com.cpe.springboot.dto.GenerateCardDTO;
import com.cpe.springboot.services.CardGeneratorService;
import com.cpe.springboot.services.CardModelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping(value = "/finish/image")
    public ResponseEntity<Void> finishImageGeneration(@RequestBody ImageGenerationResponseDTO imageGenerationResponseDTO) {
        cardGeneratorService.finishImageGeneration(imageGenerationResponseDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/finish/description")
    public ResponseEntity<Void> finishTextGeneration(@RequestBody TextGenerationResponseDTO textGenerationResponseDTO) {
        cardGeneratorService.finishDescriptionGeneration(textGenerationResponseDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/finish/properties")
    public ResponseEntity<Void> finishStatsGeneration(@RequestBody PropGenerationResponseDTO propGenerationResponseDTO) {
        cardGeneratorService.finishStatsGeneration(propGenerationResponseDTO);
        return ResponseEntity.ok().build();
    }


}
