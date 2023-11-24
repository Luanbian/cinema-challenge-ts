import supertest from 'supertest'
import appServer from '../index'

const app = appServer.getApp()
describe('GET /api/employers', () => {
  afterEach(() => {
    appServer.close()
  })
  test('should return statusCode 200 or 204 if consult is ok', async () => {
    const response = await supertest(app).get('/api/employers')
    expect(response.statusCode === 200 || response.statusCode === 204).toBe(true)
  })
})
