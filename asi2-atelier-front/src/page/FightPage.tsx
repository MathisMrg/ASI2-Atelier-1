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
import { toast } from 'react-toastify';


interface GamePageProps {
    setTitle: Dispatch<SetStateAction<string>>
}

const FightPage: React.FC<GamePageProps> = ({ setTitle }) => {
    const location = useLocation();
    const combatId = location.state?.combatId;
    const [userCards, setUserCards] = useState<CardModel[]>([]);
    const [playerTurnId, setPlayerTurnId] = useState<number>(0);
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
        console.log("Id du combat"+combatId);
        socket?.emit('room-details', {
            combatId: combatId
        } );
    }, []);

    useEffect(() => {
        socket?.on('room-result', (data) => {
            const fighterId = data.fighter;
            const requesterId = data.requester;

            const userCards = data.userCards[selectedUser.id];

            let opponentCards = data.userCards[requesterId]; // Valeur par défaut
            if (selectedUser.id === requesterId) {
                opponentCards = data.userCards[fighterId];
            }

            const userCardArray = Object.values(userCards) as CardModel[];
            const opponentCardArray = Object.values(opponentCards) as CardModel[];

            console.log("User : "+JSON.stringify(userCardArray));
            console.log("Opp : "+JSON.stringify(opponentCardArray));
            console.log("Combat : "+JSON.stringify(data));

            setUserCards(userCardArray);
            setOppenentsCards(opponentCardArray);
            setPlayerTurnId(data.nextTurn);
        });


    }, []);

    const attack = () => {

        if (selectedUser.id === playerTurnId){

            console.log("Attaquant : "+selectedUser.id);

            socket?.emit("make-move", {
                combatId: combatId,
                userId: selectedUser.id,
                action: {
                    attackerCardId: selectedUserCard?.id,
                    attackedCardId: selectedOpponentCard?.id
                }
            });
        }
    };

    socket?.on('update-battle', (data) => {
        if(data.state.isCombatDone){
            if(data.state.winner == selectedUser.id){
                toast.info("Combat fini vous avez gagner ! ", {autoClose: 3000})
            } else {
                toast.info("Combat fini vous avez perdu !", {autoClose: 3000})
            }
            return <Navigate to="/" />;
        }
        const fighterId = data.state.fighter;
        const requesterId = data.state.requester;

        const userCards = data.state.userCards[selectedUser.id];

        let opponentCards = data.state.userCards[requesterId]; // Valeur par défaut
        if (selectedUser.id === requesterId) {
            opponentCards = data.state.userCards[fighterId];
        }

        const userCardArray = Object.values(userCards) as CardModel[];
        const opponentCardArray = Object.values(opponentCards) as CardModel[];

        console.log("User : "+JSON.stringify(userCardArray));
        console.log("Opp : "+JSON.stringify(opponentCardArray));
        console.log("Combat : "+JSON.stringify(data));

        setUserCards(userCardArray);
        setOppenentsCards(opponentCardArray);
        setPlayerTurnId(data.state.nextTurn);
        setSelectedOpponentCard(null);
        setSelectedUserCard(null);
    });

    if (!selectedUser) {
        console.log(selectedUser)
        return <Navigate to="/login" />;
    }

    return (
        <div className="play-screen">
            <h2>Board</h2>
            <h3>
                {playerTurnId === selectedUser.id
                    ? `A votre tour ! `
                    : `Au tour de l'adversaire...`
                }
            </h3>
            <div className='full-container-game'>
                <div className='left-button-game'>
                    <p className="cards-owner">Opponents Cards</p>
                    <button className='game-button'>End turn</button>
                    <p className="cards-owner">Your Cards</p>

                </div>
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
                    <button className='game-button' onClick={attack}> Attack</button>
                    {selectedUserCard ? <FightingCard card={selectedUserCard} isShop={false} selectCard={setSelectedUserCard} /> : <span></span>}
                    {/* component pour afficher une carte selecitonner dans userCards*/}
                </div>
            </div>
        </div>
    );
};

export default FightPage;

