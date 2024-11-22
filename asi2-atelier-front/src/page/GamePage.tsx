import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSocket } from '../SocketContext';
import CombatCard from "../components/combat-card/CombatCard";

interface SetupFightPageProps {
    setTitle: Dispatch<SetStateAction<string>>
}

const GamePage: React.FC<SetupFightPageProps> = ({ setTitle }) => {
    const navigate = useNavigate();
    const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);

    const { socket, userId } = useSocket();
    const [roomsData, setRoomsData] = useState<any[]>([]);

    useEffect(() => {
        setTitle("All Games");
    }, [setTitle]);

    useEffect(() => {
        if (socket && selectedUser) {
            console.log('Socket initialisée avec ID :', socket.id);

            // Émettre l'événement get-rooms
            socket.emit('get-rooms', {
                userId: selectedUser.id
            });

            // Écouter la réponse result-rooms
            socket.on('result-rooms', (data: any) => {
                console.log("Données reçues :", data.state);
                setRoomsData(data.state); // Stocker les données des rooms si nécessaire
            });

            // Nettoyage de l'événement lors du démontage du composant
            return () => {
                socket.off('result-rooms');
            };
        }
    }, [socket, selectedUser]);

    const handleCreateCombatClick = () => {
        navigate('/create-combat');
    };

    if (!selectedUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="play-screen">
            <h1>Vos combats</h1>

            {/* Affichage des rooms et des IDs des combats */}
            <div className="combat-list">
                {roomsData.length === 0 ? (
                    <p>Aucun combat disponible</p>
                ) : (
                    roomsData.map((room, index) => (
                        <CombatCard key={index} room={room} />
                    ))
                )}
            </div>

            <button onClick={handleCreateCombatClick} className="create-combat-button">
                Create Combat
            </button>
        </div>
    );
};

export default GamePage;