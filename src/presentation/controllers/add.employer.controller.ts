import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type EmployerDto, type IcreateEmployer } from '../../data/protocols/create.employer.protocol'
import { created, serverError } from '../helpers/http.helper'

export class AddEmployerController implements Controller<EmployerDto> {
  constructor (private readonly create: IcreateEmployer) {}

  public async handle (props: EmployerDto): Promise<HttpResponse> {
    try {
      const res = await this.create.perform(props)
      return created(res)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
