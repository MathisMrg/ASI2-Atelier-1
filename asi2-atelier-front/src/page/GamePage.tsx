import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import io from 'socket.io-client';
import '../components/card/Card.css';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ShortCard from "../components/short-card/ShortCard";
import {User} from "../model/userModel";
import { getUsers } from '../service/UserService';

const socket = io("http://localhost:4000");

interface GamePageProps {
    setTitle: Dispatch<SetStateAction<string>>
}

const GamePage: React.FC<GamePageProps> = ({ setTitle }) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [opponent, setOpponent] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        setTitle("Game - board");

        const fetchData = async () => {
            const userList = await getUsers(); // Appelez du service pour récupérer les utilisateurs
            if (userList) {
                setUsers(userList); // Mettre à jour l'état avec les données récupérées
            } else {
                setError("Failed to load users");
            }
        };
        fetchData();

        socket.on('myEvent2', (data: string) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('myEvent2');
        };
    }, []);

    const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);
    const selectedOpponent = useSelector((state: any) => state.opponentReducer.selectedOpponent);
    const selectOpponent = (opponent: User) => {
        dispatch({ type: "UPDATE_SELECTED_OPPONENT", payload: opponent });
    };

    if (!selectedUser) {
        return <Navigate to="/login" />;
    }

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('myEvent1', message); // Envoie le message au backend
            setMessage('');
        }
    };

    return (
        <div className="play-screen">

            <div>
                <h4>Choose your Opponent</h4>
                <input
                    type='text'
                    value={opponent}
                    onChange={(e) => setOpponent(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default GamePage;
