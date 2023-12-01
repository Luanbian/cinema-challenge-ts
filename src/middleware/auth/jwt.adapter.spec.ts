import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt.adapter'
import { type Employer } from '../../domain/entities/employer'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise((resolve, reject) => {
      resolve('token')
    })
  }
}))

const secret = 'fake_secret_key'
const makeSut = (): JwtAdapter => {
  return new JwtAdapter(secret)
}

describe('JwtAdapter', () => {
  test('should call Authenticate with correct values', async () => {
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
