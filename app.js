const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { initClientConnection } = require('./db/mongo');
const cors = require('cors');

cors({ origin: '*' });

const indexRouter = require('./routes/index');

const app = express();

initClientConnection()
    .then(() => {
        console.log('Connexion MongoDB effectuée avec succès');
    })
    .catch((err) => {
        console.error('Erreur de connexion MongoDB :', err);
        process.exit(1);
    });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use((req, res, next) => {
    res.status(404).json({ name: 'API', version: '1.0', status: 404, message: 'introuvable' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erreur serveur !');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

module.exports = app;