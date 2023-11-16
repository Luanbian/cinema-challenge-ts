/* eslint-disable @typescript-eslint/consistent-type-assertions */
import makeRoute from '../adapters/express.adapter'
import { type Request, type Response } from 'express'

describe('Express Adapter', () => {
  test('should return 200 if success', async () => {
    const mockRequest = {} as Request
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response
    const route = makeRoute({ async handle () { return { statusCode: 200, body: 'sucesso' } } })
    await route(mockRequest, mockResponse)
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith('sucesso')
  })
  test('should return 500 if throws an error', async () => {
    const mockRequest = {} as Request
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response
    const route = makeRoute({ async handle () { throw new Error() } })
    await route(mockRequest, mockResponse)
    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith('Internal server error')
  })
})
