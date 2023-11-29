import supertest from 'supertest'
import appServer from '../index'

const app = appServer.getApp()
describe('POST /api/employers', () => {
  afterEach(async () => {
    await appServer.close()
  })
  test('should return statusCode 201 if data sent is ok', async () => {
    const response = await supertest(app).post('/api/employers').send({
      id: 'valid_test_id',
      name: 'any_employer_test',
      email: 'test@email.com',
      password: 'any_pass',
      role: 'admin'
    })
    expect(response.statusCode).toBe(201)
    expect(response.body.id).toBeDefined()
  })
  test('should return 400 bad request if name is missing', async () => {
    const response = await supertest(app).post('/api/employers').send({
      // name: 'any_employer_test',
      email: 'test@email.com',
      password: 'any_pass',
      role: 'admin'
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      errors: [
        {
          type: 'field',
          msg: 'Invalid value',
          path: 'name',
          location: 'body'
        }
      ]
    })
  })
  test('should return 400 bad request if email is missing', async () => {
    const response = await supertest(app).post('/api/employers').send({
      name: 'any_employer_test',
      // email: 'test@email.com',
      password: 'any_pass',
      role: 'admin'
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
  test('should return 400 bad request if email is in wrong format', async () => {
    const response = await supertest(app).post('/api/employers').send({
      name: 'any_employer_test',
      email: 'any_email_test',
      password: 'any_pass',
      role: 'admin'
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      errors: [
        {
          type: 'field',
          value: 'any_email_test',
          msg: 'Invalid value',
          path: 'email',
          location: 'body'
        }
      ]
    })
  })
  test('should return 400 bad request if password is missing', async () => {
    const response = await supertest(app).post('/api/employers').send({
      name: 'any_employer_test',
      email: 'test@email.com',
      // password: 'any_pass',
      role: 'admin'
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      errors: [
        {
          type: 'field',
          msg: 'Invalid value',
          path: 'password',
          location: 'body'
        }
      ]
    })
  })
  test('should return 400 bad request if role is missing', async () => {
    const response = await supertest(app).post('/api/employers').send({
      name: 'any_employer_test',
      email: 'test@email.com',
      password: 'any_pass'
      // role: 'admin'
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      errors: [
        {
          type: 'field',
          msg: 'Invalid role',
          path: 'role',
          location: 'body'
        }
      ]
    })
  })
})
