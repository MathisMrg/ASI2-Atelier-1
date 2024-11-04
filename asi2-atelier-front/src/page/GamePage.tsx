// GamePage.tsx
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import '../components/card/Card.css';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface GamePageProps {
    setTitle: Dispatch<SetStateAction<string>>;
}

const GamePage: React.FC<GamePageProps> = ({ setTitle }) => {
    const dispatch = useDispatch();

    const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);

    useEffect(() => {
        setTitle("Game - board");
    }, []);

    if (!selectedUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="play-screen">
            <div>
                <h2>Board</h2>
                <div>side enemy</div>
                <div>your side</div>
            </div>
        </div>
    );
};

export default GamePage;
