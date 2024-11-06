import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './UserCards.css';
import {getCards} from "../../service/CardService";
import {CardModel} from "../../model/cardModel";
import FightingCard from "../card/fighting-card/FightingCard";

const UserCards: React.FC = () => {
    const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);
    const [error, setError] = useState<string | null>(null);
    const [userCards, setUserCards] = useState<CardModel[]>([]);
    const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const cards = await getCards(); // Appelez votre service pour récupérer les cartes
            if (cards) {
                let userCards = cards.filter(card => card.userId === selectedUser.id);
                setUserCards(userCards); // Mettre à jour l'état avec les données récupérées
            } else {
                setError("Failed to load cards");
            }
        };
        fetchData();
    }, []);

    const handleCardClick = (cardId: number) => {
        setSelectedCardIds(prevIds => {
            // Si la carte est déjà sélectionnée, la désélectionner (la retirer)
            if (prevIds.includes(cardId)) {
                return prevIds.filter(id => id !== cardId);
            } else {
                // Sinon, ajouter la carte à la liste des cartes sélectionnées
                return [...prevIds, cardId];
            }
        });
    };

    const handleFightClick = () => {
        console.log("Cartes sélectionnées pour le Fight!", selectedCardIds);
        // Vous pouvez gérer les cartes sélectionnées ici, par exemple envoyer cette liste au backend ou déclencher une autre action
    };

    if (userCards && userCards.length === 0) {
        return <p>Aucune carte disponible pour cet utilisateur.</p>;
    }

    return (
        <div className="setup-cards">
            <div className="user-cards-list">
                {userCards.map((card: CardModel) => (
                    <div
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        className={`card-container ${selectedCardIds.includes(card.id) ? 'selected' : ''}`} // Classe conditionnelle
                    >
                        <FightingCard card={card} isShop={false}/>
                    </div>
                ))}
            </div>

            <div className="fight-btn-div">
                <button className="fight-btn" onClick={handleFightClick}>Fight!</button>
            </div>
        </div>
    );
};

export default UserCards;
