import { type Employer } from '../../domain/entities/employer'
import { makeFindUserByAuthStub } from '../../infra/mocks/find.user.by.auth.mock'
import { type IfindUserByAuth } from '../../infra/protocols/find.user.by.auth.protocol'
import { ExpectedError } from '../../presentation/helpers/expected.error'
import { type IredefinePassword, type IredefinePasswordProps } from '../protocols/redefine.password.protocol'

interface SutTypes {
  sut: IredefinePassword
  find: IfindUserByAuth
}

const makeSut = (): SutTypes => {
  const find = makeFindUserByAuthStub()
  const sut = new RedefinePassword(find)
  return { sut, find }
}

export class RedefinePassword implements IredefinePassword {
  constructor (
    private readonly user: IfindUserByAuth
  ) {}

  public async perform (paramns: IredefinePasswordProps): Promise<string> {
    const user = await this.findUserByEmail(paramns.email)
    await this.veirfyProvidedToken(user.passwordToken, paramns.token)
    return 'password redefined'
  }

  private async findUserByEmail (email: string): Promise<Employer> {
    const user = await this.user.findUserByAuth(email)
    if (user === null) throw new ExpectedError('usuário não encontrado')
    else return user
  }

  private async veirfyProvidedToken (userToken: string, providedToken: string): Promise<void> {
    if (userToken !== providedToken) {
      throw new ExpectedError('token inválido')
    }
  }
}

describe('RedefinePassword', () => {
  test('should return message if success', async () => {
    const { sut } = makeSut()
    const props: IredefinePasswordProps = {
      email: 'valid_email',
      token: 'valid_password_token',
      newPassword: 'new_password'
    }
    const usecase = await sut.perform(props)
    expect(usecase).toBe('password redefined')
  })
  test('should throw if user not be founded', async () => {
    const { sut, find } = makeSut()
    jest.spyOn(find, 'findUserByAuth').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new ExpectedError('usuário não encontrado'))
      })
    })
    const props: IredefinePasswordProps = {
      email: 'invalid_email',
      token: 'valid_password_token',
      newPassword: 'new_password'
    }
    const promise = sut.perform(props)
    await expect(promise).rejects.toThrow('usuário não encontrado')
  })
  test('should throw if token provided was different of user token in db', async () => {
    const { sut } = makeSut()
    const promise = sut.perform({
      email: 'valid_email',
      token: 'invalid_password_token',
      newPassword: 'new_pass'
    })
    await expect(promise).rejects.toThrow('token inválido')
  })
})
