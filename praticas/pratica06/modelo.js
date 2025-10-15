import { conectarDb } from "./database.js";
import { ObjectId } from "mongodb";

export class Tarefa {
  db = null;
  collection = null;
  id = null;
  nome = "";
  concluida = false;

  constructor(nome, concluida = false) {
    this.nome = nome;
    this.concluida = concluida;
  }

  async init() {
    this.db = await conectarDb();
    this.collection = this.db.collection("tarefas");
  }

  async inserir() {
    const resultado = await this.collection.insertOne({
      nome: this.nome,
      concluida: this.concluida,
    });
    this.id = resultado.insertedId;
    // console.log("✅ Tarefa inserida:", this.id);
  }

  async alterar() {
    if (!this.id) throw new Error("Sem ID para alterar. Rode buscar() antes.");
    await this.collection.updateOne(
      { _id: new ObjectId(this.id) },
      { $set: { nome: this.nome, concluida: this.concluida } }
    );
    // console.log("✅ Tarefa atualizada.");
  }

  async deletar() {
    await this.collection.deleteOne({ nome: this.nome });
    // console.log("✅ Tarefa removida (se existia).");
  }

  async buscar() {
    const resultado = await this.collection.findOne({ nome: this.nome });
    if (resultado) {
      this.id = resultado._id;
      this.concluida = Boolean(resultado.concluida);
      return true;
    }
    return false;
  }
}
