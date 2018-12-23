const express = require('express');
const app = express();
const path = require('path');
let users = require('../db/users');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const preguntas = require('../db/preguntas.json');

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');


app.get("/inicio", (req, res) => {
    let body = req.query;

    if (users.filter(user => user.status === true).length === users.length && body.name != undefined) {

        res.render(path.resolve(__dirname + '../../../templates/inicio.hbs'), {
            name: body.name
        });

    } else {
        res.send('Todos los Usuarios no estan listos');
    }
});

module.exports = app;