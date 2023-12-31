import supertest from 'supertest'
import appServer from '../index'
import { randomUUID } from 'crypto'

const app = appServer.getApp()
describe('POST /api/employers', () => {
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
  test('should return statusCode 201 if data sent is ok', async () => {
    const fakeId = randomUUID()
    const response = await supertest(app).post('/api/employers')
      .send({
        id: fakeId,
        name: 'any_employer_test',
        email: 'test@email.com',
        password: 'any_pass',
        role: 'admin'
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(201)
    expect(response.body.id).toBe(fakeId)
  })
  test('should return randomUUID if id is not provided', async () => {
    const response = await supertest(app).post('/api/employers')
      .send({
        id: undefined,
        name: 'any_employer_test',
        email: 'test@email.com',
        password: 'any_pass',
        role: 'admin'
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.id).toBeDefined()
  })
  test('should return 400 bad request if name is missing', async () => {
    const response = await supertest(app).post('/api/employers')
      .send({
        name: undefined,
        email: 'test@email.com',
        password: 'any_pass',
        role: 'admin'
      })
      .set('Authorization', `Bearer ${token}`)
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
    const response = await supertest(app).post('/api/employers')
      .send({
        name: 'any_employer_test',
        email: undefined,
        password: 'any_pass',
        role: 'admin'
      })
      .set('Authorization', `Bearer ${token}`)
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
    const response = await supertest(app).post('/api/employers')
      .send({
        name: 'any_employer_test',
        email: 'any_email_test',
        password: 'any_pass',
        role: 'admin'
      })
      .set('Authorization', `Bearer ${token}`)
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
    const response = await supertest(app).post('/api/employers')
      .send({
        name: 'any_employer_test',
        email: 'test@email.com',
        password: undefined,
        role: 'admin'
      })
      .set('Authorization', `Bearer ${token}`)
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
    const response = await supertest(app).post('/api/employers')
      .send({
        name: 'any_employer_test',
        email: 'test@email.com',
        password: 'any_pass',
        role: undefined
      })
      .set('Authorization', `Bearer ${token}`)
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
  test('should return 401 unauthorized if token not provided', async () => {
    const fakeId = randomUUID()
    const response = await supertest(app).post('/api/employers')
      .send({
        id: fakeId,
        name: 'any_employer_test',
        email: 'test@email.com',
        password: 'any_pass',
        role: 'admin'
      })
    expect(response.statusCode).toBe(401)
  })
})
