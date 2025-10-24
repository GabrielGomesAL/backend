// routes/produtosRouter.js
const express = require('express');
const {
  criar,
  listar,
  buscar,
  exibir,
  atualizar,
  remover
} = require('../controllers/produtosController');

const router = express.Router();

router.post('/', criar);
router.get('/', listar);
router.get('/:id', buscar, exibir);
router.put('/:id', buscar, atualizar);
router.delete('/:id', buscar, remover);

module.exports = router;
