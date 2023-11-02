/* eslint-disable @typescript-eslint/consistent-type-assertions */
import makeRoute from '../adapters/express.adapter'
import { type Request, type Response } from 'express'
import { FindAllMovieController } from '../../presentation/controllers/find.all.movie.controller'
import { makeListMock } from '../../data/mocks/list.movie.mock'

describe('Express Adapter', () => {
  it('Deve lidar com erros', async () => {
    const mockRequest = {} as Request
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response
    const listmock = makeListMock()
    const controller = new FindAllMovieController(listmock)
    jest.spyOn(controller, 'handle').mockImplementation(async () => {
      throw new Error('Internal server error')
    })
    const route = makeRoute(controller)
    await route(mockRequest, mockResponse)
    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith('Internal server error')
  })
})
