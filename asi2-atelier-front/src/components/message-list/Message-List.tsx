// MessageList.tsx
import React from 'react';
import { Message } from '../../model/messageModel';
import { User } from '../../model/userModel';

interface MessageListProps {
    activeTab: 'global' | 'private';
    connectedUsersList: Number[],
    globalMessages: Message[];
    privateMessages: Message[];
    selectedUser: User | null;
    selectedUserFromStore: User | null;
    onBackToUsers: () => void;
    users: User[];
    onSelectUser: (user: User) => void;
}

const MessageList: React.FC<MessageListProps> = ({
    activeTab,
    globalMessages,
    privateMessages,
    selectedUser,
    selectedUserFromStore,
    onBackToUsers,
    users,
    onSelectUser,
    connectedUsersList,
}) => {
    const isUserConnected = (userId: Number) => connectedUsersList.includes(userId);

    const sortedUsers = [...users].sort((a, b) => {
        const aConnected = isUserConnected(a.id) ? 1 : 0;
        const bConnected = isUserConnected(b.id) ? 1 : 0;
        return bConnected - aConnected;
    });

    return (
        <div className="chat-messages">
            {activeTab === 'global' && globalMessages.map((msg, index) => (
                <div key={index}>
                    {`${new Date(msg.date).toLocaleDateString('fr-FR')} - ${new Date(msg.date).toLocaleTimeString('fr-FR')} ${msg.sender.surName}: ${msg.message}`}
                </div>
            ))}

            {activeTab === 'private' && (
                selectedUser ? (
                    <div>
                        <button onClick={onBackToUsers} className="back-button">
                            ← Back to Users
                        </button>
                        <div className="messages">
                            {privateMessages
                                .filter(msg =>
                                    (msg.sender.id === selectedUserFromStore?.id && msg.receiver?.id === selectedUser?.id) ||
                                    (msg.sender.id === selectedUser?.id && msg.receiver?.id === selectedUserFromStore?.id)
                                )
                                .map((msg, index) => (
                                    <div key={index}>
                                        {`${new Date(msg.date).toLocaleTimeString()} - ${msg.sender.surName}: ${msg.message}`}
                                    </div>
                                ))}
                        </div>
                    </div>
                ) : (
                    <div className="user-list">
                        {sortedUsers.length > 0 ? <label>Select a conversation:</label> : <label>Il n'y a pas d'utilisateur avec qui converser</label> }
                        <div className="conversation-list">
                            {sortedUsers.map(user => (
                                <div
                                    key={user.id.toString()}
                                    className="conversation"
                                    onClick={() => onSelectUser(user)}
                                >
                                    <span className={`status-indicator ${isUserConnected(user.id) ? 'online' : 'offline'}`} />
                                    {user.surName}
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default MessageList;
