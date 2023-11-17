import supertest from 'supertest'
import appServer from '../index'

const app = appServer.getApp()
describe('GET /api/movies', () => {
  afterAll(() => {
    appServer.close()
  })
  test('should return statusCode 200 if consult is ok', async () => {
    const response = await supertest(app).get('/api/movies')
    expect(response.statusCode).toBe(200)
  })
})
