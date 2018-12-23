const express = require("express");
const app = express();
const socketIO = require('socket.io');
const http = require('http');
let server = http.createServer(app);
const port = process.env.PORT || 80;
const path = require('path');
module.exports.io = socketIO(server);
require('./sockets/socket');

app.use(express.static(path.resolve(__dirname + '../../public')));
app.use(require('./routes/index'));

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});