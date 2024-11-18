import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import UserCards from "../components/user-cards/UserCards";
import OpponentChooseForm from "../components/opponent-choose-form/OpponentChooseForm";
import { useSocket } from '../SocketContext';
import JoinFight from "../components/join-fight/JoinFight";

interface SetupFightPageProps {
    setTitle: Dispatch<SetStateAction<string>>
}

const GamePage: React.FC<SetupFightPageProps> = ({ setTitle }) => {
    setTitle("Setup - Game");

    const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);
    const socket = useSocket();
    const selectedOpponent = useSelector((state: any) => state.opponentReducer.selectedOpponent);

    const [existFights, setExistFights] = useState<boolean>(false);

    useEffect(() => {
        if (socket) {
            const fetchFights = async () => {
                socket.emit('get-rooms', { userId: selectedUser.id });

                socket.on('action-result', (response) => {
                    if (response.success) {
                        console.log("Récupération des combats : ", response.state);
                        setExistFights(true);
                    } else {
                        console.log("Ya rien");
                        console.error("Erreur lors de la récupération des combats : ", response.message);
                        setExistFights(false);
                    }
                });
            };

            fetchFights();
        }
    }, [socket, selectedUser.id]);

    if (!selectedUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="play-screen">
            {existFights ? (
                <JoinFight />
            ) : (
                <div>
                    <OpponentChooseForm />
                    <div className="choose-card">
                        <h2>Choose your Cards </h2>
                        <UserCards/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GamePage;
