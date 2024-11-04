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

app.use(express.static('public'));
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));

app.use(express.json());

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('myEvent1', function(data) {
        socket.emit('myEvent2', data);
    });
});

// app.get("/", function (req, res, next) {
//     res.sendFile(path.join(__dirname, "./www/index.html"), function (err) {
//         if (err) {
//             next(err);
//         }
//     });
// });

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
    const host = server.address().address;
    const port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
