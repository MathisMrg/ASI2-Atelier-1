var express = require("express");
var app = express();
var path = require("path");
let server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

app.use(express.static('public'));
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));

app.use(express.json());

io.on('connection', function(socket) {
    console.log('A user connected');

    socket.join('global-room');
    socket.on('send-global', (message) => {
        io.to('global-room').emit('receive-global', message);
    });

    socket.on('join-private', (userId) => {
        const privateRoom = `private-${userId}`;
        socket.join(privateRoom);
        console.log(`User joined private room: ${privateRoom}`);
    });

    socket.on('send-private', ({ toUserId, message }) => {
        const privateRoom = `private-${toUserId}`;
        io.to(privateRoom).emit('receive-private', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.get("/", function (req, res, next) {
    res.sendFile(path.join(__dirname, "./www/index.html"), function (err) {
        if (err) {
            next(err);
        }
    });
});

app.post("/msg", function(req, res, next) {
    console.log(req.body);
    res.send("Données reçues");
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
