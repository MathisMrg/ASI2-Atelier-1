const express = require("express");
const path = require("path");
const http = require('http');
const socketIo = require('socket.io');

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8083';

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    path: "/chat.io/",
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.static('public'));
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));
app.use(express.json());

const connectedUsers = new Set();

async function saveMessageToBackend(message, senderId, receiverId, date) {
    try {
        const response = await fetch(`${BACKEND_URL}/chat/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                senderId: senderId,
                receiverId: receiverId,
                sentAt: date
            })
        });
        if (!response.ok) {
            console.error("Erreur lors de la sauvegarde du message", response.statusText);
        }
        console.info("Message sauvegardé avec succès");
    } catch (error) {
        console.error("Erreur de connexion à l'API de sauvegarde :", error);
    }
}

io.on('connection', (socket) => {
    const userId = socket.handshake.auth?.userId;

    if (userId) {
        if (!connectedUsers.has(userId)) {
            connectedUsers.add(userId);
            console.log('User connected with userId:', userId);
            io.emit('connected-users', Array.from(connectedUsers));
        }
    }

    socket.join('global-room');

    socket.on('send-global', (message) => {
        io.to('global-room').emit('receive-global', message);
        saveMessageToBackend(message.message, message.sender.id, undefined, message.date);
    });

    socket.on('join-private', (obj) => {
        const privateRoom = `private-${obj.id}`;
        socket.join(privateRoom);
        console.log(`User joined private room: ${privateRoom}`);
        io.emit('connected-users', Array.from(connectedUsers));
    });

    socket.on('send-private', (obj) => {
        const privateRoomSender = `private-${obj.sender.id}`;
        const privateRoomReceiver = `private-${obj.receiver.id}`;
        socket.to(privateRoomSender).emit('receive-private', obj);
        socket.to(privateRoomReceiver).emit('receive-private', obj);
        saveMessageToBackend(obj.message, obj.sender.id, obj.receiver.id, obj.date);
    });

    socket.on('disconnect', () => {
        connectedUsers.delete(socket.handshake.auth?.userId);
        console.log(Array.from(connectedUsers));
        io.emit('connected-users', Array.from(connectedUsers));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something went wrong! Please try again later.");
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry, page not found");
});

server.listen(4000, function () {
    const port = server.address().port;
    console.log("Example app listening at http://%s:%s", port);
});
