import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import io from 'socket.io-client';
import '../components/card/Card.css';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {User} from "../model/userModel";
import { getUsers } from '../service/UserService';

//const socket = io("http://localhost:4040");

interface GamePageProps {
    setTitle: Dispatch<SetStateAction<string>>
}

const FightPage: React.FC<GamePageProps> = ({ setTitle }) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [opponentId, setOpponent] = useState('');
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

        /*socket.on('myEvent2', (data: string) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });*/

        return () => {
            //socket.off('myEvent2');
        };
    }, []);

    const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);
    const selectedOpponent = useSelector((state: any) => state.opponentReducer.selectedOpponent);
    const selectOpponent = (opponent: User) => {
        console.log("oui");
        dispatch({ type: "UPDATE_SELECTED_OPPONENT", payload: opponent });
    };

    if (!selectedUser) {
        return <Navigate to="/login" />;
    }

    const sendMessage = () => {
        if (message.trim()) {
            //socket.emit('myEvent1', message); // Envoie le message au backend
            setMessage('');
        }
    };

    const chooseOpponent = () => {

        const foundOpponent = users?.find(user =>
            user.id === Number(opponentId)
        );

        if(foundOpponent){
            selectOpponent(foundOpponent);
        }
    }

    return (
        <div className="play-screen">
            <div>
                    <label>Select Opponent</label>
                    <select
                        value={opponentId}
                        onChange={(e) => setOpponent(e.target.value)}>
                        <option value="">-- Select an opponent --</option>
                        {users.map((user) => (
                            <option key={user.id as React.Key} value={String(user.id)}>
                                {user.lastName}
                            </option>
                        ))}
                    </select>
                    <button onClick={chooseOpponent}>Select</button>
            </div>


            <div>
                <h2>Chat</h2>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </div>
                <input
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div>
                <h2>Board</h2>
                <div>side enemy

                </div>
                <div>your side

                </div>
            </div>
        </div>
    );
};

export default FightPage;
