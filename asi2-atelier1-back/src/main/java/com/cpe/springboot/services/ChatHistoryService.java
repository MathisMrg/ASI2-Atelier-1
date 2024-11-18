package com.cpe.springboot.services;

import com.cpe.springboot.bo.ChatHistory;
import com.cpe.springboot.dto.ChatDTO;
import com.cpe.springboot.mappers.ChatMapper;
import com.cpe.springboot.repositories.ChatHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatHistoryService {

    private final ChatHistoryRepository chatHistoryRepository;


    public void saveChatHistory(ChatDTO chatDTO) {
        ChatHistory chatHistory = ChatMapper.fromChatDtoToChatModel(chatDTO);
        chatHistoryRepository.save(chatHistory);
    }

    public void saveChatHistories(List<ChatDTO> chatDTOs) {
        List<ChatHistory> chatHistories = chatDTOs.stream().map(ChatMapper::fromChatDtoToChatModel).toList();
        chatHistoryRepository.saveAll(chatHistories);
    }

    public List<ChatHistory> getChatHistory() {
        return chatHistoryRepository.findAll();
    }

}
