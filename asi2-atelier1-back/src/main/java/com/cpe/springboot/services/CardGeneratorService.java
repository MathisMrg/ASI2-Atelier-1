package com.cpe.springboot.services;

import com.cpe.springboot.bo.CardModel;
import com.cpe.springboot.bo.TransactionModel;
import com.cpe.springboot.common.TextGenerationRequestDTO;
import com.cpe.springboot.common.TextGenerationResponseDTO;
import com.cpe.springboot.dto.GenerateCardDTO;
import com.cpe.springboot.repositories.CardModelRepository;
import com.cpe.springboot.utils.CallbackUrlParser;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CardGeneratorService {


    private final TransactionService transactionService;
    private final CardModelRepository cardModelRepository;
    private final JmsTemplate jmsTemplate;
    private final CardModelService cardModelService;
    @Value("${queue.description}")
    private String descriptionQueue;
    @Value("${callback.description.url")
    private String descriptionCallbackUrl;

    public CardGeneratorService(TransactionService transactionService, CardModelRepository cardModelRepository, JmsTemplate jmsTemplate, CardModelService cardModelService) {
        this.transactionService = transactionService;
        this.cardModelRepository = cardModelRepository;
        this.jmsTemplate = jmsTemplate;
        this.cardModelService = cardModelService;
    }

    public void generateCard(CardModel cardModel, GenerateCardDTO generateCardDTO) {
        TransactionModel transaction = transactionService.createTransaction(cardModel);
        generateDescription(transaction.getUuid(), generateCardDTO.descriptionPrompt());
    }

    public void finishDescriptionGeneration(TextGenerationResponseDTO textGenerationResponseDTO) {
        TransactionModel transactionModel = transactionService.getTransaction(textGenerationResponseDTO.transaction_id());
        if (transactionModel!=null && transactionModel.getDescriptionGeneratedAt()==null) {
            transactionService.finishDescriptionGeneration(transactionModel);
            updateCardGenerationStatus(transactionModel);
        }
    }


    @PostConstruct
    public void test() {
        generateDescription(UUID.randomUUID(), "bonjour");
    }

    public void generateDescription(UUID transactionId, String prompt) {

        TextGenerationRequestDTO textGenerationRequestDTO = new TextGenerationRequestDTO(transactionId, prompt, CallbackUrlParser.parseCallbackUrl(descriptionCallbackUrl, transactionId.toString()));

        jmsTemplate.convertAndSend(descriptionQueue, textGenerationRequestDTO);
    }


    private boolean updateCardGenerationStatus(TransactionModel transactionModel) {
        boolean isFinish = transactionModel.getDescriptionGeneratedAt()!=null && transactionModel.getImageGeneratedAt()!=null && transactionModel.getStatsGeneratedAt()!=null;
        if (isFinish) {
            return cardModelService.setGeneratedCard(transactionModel.getCard().getId());
        }
        return false;
    }

    public void finishStatsGeneration() {

    }
}
