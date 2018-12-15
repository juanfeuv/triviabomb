const express = require('express');
const app = express();

app.use(require('./login'));
app.use(require('./lobby'));
app.use(require('./inicio'));

module.exports = app;