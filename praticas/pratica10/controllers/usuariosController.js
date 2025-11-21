const Usuario = require("../models/usuariosModel");
const { cifrarSenha, compararSenha, gerarToken } = require("../middlewares/authMiddleware");

async function criar(req, res) {
  try {
    if (!req.body.email || !req.body.senha)
      return res.status(422).json({ msg: "Email e Senha são obrigatórios" });

    const senhaCifrada = cifrarSenha(req.body.senha);

    const novoUsuario = await Usuario.create({
      email: req.body.email,
      senha: senhaCifrada
    });

    return res.status(201).json({
      _id: novoUsuario._id,
      email: novoUsuario.email
    });
  } catch (err) {
    return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
  }
}

async function entrar(req, res) {
  const usuarioEncontrado = await Usuario.findOne({ email: req.body.usuario });

  if (!usuarioEncontrado) {
    return res.status(401).json({ msg: "Credenciais inválidas" });
  }

  const senhaOk = compararSenha(req.body.senha, usuarioEncontrado.senha);

  if (!senhaOk)
    return res.status(401).json({ msg: "Credenciais inválidas" });

  const token = gerarToken({ email: req.body.usuario });
  return res.status(200).json({ token });
}

async function renovar(req, res) {
  const token = gerarToken({ email: req.usuario });
  return res.status(200).json({ token });
}

async function remover(req, res) {
  await Usuario.findOneAndDelete({ _id: req.query.id });
  return res.status(204).send();
}

module.exports = { criar, entrar, renovar, remover };
