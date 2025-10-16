const supertest = require ('supertest')
const app = require ('../../app')
const Test = require('supertest/lib/test')
const request = supertest(app)
const url = '/tarefas'
let id = null

describe('Testando o CRUD de tarefas', () => {
    Test('POST/ deve retornar 201', async () => {
        const response = await request.post(url).send({
            nome: "Teste",
            descricao: "Teste de descricao",
            status: "Pendente"
        })
        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()
        id = response.body._id
    })
    
    test ('GET/ deve retornar 200', async () => {
        const response = await request.get(url)
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    test ('GET/:id deve retornar 200', async () => {
        const response = await request.get(`${url}/${id}`)
        expect(response.status).toBe(200)
        expect(response.body._id).toBe(id)
    })

    test ('PUT/:id deve retornar 200', async () => {  
        const response = await request.put(`${url}/${id}`).send({
            nome: "Teste Atualizado",
            descricao: "Teste de descricao atualizado",
            status: "Concluido"
        })
        expect(response.status).toBe(200)
        expect(response.body.nome).toBe("Teste Atualizado")
        expect(response.body.descricao).toBe("Teste de descricao atualizado")
        expect(response.body.status).toBe("Concluido")
    })

    test ('DELETE/:id deve retornar 204', async () => {  
        const response = await request.delete(`${url}/${id}`)
        expect(response.status).toBe(204)
    })
})