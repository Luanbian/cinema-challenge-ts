import supertest from 'supertest'
import appServer from '../index'

const app = appServer.getApp()
describe('POST /api/login', () => {
  afterEach(async () => {
    await appServer.close()
  })
  test('should return token if user loged with success', async () => {
    const response = await supertest(app).post('/api/login').send({
      email: 'seed@test.com',
      password: '123'
    })
    expect(response.statusCode).toBe(200)
    expect(typeof response.body === 'string').toBeTruthy()
  })
  test('should return "senha incorreta" and status code 401 if password not match', async () => {
    const response = await supertest(app).post('/api/login').send({
      email: 'seed@test.com',
      password: 'invalid_password'
    })
    expect(response.statusCode).toBe(401)
    expect(response.body).toBe('senha incorreta')
  })
  test('should return "usuário não encontrado" and status code 401 if user not found', async () => {
    const response = await supertest(app).post('/api/login').send({
      email: 'invalid_email@gmail.com',
      password: '123'
    })
    expect(response.statusCode).toBe(401)
    expect(response.body).toBe('usuário não encontrado')
  })
  test('should return bad request status code 400 if email was in invalid format', async () => {
    const response = await supertest(app).post('/api/login').send({
      email: 'invalid_email',
      password: '123'
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      errors: [
        {
          type: 'field',
          msg: 'Invalid value',
          path: 'email',
          location: 'body',
          value: 'invalid_email'
        }
      ]
    })
  })
  test('should return bad request status code 400 if password was number', async () => {
    const response = await supertest(app).post('/api/login').send({
      email: 'seed@test.com',
      password: 1234
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      errors: [
        {
          type: 'field',
          msg: 'Invalid value',
          path: 'password',
          location: 'body',
          value: 1234
        }
      ]
    })
  })
  test('should return bad request status code 400 if password was boolean', async () => {
    const response = await supertest(app).post('/api/login').send({
      email: 'seed@test.com',
      password: true
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      errors: [
        {
          type: 'field',
          msg: 'Invalid value',
          path: 'password',
          location: 'body',
          value: true
        }
      ]
    })
  })
})
