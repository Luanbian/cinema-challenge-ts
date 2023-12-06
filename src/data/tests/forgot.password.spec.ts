import { makeFindUserByAuthStub } from '../../infra/mocks/find.user.by.auth.mock'
import { makeUpdatePasswordTokenStub } from '../../infra/mocks/update.passwordToken.mock'
import { type IfindUserByAuth } from '../../infra/protocols/find.user.by.auth.protocol'
import { type IupdatePasswordToken } from '../../infra/protocols/update.passwordToken.protocol'
import { ExpectedError } from '../../presentation/helpers/expected.error'
import { type IForgotPassword } from '../protocols/forgot.password.protocol'
import { ForgotPassword } from '../usecases/forgot.password'

interface SutTypes {
  sut: IForgotPassword
  findUser: IfindUserByAuth
  reset: IupdatePasswordToken
}

const makeSut = (): SutTypes => {
  const findUser = makeFindUserByAuthStub()
  const reset = makeUpdatePasswordTokenStub()
  const sut = new ForgotPassword(findUser, reset)
  return { sut, findUser, reset }
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
  test('should return token and expiresAt if success', async () => {
    const { sut } = makeSut()
    const usecase = await sut.perform('valid_email')
    expect(typeof usecase.token === 'string').toBeTruthy()
    expect(usecase.expiresAt).toBeInstanceOf(Date)
  })
  test('should call reset repository with correct values', async () => {
    const { sut, reset } = makeSut()
    const resetSpy = jest.spyOn(reset, 'alterPassToken')
    const usecase = await sut.perform('valid_email')
    expect(resetSpy).toHaveBeenCalledWith({
      id: 'valid_id',
      token: usecase.token,
      expiresAt: usecase.expiresAt
    })
  })
})
