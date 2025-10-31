const express = require('express');
const { verificarToken, gerarToken } = require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ msg: 'Usuário e senha são obrigatórios' });
  }

  const token = gerarToken({ email: usuario });
  return res.status(200).json({ token });
});

router.post('/renovar', verificarToken, (req, res) => {
  const email = req?.usuario?.email;
  if (!email) {
    return res.status(400).json({ msg: 'Usuário não encontrado no token' });
  }
  const novoToken = gerarToken({ email });
  return res.status(200).json({ token: novoToken });
});

module.exports = router;
