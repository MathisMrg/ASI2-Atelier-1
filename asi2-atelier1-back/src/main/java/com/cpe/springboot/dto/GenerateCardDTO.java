package com.cpe.springboot.dto;

public record GenerateCardDTO(String cardName, String imagePrompt, String descriptionPrompt, Integer userId) {
}
