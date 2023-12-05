import { type IredefinePasswordProps, type IredefinePassword } from '../protocols/redefine.password.protocol'

export const makeRedefinePasswordMock = (): IredefinePassword => {
  class RedefinePasswordMock implements IredefinePassword {
    public async perform (paramns: IredefinePasswordProps): Promise<string> {
      return 'redefined'
    }
  }
  return new RedefinePasswordMock()
}
