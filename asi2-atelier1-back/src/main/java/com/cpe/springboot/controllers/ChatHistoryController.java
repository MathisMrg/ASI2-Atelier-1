package com.cpe.springboot.controllers;

import com.cpe.springboot.dto.ChatDTO;
import com.cpe.springboot.services.ChatHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")

public class ChatHistoryController {

    private final ChatHistoryService chatHistoryService;

    @PostMapping(value = "/save")
    public ResponseEntity<Void> saveMessage(@RequestBody ChatDTO chatDTO) {
        chatHistoryService.saveChatHistory(chatDTO);
        return ResponseEntity.ok().build();
    }
    @PostMapping(value = "/save-all")
    public ResponseEntity<Void> saveMessages(@RequestBody List<ChatDTO> chatDTOs) {
        chatHistoryService.saveChatHistories(chatDTOs);
        return ResponseEntity.ok().build();
    }

}
