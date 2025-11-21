const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

let token = "";
let idCriado = "";

describe("Teste da rota /usuarios", () => {

  test("Criar usuário", async () => {
    const res = await request.post("/usuarios").send({
      email: "usuario@email.com",
      senha: "abcd1234"
    });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe("usuario@email.com");
    expect(res.body._id).toBeDefined();

    idCriado = res.body._id;
  });

  test("Erro ao criar sem JSON", async () => {
    const res = await request.post("/usuarios").send({});
    expect(res.status).toBe(422);
    expect(res.body.msg).toBe("Email e Senha são obrigatórios");
  });

  test("Login correto", async () => {
    const res = await request.post("/usuarios/login").send({
      usuario: "usuario@email.com",
      senha: "abcd1234"
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

  test("Erro login sem JSON", async () => {
    const res = await request.post("/usuarios/login").send({});
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe("Credenciais inválidas");
  });

  test("Renovar token correto", async () => {
    const res = await request
      .post("/usuarios/renovar")
      .set("authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("Renovar token inválido", async () => {
    const res = await request
      .post("/usuarios/renovar")
      .set("authorization", "Bearer 123456789");

    expect(res.status).toBe(401);
    expect(res.body.msg).toBe("Token invalido");
  });

  test("Remover usuário", async () => {
    const res = await request
      .delete(`/usuarios?id=${idCriado}`)
      .set("authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });

});
