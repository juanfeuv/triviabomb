const express = require('express');
const app = express();

app.use(require('./login'));
app.use(require('./lobby'));
app.use(require('./inicio'));
app.use(require('./pregunta'));
app.use(require('./404'));

module.exports = app;