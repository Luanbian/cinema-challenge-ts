import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type IForgotPassword } from '../../data/protocols/forgot.password.protocol'
import { makeLog } from '../../main/factories/adapter.factory'
import { ExpectedError } from '../helpers/expected.error'
import { badRequest, ok, serverError } from '../helpers/http.helper'

export interface ForgotPasswordControllerProps {
  email: string
}

export class ForgotPasswordController implements Controller<ForgotPasswordControllerProps> {
  constructor (private readonly passwordToken: IForgotPassword) {}

  public async handle (paramns: ForgotPasswordControllerProps): Promise<HttpResponse> {
    try {
      const res = await this.passwordToken.perform(paramns.email)
      await makeLog().execute('info', 'user trying change password', { user: { logged: paramns.email } })
      return ok(res)
    } catch (error) {
      if (error instanceof ExpectedError) {
        await makeLog().execute('error', 'user trying change password with email not exists', { user: { logged: paramns.email } })
        return badRequest(error.message)
      }
      await makeLog().execute('crit', 'server error', 'redefine password controller throws', new Error(error))
      return serverError(error)
    }
  }
}
