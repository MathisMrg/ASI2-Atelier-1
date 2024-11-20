import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import './UserCards.css';
import {getCards} from "../../service/CardService";
import {CardModel} from "../../model/cardModel";
import FightingCard from "../card/fighting-card/FightingCard";
import { useSocket } from '../../SocketContext';
import { Navigate, useNavigate } from 'react-router-dom';

const UserCards: React.FC = () => {
    const navigate = useNavigate();
    const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);
    const selectedOpponent = useSelector((state: any) => state.opponentReducer.selectedOpponent);
    const [error, setError] = useState<string | null>(null);
    const [userCards, setUserCards] = useState<CardModel[]>([]);
    const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);

    const { socket, userId } = useSocket();

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

        if (selectedCardIds.length == 0){
            console.log("Pas de cartes ! ");
        }
        else if (selectedOpponent == undefined){
            console.log("Pas d'opposent", selectedOpponent);
        }
        else{
            if (socket){
                socket.emit('create-battle-room', {
                    requesterId: selectedUser.id,
                    fighterId: selectedOpponent.id
                } );

                socket.on('battle-creation-response', (combat) => {
                    console.log('Combat reçu:', combat.state.id);
                    console.log('UserId:', selectedUser.id);


                    selectedCardIds.forEach(cardId => {
                        const cardToAdd =  userCards.find(card => card.id === cardId);
                        console.log('Card:', cardToAdd);

                        socket.emit('select-card', {
                            combatId: combat.state.id,
                            userId: selectedUser.id,
                            card: cardToAdd
                        } );
                    });

                });

                socket.on('update-battle', (data) => {
                    console.log('Update:', data);
                });


                navigate('/game');

            }
        }

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
                        <FightingCard card={card} isShop={false} selectCard={null}/>
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
