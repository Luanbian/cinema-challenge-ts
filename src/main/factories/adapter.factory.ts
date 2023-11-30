import { JwtAdapter } from '../../data/auth/jwt.adapter'
import { BcryptAdapter } from '../../data/criptography/bcrypt.adapter'
import { type Authenticate } from '../../data/protocols/authenticate.protocol'
import { type Encrypter } from '../../data/protocols/encrypter.protocol'
import * as dotenv from 'dotenv'
dotenv.config()

export const makeEncrypterAdapter = (): Encrypter => {
  const salt = 12
  return new BcryptAdapter(salt)
}

export const makeAuthenticateAdapter = (): Authenticate => {
  const secret = process.env.SECRET as string
  return new JwtAdapter(secret)
}
