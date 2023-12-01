import { makeHttpMock } from '../../@types/mocks/http.mock'
import { makeAuthenticateStub } from '../../data/mocks/authenticate.mock'
import makeAuthMiddleware, { type CustomRequest as Request } from './auth.middleware'

const authenticateStub = makeAuthenticateStub()
const sut = makeAuthMiddleware(authenticateStub)

describe('Auth middleware adapter', () => {
  test('should return 401 if token is not provided with json "Token not provided"', async () => {
    const { req, res, next } = makeHttpMock()
    const mockHeader = { ...req, headers: {} } as Request
    await sut(mockHeader, res, next)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith('Token not provided')
  })
  test('should call next() if token is provided and verified', async () => {
    const { req, res, next } = makeHttpMock()
    const mockHeader = { ...req, headers: { authorization: 'Bearer valid_token' } } as Request
    await sut(mockHeader, res, next)
    expect(next).toHaveBeenCalled()
  })
  test('should return 401 if token verified fails with JsonWebTokenError', async () => {
    const { req, res, next } = makeHttpMock()
    const mockHeader = { ...req, headers: { authorization: 'Bearer invalid_token' } } as Request
    jest.spyOn(authenticateStub, 'verifyToken').mockImplementationOnce(async () => {
      const error = new Error('Invalid token')
      error.name = 'JsonWebTokenError'
      throw error
    })
    await sut(mockHeader, res, next)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' })
  })
  test('should return 500 if authenticate throws', async () => {
    const { req, res, next } = makeHttpMock()
    const mockHeader = { ...req, headers: { authorization: 'Bearer valid_token' } } as Request
    jest.spyOn(authenticateStub, 'verifyToken').mockImplementationOnce(async () => {
      throw new Error()
    })
    await sut(mockHeader, res, next)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'internal server error' })
  })
})
