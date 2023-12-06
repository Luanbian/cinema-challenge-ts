import { type IupdatePassword } from '../protocols/update.password.protocol'

export const makeUpdatePasswordStub = (): IupdatePassword => {
  class UpdatePassword implements IupdatePassword {
    public async alterPass (id: string, newPass: string): Promise<void> {}
  }
  return new UpdatePassword()
}
