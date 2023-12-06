import { type IupdatePasswordToken, type IupdatePasswordTokenProps } from '../protocols/update.passwordToken.protocol'

export const makeUpdatePasswordTokenStub = (): IupdatePasswordToken => {
  class UpdatePasswordTokenStub implements IupdatePasswordToken {
    public async alterPassToken (paramns: IupdatePasswordTokenProps): Promise<void> {}
  }
  return new UpdatePasswordTokenStub()
}
