import { type IredefinePasswordProps, type IredefinePassword } from '../../data/protocols/redefine.password.protocol'
import { RedefinePasswordController, type RedefinePasswordControllerProps } from '../controllers/redefine.password.controller'
import { ExpectedError } from '../helpers/expected.error'

interface SutTypes {
  sut: RedefinePasswordController
  redefine: IredefinePassword
}

export const makeRedefinePasswordMock = (): IredefinePassword => {
  class RedefinePasswordMock implements IredefinePassword {
    public async perform (paramns: IredefinePasswordProps): Promise<string> {
      return 'redefined'
    }
  }
  return new RedefinePasswordMock()
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
