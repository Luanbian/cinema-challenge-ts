import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type EmployerDto, type IcreateEmployer } from '../../data/protocols/create.employer.protocol'
import { type Roles } from '../../domain/enums/roles.enum'
import { created, serverError } from '../helpers/http.helper'

export interface AddEmployerControllerProps extends EmployerDto {
  loggedUser: { role?: Roles }
}

export class AddEmployerController implements Controller<AddEmployerControllerProps> {
  constructor (private readonly create: IcreateEmployer) {}

  public async handle (paramns: AddEmployerControllerProps): Promise<HttpResponse> {
    try {
      const employerDto: EmployerDto = {
        id: paramns.id,
        name: paramns.name,
        email: paramns.email,
        password: paramns.password,
        role: paramns.role
      }
      const res = await this.create.perform(employerDto)
      return created(res)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
