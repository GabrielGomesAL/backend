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

// POST /produtos
router.post('/', criar);

// GET /produtos
router.get('/', listar);

// GET /produtos/:id
router.get('/:id', buscar, exibir);

// PUT /produtos/:id
router.put('/:id', buscar, atualizar);

// DELETE /produtos/:id
router.delete('/:id', buscar, remover);

module.exports = router;
