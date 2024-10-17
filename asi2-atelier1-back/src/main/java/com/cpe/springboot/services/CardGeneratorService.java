package com.cpe.springboot.services;

import com.cpe.springboot.bo.CardModel;
import com.cpe.springboot.bo.TransactionModel;
import com.cpe.springboot.common.ImageGenerationRequestDTO;
import com.cpe.springboot.common.ImageGenerationResponseDTO;
import com.cpe.springboot.common.TextGenerationRequestDTO;
import com.cpe.springboot.common.TextGenerationResponseDTO;
import com.cpe.springboot.dto.GenerateCardDTO;
import com.cpe.springboot.utils.CallbackUrlParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class CardGeneratorService {


    private final TransactionService transactionService;
    private final JmsTemplate jmsTemplate;
    private final CardModelService cardModelService;
    private final FileService fileService;
    @Value("${queue.description}")
    private String descriptionQueue;
    @Value("${callback.description.url}")
    private String descriptionCallbackUrl;
    @Value("${callback.image.url}")
    private String imageCallbackUrl;

    public CardGeneratorService(@Lazy TransactionService transactionService, JmsTemplate jmsTemplate, @Lazy CardModelService cardModelService, FileService fileService) {
        this.transactionService = transactionService;
        this.jmsTemplate = jmsTemplate;
        this.cardModelService = cardModelService;
        this.fileService = fileService;
    }

    public void generateCard(CardModel cardModel, GenerateCardDTO generateCardDTO) {
        TransactionModel transaction = transactionService.createTransaction(cardModel);
        generateDescription(transaction.getUuid(), generateCardDTO.descriptionPrompt());
        generateImage(transaction.getUuid(), generateCardDTO.imagePrompt());
    }

    public void finishDescriptionGeneration(TextGenerationResponseDTO textGenerationResponseDTO) {
        TransactionModel transactionModel = transactionService.getTransaction(textGenerationResponseDTO.transaction_id());
        Optional<CardModel> card = this.cardModelService.getCard(transactionModel.getCard().getId());
        if (transactionModel.getDescriptionGeneratedAt()==null && card.isPresent()) {
            CardModel cardModel = card.get();
            cardModel.setDescription(textGenerationResponseDTO.description());
            cardModelService.updateCard(cardModel);
            transactionService.finishDescriptionGeneration(transactionModel);
        }
    }

    public void finishImageGeneration(ImageGenerationResponseDTO imageGenerationResponseDTO) {
        TransactionModel transactionModel = transactionService.getTransaction(imageGenerationResponseDTO.transactionId());
        Optional<CardModel> card = this.cardModelService.getCard(transactionModel.getCard().getId());
        if (transactionModel.getImageGeneratedAt()==null && card.isPresent()) {
            CardModel cardModel = card.get();

            //save image
            String filename = cardModel.getId().toString() + ".png";
            String filePath = fileService.saveImage(filename, imageGenerationResponseDTO.base64image());
            cardModel.setImgUrl(filePath);
            cardModelService.updateCard(cardModel);
            transactionService.finishImageGeneration(transactionModel);
        }
    }

    public void generateDescription(UUID transactionId, String prompt) {

        TextGenerationRequestDTO textGenerationRequestDTO = new TextGenerationRequestDTO(transactionId, prompt, CallbackUrlParser.parseCallbackUrl(descriptionCallbackUrl, transactionId.toString()));

        jmsTemplate.convertAndSend(descriptionQueue, textGenerationRequestDTO);
    }

    public void generateImage(UUID transactionId, String prompt) {
        ImageGenerationRequestDTO imageGenerationRequestDTO = new ImageGenerationRequestDTO(transactionId, prompt, "", CallbackUrlParser.parseCallbackUrl(imageCallbackUrl, transactionId.toString()));

        jmsTemplate.convertAndSend(descriptionQueue, imageGenerationRequestDTO);
    }


    public void finishStatsGeneration() {

    }
}
