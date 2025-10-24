// tests/produtosRouter.test.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Recurso /produtos (API REST)', () => {
  let createdId = null;

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /produtos', () => {
    it('deve criar produto e retornar 201 + JSON com _id, nome, preco', async () => {
      const res = await request(app)
        .post('/produtos')
        .send({ nome: 'Laranja', preco: 10.0 });

      expect(res.status).toBe(201);
      expect(res.headers['content-type']).toMatch(/json/i);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('nome', 'Laranja');
      expect(Number(res.body.preco)).toBe(10.0);

      createdId = res.body._id;
      expect(createdId).toBeTruthy();
    });

    it('sem JSON retorna 422 + msg adequada', async () => {
      const res = await request(app)
        .post('/produtos')
        .send();

      expect(res.status).toBe(422);
      expect(res.headers['content-type']).toMatch(/json/i);
      expect(res.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
    });
  });

  describe('GET /produtos', () => {
    it('lista produtos com 200 + array JSON', async () => {
      const res = await request(app).get('/produtos');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toMatch(/json/i);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /produtos/:id', () => {
    it('retorna 200 + produto pelo id válido', async () => {
      const res = await request(app).get(`/produtos/${createdId}`);
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toMatch(/json/i);
      expect(res.body).toHaveProperty('_id', createdId);
      expect(res.body).toHaveProperty('nome', 'Laranja');
      expect(Number(res.body.preco)).toBe(10.0);
    });

    it('id inválido retorna 400 + msg "Parâmetro inválido"', async () => {
      const res = await request(app).get('/produtos/0');
      expect(res.status).toBe(400);
      expect(res.headers['content-type']).toMatch(/json/i);
      expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
    });

    it('id inexistente retorna 404 + msg "Produto não encontrado"', async () => {
      const res = await request(app).get('/produtos/000000000000000000000000');
      expect(res.status).toBe(404);
      expect(res.headers['content-type']).toMatch(/json/i);
      expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
    });
  });

  describe('PUT /produtos/:id', () => {
    it('atualiza com 200 + JSON com campos atualizados', async () => {
      const res = await request(app)
        .put(`/produtos/${createdId}`)
        .send({ nome: 'Laranja Pera', preco: 18.0 });

      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toMatch(/json/i);
      expect(res.body).toHaveProperty('_id', createdId);
      expect(res.body).toHaveProperty('nome', 'Laranja Pera');
      expect(Number(res.body.preco)).toBe(18.0);
    });

    it('sem JSON retorna 422 + msg adequada', async () => {
      const res = await request(app)
        .put(`/produtos/${createdId}`)
        .send();

      expect(res.status).toBe(422);
      expect(res.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
    });

    it('id inválido retorna 400', async () => {
      const res = await request(app)
        .put('/produtos/0')
        .send({ nome: 'X', preco: 1 });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
    });

    it('id inexistente retorna 404', async () => {
      const res = await request(app)
        .put('/produtos/000000000000000000000000')
        .send({ nome: 'X', preco: 1 });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
    });
  });

  describe('DELETE /produtos/:id', () => {
    it('deleta com 204 sem conteúdo', async () => {
      const res = await request(app).delete(`/produtos/${createdId}`);
      expect(res.status).toBe(204);
      expect(res.text).toBeFalsy();
    });

    it('id inválido retorna 400', async () => {
      const res = await request(app).delete('/produtos/0');
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
    });

    it('deletar novamente (inexistente) retorna 404', async () => {
      const res = await request(app).delete(`/produtos/${createdId}`);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
    });
  });
});
