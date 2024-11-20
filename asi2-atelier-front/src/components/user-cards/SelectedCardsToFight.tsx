import React from 'react';
import './UserCards.css';
import { CardModel } from "../../model/cardModel";
import FightingCard from "../card/fighting-card/FightingCard";

interface SelectedCardsToFightProps {
    cards: CardModel[];
    selectCard: React.Dispatch<React.SetStateAction<CardModel | null>>;
}

const SelectedCardsToFight: React.FC<SelectedCardsToFightProps> = ({ cards, selectCard }) => {
    return (
        <div className="selected-cards-container">
            {cards.length === 0 && <p>Aucune carte sélectionnée.</p>}
            {cards.map((card: CardModel) => (
                <div key={card.id} className="card-display">
                    <FightingCard card={card} isShop={false} selectCard={selectCard}/>
                </div>
            ))}
        </div>
    );
};

export default SelectedCardsToFight;
