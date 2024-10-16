package com.cpe.springboot.repositories;

import org.springframework.data.repository.CrudRepository;

import com.cpe.springboot.bo.StoreTransaction;

public interface StoreRepository extends CrudRepository<StoreTransaction, Integer> {
	

}
