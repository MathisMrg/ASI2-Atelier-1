const connectedUsers = new Set();

async function saveMessageToBackend(message, senderId, receiverId, date, backendUrl) {
    try {
        const response = await fetch(`${backendUrl}/chat/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                senderId: senderId,
                receiverId: receiverId,
                sentAt: date,
            }),
        });
        if (!response.ok) {
            console.error("Erreur lors de la sauvegarde du message", response.statusText);
        }
        console.info("Message sauvegardé avec succès");
    } catch (error) {
        console.error("Erreur de connexion à l'API de sauvegarde :", error);
    }
}

function setupSocket(io, backendUrl) {
    io.on("connection", (socket) => {
        const userId = socket.handshake.auth?.userId;

        if (userId) {
            if (!connectedUsers.has(userId)) {
                connectedUsers.add(userId);
                console.log("User connected with userId:", userId);
                io.emit("connected-users", Array.from(connectedUsers));
            }
        }

        socket.join("global-room");

        socket.on("send-global", (message) => {
            io.to("global-room").emit("receive-global", message);
            saveMessageToBackend(message.message, message.sender.id, undefined, message.date, backendUrl);
        });

        socket.on("join-private", (obj) => {
            const privateRoom = `private-${obj.id}`;
            socket.join(privateRoom);
            console.log(`User joined private room: ${privateRoom}`);
            io.emit("connected-users", Array.from(connectedUsers));
        });

        socket.on("send-private", (obj) => {
            const privateRoomSender = `private-${obj.sender.id}`;
            const privateRoomReceiver = `private-${obj.receiver.id}`;
            socket.to(privateRoomSender).emit("receive-private", obj);
            socket.to(privateRoomReceiver).emit("receive-private", obj);
            saveMessageToBackend(obj.message, obj.sender.id, obj.receiver.id, obj.date, backendUrl);
        });

        socket.on("disconnect", () => {
            connectedUsers.delete(socket.handshake.auth?.userId);
            console.log(Array.from(connectedUsers));
            io.emit("connected-users", Array.from(connectedUsers));
        });
    });
}

module.exports = {
    saveMessageToBackend,
    setupSocket,
};
