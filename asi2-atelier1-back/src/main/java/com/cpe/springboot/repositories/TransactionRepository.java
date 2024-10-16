package com.cpe.springboot.repositories;

import com.cpe.springboot.bo.StoreTransaction;
import com.cpe.springboot.bo.TransactionModel;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface TransactionRepository  extends CrudRepository<TransactionModel, UUID> {
    TransactionModel findByUuid(UUID uuid);

}
