import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type IredefinePasswordProps, type IredefinePassword } from '../../data/protocols/redefine.password.protocol'
import { ExpectedError } from '../helpers/expected.error'
import { badRequest, ok, serverError } from '../helpers/http.helper'

export interface RedefinePasswordControllerProps {
  email: string
  token: string
  newPassword: string
}

export class RedefinePasswordController implements Controller<RedefinePasswordControllerProps> {
  constructor (private readonly redefine: IredefinePassword) {}

  public async handle (paramns: RedefinePasswordControllerProps): Promise<HttpResponse> {
    try {
      const props: IredefinePasswordProps = {
        email: paramns.email,
        token: paramns.token,
        newPassword: paramns.newPassword
      }
      const res = await this.redefine.perform(props)
      return ok(res)
    } catch (error) {
      if (error instanceof ExpectedError) {
        return badRequest(error.message)
      }
      return serverError(error)
    }
  }
}
