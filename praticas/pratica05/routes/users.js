var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: 'Rota de usuários' });
});

module.exports = router;
