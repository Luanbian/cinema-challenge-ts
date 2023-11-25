import bcrypt from 'bcrypt'
import { BcryptAdapter } from '../criptography/bcrypt.adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise((resolve, reject) => {
      resolve('encrypted_hash')
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
  test('should throws if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.encrypt('value')
    await expect(promise).rejects.toThrow()
  })
})
