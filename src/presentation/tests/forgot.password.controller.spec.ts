import { type HttpResponse } from '../../@types/http'

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
})
