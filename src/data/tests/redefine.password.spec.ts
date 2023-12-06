import { type Employer } from '../../domain/entities/employer'
import { makeFindUserByAuthStub } from '../../infra/mocks/find.user.by.auth.mock'
import { makeUpdatePasswordStub } from '../../infra/mocks/update.password.mock'
import { type IfindUserByAuth } from '../../infra/protocols/find.user.by.auth.protocol'
import { type IupdatePassword } from '../../infra/protocols/update.password.protocol'
import { ExpectedError } from '../../presentation/helpers/expected.error'
import { type Encrypter } from '../criptography/protocol/encrypter.protocol'
import { makeEncrypterStub } from '../mocks/encrypter.mock'
import { type IredefinePassword, type IredefinePasswordProps } from '../protocols/redefine.password.protocol'

interface SutTypes {
  sut: IredefinePassword
  find: IfindUserByAuth
  encrypter: Encrypter
  password: IupdatePassword
}

const makeSut = (): SutTypes => {
  const encrypter = makeEncrypterStub()
  const find = makeFindUserByAuthStub()
  const password = makeUpdatePasswordStub()
  const sut = new RedefinePassword(find, encrypter, password)
  return { sut, find, encrypter, password }
}

export class RedefinePassword implements IredefinePassword {
  constructor (
    private readonly user: IfindUserByAuth,
    private readonly encrypter: Encrypter,
    private readonly password: IupdatePassword
  ) {}

  public async perform (paramns: IredefinePasswordProps): Promise<string> {
    const user = await this.findUserByEmail(paramns.email)
    await this.veirfyProvidedToken(user.passwordToken, paramns.token)
    await this.verifyTokenIsExpires(user.passwordTokenExpires)
    const hashedPassword = await this.encrypter.encrypt(paramns.newPassword)
    await this.password.alterPass(user.id, hashedPassword)
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

  private async verifyTokenIsExpires (userTokenExpiresAt: Date): Promise<void> {
    const now = new Date()
    now.setHours(now.getHours())
    if (userTokenExpiresAt < now) {
      throw new ExpectedError('token expirado')
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
  test('should throw if token provided was expired', async () => {
    const { sut, find } = makeSut()
    jest.spyOn(find, 'findUserByAuth').mockImplementationOnce(async (): Promise<Employer | null> => {
      return {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: '1#24%$6',
        role: 'CONSULTER',
        passwordToken: 'valid_password_token',
        passwordTokenExpires: new Date('01/11/2023')
      }
    })
    const promise = sut.perform({
      email: 'valid_email',
      token: 'valid_password_token',
      newPassword: 'new_pass'
    })
    await expect(promise).rejects.toThrow('token expirado')
  })
  test('should call encrypter with correct values', async () => {
    const { sut, encrypter } = makeSut()
    const encryptSpy = jest.spyOn(encrypter, 'encrypt')
    await sut.perform({
      email: 'valid_email',
      token: 'valid_password_token',
      newPassword: 'new_pass'
    })
    expect(encryptSpy).toHaveBeenCalledWith('new_pass')
  })
  test('should call update password with correct values', async () => {
    const { sut, password } = makeSut()
    const passwordSpy = jest.spyOn(password, 'alterPass')
    await sut.perform({
      email: 'valid_email',
      token: 'valid_password_token',
      newPassword: 'new_pass'
    })
    expect(passwordSpy).toHaveBeenCalledWith('valid_id', 'hashed_password')
  })
})
