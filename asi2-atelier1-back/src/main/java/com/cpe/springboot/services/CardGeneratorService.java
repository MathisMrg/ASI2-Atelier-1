package com.cpe.springboot.services;

import com.cpe.springboot.bo.CardModel;
import com.cpe.springboot.bo.TransactionModel;
import com.cpe.springboot.common.*;
import com.cpe.springboot.dto.GenerateCardDTO;
import com.cpe.springboot.utils.CallbackUrlParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.net.URL;
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
    @Value("${queue.image}")
    private String imageQueue;
    @Value("${queue.properties}")
    private String propertiesQueue;
    @Value("${callback.description.url}")
    private URL descriptionCallbackUrl;
    @Value("${callback.image.url}")
    private URL imageCallbackUrl;
    @Value("${callback.properties.url}")
    private URL propertiesCallbackUrl;

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
            generateProperties(transactionModel.getUuid(), cardModel);

        }
    }

    private void generateProperties(UUID uuid, CardModel cardModel) {
        PropGenerationRequestDTO propGenerationRequestDTO = new PropGenerationRequestDTO(uuid, fileService.getUriPath(cardModel.getImgUrl()), CallbackUrlParser.parseCallbackUrl(propertiesCallbackUrl.toString(), uuid.toString()));
        jmsTemplate.convertAndSend(propertiesQueue, propGenerationRequestDTO);
    }

    public void generateDescription(UUID transactionId, String prompt) {

        TextGenerationRequestDTO textGenerationRequestDTO = new TextGenerationRequestDTO(transactionId, prompt, CallbackUrlParser.parseCallbackUrl(descriptionCallbackUrl.toString(), transactionId.toString()));
        jmsTemplate.convertAndSend(descriptionQueue, textGenerationRequestDTO);
    }

    public void generateImage(UUID transactionId, String prompt) {
        ImageGenerationRequestDTO imageGenerationRequestDTO = new ImageGenerationRequestDTO(transactionId, prompt, "", CallbackUrlParser.parseCallbackUrl(imageCallbackUrl.toString(), transactionId.toString()));

        jmsTemplate.convertAndSend(imageQueue, imageGenerationRequestDTO);
    }


    public void finishStatsGeneration(PropGenerationResponseDTO propGenerationResponseDTO) {
        TransactionModel transactionModel = transactionService.getTransaction(propGenerationResponseDTO.transactionId());
        Optional<CardModel> card = this.cardModelService.getCard(transactionModel.getCard().getId());
        if (transactionModel.getStatsGeneratedAt()==null && card.isPresent()) {
            CardModel cardModel = card.get();
            cardModel.setHp(propGenerationResponseDTO.properties().getHp());
            cardModel.setAttack(propGenerationResponseDTO.properties().getAttack());
            cardModel.setDefence(propGenerationResponseDTO.properties().getDefence());
            cardModel.setEnergy(propGenerationResponseDTO.properties().getEnergy());
            cardModelService.updateCard(cardModel);
            transactionService.finishStatsGeneration(transactionModel);
        }
    }
}
