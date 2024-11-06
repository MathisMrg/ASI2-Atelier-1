package com.cpe.springboot.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatDTO {

    private String message;
    private Integer senderId;
    private Integer receiverId;
    private LocalDateTime sentAt;
}
