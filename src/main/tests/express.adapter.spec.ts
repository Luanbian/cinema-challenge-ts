/* eslint-disable @typescript-eslint/consistent-type-assertions */
import makeRoute from '../adapters/express.adapter'
import { type Request, type Response } from 'express'

describe('Express Adapter', () => {
  it('Deve lidar com erros', async () => {
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
