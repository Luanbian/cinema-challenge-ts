import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt.adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise((resolve, reject) => {
      resolve('encrypted_hash')
    })
  },
  async compare (): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      resolve(true)
    })
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('BcryptAdapter', () => {
  test('Should call Bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('value')
    expect(hashSpy).toHaveBeenCalledWith('value', salt)
  })
  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('value')
    expect(hash).toBe('encrypted_hash')
  })
  test('should call Bcrypt matchPassword with correct values', async () => {
    const sut = makeSut()
    const matchPasswordSpy = jest.spyOn(sut, 'matchPassword')
    await sut.matchPassword('password', 'hashed_password')
    expect(matchPasswordSpy).toHaveBeenCalledWith('password', 'hashed_password')
  })
  test('should return true if password matches with success', async () => {
    const sut = makeSut()
    const matchPassword = await sut.matchPassword('password', 'hashed_password')
    expect(matchPassword).toBe(true)
  })
  test('should return false if password dont match', async () => {
    const sut = makeSut()
    jest.spyOn(sut, 'matchPassword').mockImplementationOnce(async () => {
      return false
    })
    const matchPassword = await sut.matchPassword('invalid_password', 'hashed_password')
    expect(matchPassword).toBe(false)
  })
  test('should throws if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.encrypt('value')
    await expect(promise).rejects.toThrow()
  })
})
