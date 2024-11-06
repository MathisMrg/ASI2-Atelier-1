package com.cpe.springboot.repositories;

import com.cpe.springboot.bo.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Integer> {

}
