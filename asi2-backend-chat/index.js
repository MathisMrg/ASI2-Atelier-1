// const fetch = require('node-fetch');
var express = require("express");
var app = express();
var path = require("path");
let server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const userList = new Set();

app.use(express.static('public'));
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));

app.use(express.json());

async function saveMessageToBackend(message, senderId, receiverId, date) {
    try {
        const response = await fetch('http://localhost:8083/chat/save', {
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
    } catch (error) {
        console.error("Erreur de connexion à l'API de sauvegarde :", error);
    }
}

io.on('connection', function (socket) {
    console.log('A user connected');
    socket.join('global-room');

    socket.on('send-global', (message) => {
        io.to('global-room').emit('receive-global', message);
        saveMessageToBackend(message.message, message.sender.id, undefined, message.date);
    });

    socket.on('join-private', (obj) => {
        const privateRoom = `private-${obj.id}`;
        socket.join(privateRoom);
        console.log(`User joined private room: ${privateRoom}`);
    });

    socket.on('send-private', (obj) => {
        const privateRoomSender = `private-${obj.sender.id}`;
        const privateRoomReceiver = `private-${obj.receiver.id}`;
        socket.to(privateRoomSender).emit('receive-private', obj);
        socket.to(privateRoomReceiver).emit('receive-private', obj);
        saveMessageToBackend(obj.message, obj.sender.id, obj.receiver.id, obj.date);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
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
