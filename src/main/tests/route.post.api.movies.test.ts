import supertest from 'supertest'
import appServer from '../index'
import { randomUUID } from 'crypto'

const app = appServer.getApp()
describe('POST /api/movies', () => {
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
    const response = await supertest(app).post('/api/movies')
      .send({
        id: fakeId,
        name: 'any_movie_test',
        synopsis: 'any_synopsis_test',
        releaseDate: '02/11/2022',
        inTheaters: true
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(201)
    expect(response.body.id).toBe(fakeId)
  })
  test('should return randomUUID if id is not provided', async () => {
    const response = await supertest(app).post('/api/movies')
      .send({
        id: undefined,
        name: 'any_movie_test',
        synopsis: 'any_synopsis_test',
        releaseDate: '02/11/2022',
        inTheaters: true
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.id).toBeDefined()
  })
  test('should return 400 bad request if name is missing', async () => {
    const response = await supertest(app).post('/api/movies')
      .send({
        name: undefined,
        synopsis: 'any_synopsis_test',
        releaseDate: '02/11/2022',
        inTheaters: true
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
  test('should return 400 bad request if synopsis is missing', async () => {
    const response = await supertest(app).post('/api/movies')
      .send({
        name: 'any_movie_test',
        synopsis: undefined,
        releaseDate: '02/11/2022',
        inTheaters: true
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      errors: [
        {
          type: 'field',
          msg: 'Invalid value',
          path: 'synopsis',
          location: 'body'
        }
      ]
    })
  })
  test('should return 400 bad request if releaseDate is missing', async () => {
    const response = await supertest(app).post('/api/movies')
      .send({
        name: 'any_movie_test',
        synopsis: 'any_synopsis_test',
        releaseDate: undefined,
        inTheaters: true
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      errors: [
        {
          type: 'field',
          msg: 'Invalid value',
          path: 'releaseDate',
          location: 'body'
        }
      ]
    })
  })
  test('should return 400 bad request if inTheaters is missing', async () => {
    const response = await supertest(app).post('/api/movies')
      .send({
        name: 'any_movie_test',
        synopsis: 'any_synopsis_test',
        releaseDate: '02/11/2022',
        inTheaters: undefined
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      errors: [
        {
          type: 'field',
          msg: 'Invalid value',
          path: 'inTheaters',
          location: 'body'
        }
      ]
    })
  })
  test('should return statusCode 401 if token not provided', async () => {
    const fakeId = randomUUID()
    const response = await supertest(app).post('/api/movies')
      .send({
        id: fakeId,
        name: 'any_movie_test',
        synopsis: 'any_synopsis_test',
        releaseDate: '02/11/2022',
        inTheaters: true
      })
    expect(response.statusCode).toBe(401)
  })
})
