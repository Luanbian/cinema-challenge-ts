/* eslint-disable @typescript-eslint/consistent-type-assertions */
import makeRoute from '../adapters/express.adapter'
import { type Request, type Response } from 'express'

const makeHttpMock = (): { req: Request, res: Response } => {
  const mockRequest = {} as Request
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as unknown as Response
  return {
    req: mockRequest,
    res: mockResponse
  }
}

describe('Express Adapter', () => {
  test('should return 200 if success', async () => {
    const { req, res } = makeHttpMock()
    const route = makeRoute({ async handle () { return { statusCode: 200, body: 'sucesso' } } })
    await route(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith('sucesso')
  })
  test('should return 500 if throws an error', async () => {
    const { req, res } = makeHttpMock()
    const route = makeRoute({ async handle () { throw new Error() } })
    await route(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith('Internal server error')
  })
})
