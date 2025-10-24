// app.js
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const produtosRouter = require('./routes/produtosRouter'); // será criado logo +

// Conexão MongoDB Atlas
const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_DATABASE
} = process.env;

const mongoUri = `mongodb+srv://gabrielgom:gabriel123@cluster0.i4cz6nd.mongodb.net/?appName=Cluster0`;

mongoose.connect(mongoUri)
  .then(() => console.log('✅ Conectado ao MongoDB Atlas'))
  .catch(err => {
    console.error('❌ Erro ao conectar no MongoDB:', err.message);
    process.exit(1);
  });

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas da API
app.use('/produtos', produtosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler (responde JSON em caso de erro não tratado)
app.use(function(err, req, res, next) {
  const status = err.status || 500;
  const msg = err.message || 'Erro interno';
  res.status(status).json({ msg });
});

module.exports = app;
