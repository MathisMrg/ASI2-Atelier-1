// SocketContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextProps {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps>({ socket: null });

export const SocketProvider: React.FC<{ userId: string; children: React.ReactNode }> = ({ userId, children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (userId) {
            const newSocket = io('http://localhost:4040', {
                query: { userId }
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        }
    }, [userId]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte de la socket
export const useSocket = (): Socket | null => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context.socket;
};
