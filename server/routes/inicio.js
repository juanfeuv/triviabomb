const express = require('express');
const app = express();
const path = require('path');
let users = require('../db/users');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');


app.post("/inicio", (req, res) => {
    let body = req.body;
    if (users.filter(user => user.status === true).length === users.length) {
        res.render(path.resolve(__dirname + '../../../inicio.hbs'));
    } else {
        res.send('No todos lo usuarios estan listo :(');
    }
});

module.exports = app;