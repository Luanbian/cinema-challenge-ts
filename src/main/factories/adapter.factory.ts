import { JwtAdapter } from '../../middleware/token/jwt.adapter'
import { BcryptAdapter } from '../../data/criptography/bcrypt.adapter'
import { type Authenticate } from '../../middleware/auth/protocol/authenticate.protocol'
import { type Encrypter } from '../../data/criptography/protocol/encrypter.protocol'
import * as dotenv from 'dotenv'
import { type Ilogs } from '../../logs/protocol/log.adapter.protocol'
import { LogAdapter } from '../../logs/adapter/log.adapter'
dotenv.config()

export const makeEncrypterAdapter = (): Encrypter => {
  const salt = 12
  return new BcryptAdapter(salt)
}

export const makeAuthenticateAdapter = (): Authenticate => {
  const secret = process.env.SECRET as string
  return new JwtAdapter(secret)
}

export const makeLog = (): Ilogs => {
  return new LogAdapter()
}
