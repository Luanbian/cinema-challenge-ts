import supertest from 'supertest'
import appServer from '../index'

const app = appServer.getApp()
describe('POST /api/movies', () => {
  afterEach(async () => {
    await appServer.close()
  })
  test('should return statusCode 201 if data sent is ok', async () => {
    const response = await supertest(app).post('/api/movies').send({
      id: 'valid_test_id',
      name: 'any_movie_test',
      synopsis: 'any_synopsis_test',
      releaseDate: '02/11/2022',
      inTheaters: true
    })
    expect(response.statusCode).toBe(201)
    expect(response.body.id).toBeDefined()
  })
  test('should return 400 bad request if name is missing', async () => {
    const response = await supertest(app).post('/api/movies').send({
      // name: 'any_movie_test',
      synopsis: 'any_synopsis_test',
      releaseDate: '02/11/2022',
      inTheaters: true
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
  test('should return 400 bad request if synopsis is missing', async () => {
    const response = await supertest(app).post('/api/movies').send({
      name: 'any_movie_test',
      // synopsis: 'any_synopsis_test',
      releaseDate: '02/11/2022',
      inTheaters: true
    })
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
    const response = await supertest(app).post('/api/movies').send({
      name: 'any_movie_test',
      synopsis: 'any_synopsis_test',
      // releaseDate: '02/11/2022',
      inTheaters: true
    })
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
    const response = await supertest(app).post('/api/movies').send({
      name: 'any_movie_test',
      synopsis: 'any_synopsis_test',
      releaseDate: '02/11/2022'
      // inTheaters: true
    })
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
})
