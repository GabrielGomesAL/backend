const express = require("express");
const router = express.Router();

router.post('/', controller.criar)
router.get('/', controller.listar)
router.get('/:id', controller.obterPorId, controller.exibir)
router.put('/:id', controller.atualizar, controller.atualizar)
router.delete('/:id', controller.deletar, controller.remover)

module.exports = router;