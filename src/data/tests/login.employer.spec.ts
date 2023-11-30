import { makeFindUserByAuthStub } from '../../infra/mocks/find.user.by.auth.mock'
import { type IfindUserByAuth } from '../../infra/protocols/find.user.by.auth.protocol'
import { type Iauth } from '../../presentation/controllers/login.employer.controller'
import { type Ilogin } from '../protocols/login.employer.protocol'
import { LoginEmployer } from '../usecases/login.employer'

interface SutTypes {
  repository: IfindUserByAuth
  sut: Ilogin
}

const makeSut = (): SutTypes => {
  const repository = makeFindUserByAuthStub()
  const sut = new LoginEmployer(repository)
  return { sut, repository }
}

describe('LoginEmployer', () => {
  test('should call repository with correct values', async () => {
    const { sut, repository } = makeSut()
    const repoSpy = jest.spyOn(repository, 'findUserByAuth')
    const auth: Iauth = {
      email: 'valid_email',
      password: '1234'
    }
    await sut.perform(auth)
    expect(repoSpy).toHaveBeenLastCalledWith(auth)
  })
  test('should return token if user finded with success', async () => {
    const { sut } = makeSut()
    const auth: Iauth = {
      email: 'valid_email',
      password: '1234'
    }
    const usecase = await sut.perform(auth)
    expect(usecase).toBe('token')
  })
  test('should return null if user not be found', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'findUserByAuth').mockImplementationOnce(async () => {
      return null
    })
    const auth: Iauth = {
      email: 'invalid_email',
      password: '1234'
    }
    const usecase = await sut.perform(auth)
    expect(usecase).toBe(null)
  })
})
