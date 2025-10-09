var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var tarefasRouter = require('./routes/tarefas');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tarefas', tarefasRouter);

module.exports = app;
