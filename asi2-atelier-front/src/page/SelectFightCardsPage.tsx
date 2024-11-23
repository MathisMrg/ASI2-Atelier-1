import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {useSocket} from "../SocketContext";
import {CardModel} from "../model/cardModel";
import FightingCard from "../components/card/fighting-card/FightingCard";
import {getCards} from "../service/CardService";

interface SelectFightCardsPageProps {
    setTitle: Dispatch<SetStateAction<string>>
}

const CreateCombatPage: React.FC<SelectFightCardsPageProps> = ({ setTitle }) => {
    const location = useLocation();
    const combatId = location.state?.combatId;
    const navigate = useNavigate();
    const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);
    const selectedOpponent = useSelector((state: any) => state.opponentReducer.selectedOpponent);
    const [error, setError] = useState<string | null>(null);
    const [userCards, setUserCards] = useState<CardModel[]>([]);
    const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);
    const [waitingForOpponent, setWaitingForOpponent] = useState<boolean>(false);

    const { socket, userId } = useSocket();

    useEffect(() => {
        let title = "Select Fight Cards";
        setTitle(title);
    }, [setTitle]);

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
        else{
            if (socket){
                selectedCardIds.forEach(cardId => {
                    const cardToAdd =  userCards.find(card => card.id === cardId);
                    console.log("Carte : "+cardToAdd?.name);

                    socket.emit('select-card', {
                        combatId: combatId,
                        userId: selectedUser.id,
                        card: cardToAdd
                    } );
                });


                socket.on('update-battle', (data) => {
                    const requesterCardsCount = Object.keys(data.state.userCards[data.state.requester]).length;
                    const fighterCardsCount = Object.keys(data.state.userCards[data.state.fighter]).length;
                    if (data.state.isCombatReady){
                        console.log("Le combat est prêt");
                        navigate('/fight', { state: { combatId } });
                    }
                    else{
                        console.log("Le combat n'est pas prêt");
                        setWaitingForOpponent(true);
                    }

                    if (requesterCardsCount > 0 && fighterCardsCount > 0 && requesterCardsCount === fighterCardsCount){
                        console.log("Le fight peut commencer, tous le monde a un nombre égal de carte cartes");
                        console.log("Cartes de requester : "+requesterCardsCount);
                        console.log("Cartes de fighter : "+fighterCardsCount);
                        if (data.state.requester == selectedUser.id && data.state.started == false){
                            console.log("On envoie le requete de démarrage de combat");
                            socket.emit('start-fight', {
                                combatId: data.state.id,
                                requesterId: selectedUser.id
                            });
                        }
                    }

                    console.log('Update:', JSON.stringify(data));
                });
            }
        }

    };

    if (userCards && userCards.length === 0) {
        return <p>Aucune carte disponible pour cet utilisateur.</p>;
    }

    if (waitingForOpponent) {
        return <p>En attente de l'adversaire...</p>;
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

export default CreateCombatPage;
