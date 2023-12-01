import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type movieDto, type IcreateMovie } from '../../data/protocols/create.movie.protocol'
import { type Roles } from '../../domain/enums/roles.enum'
import { created, serverError, unauthorized } from '../helpers/http.helper'

export interface AddMovieControllerProps {
  dto: movieDto
  role: Roles
}

export class AddMovieController implements Controller<AddMovieControllerProps> {
  constructor (private readonly create: IcreateMovie) {}

  public async handle (paramns: AddMovieControllerProps): Promise<HttpResponse> {
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
