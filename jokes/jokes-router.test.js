const request = require("supertest")

const server = require('../api/server')

describe('Server', () => {
    describe('GET /api/jokes', () => {
        it('returns status code 500 for no access', async () => {
            const res = await request(server).get('/api/jokes')
            expect(res.status).toBe(500)
        })

        it('return shall not pass with no access', async () => {
            const res = await request(server).get('/api/jokes')
            expect(res.type).toBe('application/json')
        })
    })
})