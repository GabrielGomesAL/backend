const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const { verificarToken } = require("../middlewares/authMiddleware");

router.post("/", usuariosController.criar);
router.post("/login", usuariosController.entrar);
router.post("/renovar", verificarToken, usuariosController.renovar);
router.delete("/", verificarToken, usuariosController.remover);

module.exports = router;
