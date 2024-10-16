package com.cpe.springboot.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.cpe.springboot.bo.UserModel;

public interface UserRepository extends CrudRepository<UserModel, Integer> {
	
	List<UserModel> findByLoginAndPwd(String login,String pwd);

}
