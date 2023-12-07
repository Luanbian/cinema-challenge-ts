import supertest from 'supertest'
import appServer from '..'

const app = appServer.getApp()
describe('POST /api/forgotPassword', () => {
  afterEach(async () => {
    await appServer.close()
  })
  test('should return status code 200, token and token expires if success', async () => {
    const response = await supertest(app).post('/api/forgotPassword').send({
      email: 'seed@test.com'
    })
    expect(response.statusCode).toBe(200)
    expect(response.body.token).toBeDefined()
    expect(response.body.expiresAt).toBeDefined()
  })
  test('should return 400 bad request if email not be provided', async () => {
    const response = await supertest(app).post('/api/forgotPassword')
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      errors: [
        {
          type: 'field',
          msg: 'Invalid value',
          path: 'email',
          location: 'body'
        }
      ]
    })
  })
  test('should return 400 bad request if email provided was invalid format', async () => {
    const response = await supertest(app).post('/api/forgotPassword').send({
      email: 'invalid.format.com'
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      errors: [
        {
          type: 'field',
          value: 'invalid.format.com',
          msg: 'Invalid value',
          path: 'email',
          location: 'body'
        }
      ]
    })
  })
})
