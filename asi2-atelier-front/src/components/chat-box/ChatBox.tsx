import React, { useEffect, useState } from 'react';
import './ChatBox.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../model/userModel';
import { Message } from '../../model/messageModel';
import { useSelector } from "react-redux";
import { getUsers } from '../../service/UserService';
import MessageList from '../message-list/Message-List';

interface ChatBoxProps {
    globalMessages: Message[];
    privateMessages: Message[];
    connectedUsersList: Number[];
    sendGlobalMessage: (message: string) => void;
    sendPrivateMessage: (message: string, receiver: User) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ globalMessages, privateMessages, sendGlobalMessage, sendPrivateMessage, connectedUsersList }) => {
    const [activeTab, setActiveTab] = useState<'global' | 'private'>('global');
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
                            <button className={activeTab === 'private' ? 'active' : ''} onClick={() => setActiveTab('private')}>
                                Private Chat
                            </button>
                        </div>

                        <MessageList
                            activeTab={activeTab}
                            connectedUsersList={connectedUsersList}
                            globalMessages={globalMessages}
                            privateMessages={privateMessages}
                            selectedUser={selectedUser}
                            selectedUserFromStore={selectedUserFromStore}
                            onBackToUsers={() => setSelectedUser(null)}
                            users={users?.filter(user => user.id !== selectedUserFromStore?.id) || []}
                            onSelectUser={setSelectedUser}
                        />

                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            disabled={activeTab === 'private' && !selectedUser}
                        />
                        <button onClick={handleSendMessage} disabled={activeTab === 'private' && !selectedUser}>Send</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBox;
