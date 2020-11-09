const express = require('express');
require('dotenv').config();

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
const userChoiceRouter = require('./routes/userChoice.js');
const matchButtonsRouter = require('./routes/matchButtons.js');

app.use('/', indexRouter);
app.use('/team', teamRouter);
app.use('/squad', squadRouter);
app.use('/choice', userChoiceRouter);
app.use('/matchButtons', matchButtonsRouter);
app.listen(process.env.PORT);
