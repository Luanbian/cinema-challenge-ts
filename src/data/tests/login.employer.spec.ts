import { makeFindUserByAuthStub } from '../../infra/mocks/find.user.by.auth.mock'
import { type IfindUserByAuth } from '../../infra/protocols/find.user.by.auth.protocol'
import { makeAuthenticateStub } from '../mocks/authenticate.mock'
import { makeEncrypterStub } from '../mocks/encrypter.mock'
import { type Encrypter } from '../criptography/protocol/encrypter.protocol'
import { type Iauth, type Ilogin } from '../protocols/login.employer.protocol'
import { LoginEmployer } from '../usecases/login.employer'
import { type Authenticate } from '../../middleware/auth/protocol/authenticate.protocol'

interface SutTypes {
  repository: IfindUserByAuth
  sut: Ilogin
  bcryptStub: Encrypter
  jwtStub: Authenticate
}

const makeSut = (): SutTypes => {
  const repository = makeFindUserByAuthStub()
  const bcryptStub = makeEncrypterStub()
  const jwtStub = makeAuthenticateStub()
  const sut = new LoginEmployer(repository, bcryptStub, jwtStub)
  return { sut, repository, bcryptStub, jwtStub }
}

describe('LoginEmployer', () => {
  test('should call repository with correct values', async () => {
    const { sut, repository } = makeSut()
    const repoSpy = jest.spyOn(repository, 'findUserByAuth')
    const auth: Iauth = {
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.perform(auth)
    expect(repoSpy).toHaveBeenLastCalledWith(auth.email)
  })
  test('should call bcrypt with correct values', async () => {
    const { sut, bcryptStub, repository } = makeSut()
    const bcryptSpy = jest.spyOn(bcryptStub, 'matchPassword')
    const auth: Iauth = {
      email: 'valid_email',
      password: 'valid_password'
    }
    const user = await repository.findUserByAuth(auth.email)
    await sut.perform(auth)
    expect(bcryptSpy).toHaveBeenCalledWith(auth.password, user?.password)
  })
  test('should call jwt with correct values', async () => {
    const { sut, jwtStub, repository } = makeSut()
    const jwtSpy = jest.spyOn(jwtStub, 'generateToken')
    const auth: Iauth = {
      email: 'valid_email',
      password: 'valid_password'
    }
    const user = await repository.findUserByAuth(auth.email)
    await sut.perform(auth)
    expect(jwtSpy).toHaveBeenCalledWith(user)
  })
  test('should return token if user finded and password match with success', async () => {
    const { sut } = makeSut()
    const auth: Iauth = {
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
    const auth: Iauth = {
      email: 'invalid_email',
      password: 'valid_password'
    }
    const promise = sut.perform(auth)
    await expect(promise).rejects.toThrow('usuário não encontrado')
  })
  test('should throw "senha incorreta" if user be founded, but password dont match', async () => {
    const { sut, bcryptStub } = makeSut()
    jest.spyOn(bcryptStub, 'matchPassword').mockImplementationOnce(async () => {
      return false
    })
    const auth: Iauth = {
      email: 'invalid_email',
      password: 'invalid_password'
    }
    const promise = sut.perform(auth)
    await expect(promise).rejects.toThrow('senha incorreta')
  })
})
