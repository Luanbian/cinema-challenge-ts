/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type NextFunction, type Response } from 'express'
import { type CustomRequest } from '../../middleware/auth/auth.middleware'

export const makeHttpMock = (): { req: CustomRequest, res: Response, next: NextFunction } => {
  const mockRequest = {} as CustomRequest
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
