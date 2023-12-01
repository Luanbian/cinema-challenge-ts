import jwt, { type JwtPayload } from 'jsonwebtoken'
import { JwtAdapter } from './jwt.adapter'
import { type Employer } from '../../domain/entities/employer'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise((resolve, reject) => {
      resolve('token')
    })
  },
  async verify (): Promise<string | JwtPayload> {
    return await new Promise((resolve, reject) => {
      resolve({
        sub: 'content-jwt-test',
        exp: 48,
        jti: 'jwt-id'
      })
    })
  }
}))

const secret = 'fake_secret_key'
const makeSut = (): JwtAdapter => {
  return new JwtAdapter(secret)
}

describe('JwtAdapter', () => {
  test('should call generateToken with correct values', async () => {
    const sut = makeSut()
    const tokenSpy = jest.spyOn(jwt, 'sign')
    const user: Employer = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid.email@gmail.com',
      password: 'hashed_password',
      role: 'CONSULTER'
    }
    await sut.generateToken(user)
    expect(tokenSpy).toHaveBeenCalledWith(user, secret)
  })
  test('should return a token on success', async () => {
    const sut = makeSut()
    const user: Employer = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid.email@gmail.com',
      password: 'hashed_password',
      role: 'CONSULTER'
    }
    const token = await sut.generateToken(user)
    expect(token).toBe('token')
  })
  test('should call verifyToken with correct values', async () => {
    const sut = makeSut()
    const verifyTokenSpy = jest.spyOn(jwt, 'verify')
    const token = 'token'
    await sut.verifyToken(token)
    expect(verifyTokenSpy).toHaveBeenCalledWith(token, secret)
  })
  test('should return JwtPayload if token matched on success', async () => {
    const sut = makeSut()
    const token = 'token'
    const verifyToken = await sut.verifyToken(token)
    expect(verifyToken).toEqual({
      sub: 'content-jwt-test',
      exp: 48,
      jti: 'jwt-id'
    })
  })
  test('should return string if token not match', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      return 'Token inválido'
    })
    const token = 'invalid_token'
    const verifytoken = await sut.verifyToken(token)
    expect(verifytoken).toBe('Token inválido')
  })
  test('should throw if jsonWebToken throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const user: Employer = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid.email@gmail.com',
      password: 'hashed_password',
      role: 'CONSULTER'
    }
    const promise = sut.generateToken(user)
    await expect(promise).rejects.toThrow()
  })
})
