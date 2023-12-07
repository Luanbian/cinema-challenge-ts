import supertest from 'supertest'
import appServer from '..'

const app = appServer.getApp()
describe('POST api/resetPassword', () => {
  let token: string
  beforeEach(async () => {
    const request = await supertest(app).post('/api/login').send({
      email: 'seed@test.com'
    })
    token = request.body.token
  })
  afterEach(async () => {
    await appServer.close()
  })
  test('should return status code 200 and a message if success', async () => {
    const response = await supertest(app).post('/api/resetPassword').send({
      email: 'seed@test.com',
      newPassword: '1234567',
      token
    })
    expect(response.statusCode).toBe(200)
    expect(response.body).toBe('password redefined')
  })
  test('should return status code 400 and a message if token was invalid', async () => {
    const response = await supertest(app).post('/api/resetPassword').send({
      email: 'seed@test.com',
      newPassword: '1234567',
      token: 'invalid_token'
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toBe('token inválido')
  })
  test('should return status code 400 and a message if email not found', async () => {
    const response = await supertest(app).post('/api/resetPassword').send({
      email: 'user_invalid@test.com',
      newPassword: '1234567',
      token
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toBe('usuário não encontrado')
  })
  test('should return status code 400 and a error if email not provided', async () => {
    const response = await supertest(app).post('/api/resetPassword').send({
      email: undefined,
      newPassword: '1234567',
      token
    })
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
  test('should return status code 400 and a error if email provided was an invalid format', async () => {
    const response = await supertest(app).post('/api/resetPassword').send({
      email: 'invalid_email_format.com',
      newPassword: '1234567',
      token
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      errors: [
        {
          type: 'field',
          value: 'seedtest.com',
          msg: 'Invalid value',
          path: 'email',
          location: 'body'
        }
      ]
    })
  })
  test('should return status code 400 and a error if token was not provided', async () => {
    const response = await supertest(app).post('/api/resetPassword').send({
      email: 'invalid_email_format.com',
      newPassword: '1234567',
      token: undefined
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      errors: [
        {
          type: 'field',
          msg: 'Invalid value',
          path: 'token',
          location: 'body'
        }
      ]
    })
  })
  test('should return status code 400 and a error if new password was not provided', async () => {
    const response = await supertest(app).post('/api/resetPassword').send({
      email: 'invalid_email_format.com',
      newPassword: undefined,
      token
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      errors: [
        {
          type: 'field',
          msg: 'Invalid value',
          path: 'newPassword',
          location: 'body'
        }
      ]
    })
  })
})
