import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextProps {
    socket: Socket | null;
    userId: string;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: React.FC<{ userId: string; children: React.ReactNode }> = ({ userId, children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (userId) {
            // Connexion au backend
            const newSocket = io(process.env.REACT_APP_FIGHT_URL, {
                query: { userId },
                transports: ['websocket'],
                path: "/fight-socket.io"
            });

            setSocket(newSocket);

            // Déconnexion et nettoyage des ressources lorsque le composant est démonté ou que l'userId change
            return () => {
                newSocket.disconnect();
                console.log('Déconnexion de la socket');
            };
        }
    }, [userId]);

    return (
        <SocketContext.Provider value={{ socket, userId }}>
            {children}
        </SocketContext.Provider>
    );
};

// Hook personnalisé pour récupérer la socket et l'userId
export const useSocket = (): { socket: Socket | null; userId: string } => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};
