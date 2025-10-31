require("dotenv").config()
const express = require ("express")
const cookieParser = require ("cookie-parser")
const logger = require ("morgan")
const mongoose = require("mongoose")
const tarefasRouter = require ("./routes/tarefasRouter")

const url = 'mongodb+srv://asrtarefas:gabriel123@cluster0.dn5spqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose
   .conmect(url)
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.log("erro ao conectar no MongoDB: " + err.message))
const app = express()

app.use(logger("dev"))  
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/tarefas", tarefasRouter)

module.exports = app