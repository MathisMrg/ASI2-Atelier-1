package com.cpe.springboot.services;

import com.cpe.springboot.bo.CardModel;
import com.cpe.springboot.bo.CardReference;
import com.cpe.springboot.bo.UserModel;
import com.cpe.springboot.dto.CardDTO;
import com.cpe.springboot.dto.GenerateCardDTO;
import com.cpe.springboot.mappers.DTOMapper;
import com.cpe.springboot.repositories.CardModelRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class CardModelService {
    private final CardModelRepository cardRepository;
    private final CardReferenceService cardRefService;
    private final CardGeneratorService cardGeneratorService;
    private final Random rand;
    private final UserService userService;

    public CardModelService(CardModelRepository cardRepository, CardReferenceService cardRefService, CardGeneratorService cardGeneratorService, @Lazy UserService userService) {
        this.cardGeneratorService = cardGeneratorService;
        this.rand = new Random();
        // Dependencies injection by constructor
        this.cardRepository = cardRepository;
        this.cardRefService = cardRefService;
        this.userService = userService;
    }

    public List<CardModel> getAllCardModel() {
        List<CardModel> cardList = new ArrayList<>();
        cardRepository.findAll().forEach(cardList::add);
        return cardList;
    }

    public CardDTO addCard(CardModel cardModel) {
        CardModel cDb = cardRepository.save(cardModel);
        return DTOMapper.fromCardModelToCardDTO(cDb);
    }

    public void generateCard(GenerateCardDTO generateCardDTO) {
        CardModel cardModel = DTOMapper.fromGenerateCardDTOToCardModel(generateCardDTO);
        Optional<UserModel> user = userService.getUser(generateCardDTO.userId());
        if (user.isPresent()) {
            cardModel.setName(generateCardDTO.cardName());
            cardModel.setUser(user.get());
            cardModel = cardRepository.save(cardModel);
            cardGeneratorService.generateCard(cardModel, generateCardDTO);
        }
    }


    public void updateCardRef(CardModel cardModel) {
        cardRepository.save(cardModel);

    }

    public CardDTO updateCard(CardModel cardModel) {
        CardModel cDb = cardRepository.save(cardModel);
        return DTOMapper.fromCardModelToCardDTO(cDb);
    }

    public Optional<CardModel> getCard(Integer id) {
        return cardRepository.findById(id);
    }

    public void deleteCardModel(Integer id) {
        cardRepository.deleteById(id);
    }

    public List<CardModel> getRandCard(int nbr) {
        List<CardModel> cardList = new ArrayList<>();
        for (int i = 0; i < nbr; i++) {
            CardReference currentCardRef = cardRefService.getRandCardRef();
            CardModel currentCard = new CardModel(currentCardRef);
            currentCard.setAttack(rand.nextFloat() * 100);
            currentCard.setDefence(rand.nextFloat() * 100);
            currentCard.setEnergy(100);
            currentCard.setHp(rand.nextFloat() * 100);
            currentCard.setPrice(currentCard.computePrice());
            //save new card before sending for user creation
            //this.addCard(currentCard);
            cardList.add(currentCard);
        }
        return cardList;
    }


    public List<CardModel> getAllCardToSell() {
        return this.cardRepository.findByUser(null);
    }

    public boolean setGeneratedCard(Integer id) {
        Optional<CardModel> card = this.getCard(id);
        if (card.isPresent()) {

            CardModel c = card.get();
            if (c.getGeneratedAt()==null) {
                c.setGeneratedAt(LocalDateTime.now());
                this.updateCard(c);
            }
            return true;
        }
        return false;
    }
}

