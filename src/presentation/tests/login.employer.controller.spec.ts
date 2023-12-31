import { makeLoginMock } from '../../data/mocks/login.employer.mock'
import { type Ilogin } from '../../data/protocols/login.employer.protocol'
import { type LoginEmployerControllerProps, LoginEmployerController } from '../controllers/login.employer.controller'
import { ExpectedError } from '../helpers/expected.error'

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
    const auth: LoginEmployerControllerProps = {
      email: 'valid_email',
      password: '1234'
    }
    await sut.handle(auth)
    expect(loginSpy).toHaveBeenCalledWith(auth)
  })
  test('should return status code 200 if user autorized with success', async () => {
    const { sut } = makeSut()
    const auth: LoginEmployerControllerProps = {
      email: 'valid_email',
      password: '1234'
    }
    const httpResponse = await sut.handle(auth)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toBe('autorized')
  })
  test('should return status code 401 if email not found', async () => {
    const { sut, login } = makeSut()
    jest.spyOn(login, 'perform').mockImplementationOnce(async () => {
      throw new ExpectedError('usuário não encontrado')
    })
    const auth: LoginEmployerControllerProps = {
      email: 'invalid_email',
      password: '1234'
    }
    const httpResponse = await sut.handle(auth)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toBe('usuário não encontrado')
  })
  test('should return status code 401 if password not match', async () => {
    const { sut, login } = makeSut()
    jest.spyOn(login, 'perform').mockImplementationOnce(async () => {
      throw new ExpectedError('senha incorreta')
    })
    const auth: LoginEmployerControllerProps = {
      email: 'invalid_email',
      password: '1234'
    }
    const httpResponse = await sut.handle(auth)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toBe('senha incorreta')
  })
  test('should return statusCode 500 if controller throws', async () => {
    const { sut, login } = makeSut()
    jest.spyOn(login, 'perform').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const auth: LoginEmployerControllerProps = {
      email: 'invalid_email',
      password: '1234'
    }
    const httpResponse = await sut.handle(auth)
    expect(httpResponse?.statusCode).toBe(500)
  })
})
