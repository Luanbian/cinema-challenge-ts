import supertest from 'supertest'
import { app } from '../index'
import { type Request, type Response } from 'express'

describe('GET /api/movies', () => {
  test('should return statusCode 200 if consult is ok', async () => {
    const response = await supertest(app).get('/api/movies')
    expect(response.statusCode).toBe(200)
  })
  test('should return 500 if route throws', async () => {
    (app as any).get('/api/data', (req: Request, res: Response) => {
      res.status(500).json({ error: 'Internal server error' })
    })
    const response = await supertest(app).get('/api/data')
    expect(response.status).toBe(500)
    expect(response.body).toEqual({ error: 'Internal server error' })
  })
})
