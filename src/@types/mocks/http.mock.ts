/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type NextFunction, type Request, type Response } from 'express'

export const makeHttpMock = (): { req: Request, res: Response, next: NextFunction } => {
  const mockRequest = {} as Request
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as unknown as Response
  const mockNextFunction = jest.fn() as NextFunction
  return {
    req: mockRequest,
    res: mockResponse,
    next: mockNextFunction
  }
}
