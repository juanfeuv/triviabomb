const express = require('express');
const socketIO = require('socket.io');
const app = express();
const path = require('path');
const http = require('http');
let server = http.createServer(app);
const bodyParser = require('body-parser');
const users = require('../db/users');
const exphbs = require('express-handlebars');

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({ extended: false }));

let io = socketIO(server);

app.post('/lobby', (req, res) => {

    let body = req.body;
    if (body) {
        let user = {
            username: body.username,
            state: false,
            score: 0
        };
        if (!users.find(user => user.username === body.username)) {
            users.push(user);
        }
    }

    res.render(path.resolve(__dirname + '../../../templates/lobby.hbs'), {
        name: body.username
    });
});

module.exports = app;