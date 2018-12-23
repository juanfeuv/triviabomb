const express = require('express');
const app = express();

app.get('*', (req, res) => {
    res.status(404).send('<title>404: Page Not Found!!</title><h1>Page Not Found!!</h1><h2>Visita una página correcta o primero registrate <a href="/">aquí</a></h2>');
});

module.exports = app;