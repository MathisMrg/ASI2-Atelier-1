package com.cpe.springboot.repositories;

import org.springframework.data.repository.CrudRepository;

import com.cpe.springboot.bo.CardReference;

public interface CardRefRepository extends CrudRepository<CardReference, Integer> {

}
