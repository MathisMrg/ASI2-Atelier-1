import React, { Dispatch, SetStateAction } from 'react';
import io from 'socket.io-client';
import '../components/card/Card.css';
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
    const socket= useSocket();
    const selectedOpponent = useSelector((state: any) => state.opponentReducer.selectedOpponent);

    if (!selectedUser) {
        return <Navigate to="/login" />;
    }

    const isFightPresent = () => {
        let existFights = false;
        if (socket){
            console.log("Ya la socket");
            socket.emit('get-rooms', {
                userId: selectedUser.id
            });

            // Écouter la réponse de la requête
            socket.on('action-result', (response) => {
                if (response.success) {
                    console.log("Récupération des combats : ", response.state);
                    existFights = true;
                } else {
                    console.error("Erreur lors de la récupération des combats : ", response.message);
                }
            });
        }
        return existFights;
    };

    return (
        <div className="play-screen">
            {isFightPresent() ? (
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
