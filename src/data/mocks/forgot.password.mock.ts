import { type IPasswordToken } from '../protocols/forgot.password.protocol'

export const makePasswordTokenMock = (): IPasswordToken => {
  class PasswordTokenMock implements IPasswordToken {
    public async perform (email: string): Promise<{ token: string, expiresAt: Date }> {
      return {
        token: 'valid_password_token',
        expiresAt: new Date('01/11/2023')
      }
    }
  }
  return new PasswordTokenMock()
}
