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

io.on('connection', function (socket) {
    console.log('A user connected');
   // console.log(JSON.stringify(socket));

    socket.join('global-room');
    socket.on('send-global', (message) => {
        io.to('global-room').emit('receive-global', message);
    });

    socket.on('join-private', (obj) => {
        const privateRoom = `private-${obj.receiver?.id}`;
        socket.join(privateRoom);
        console.log(`User joined private room: ${privateRoom}`);
    });

    socket.on('send-private', (obj) => {
        console.log("sendedTo : " + obj.gameId)
        const privateRoom = `private-${obj.gameId}`;
        io.to(privateRoom).emit('receive-private', obj);
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
