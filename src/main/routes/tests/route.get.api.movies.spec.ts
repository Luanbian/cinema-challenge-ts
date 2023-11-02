import supertest from 'supertest'
import { app } from '../../index'

describe('GET /api/movies', () => {
  test('should return statusCode 200 if consult is ok', async () => {
    const response = await supertest(app).get('/api/movies')
    expect(response.statusCode).toBe(200)
  })
})
