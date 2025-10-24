// controllers/produtosController.js
const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

// POST /produtos
async function criar(req, res) {
  try {
    const { nome, preco } = req.body || {};
    const novoProduto = await Produto.create({ nome, preco });
    return res.status(201).json(novoProduto);
  } catch (err) {
    return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
  }
}

// GET /produtos
async function listar(req, res) {
  const produtosCadastrados = await Produto.find({});
  return res.status(200).json(produtosCadastrados);
}

// middleware: valida id e carrega produto
async function buscar(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Parâmetro inválido' });
  }

  const produtoEncontrado = await Produto.findOne({ _id: id });
  if (produtoEncontrado) {
    req.produto = produtoEncontrado;
    return next();
  }
  return res.status(404).json({ msg: 'Produto não encontrado' });
}

// GET /produtos/:id (após buscar)
function exibir(req, res) {
  return res.status(200).json(req.produto);
}

// PUT /produtos/:id (após buscar)
async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { nome, preco } = req.body || {};
    const produtoAtualizado = await Produto.findOneAndUpdate(
      { _id: id },
      { nome, preco },
      { new: true, runValidators: true }
    );

    if (!produtoAtualizado) {
      // teoricamente não chega aqui pois buscar já garantiu existência
      return res.status(404).json({ msg: 'Produto não encontrado' });
    }

    return res.status(200).json(produtoAtualizado);
  } catch (err) {
    return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
  }
}

// DELETE /produtos/:id (após buscar)
async function remover(req, res) {
  const { id } = req.params;
  const produtoRemovido = await Produto.findOneAndDelete({ _id: id });

  if (!produtoRemovido) {
    // Se já foi removido antes ou nunca existiu
    return res.status(404).json({ msg: 'Produto não encontrado' });
  }

  return res.status(204).send();
}

module.exports = {
  criar,
  listar,
  buscar,
  exibir,
  atualizar,
  remover
};
