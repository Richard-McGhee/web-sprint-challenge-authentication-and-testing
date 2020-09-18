const request = require("supertest")

const server = require('../api/server')

describe('Server', () => {
    describe('POST /api/auth/register', () => {
        it('returns status code 201(CREATED)', async () => {
            const user = {
                "username": "TEST1",
                "password": "LOOKATME"
            }

            const res = await request(server).post('/api/auth/register').send(user)
            expect(res.status).toBe(201)
        })

        it('returns status code 500 for duplicate user', async () => {
            const user = {
                "username": "TEST1",
                "password": "LOOKATME"
            }

            const res = await request(server).post('/api/auth/register').send(user)
            expect(res.status).toBe(500)
        })
    })

    describe('POST /api/auth/login', () => {
        it('returns status code 200(OK)', async () => {
            const user = {
                "username": "TEST1",
                "password": "LOOKATME"
            }

            const res = await request(server).post('/api/auth/login').send(user)
            expect(res.status).toBe(200)
        })

        it('returns status code 401 for invalid user', async () => {
            const user = {
                "username": "TEST567",
                "password": "LOOKATME"
            }

            const res = await request(server).post('/api/auth/login').send(user)
            expect(res.status).toBe(401)
        })
    })
})