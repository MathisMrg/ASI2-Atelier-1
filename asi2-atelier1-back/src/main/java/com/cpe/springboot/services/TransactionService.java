package com.cpe.springboot.services;

import com.cpe.springboot.bo.CardModel;
import com.cpe.springboot.bo.TransactionModel;
import com.cpe.springboot.repositories.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class TransactionService {


    private final TransactionRepository transactionRepository;
    private final CardModelService cardModelService;

    public TransactionService(TransactionRepository transactionRepository, CardModelService cardModelService) {
        this.transactionRepository = transactionRepository;
        this.cardModelService = cardModelService;
    }

    public TransactionModel createTransaction(CardModel generateCardDTO) {
        TransactionModel transactionModel = new TransactionModel();
        transactionModel.setCard(generateCardDTO);
        transactionModel.setAuthor(generateCardDTO.getUser());
        transactionRepository.save(transactionModel);
        return transactionModel;
    }

    public void finishDescriptionGeneration(TransactionModel transactionModel) {
        transactionModel.setDescriptionGeneratedAt(LocalDateTime.now());
        transactionRepository.save(transactionModel);
        updateCardGenerationStatus(transactionModel);

    }

    public TransactionModel getTransaction(UUID uuid) {
        return transactionRepository.findByUuid(uuid);
    }

    public void finishImageGeneration(TransactionModel transactionModel) {
        transactionModel.setImageGeneratedAt(LocalDateTime.now());
        transactionRepository.save(transactionModel);
        updateCardGenerationStatus(transactionModel);
    }


    private void updateCardGenerationStatus(TransactionModel transactionModel) {
        boolean isFinish = transactionModel.getDescriptionGeneratedAt()!=null && transactionModel.getImageGeneratedAt()!=null && transactionModel.getStatsGeneratedAt()!=null;
        if (isFinish) {
            cardModelService.setGeneratedCard(transactionModel.getCard().getId());
        }
    }

}
