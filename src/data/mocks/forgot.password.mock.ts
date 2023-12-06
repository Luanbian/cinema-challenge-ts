import { type IForgotPassword } from '../protocols/forgot.password.protocol'

export const makePasswordTokenMock = (): IForgotPassword => {
  class PasswordTokenMock implements IForgotPassword {
    public async perform (email: string): Promise<{ token: string, expiresAt: Date }> {
      return {
        token: 'valid_password_token',
        expiresAt: new Date('01/11/2023')
      }
    }
  }
  return new PasswordTokenMock()
}
