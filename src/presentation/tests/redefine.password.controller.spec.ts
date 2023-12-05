import { type HttpResponse } from '../../@types/http'
import { ExpectedError } from '../helpers/expected.error'

interface SutTypes {
  sut: RedefinePasswordController
  redefine: IredefinePassword
}

export interface IredefinePassword {
  perform: (paramns: IredefinePasswordProps) => Promise<string>
}

export interface IredefinePasswordProps {
  email: string
  token: string
  newPassword: string
}

export const makeRedefinePasswordMock = (): IredefinePassword => {
  class RedefinePasswordMock implements IredefinePassword {
    public async perform (paramns: IredefinePasswordProps): Promise<string> {
      return 'redefined'
    }
  }
  return new RedefinePasswordMock()
}

export interface RedefinePasswordControllerProps {
  email: string
  token: string
  newPassword: string
}

export class RedefinePasswordController {
  constructor (private readonly redefine: IredefinePassword) {}

  public async handle (paramns: RedefinePasswordControllerProps): Promise<HttpResponse> {
    try {
      const props: IredefinePasswordProps = {
        email: paramns.email,
        token: paramns.token,
        newPassword: paramns.newPassword
      }
      const res = await this.redefine.perform(props)
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
        body: error
      }
    }
  }
}

const makeSut = (): SutTypes => {
  const redefine = makeRedefinePasswordMock()
  const sut = new RedefinePasswordController(redefine)
  return { sut, redefine }
}

describe('RedefinePasswordController', () => {
  test('should return 200 if redefine password with success', async () => {
    const { sut } = makeSut()
    const props: RedefinePasswordControllerProps = {
      email: 'seed@test.com',
      token: 'valid_token',
      newPassword: 'new_123'
    }
    const httpResponse = await sut.handle(props)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toBe('redefined')
  })
  test('should return 400 bad request if user not found', async () => {
    const { sut, redefine } = makeSut()
    jest.spyOn(redefine, 'perform').mockImplementationOnce(async () => {
      throw new ExpectedError('usuário não encontrado')
    })
    const props: RedefinePasswordControllerProps = {
      email: 'invalid_email',
      token: 'valid_token',
      newPassword: 'new_123'
    }
    const httpResponse = await sut.handle(props)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toBe('usuário não encontrado')
  })
  test('should return 400 bad request if user provide invalid token', async () => {
    const { sut, redefine } = makeSut()
    jest.spyOn(redefine, 'perform').mockImplementationOnce(async () => {
      throw new ExpectedError('token inválido')
    })
    const props: RedefinePasswordControllerProps = {
      email: 'seed@test.com',
      token: 'invalid_token',
      newPassword: 'new_123'
    }
    const httpResponse = await sut.handle(props)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toBe('token inválido')
  })
  test('should return 500 if controller throws', async () => {
    const { sut, redefine } = makeSut()
    jest.spyOn(redefine, 'perform').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const props: RedefinePasswordControllerProps = {
      email: 'seed@test.com',
      token: 'valid_token',
      newPassword: 'new_123'
    }
    const httpResponse = await sut.handle(props)
    expect(httpResponse.statusCode).toBe(500)
  })
})
