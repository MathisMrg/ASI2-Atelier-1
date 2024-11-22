import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import '../components/card/Card.css';
// import '../components/user-cards/removeHeader.css';
import { useSelector } from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';
import SelectedCardsToFight from '../components/user-cards/SelectedCardsToFight';
import { getCards } from '../service/CardService';
import { CardModel } from '../model/cardModel';
import FightingCard from '../components/card/fighting-card/FightingCard';
import {useSocket} from "../SocketContext";


interface GamePageProps {
    setTitle: Dispatch<SetStateAction<string>>
}

const FightPage: React.FC<GamePageProps> = ({ setTitle }) => {
    const location = useLocation();
    const combatId = location.state?.combatId;
    const [allCards, setAllCards] = useState<CardModel[]>([]);
    const [userCards, setUserCards] = useState<CardModel[]>([]);
    const [oppenentsCards, setOppenentsCards] = useState<CardModel[]>([]);
    const [selectedOpponentCard, setSelectedOpponentCard] = useState<CardModel | null>(null);
    const [selectedUserCard, setSelectedUserCard] = useState<CardModel | null>(null);
    const { socket, userId } = useSocket();
    const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);

    useEffect(() => {
        let title = "Fight !"
        setTitle(title);
    }, [setTitle]);

    useEffect(() => {
        const fetchData = async () => {
            const cards = await getCards();
            if (cards) {
                setAllCards(cards);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log("Id du combat"+combatId);
        socket?.emit('room-details', {
            combatId: combatId
        } );
    }, []);

    useEffect(() => {
        socket?.on('room-result', (data) => {
            console.log('Get du Combat :', JSON.stringify(data.userCards));
            const userCardsData = data.userCards;
            const requesterCardIds = [];
            const fighterCardIds = [];
            const requesterCards: CardModel[] = [];
            const fighterCards : CardModel[] = [];

            for (const userId in userCardsData) {
                const cards = userCardsData[userId];
                const cardIds = Object.keys(cards).map(id => parseInt(id)); // Récupérer les IDs des cartes

                // Ajouter les IDs des cartes dans les tableaux correspondants
                if (parseInt(userId) === data.requester) {
                    requesterCardIds.push(...cardIds);
                    console.log("Ids des carte du requester : "+JSON.stringify(requesterCardIds));
                } else {
                    fighterCardIds.push(...cardIds);
                    console.log("Ids des carte du fighter : "+JSON.stringify(fighterCardIds));
                }
            }

            requesterCardIds.forEach(cardId => {
                const cardToAdd =  allCards.find(card => card.id === cardId);
                if (cardToAdd){
                    requesterCards.push(cardToAdd);
                    console.log("Carte : "+cardToAdd?.id);
                }
            });

            fighterCardIds.forEach(cardId => {
                const cardToAdd =  allCards.find(card => card.id === cardId);
                if (cardToAdd){
                    fighterCards.push(cardToAdd);
                    console.log("Carte : "+cardToAdd?.id);
                }
            });

            console.log("User Cards : ", requesterCards);
            console.log("Opponent Cards : ", fighterCards);
            setUserCards(requesterCards);
            setOppenentsCards(fighterCards);
        });


    }, []);

    if (!selectedUser) {
        console.log(selectedUser)
        // return <Navigate to="/login" />;
    }

    return (
        <div className="play-screen">
            <h2>Board</h2>
            <div className='full-container-game'>
                <div className='left-button-game'><button className='game-button'>End turn</button></div>
                <div className='game-container-without-selected-card'>
                    <div>
                        <SelectedCardsToFight cards={oppenentsCards} selectCard={setSelectedOpponentCard}></SelectedCardsToFight>
                    </div>
                    <div className='fight-separtor-button-container'>
                        <span className='separator'></span>
                    </div>
                    <div>
                        <SelectedCardsToFight cards={userCards} selectCard={setSelectedUserCard}></SelectedCardsToFight>
                    </div>
                </div>
                <div className='selected-fight-cards-1-v-1'>
                    {/* component pour afficher une carte selecitonner dans oppenentsCards*/}
                    {selectedOpponentCard ? <FightingCard card={selectedOpponentCard} isShop={false} selectCard={setSelectedOpponentCard} /> : <span></span>}
                    <button className='game-button'> Attack</button>
                    {selectedUserCard ? <FightingCard card={selectedUserCard} isShop={false} selectCard={setSelectedUserCard} /> : <span></span>}
                    {/* component pour afficher une carte selecitonner dans userCards*/}
                </div>
            </div>
        </div>
    );
};

export default FightPage;

