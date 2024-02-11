const app = require('express')();
const consign = require('consign');
const db = require('./config/db');

app.db = db;

consign().then('./config/middlewares.js').then('./api').then('./config/routes.js').into(app)
app.get('/casebre', (req, res) => res.send('casebre'))

app.listen(3000, () => {
    console.log('backfASDASDasdsad sadasd.');
    console.log('bdd.');
});
