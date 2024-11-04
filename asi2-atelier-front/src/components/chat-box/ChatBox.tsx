import React, { useEffect, useState } from 'react';
import './ChatBox.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../model/userModel';
import { Message } from '../../model/messageModel';
import { useSelector } from "react-redux";
import { getUsers } from '../../service/UserService';

interface ChatBoxProps {
    globalMessages: Message[];
    privateMessages: Message[];
    sendGlobalMessage: (message: string) => void;
    sendPrivateMessage: (message: string, receiver: User) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ globalMessages, privateMessages, sendGlobalMessage, sendPrivateMessage }) => {
    const [activeTab, setActiveTab] = useState('global');
    const [messageInput, setMessageInput] = useState('');
    const [users, setUsers] = useState<User[] | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const selectedUserFromStore = useSelector((state: any) => state.userReducer.selectedUser);

    useEffect(() => {
        getUsers().then(users => {
            setUsers(users);
        });
    }, []);

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            if (activeTab === 'global') {
                sendGlobalMessage(messageInput);
            } else if (activeTab === 'private' && selectedUser) {
                sendPrivateMessage(messageInput, selectedUser);
            }
            setMessageInput('');
        }
    };

    return (
        <div>
            {!isOpen ? (
                <button className="toggle-button display-button" onClick={() => setIsOpen(!isOpen)}>
                    <FontAwesomeIcon icon={faComments} />
                </button>
            ) : (
                <span></span>
            )}
            <div className={`chat-box ${isOpen ? 'open' : 'closed'}`}>
                <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
                    Hide Chat
                </button>
                {isOpen && (
                    <div className="chat-content">
                        <div className="chat-header">
                            <button className={activeTab === 'global' ? 'active' : ''} onClick={() => setActiveTab('global')}>
                                Global Chat
                            </button>
                            <button className={activeTab === 'private' ? 'active' : ''} onClick={() => {
                                setActiveTab('private');
                                setSelectedUser(null); // Reset selected user when switching tabs
                            }}>
                                Private Chat
                            </button>
                        </div>
                        <div className="chat-messages">
                            {(activeTab === 'global' ? globalMessages : privateMessages).map((msg, index) => (
                                <div key={index}>
                                    {`${new Date(msg.date).toLocaleTimeString()} ${msg.sender}: ${msg.message}`}
                                </div>
                            ))}
                        </div>
                        {activeTab === 'private' && users && (
                            <div className="user-list">
                                <label>Select User:</label>
                                <select onChange={(e) => {
                                    const userId = e.target.value;
                                    const user = users.find(user => user.id === Number(userId));
                                    setSelectedUser(user || null);
                                }}>
                                    <option value="">-- Select a User --</option>
                                    {users.map(user => (
                                        <option key={user.id.toString()} value={user.id.toString()}>
                                            {user.surName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
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
