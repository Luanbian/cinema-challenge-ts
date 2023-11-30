import { type Encrypter } from '../protocols/encrypter.protocol'

export const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    public async encrypt (value: string): Promise<string> {
      return await new Promise((resolve, reject) => {
        resolve('hashed_password')
      })
    }

    public async compare (value: string, passHashed: string): Promise<boolean> {
      return true
    }
  }
  return new EncrypterStub()
}
