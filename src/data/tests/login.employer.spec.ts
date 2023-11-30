import { makeFindUserByAuthStub } from '../../infra/mocks/find.user.by.auth.mock'
import { type IfindUserByAuth } from '../../infra/protocols/find.user.by.auth.protocol'
import { type Iauth } from '../../presentation/controllers/login.employer.controller'
import { makeEncrypterStub } from '../mocks/encrypter.mock'
import { type Encrypter } from '../protocols/encrypter.protocol'
import { type Ilogin } from '../protocols/login.employer.protocol'
import { LoginEmployer } from '../usecases/login.employer'

interface SutTypes {
  repository: IfindUserByAuth
  sut: Ilogin
  bcryptStub: Encrypter
}

const makeSut = (): SutTypes => {
  const repository = makeFindUserByAuthStub()
  const bcryptStub = makeEncrypterStub()
  const sut = new LoginEmployer(repository, bcryptStub)
  return { sut, repository, bcryptStub }
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
    expect(repoSpy).toHaveBeenLastCalledWith(auth.email)
  })
  test('should return token if user finded and password match with success', async () => {
    const { sut } = makeSut()
    const auth: Iauth = {
      email: 'valid_email',
      password: 'valid_password'
    }
    const usecase = await sut.perform(auth)
    expect(usecase).toBe('token')
  })
  test('should return "usuário não encontrado" if user not be found', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'findUserByAuth').mockImplementationOnce(async () => {
      return null
    })
    const auth: Iauth = {
      email: 'invalid_email',
      password: '1234'
    }
    const usecase = await sut.perform(auth)
    expect(usecase).toBe('usuário não encontrado')
  })
  test('should return "senha incorreta" if user be founded, but password dont match', async () => {
    const { sut, bcryptStub } = makeSut()
    jest.spyOn(bcryptStub, 'matchPassword').mockImplementationOnce(async () => {
      return false
    })
    const auth: Iauth = {
      email: 'invalid_email',
      password: 'invalid_password'
    }
    const usecase = await sut.perform(auth)
    expect(usecase).toBe('senha incorreta')
  })
})
