import supertest from 'supertest'
import appServer from '../index'

const app = appServer.getApp()
describe('PUT /api/movies/:id', () => {
  afterEach(async () => {
    await appServer.close()
  })
  test('should return status code 404 if id not exist', async () => {
    const response = await supertest(app).put('/api/movies/invalid_id')
    expect(response.statusCode).toBe(404)
    expect(response.body).toBe('id not found')
  })
})
