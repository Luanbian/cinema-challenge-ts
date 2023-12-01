import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type EmployerDto, type IcreateEmployer } from '../../data/protocols/create.employer.protocol'
import { type Roles } from '../../domain/enums/roles.enum'
import { created, serverError, unauthorized } from '../helpers/http.helper'

export interface AddEmployerControllerProps {
  dto: EmployerDto
  role: Roles
}

export class AddEmployerController implements Controller<AddEmployerControllerProps> {
  constructor (private readonly create: IcreateEmployer) {}

  public async handle (paramns: AddEmployerControllerProps): Promise<HttpResponse> {
    try {
      const permitedRoles = ['admin', 'cadastrer']
      if (!permitedRoles.includes(paramns.role.toLowerCase().trim())) {
        return unauthorized('Você não tem permissão para acessar essa rota')
      }
      const res = await this.create.perform(paramns.dto)
      return created(res)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
