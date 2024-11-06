import React from 'react';
import {CardModel} from "../../../model/cardModel";

interface CardProps {
    card: CardModel,
    isShop: boolean; // Pour gérer l'affichage du bouton d'achat
}

const FightingCard: React.FC<CardProps> = ({ card, isShop }) => {
    return (
        <div className="fighting-card">
            <div className="card-header">
                <span>❤️ {card?.hp}</span>
                <h3>{card?.name}</h3>
                <span>{card?.energy} ⚡</span>
            </div>
            <img
                src={`${card.imgUrl.startsWith('/') ? 'http://localhost:8083' : ''}${card.imgUrl}`}
                alt="card image"
                className="fighting-image"
            />
            <div className="card-description">
                <p>{card.description}</p>
            </div>
            <div className="card-statistics">
                <div>
                    <span>❤️ {card?.hp}</span>
                    <span>🗡️ {card?.attack}</span>
                </div>
                <div>
                    <span>🛡️ {card?.defence}</span>
                    <span>⚡ {card?.energy}</span>
                </div>
            </div>
        </div>
    );
};

export default FightingCard;
