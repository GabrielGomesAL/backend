const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function verificarToken(req, res, next) {
  try {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) return res.status(401).json({ msg: "Token invalido" });

    const token = tokenHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = decoded.email;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token invalido" });
  }
}

function gerarToken(payload) {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  } catch {
    throw "Erro ao gerar o token";
  }
}

function cifrarSenha(senha) {
  const salto = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(senha, salto);
}

function compararSenha(senha, hash) {
  return bcrypt.compareSync(senha, hash);
}

module.exports = {
  verificarToken,
  gerarToken,
  cifrarSenha,
  compararSenha
};
