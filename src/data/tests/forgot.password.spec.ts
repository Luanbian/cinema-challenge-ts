import { randomUUID } from 'crypto'
import { type Employer } from '../../domain/entities/employer'
import { makeFindUserByAuthStub } from '../../infra/mocks/find.user.by.auth.mock'
import { type IfindUserByAuth } from '../../infra/protocols/find.user.by.auth.protocol'
import { ExpectedError } from '../../presentation/helpers/expected.error'
import { type IPasswordToken } from '../protocols/forgot.password.protocol'

interface SutTypes {
  sut: IPasswordToken
  findUser: IfindUserByAuth
}

export class PasswordToken implements IPasswordToken {
  constructor (
    private readonly repository: IfindUserByAuth
  ) {}

  public async perform (email: string): Promise<string> {
    await this.findUserByEmail(email)
    const token = randomUUID()
    return token
  }

  private async findUserByEmail (email: string): Promise<Employer> {
    const user = await this.repository.findUserByAuth(email)
    if (user === null) throw new ExpectedError('usuário não encontrado')
    else return user
  }
}

export const makeSut = (): SutTypes => {
  const findUser = makeFindUserByAuthStub()
  const sut = new PasswordToken(findUser)
  return { sut, findUser }
}

describe('PasswordToken', () => {
  test('should call repository with correct values', async () => {
    const { sut, findUser } = makeSut()
    const findUserSpy = jest.spyOn(findUser, 'findUserByAuth')
    await sut.perform('valid_email')
    expect(findUserSpy).toHaveBeenCalledWith('valid_email')
  })
  test('should throw if user not be founded', async () => {
    const { sut, findUser } = makeSut()
    jest.spyOn(findUser, 'findUserByAuth').mockImplementationOnce(() => {
      throw new ExpectedError('usuário não encontrado')
    })
    const promise = sut.perform('invalid_email')
    await expect(promise).rejects.toThrow('usuário não encontrado')
  })
  test('should return token if success', async () => {
    const { sut } = makeSut()
    const usecase = await sut.perform('valid_email')
    expect(typeof usecase === 'string').toBeTruthy()
  })
})
