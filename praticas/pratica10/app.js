require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const apidocsRouter = require("./routes/apidocsRouter");
const usuariosRouter = require("./routes/usuariosRouter");

const app = express();

app.use(express.json());

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
)
.then(() => console.log("MongoDB conectado"))
.catch(err => console.error("Erro no MongoDB:", err));

app.use("/api-docs", apidocsRouter);
app.use("/usuarios", usuariosRouter);

module.exports = app;
