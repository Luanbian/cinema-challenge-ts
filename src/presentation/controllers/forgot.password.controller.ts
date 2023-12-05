import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type IPasswordToken } from '../../data/protocols/forgot.password.protocol'
import { ExpectedError } from '../helpers/expected.error'
import { badRequest, ok, serverError } from '../helpers/http.helper'

export interface ForgotPasswordControllerProps {
  email: string
}

export class ForgotPasswordController implements Controller<ForgotPasswordControllerProps> {
  constructor (private readonly passwordToken: IPasswordToken) {}

  public async handle (paramns: ForgotPasswordControllerProps): Promise<HttpResponse> {
    try {
      const res = await this.passwordToken.perform(paramns.email)
      return ok(res)
    } catch (error) {
      if (error instanceof ExpectedError) {
        return badRequest(error.message)
      }
      return serverError(error)
    }
  }
}
