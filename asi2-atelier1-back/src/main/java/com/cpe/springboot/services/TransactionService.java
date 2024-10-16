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

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public TransactionModel createTransaction(CardModel generateCardDTO) {
        TransactionModel transactionModel = new TransactionModel();
        transactionModel.setCard(generateCardDTO);
        transactionModel.setAuthor(generateCardDTO.getUser());
        transactionRepository.save(transactionModel);
        return transactionModel;
    }

    public TransactionModel finishDescriptionGeneration(TransactionModel transactionModel) {
        transactionModel.setDescriptionGeneratedAt(LocalDateTime.now());
        return transactionRepository.save(transactionModel);
    }

    public TransactionModel getTransaction(UUID uuid) {
        return transactionRepository.findByUuid(uuid);
    }
}
