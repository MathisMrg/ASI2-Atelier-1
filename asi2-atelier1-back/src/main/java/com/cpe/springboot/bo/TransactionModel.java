package com.cpe.springboot.bo;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private UserModel author;

    @ManyToOne
    @JoinColumn(name = "card_id")
    private CardModel card;

    LocalDateTime imageGeneratedAt;
    LocalDateTime descriptionGeneratedAt;
    LocalDateTime statsGeneratedAt;
}
