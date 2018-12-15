const { io } = require('../server');
let users = require('../db/users');

function sendUsers() {
    let cadena = "";
    users.forEach(user => {
        if (user.status) {
            cadena += `<li style="color: green;">${user.username} || Listo para Jugar</li>`;
        } else {
            cadena += `<li style="color: rgb(210, 57, 30);">${user.username} || En espera</li>`;
        }
    });
    return cadena;
}

io.on('connection', (client) => {
    console.log('usuario conectado');

    client.on('disconnect', () => {
        console.log('usuario desconectado');
    });

    client.on('username', _username => {
        if (users.find(user => user.username === _username)) {
            client.emit('comprobacion', false);
        } else {
            client.emit('comprobacion', true);
        }
    });
    client.emit('users', sendUsers());
    client.on('changeStatus', user => {
        users[users.findIndex(element => element.username === user.username)].status = user.status;
        client.broadcast.emit('users', sendUsers());
    });
});