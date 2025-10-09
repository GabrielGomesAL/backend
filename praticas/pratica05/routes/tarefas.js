var express = require('express');
var router = express.Router();

let tarefas = [];
let idCounter = 1;

// Função para resetar tarefas (usada nos testes)
function resetTarefas() {
  tarefas = [];
  idCounter = 1;
}

// GET /tarefas
router.get('/', (req, res) => {
  res.json(tarefas);
});

// POST /tarefas
router.post('/', (req, res) => {
  const tarefa = { id: idCounter++, ...req.body };
  tarefas.push(tarefa);
  res.status(201).json(tarefa);
});

// GET /tarefas/:id
router.get('/:id', (req, res) => {
  const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
  if (!tarefa) return res.status(404).json({ msg: 'Tarefa não encontrada' });
  res.json(tarefa);
});

// PUT /tarefas/:id
router.put('/:id', (req, res) => {
  const tarefaIndex = tarefas.findIndex(t => t.id === parseInt(req.params.id));
  if (tarefaIndex === -1) return res.status(404).json({ msg: 'Tarefa não encontrada' });

  tarefas[tarefaIndex] = { ...tarefas[tarefaIndex], ...req.body };
  res.json(tarefas[tarefaIndex]);
});

// DELETE /tarefas/:id
router.delete('/:id', (req, res) => {
  const tarefaIndex = tarefas.findIndex(t => t.id === parseInt(req.params.id));
  if (tarefaIndex === -1) return res.status(404).json({ msg: 'Tarefa não encontrada' });

  tarefas.splice(tarefaIndex, 1);
  res.status(204).send();
});

module.exports = router;
module.exports.resetTarefas = resetTarefas;
