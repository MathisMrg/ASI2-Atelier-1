package com.cpe.springboot.repositories;

import com.cpe.springboot.bo.UserModel;
import org.springframework.data.repository.CrudRepository;

import com.cpe.springboot.bo.CardModel;

import java.util.List;

public interface CardModelRepository extends CrudRepository<CardModel, Integer> {
    List<CardModel> findByUser(UserModel u);
}
