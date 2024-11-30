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

    useEffect(() => {
        if (socket){
            socket.emit('room-details', {
                combatId: combatId
            } );

            socket.on('room-result', (data) => {
                const fighterId = data.fighter;
                const requesterId = data.requester;
                const userCards = data.userCards[selectedUser.id];
                let opponentCards = data.userCards[fighterId];

                if (selectedUser.id === fighterId){
                    opponentCards = data.userCards[requesterId];
                }

                const userCardArray = Object.values(userCards) as CardModel[];
                const opponentCardArray = Object.values(opponentCards) as CardModel[];

                if (userCardArray.length != 0 && opponentCardArray.length == 0){
                    setWaitingForOpponent(true);
                }
            });
        }
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
        if (!socket) {
            console.error("Socket non initialisé.");
            return;
        }

        if (selectedCardIds.length === 0) {
            console.log("Pas de cartes !");
            return;
        }

        // Envoi des cartes sélectionnées au serveur
        selectedCardIds.forEach((cardId) => {
            const cardToAdd = userCards.find((card) => card.id === cardId);

            if (cardToAdd) {
                console.log("Carte : " + cardToAdd.name);

                socket.emit('select-card', {
                    combatId: combatId,
                    userId: selectedUser.id,
                    card: cardToAdd,
                });
            } else {
                console.error("Carte non trouvée pour l'ID : " + cardId);
            }
        });

        // Gérer la mise à jour de l'état du combat
        const handleBattleUpdate = (data: any) => {
            const { userCards, isCombatReady, requester, fighter, started, id } = data.state;
            const requesterCardsCount = Object.keys(userCards[requester] || {}).length;
            const fighterCardsCount = Object.keys(userCards[fighter] || {}).length;

            console.log("Mise à jour reçue:", JSON.stringify(data));

            setWaitingForOpponent(true);
            console.log("Le combat n'est pas prêt");

            if (requesterCardsCount > 0 &&
                fighterCardsCount > 0 &&
                requesterCardsCount === fighterCardsCount) {
                console.log("Tous les joueurs ont un nombre égal de cartes : Fight possible !");
                console.log(`Cartes de requester : ${requesterCardsCount}`);
                console.log(`Cartes de fighter : ${fighterCardsCount}`);
                setWaitingForOpponent(false);

                if (requester === selectedUser.id && !started) {
                    console.log("Envoi de la requête de démarrage de combat");
                    socket.emit('start-fight', { combatId: id, requesterId: selectedUser.id });
                }
            }

            if (isCombatReady) {
                console.log("Le combat est prêt");
                navigate('/fight', { state: { combatId } });
                return;
            }
        };

        // Écouteur de l'événement `update-battle`
        socket.off('update-battle'); // Éviter de multiples écoutes
        socket.on('update-battle', handleBattleUpdate);
    };


    if (userCards && userCards.length === 0) {
        return <p>Aucune carte disponible pour cet utilisateur.</p>;
    }

    if (waitingForOpponent) {
        return (
            <div className="search-opp">
                <div className="spinner"></div>
                <h2>En attente de l'adversaire...</h2>
            </div>
        );
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
