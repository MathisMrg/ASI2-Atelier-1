import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import io from 'socket.io-client';
import '../components/card/Card.css';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const socket = io("http://localhost:4000");

interface GamePageProps {
    setTitle: Dispatch<SetStateAction<string>>
}

const GamePage: React.FC<GamePageProps> = ({ setTitle }) => {
    const dispatch = useDispatch();
    const [messageGlobal, setMessageGlobal] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [globalMessages, setGlobalMessages] = useState<string[]>([]);
    const gameID = 2;

    const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);

    useEffect(() => {
        setTitle("Game - board");

        socket.emit('join-global');
        socket.emit('join-private', { gameID: gameID });
        
        socket.on('receive-global', (data: string) => {
            setGlobalMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on('receive-private', (data: string) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('receive-global');
            socket.off('receive-private');
        };
    }, []);

    if (!selectedUser) {
        return <Navigate to="/login" />;
    }

    const sendPrivateMessage = () => {
        if (selectedUser && message.trim()) {
            socket.emit('send-private', { gameID: gameID, message });
            setMessage('');
        }
    };

    const sendGlobalMessage = () => {
        if (messageGlobal.trim()) {
            socket.emit('send-global', messageGlobal);
            setMessageGlobal('');
        }
    };

    return (
        <div className="play-screen">
            <div>
                <h2>Global Chat</h2>
                <div className="chat-messages">
                    {globalMessages.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </div>
                <input
                    type='text'
                    value={messageGlobal}
                    onChange={(e) => setMessageGlobal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendGlobalMessage()}
                />
                <button onClick={sendGlobalMessage}>Send to Global</button>
            </div>

            <div>
                <h2>Private Chat</h2>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </div>
                <input
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendPrivateMessage()}
                />
                <button onClick={sendPrivateMessage}>Send to Private</button>
            </div>
            <div>
                <h2>Board</h2>
                <div>side enemy</div>
                <div>your side</div>
            </div>
        </div>
    );
};

export default GamePage;
