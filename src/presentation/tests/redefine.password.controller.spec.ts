import { type HttpResponse } from '../../@types/http'

interface SutTypes {
  sut: RedefinePasswordController
  redefine: IredefinePassword
}

export interface IredefinePassword {
  perform: () => Promise<string>
}

export const makeRedefinePasswordMock = (): IredefinePassword => {
  class RedefinePasswordMock implements IredefinePassword {
    public async perform (): Promise<string> {
      return 'redefined'
    }
  }
  return new RedefinePasswordMock()
}

export class RedefinePasswordController {
  constructor (private readonly redefine: IredefinePassword) {}

  public async handle (): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: 'ok'
    }
  }
}
const makeSut = (): SutTypes => {
  const redefine = makeRedefinePasswordMock()
  const sut = new RedefinePasswordController(redefine)
  return { sut, redefine }
}
