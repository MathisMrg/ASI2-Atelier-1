var express = require("express");
var app = express();
var path = require("path");
let server = require('http').createServer(app);
const io = require('socket.io')(server);
const CombatService = require('./services/combat.js');
const CombatServicePersistence = require('./persistence/combat.js')
app.use(express.static('public'));
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));

app.use(express.json());
const combatService = new CombatService(new CombatServicePersistence());


io.on('connection', function(socket){
    let data = socket.handshake.query;
    if (! data.userId) {
        socket.send('connect-result', { success: false, message: "Aucun userId envoyé"})
        socket.terminate();
    }

    socket.on('create-battle-room', function(data) {
        try {
            let combat = combatService.createBattleRoom(data)
            socket.send('action-result', successResponse(combat));
        } catch (e) {
            socket.send('action-result', failedResponse(e));
        }
    });

    socket.on('select-card', function(data) {
        try {
            let combat = combatService.selectCard(data);
            socket.send('action-result', successResponse(combat));
        } catch (e) {
            socket.send('action-result', failedResponse(e));
        }
    });

    socket.on('start-fight', function(data) {
        try {
            let combat = combatService.startFight(data);
            socket.send('action-result', successResponse(combat));
        } catch (e) {
            socket.send('action-result', failedResponse(e));
        }
    });

    socket.on('make-move', function(data) {
        try {
            let combat = combatService.processMove(data);
            socket.send('action-result', successResponse(combat));
        } catch (e) {
            socket.send('action-result', failedResponse(e));
        }
    });


    socket.send('connect-result', combatService.getCombatOf(data.userId));
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
