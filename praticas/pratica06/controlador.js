import { Tarefa } from "./modelo.js";

export async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.inserir();
}

export async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  const achou = await tarefa.buscar();
  return achou ? tarefa : null;
}

export async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  const achou = await tarefa.buscar();
  if (achou) {
    tarefa.concluida = concluida === true || concluida === "true";
    await tarefa.alterar();
    return true;
  }
  return false;
}

export async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  const achou = await tarefa.buscar();
  if (achou) {
    await tarefa.deletar();
    return true;
  }
  return false;
}
