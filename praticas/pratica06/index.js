import readline from "readline-sync";
import * as controlador from "./controlador.js";

function menu() {
  console.log(`
------------------------
       MENU
------------------------
1 - Adicionar contato
2 - Buscar contato
3 - Atualizar contato
4 - Remover contato
5 - Sair
`);
}

async function escolherOpcao(opcao) {
  switch (opcao) {
    case "1": {
      const nome = readline.question("Nome da tarefa: ");
      await controlador.adicionarTarefa(nome);
      console.log("✅ Adicionado.");
      break;
    }
    case "2": {
      const nome = readline.question("Nome da tarefa: ");
      const tarefa = await controlador.buscarTarefa(nome);
      if (tarefa) {
        console.log("📝 Resultado:", {
          id: tarefa.id?.toString(),
          nome: tarefa.nome,
          concluida: tarefa.concluida,
        });
      } else {
        console.log("⚠️ Não encontrado.");
      }
      break;
    }
    case "3": {
      const nome = readline.question("Nome da tarefa: ");
      const concluida = readline.question("Concluida? (true/false): ");
      const ok = await controlador.atualizarTarefa(nome, concluida);
      console.log(ok ? "✅ Atualizado." : "⚠️ Não encontrado.");
      break;
    }
    case "4": {
      const nome = readline.question("Nome da tarefa: ");
      const ok = await controlador.removerTarefa(nome);
      console.log(ok ? "✅ Removido." : "⚠️ Não encontrado.");
      break;
    }
    case "5":
      console.log("👋 Encerrando...");
      process.exit(0);
    default:
      console.log("❌ Opção inválida.");
  }
}

async function main() {
  while (true) {
    menu();
    const opcao = readline.question("Escolha uma opcao: ");
    await escolherOpcao(opcao);
  }
}

main();
