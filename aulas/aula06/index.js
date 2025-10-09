// 1 importar o framework
const express = require("express");

// 2 criar uma intancia de aplicaçao
const app = express();

//criar um middleware
app.get('/',(req, res) =>{
    res.send("ola");
});

//3 iniciar a aplicaçao em uma porta
app.listen(3000, ()=>{
    console.log("App esta On!");
})