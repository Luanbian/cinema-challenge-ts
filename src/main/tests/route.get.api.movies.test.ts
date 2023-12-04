import supertest from 'supertest'
import appServer from '../index'

const app = appServer.getApp()
describe('GET /api/movies', () => {
  let token: string
  beforeEach(async () => {
    const login = await supertest(app).post('/api/login').send({
      email: 'seed@test.com',
      password: '123'
    })
    token = login.text.replace(/\\|"/g, '')
  })
  afterEach(async () => {
    await appServer.close()
  })
  test('should return statusCode 200 if consult is ok', async () => {
    const response = await supertest(app)
      .get('/api/movies')
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
  })
  test('should return statusCode 401 if token not provided', async () => {
    const response = await supertest(app)
      .get('/api/movies')
    expect(response.statusCode).toBe(401)
  })
})
