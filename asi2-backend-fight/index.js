var express = require("express");
var app = express();
var path = require("path");
let server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    path: "/fight-socket.io"
});
const CombatService = require('./services/combat.js');
const CombatServicePersistence = require('./persistence/combat.js')
app.use(express.static('public'));
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));
app.use(express.json());

const combatService = new CombatService(new CombatServicePersistence());
const socketMap = new Map();


io.on('connection', function(socket){
    let data = socket.handshake.query;
    console.log(data);
    if (! data.userId) {
        socket.send('connect-result', { success: false, message: "Aucun userId envoyé"})
        socket.disconnect(true);
    }

    socketMap.set(data.userId, socket);
    console.log(socketMap);

    socket.on('create-battle-room', function(data) {
        try {
            let combat = combatService.createBattleRoom(data)
            socket.emit('battle-creation-response', successResponse(combat));
            let fighterSocket = socketMap.get(combat.fighter);
            if (fighterSocket) {
                fighterSocket.emit('combat-request', successResponse(combat));
            }
        } catch (e) {
            socket.emit('battle-creation-response', failedResponse(e));
        }
    });

    socket.on('get-rooms', function(data) {
        try {
            socket.emit('result-rooms', successResponse(combatService.getCombatOf(data.userId)));
        } catch (e) {
            socket.emit('result-rooms', failedResponse(e));
        }
    });

    socket.on('select-card', function(data) {
        try {
            let combat = combatService.selectCard(data);
            dispatchEvent("update-battle", successResponse(combat), combat.fighter, combat.requester);
        } catch (e) {
            socket.emit('update-battle', failedResponse(e));
        }
    });

    socket.on('start-fight', function(data) {
        try {
            let combat = combatService.startFight(data);
            dispatchEvent("update-battle", successResponse(combat), combat.fighter, combat.requester);
        } catch (e) {
            socket.emit('update-battle', failedResponse(e));
        }
    });

    socket.on('make-move', function(data) {
        try {
            let combat = combatService.processMove(data);
            dispatchEvent("update-battle", successResponse(combat), combat.fighter, combat.requester);
        } catch (e) {
            socket.emit('update-battle', failedResponse(e));
        }
    });

    socket.on('room-details', function(data) {
        try {
            // TODO : Refactoring de ouf à faire (sécu)
            socket.emit("room-result", combatService.fetchCombat(data.combatId))
        } catch (e) {
            socket.emit("room-result", failedResponse(e))
        }
    })


    socket.send('connect-result', combatService.getCombatOf(data.userId));

    socket.on('disconnect', function() {
        if (socketMap.has(data.userId)) {
            socketMap.delete(data.userId);
        }
    })
});

/**
 *
 * @param combat
 * @returns {{success: boolean, messsage: string}}
 */
function successResponse(combat) {
    return {
        success: true,
        messsage: "",
        state: combat
    };
}

function failedResponse(e) {
    return  {
        success: false,
        message: e.message
    };
}


/**
 *
 * @param {string} eventName
 * @param {Object} data
 * @param {...string} receivers
 */
function dispatchEvent(eventName, data, ...receivers) {

    receivers.forEach((r) => {
        let socket = socketMap.get(r);

        if (r) {
            socket.emit(eventName, data)
        }
    })
}

app.get("/", function (req, res, next) {
    res.sendFile(path.join(__dirname, "./www/index.html"), function (err) {
        if (err) {
            next(err);
        }
    });
});

app.use(function (req, res, next, err) {
    console.error(err.stack);
    res.status(500).send("Something went wrong! Please try again later.");
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry, page not found");
});

server.listen(4040, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
