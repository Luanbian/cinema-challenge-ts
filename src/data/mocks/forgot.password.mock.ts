import { type IPasswordToken } from '../protocols/forgot.password.protocol'

export const makePasswordTokenMock = (): IPasswordToken => {
  class PasswordTokenMock implements IPasswordToken {
    public async perform (email: string): Promise<string> {
      return 'valid_password_token'
    }
  }
  return new PasswordTokenMock()
}
