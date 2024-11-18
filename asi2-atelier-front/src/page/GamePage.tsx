import React, { Dispatch, SetStateAction } from 'react';
import io from 'socket.io-client';
import '../components/card/Card.css';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import UserCards from "../components/user-cards/UserCards";
import OpponentChooseForm from "../components/opponent-choose-form/OpponentChooseForm";
import { useSocket } from '../SocketContext';



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

    return (
        <div className="play-screen">
            <OpponentChooseForm />

            <div className="choose-card">
                <h2>Choose your Cards </h2>
                <UserCards/>
            </div>
        </div>
    );
};

export default GamePage;
