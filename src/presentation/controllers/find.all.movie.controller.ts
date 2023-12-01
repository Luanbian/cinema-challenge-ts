import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type IlistMovie } from '../../data/protocols/list.movie.protocol'
import { type Roles } from '../../domain/enums/roles.enum'
import { noContent, ok, serverError, unauthorized } from '../helpers/http.helper'

export interface IParamns {
  column?: string
  type?: 'asc' | 'desc'
  limit?: string
  page?: string
  role: Roles
}

export class FindAllMovieController implements Controller<IParamns> {
  constructor (private readonly list: IlistMovie) {}

  public async handle (paramns: IParamns): Promise<HttpResponse> {
    try {
      const permitedRoles = ['admin', 'consulter']
      if (!permitedRoles.includes(paramns.role.toLowerCase().trim())) {
        return unauthorized('Você não tem permissão para acessar essa rota')
      }
      const res = await this.list.perform(paramns)
      if (res.length === 0) return noContent()
      const body = {
        length: res.length,
        limit: paramns.limit,
        page: paramns.page,
        hasMore: res.hasMore,
        content: res.result
      }
      return ok(body)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
