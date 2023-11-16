/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Request, type Response } from 'express'

export const makeHttpMock = (): { req: Request, res: Response } => {
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
