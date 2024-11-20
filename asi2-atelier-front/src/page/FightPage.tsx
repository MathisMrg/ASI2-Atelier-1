import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import '../components/card/Card.css';
// import '../components/user-cards/removeHeader.css';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SelectedCardsToFight from '../components/user-cards/SelectedCardsToFight';
import { getCards } from '../service/CardService';
import { CardModel } from '../model/cardModel';
import FightingCard from '../components/card/fighting-card/FightingCard';


interface GamePageProps {
    setTitle: Dispatch<SetStateAction<string>>
}

const FightPage: React.FC<GamePageProps> = ({ setTitle }) => {

    const [userCards, setUserCards] = useState<CardModel[]>([]);
    const [oppenentsCards, setOppenentsCards] = useState<CardModel[]>([]);
    const [selectedOpponentCard, setSelectedOpponentCard] = useState<CardModel | null>(null);
    const [selectedUserCard, setSelectedUserCard] = useState<CardModel | null>(null);

    const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);

    useEffect(() => {
        let title = "Fight !"
        setTitle(title);
    }, [setTitle]);

    /** ==========================================A remplacer par les cards des personnes en combat ==============================================**/
    useEffect(() => {
        const fetchData = async () => {
            const cards = await getCards();
            if (cards && cards.length > 0) {
                const firstFourCards = cards.slice(0, 4);
                setUserCards(firstFourCards);
                const lastFourCards = cards.slice(-4);
                setOppenentsCards(lastFourCards);
            } else {
                setUserCards([]);
                setOppenentsCards([]);
            }
        };
        fetchData();
    }, []);
    /** ==========================================A remplacer par les cards des personnes en combat ==============================================**/

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

