import { makeFindUserByAuthStub } from '../../infra/mocks/find.user.by.auth.mock'
import { type IfindUserByAuth } from '../../infra/protocols/find.user.by.auth.protocol'
import { type LoginEmployerControllerProps } from '../../presentation/controllers/login.employer.controller'
import { makeAuthenticateStub } from '../mocks/authenticate.mock'
import { makeEncrypterStub } from '../mocks/encrypter.mock'
import { type Encrypter } from '../criptography/protocol/encrypter.protocol'
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
  const jwtStub = makeAuthenticateStub()
  const sut = new LoginEmployer(repository, bcryptStub, jwtStub)
  return { sut, repository, bcryptStub }
}

describe('LoginEmployer', () => {
  test('should call repository with correct values', async () => {
    const { sut, repository } = makeSut()
    const repoSpy = jest.spyOn(repository, 'findUserByAuth')
    const auth: LoginEmployerControllerProps = {
      email: 'valid_email',
      password: '1234'
    }
    await sut.perform(auth)
    expect(repoSpy).toHaveBeenLastCalledWith(auth.email)
  })
  test('should return token if user finded and password match with success', async () => {
    const { sut } = makeSut()
    const auth: LoginEmployerControllerProps = {
      email: 'valid_email',
      password: 'valid_password'
    }
    const usecase = await sut.perform(auth)
    expect(typeof usecase === 'string').toBeTruthy()
  })
  test('should throw "usuário não encontrado" if user not be found', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'findUserByAuth').mockImplementationOnce(async () => {
      return null
    })
    const auth: LoginEmployerControllerProps = {
      email: 'invalid_email',
      password: '1234'
    }
    const promise = sut.perform(auth)
    await expect(promise).rejects.toThrow('usuário não encontrado')
  })
  test('should throw "senha incorreta" if user be founded, but password dont match', async () => {
    const { sut, bcryptStub } = makeSut()
    jest.spyOn(bcryptStub, 'matchPassword').mockImplementationOnce(async () => {
      return false
    })
    const auth: LoginEmployerControllerProps = {
      email: 'invalid_email',
      password: 'invalid_password'
    }
    const promise = sut.perform(auth)
    await expect(promise).rejects.toThrow('senha incorreta')
  })
})
