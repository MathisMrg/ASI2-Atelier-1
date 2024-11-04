// ChatBox.tsx
import React, { useState } from 'react';
import './ChatBox.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from '@fortawesome/free-solid-svg-icons';

interface Message {
    sender: string;
    date: Date;
    message: string;
}

interface ChatBoxProps {
    globalMessages: Message[];
    privateMessages: Message[];
    sendGlobalMessage: (message: string) => void;
    sendPrivateMessage: (message: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ globalMessages, privateMessages, sendGlobalMessage, sendPrivateMessage }) => {
    const [activeTab, setActiveTab] = useState('global');
    const [messageInput, setMessageInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            activeTab === 'global' ? sendGlobalMessage(messageInput) : sendPrivateMessage(messageInput);
            setMessageInput('');
        }
    };

    return (
        <div>
            {!isOpen ? <button className="toggle-button display-button" onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon
                    icon={faComments}
                />
            </button> : <span></span>}
            <div className={`chat-box ${isOpen ? 'open' : 'closed'}`}>
                <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
                    Hide Chat
                </button>
                {isOpen && (
                    <div className="chat-content">
                        <div className="chat-header">
                            <button className={activeTab === 'global' ? 'active' : ''} onClick={() => setActiveTab('global')}>Global Chat</button>
                            <button className={activeTab === 'private' ? 'active' : ''} onClick={() => setActiveTab('private')}>Private Chat</button>
                        </div>
                        <div className="chat-messages">
                            {(activeTab === 'global' ? globalMessages : privateMessages).map((msg, index) => (
                                <div key={index}>{
                                    ` ${new Date(msg.date).toLocaleTimeString()}` + ' ' + msg.sender + ' : ' + msg.message
                                    }</div>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBox;
