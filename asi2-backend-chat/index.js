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

// Initialisation des sockets
setupSocket(io, BACKEND_URL);

// Gestion des erreurs
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
