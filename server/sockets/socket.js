const { io } = require('../server');
let users = require('../db/users');
const preguntas = require('../db/preguntas.json');
let date = new Date();

//functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    await sleep(2000);
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function sendUsers() {
    let cadena = "";
    users.forEach(user => {
        if (user.status) {
            cadena += `<div style="color: green;" class="users_list">${user.username} || Listo para Jugar</div>`;
        } else {
            cadena += `<div style="color: rgb(210, 57, 30);" class="users_list">${user.username} || En espera</div>`;
        }
    });
    return cadena;
}

function numero(n) {
    return Math.round((Math.random() * n));
}

function numeroplus1(n) {
    return Math.round((Math.random() * n) + 1);
}

function reqJugadores() {
    let cadena = "";
    usersort = users;
    usersort.sort(function(a, b) { return a.score - b.score });
    usersort.reverse();

    usersort.forEach(user => {
        cadena += `<li>${user.username}: ${user.score} points</li>`;
    });
    return cadena;
}

function sendQ(client) {
    let q = preguntas[numero(preguntas.length - 1)];
    let ans = [];
    ans.push(q.opcion1, q.opcion2, q.opcion3, q.opcion4);
    ans = shuffle(ans);
    client.emit('randomQuestion', {
        titulo: q.titulo,
        opcion1: ans[0],
        opcion2: ans[1],
        opcion3: ans[2],
        opcion4: ans[3]
    });
}

function time() {
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function emitTime(client) {
    client.emit('timing', time());
}

//sockets
io.on('connection', (client) => {

    client.on('username', _username => {
        if (users.find(user => user.username === _username)) {
            client.emit('comprobacion', false);
        } else {
            client.emit('comprobacion', true);
        }
    });
    client.on('statusQ', status => {
        if (status) {
            sendQ(client);
        }
    });

    client.on('checkAnswer', obj => {
        let pregunta = preguntas.find(q => q.titulo === obj.question);
        if (pregunta) {
            if (pregunta.opcion1 === obj.answer) {
                client.emit('sendAnswer', true);
            } else {
                client.emit('sendAnswer', false);
            }
        }
    });
    client.on('updateScore', username => {
        users.find(user => user.username === username).score += 3;
        client.emit('reqJugadores', reqJugadores());
        client.broadcast.emit('reqJugadores', reqJugadores());
    });

    client.emit('users', sendUsers());

    client.on('changeStatus', user => {
        console.log(preguntas.length);
        users[users.findIndex(element => element.username === user.username)].status = user.status;
        client.emit('users', sendUsers());
        client.broadcast.emit('users', sendUsers());
    });

    client.emit('reqJugadores', reqJugadores());
});