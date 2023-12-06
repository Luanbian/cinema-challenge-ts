import { makePasswordTokenMock } from '../../data/mocks/forgot.password.mock'
import { type IForgotPassword } from '../../data/protocols/forgot.password.protocol'
import { ForgotPasswordController } from '../controllers/forgot.password.controller'
import { ExpectedError } from '../helpers/expected.error'

interface SutTypes {
  sut: ForgotPasswordController
  passwordToken: IForgotPassword
}

const makeSut = (): SutTypes => {
  const passwordToken = makePasswordTokenMock()
  const sut = new ForgotPasswordController(passwordToken)
  return { sut, passwordToken }
}

describe('ForgotPasswordController', () => {
  test('should return 200 and token if success', async () => {
    const { sut } = makeSut()
    const httpRespose = await sut.handle({ email: 'valid_email@gmail.com' })
    expect(httpRespose.statusCode).toBe(200)
    expect(httpRespose.body).toEqual({
      token: 'valid_password_token',
      expiresAt: new Date('01/11/2023')
    })
  })
  test('should return 400 bad request if user not be found', async () => {
    const { sut, passwordToken } = makeSut()
    jest.spyOn(passwordToken, 'perform').mockImplementationOnce(async () => {
      throw new ExpectedError('usuário não encontrado')
    })
    const httpResponse = await sut.handle({ email: 'invalid_email@gmail.com' })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toBe('usuário não encontrado')
  })
  test('should return 500 if controller throws', async () => {
    const { sut, passwordToken } = makeSut()
    jest.spyOn(passwordToken, 'perform').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const httpResponse = await sut.handle({ email: 'valid_email@gmail.com' })
    expect(httpResponse.statusCode).toBe(500)
  })
})
