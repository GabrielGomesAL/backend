const request = require("supertest");
const app = require("../app");
const tarefasRouter = require("../routes/tarefas"); // importar o router para reset

let tarefaId;

describe("Testes da API de Tarefas", () => {
  beforeEach(() => {
    tarefasRouter.resetTarefas(); // limpa o array antes de cada teste
  });

  it("GET /tarefas deve retornar 200 e JSON", async () => {
    const res = await request(app).get("/tarefas");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
  });

  it("POST /tarefas deve criar uma tarefa", async () => {
    const res = await request(app)
      .post("/tarefas")
      .send({ nome: "Estudar Node", concluida: false });

    expect(res.status).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("id");
    tarefaId = res.body.id;
  });

  it("GET /tarefas/:id deve retornar a tarefa criada", async () => {
    const post = await request(app)
      .post("/tarefas")
      .send({ nome: "Teste", concluida: false });
    const id = post.body.id;
  
    const res = await request(app).get(`/tarefas/${id}`);
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
  });
  


  it("GET /tarefas/1 deve retornar 404", async () => {
    const res = await request(app).get("/tarefas/1");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("msg", "Tarefa não encontrada");
  });

  it("PUT /tarefas/:id deve atualizar a tarefa criada", async () => {
    const post = await request(app).post("/tarefas").send({ nome: "Teste", concluida: false });
    tarefaId = post.body.id;

    const res = await request(app)
      .put(`/tarefas/${tarefaId}`)
      .send({ nome: "Estudar Node e Express", concluida: true });

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
  });

  it("PUT /tarefas/1 deve retornar 404", async () => {
    const res = await request(app).put("/tarefas/1").send({});
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("msg", "Tarefa não encontrada");
  });

  it("DELETE /tarefas/:id deve remover a tarefa criada", async () => {
    const post = await request(app).post("/tarefas").send({ nome: "Teste", concluida: false });
    tarefaId = post.body.id;

    const res = await request(app).delete(`/tarefas/${tarefaId}`);
    expect(res.status).toBe(204);
  });

  it("DELETE /tarefas/1 deve retornar 404", async () => {
    const res = await request(app).delete("/tarefas/1");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("msg", "Tarefa não encontrada");
  });
});
