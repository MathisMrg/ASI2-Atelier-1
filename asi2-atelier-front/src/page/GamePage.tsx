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
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        setTitle("Game - board");

        socket.on('receive-msg', (data: string) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('receive-msg');
        };
    }, []);

    const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);

    if (!selectedUser) {
        return <Navigate to="/login" />;
    }

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('send-chat', message);
            setMessage('');
        }
    };

    return (
        <div className="play-screen">
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
                <div>side enemy</div>
                <div>your side</div>
            </div>
        </div>
    );
};

export default GamePage;
