import bcrypt from 'bcrypt'
import { type Encrypter } from './protocol/encrypter.protocol'

export class BcryptAdapter implements Encrypter {
  constructor (private readonly salt: number) {}

  public async encrypt (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  public async matchPassword (value: string, passHashed: string): Promise<boolean> {
    const passwordMatch = await bcrypt.compare(value, passHashed)
    return passwordMatch
  }
}
