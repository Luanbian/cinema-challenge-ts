import { makeLoginMock } from '../../data/mocks/login.employer.mock'
import { type Ilogin } from '../../data/protocols/login.employer.protocol'
import { type Iauth, LoginEmployerController } from '../controllers/login.employer.controller'

interface SutTypes {
  sut: LoginEmployerController
  login: Ilogin
}

const makeSut = (): SutTypes => {
  const login = makeLoginMock()
  const sut = new LoginEmployerController(login)
  return { sut, login }
}

describe('LoginEmployerController', () => {
  test('should call usecase with correct values', async () => {
    const { sut, login } = makeSut()
    const loginSpy = jest.spyOn(login, 'perform')
    const auth: Iauth = {
      email: 'valid_email',
      password: '1234'
    }
    await sut.handle(auth)
    expect(loginSpy).toHaveBeenCalledWith(auth)
  })
  test('should return status code 200 if user autorized with success', async () => {
    const { sut } = makeSut()
    const auth: Iauth = {
      email: 'valid_email',
      password: '1234'
    }
    const httpResponse = await sut.handle(auth)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toBe('autorized')
  })
  test('should return status code 401 if user not autorized', async () => {
    const { sut, login } = makeSut()
    jest.spyOn(login, 'perform').mockImplementationOnce(async () => {
      return null
    })
    const auth: Iauth = {
      email: 'invalid_email',
      password: '1234'
    }
    const httpResponse = await sut.handle(auth)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toBe('não autorizado')
  })
})
