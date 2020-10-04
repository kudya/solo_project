const express = require('express');
const axios = require('axios');

const hbs = require('hbs');
const Chart = require('chart.js');

const app = express();

app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

const indexRouter = require('./routes/index.js');
const teamRouter = require('./routes/team.js');
const squadRouter = require('./routes/squad.js');

app.use('/', indexRouter);
app.use('/team', teamRouter);
app.use('/squad', squadRouter);

app.listen(3000);
