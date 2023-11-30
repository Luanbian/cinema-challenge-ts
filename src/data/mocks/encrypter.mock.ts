import { type Encrypter } from '../protocols/encrypter.protocol'

export const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    public async encrypt (value: string): Promise<string> {
      return await new Promise((resolve, reject) => {
        resolve('hashed_password')
      })
    }

    public async matchPassword (value: string, passHashed: string): Promise<boolean> {
      return await new Promise((resolve, reject) => {
        resolve(true)
      })
    }
  }
  return new EncrypterStub()
}
