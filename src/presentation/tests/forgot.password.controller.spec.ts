import { type HttpResponse } from '../../@types/http'
import { ExpectedError } from '../helpers/expected.error'

interface SutTypes {
  sut: ForgotPasswordController
  passwordToken: IPasswordToken
}

export interface IPasswordToken {
  perform: (email: string) => Promise<string>
}

export const makePasswordTokenMock = (): IPasswordToken => {
  class PasswordTokenMock implements IPasswordToken {
    public async perform (email: string): Promise<string> {
      return 'valid_password_token'
    }
  }
  return new PasswordTokenMock()
}

export interface ForgotPasswordControllerProps {
  email: string
}

export class ForgotPasswordController {
  constructor (private readonly passwordToken: IPasswordToken) {}

  public async handle (paramns: ForgotPasswordControllerProps): Promise<HttpResponse> {
    try {
      const res = await this.passwordToken.perform(paramns.email)
      return {
        statusCode: 200,
        body: res
      }
    } catch (error) {
      if (error instanceof ExpectedError) {
        return {
          statusCode: 400,
          body: error.message
        }
      }
      return {
        statusCode: 500,
        body: 'server error'
      }
    }
  }
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
    expect(httpRespose.body).toBe('valid_password_token')
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
