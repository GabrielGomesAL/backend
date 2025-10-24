// models/produtosModel.js
const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'nome é obrigatório'],
      minlength: [3, 'nome deve ter pelo menos 3 caracteres']
    },
    preco: {
      type: Number,
      required: [true, 'preco é obrigatório']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Produto', schema);
