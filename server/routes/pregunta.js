const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const exphbs = require('express-handlebars');

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.get('/pregunta', (req, res) => {
    let body = req.query;
    let validation = "";
    if (body.titulo != undefined) {
        let pregunta = {
            titulo: body.titulo,
            opcion1: body.opcion1,
            opcion2: body.opcion2,
            opcion3: body.opcion3,
            opcion4: body.opcion4
        }
        let preguntas = require('../db/preguntas.json');
        preguntas.push(pregunta);
        fs.writeFileSync(path.resolve('./server/db/preguntas.json'), JSON.stringify(preguntas), () => console.log('escrito'));
        validation = "Pregunta almacenada exitosamente";
    }
    res.render(path.resolve(__dirname + '../../../templates/pregunta.hbs'), {
        validation
    });
});

module.exports = app;